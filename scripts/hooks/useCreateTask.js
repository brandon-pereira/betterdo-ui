import { useCallback } from 'react';
import { mutate } from 'swr';
import { createTask } from '@utilities/server';

function useCreateTask() {
    return useCallback(async (listId, taskName) => {
        const tempId = Math.floor(Math.random() * 1000);
        await mutate(
            `${process.env.SERVER_URL}/api/lists/${listId}`,
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
        await createTask(listId, taskName);
        await mutate(`${process.env.SERVER_URL}/api/lists/${listId}`);
    }, []);
}

export default useCreateTask;
