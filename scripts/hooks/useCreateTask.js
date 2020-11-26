import { useRef, useEffect, useState, useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import useCurrentList from './useCurrentList';
import { createTask } from '@utilities/server';

function useCreateTask() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { currentListId } = useCurrentList();
    const _createTask = useCallback(async taskName => {
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
        await mutate(`${process.env.SERVER_URL}/api/lists/${currentListId}`);
        setLoading(false);
    }, []);
    return {
        loading,
        error,
        createTask: _createTask
    };
}

export default useCreateTask;
