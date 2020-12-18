import { useEffect, useState, useCallback } from 'react';
import useCurrentList from './useListDetails';

function useCompletedTasks() {
    const [loading, setLoading] = useState(null);
    const [visible, setVisible] = useState(false);
    const { currentList, currentListId } = useCurrentList();

    useEffect(() => {}, [currentListId]);

    const loadCompletedTasks = useCallback(async () => {
        setLoading(true);
        await fetch();
    }, []);

    return {
        loading,
        visible,
        loadCompletedTasks
    };
}

export default useCompletedTasks;
