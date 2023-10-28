import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { useNavigate } from 'react-router-dom';

import { getListDetailUrl, getTaskDetailUrl } from './internal/urls';

import Task from '@customTypes/task';
import List from '@customTypes/list';
import useCompletedTasks from '@hooks/useCompletedTasks';
import useGeneratedUrl from '@hooks/useGeneratedUrl';
import useCurrentListId from '@hooks/useCurrentListId';
import { updateTask } from '@utilities/server';

function useModifyTask() {
    const { mutate } = useSWRConfig();
    const navigate = useNavigate();
    const [isCompletedTasksIncluded] = useCompletedTasks();
    const currentListId = useCurrentListId();
    const generateUrl = useGeneratedUrl();
    return useCallback(
        async (taskId: string, listId: string, updatedProps: Partial<Task>) => {
            if (
                // If dueDate is passed in and format is 'YYYY-MM-DD' then
                // we need to create a date obj using CURRENT timezone
                // (strings generate with UTC by default) then pass the UTC
                // version to server (since current timezone to UTC will include timezone)
                updatedProps.dueDate &&
                typeof updatedProps.dueDate === 'string' &&
                // make sure its in 'YYYY-MM-DD' not already ISO string
                updatedProps.dueDate.length === 10
            ) {
                const [year, month, day] = updatedProps.dueDate.split('-');
                updatedProps.dueDate = new Date(
                    parseInt(year),
                    parseInt(month) - 1,
                    parseInt(day)
                ).toUTCString();
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
            mutate(getListDetailUrl(currentListId, isCompletedTasksIncluded));
            mutate(getTaskDetailUrl(taskId));
            if (updatedProps.list && updatedProps.list !== currentListId) {
                navigate(
                    generateUrl(`/edit-task/:taskId`, {
                        currentListId: updatedProps.list,
                        taskId: taskId
                    })
                );
                mutate(getListDetailUrl(updatedProps.list));
            }
        },
        [currentListId, mutate, isCompletedTasksIncluded, navigate, generateUrl]
    );
}

const updateTaskInList =
    (taskId: string, updatedProps: Partial<Task>) => (list?: List) =>
        ({
            ...list,
            tasks: list
                ? list.tasks.map(task => {
                      if (task._id === taskId) {
                          return { ...task, ...updatedProps };
                      }
                      return task;
                  })
                : []
        }) as List;

export default useModifyTask;
