import { useCallback } from 'react';
import { mutate } from 'swr';
import { createTask } from '@utilities/server';
import useCompletedTasks from './useCompletedTasks';
import { getListDetailUrl } from './internal/urls';

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
            await createTask(listId, taskName);
            // Update real cached data
            await mutate(listUrl);
        },
        [isCompletedTasksIncluded]
    );
}

export default useCreateTask;
