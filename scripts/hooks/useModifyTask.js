import { useCallback } from 'react';
import { mutate } from 'swr';
import { useHistory } from 'react-router-dom';

import { getListDetailUrl, getTaskDetailUrl } from './internal/urls';

import useCompletedTasks from '@hooks/useCompletedTasks';
import useGeneratedUrl from '@hooks/useGeneratedUrl';
import useCurrentListId from '@hooks/useCurrentListId';
import { updateTask } from '@utilities/server';

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
            const updater = updateTask(taskId, updatedProps);
            // if we update to completed, add a delay to show UI animation
            if (updatedProps.isCompleted) {
                const sleep = new Promise(resolve => setTimeout(resolve, 300));
                await Promise.all([updater, sleep]);
            } else {
                await updater;
            }
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
