import { useCallback } from 'react';
import { mutate } from 'swr';
import { updateTask } from '@utilities/server';

import { getListDetailUrl, getListDetailUrls } from './internal/urls';
import useCompletedTasks from './useCompletedTasks';

function useModifyTask() {
    const [isCompletedTasksIncluded] = useCompletedTasks();
    return useCallback(
        async (taskId, listId, updatedProps) => {
            await mutate(
                getListDetailUrl(listId, isCompletedTasksIncluded),
                async currentList => ({
                    ...currentList,
                    tasks: currentList
                        ? currentList.tasks.map(task => {
                              if (task._id === taskId) {
                                  return { ...task, ...updatedProps };
                              }
                              return task;
                          })
                        : []
                }),
                false
            );
            await updateTask(taskId, updatedProps);
            mutate(getListDetailUrl(listId, isCompletedTasksIncluded));
        },
        [isCompletedTasksIncluded]
    );
}

export default useModifyTask;
