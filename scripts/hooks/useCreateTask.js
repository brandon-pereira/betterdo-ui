import { useRef, useEffect, useState, useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import useCurrentList from './useListDetails';
import { createTask } from '@utilities/server';
import useCurrentListId from './useCurrentListId';

function useCreateTask() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentListId = useCurrentListId();
    const _createTask = useCallback(
        async taskName => {
            setLoading(true);
            const tempId = Math.floor(Math.random() * 1000);
            await mutate(
                `${process.env.SERVER_URL}/api/lists/${currentListId}`,
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
        createTask: _createTask
    };
}

export default useCreateTask;
