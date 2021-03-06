import { useCallback } from 'react';
import { mutate } from 'swr';
import { updateTask } from '@utilities/server';

import { getListDetailUrl, getTaskDetailUrl } from './internal/urls';
import useCompletedTasks from './useCompletedTasks';
import { useHistory } from 'react-router-dom';
import useGeneratedUrl from './useGeneratedUrl';
import useCurrentListId from './useCurrentListId';

function useModifyTask() {
    const history = useHistory();
    const [isCompletedTasksIncluded] = useCompletedTasks();
    const currentListId = useCurrentListId();
    const generateUrl = useGeneratedUrl();
    return useCallback(
        async (taskId, listId, updatedProps) => {
            if (updatedProps.list) {
                console.log('CHANGED LIST');
            }
            await mutate(
                getListDetailUrl(listId, isCompletedTasksIncluded),
                updateTaskInList(taskId, updatedProps),
                false
            );
            await mutate(
                getListDetailUrl(currentListId, isCompletedTasksIncluded),
                updateTaskInList(taskId, updatedProps),
                false
            );
            await updateTask(taskId, updatedProps);
            mutate(getListDetailUrl(listId, isCompletedTasksIncluded));
            mutate(getTaskDetailUrl(taskId));
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
        [currentListId, isCompletedTasksIncluded, history, generateUrl]
    );
}

const updateTaskInList = (taskId, updatedProps) => list => ({
    ...list,
    tasks: list
        ? list.tasks.map(task => {
              if (task._id === taskId) {
                  return { ...task, ...updatedProps };
              }
              return task;
          })
        : []
});

export default useModifyTask;
