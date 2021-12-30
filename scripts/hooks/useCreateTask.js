import { useCallback } from 'react';
import { mutate } from 'swr';

import { getListDetailUrl } from './internal/urls';

import useCompletedTasks from '@hooks/useCompletedTasks';
import { createTask } from '@utilities/server';

function useCreateTask() {
    const [isCompletedTasksIncluded] = useCompletedTasks();
    return useCallback(
        async (listId, taskName) => {
            // generate a tempId for now
            const tempId = Math.floor(Math.random() * 1000);
            // get cache url
            const listUrl = getListDetailUrl(listId, isCompletedTasksIncluded);
            // Update cache to add new temp task
            await mutate(
                listUrl,
                async currentList => {
                    return {
                        ...currentList,
                        tasks: [
                            {
                                _id: tempId,
                                title: taskName,
                                priority: 'normal',
                                isLoading: true
                            },
                            ...currentList.tasks
                        ]
                    };
                },
                false
            );
            // Send request to server
            const addedTask = await createTask(listId, taskName);
            // Sync temp task with server response
            await mutate(
                listUrl,
                async currentList => {
                    const mutatedList = { ...currentList };
                    // this could be a race, but thats a big edge case, revalidation will cleanup shortly
                    mutatedList.tasks[0] = Object.assign(
                        { isTemporaryTask: true },
                        mutatedList.tasks[0],
                        addedTask,
                        // disable loading, user can technically interact before revalidation occurs
                        { isLoading: false }
                    );
                    mutatedList.tasks = [...mutatedList.tasks];
                    return mutatedList;
                },
                false
            );
            const sleep = new Promise(resolve => setTimeout(resolve, 300));
            await Promise.all([sleep]);
            // Update real cached data
            await mutate(listUrl);
        },
        [isCompletedTasksIncluded]
    );
}

export default useCreateTask;
