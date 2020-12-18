import { useState, useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import useCurrentList from './useCurrentList';
import { createTask } from '@utilities/server';

function useModifyTask() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { currentListId } = useCurrentList();

    const _modifyTask = useCallback(
        async (taskId, task) => {
            setLoading(true);
            await mutate(
                `${process.env.SERVER_URL}/api/lists/${currentListId}`,
                async currentList => {
                    const currentTask = currentList.tasks.find(
                        task => task.id === taskId
                    );
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
            await createTask(taskName, currentListId);
            await mutate(
                `${process.env.SERVER_URL}/api/lists/${currentListId}`
            );
            setLoading(false);
        },
        [currentListId]
    );
    return {
        loading,
        error,
        modifyTask: _modifyTask
    };
}

export default useModifyTask;
