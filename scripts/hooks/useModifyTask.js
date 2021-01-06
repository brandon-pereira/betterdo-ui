import { useCallback } from 'react';
import { mutate } from 'swr';
import { updateTask } from '@utilities/server';

import { getListDetailUrl } from './internal/urls';
import useCompletedTasks from './useCompletedTasks';
import { useHistory } from 'react-router-dom';
import useGeneratedUrl from './useGeneratedUrl';

function useModifyTask() {
    const history = useHistory();
    const [isCompletedTasksIncluded] = useCompletedTasks();
    const generateUrl = useGeneratedUrl();
    return useCallback(
        async (taskId, listId, updatedProps) => {
            if (updatedProps.list) {
                console.log('CHANGED LIST');
            }
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
            if (updatedProps.list) {
                history.replace(
                    generateUrl(`/edit-task/:taskId`, {
                        currentListId: updatedProps.list,
                        taskId: taskId
                    })
                );
                mutate(getListDetailUrl(updatedProps.list));
            }
        },
        [isCompletedTasksIncluded, generateUrl]
    );
}

function updateTaskInList() {}

export default useModifyTask;
