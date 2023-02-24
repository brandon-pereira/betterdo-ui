import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

import { getListDetailUrl } from './internal/urls';

import List from '@customTypes/list';
import useCompletedTasks from '@hooks/useCompletedTasks';
import { createTask } from '@utilities/server';

function useCreateTask() {
    const { mutate } = useSWRConfig();
    const [isCompletedTasksIncluded] = useCompletedTasks();
    return useCallback(
        async (listId: string, taskName: string) => {
            // generate a tempId for now
            const tempId = Math.floor(Math.random() * 1000);
            // get cache url
            const listUrl = getListDetailUrl(listId, isCompletedTasksIncluded);
            // Update cache to add new temp task
            await mutate(
                listUrl,
                async (currentList?: List) => {
                    return {
                        ...currentList,
                        tasks: [
                            {
                                _id: tempId,
                                title: taskName,
                                priority: 'normal',
                                isLoading: true
                            },
                            ...(currentList?.tasks || [])
                        ]
                    } as List;
                },
                { revalidate: false }
            );
            // Send request to server
            const addedTask = await createTask(listId, taskName);
            // Sync temp task with server response
            const mutation = mutate(
                listUrl,
                async (currentList?: List) => {
                    const mutatedList = { tasks: [], ...currentList };
                    // this could be a race, but thats a big edge case, revalidation will cleanup shortly
                    mutatedList.tasks[0] = {
                        isTemporaryTask: true,
                        // existing temp task
                        ...mutatedList.tasks[0],
                        // server response to override above
                        ...addedTask,
                        // disable loading, user can technically interact before revalidation occurs
                        isLoading: false
                    };
                    mutatedList.tasks = [...mutatedList.tasks];
                    return mutatedList as List;
                },
                false
            );
            const sleep = new Promise(resolve => setTimeout(resolve, 300));
            await Promise.all([mutation, sleep]);
            // Update real cached data
            await mutate(listUrl);
        },
        [isCompletedTasksIncluded, mutate]
    );
}

export default useCreateTask;
