import { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useGeneratedUrl from './useGeneratedUrl';
import useListDetails from './useListDetails';

const getTaskFromList = (list, id) => list.tasks.find(task => task._id === id);

function useTaskDetails(listId, taskId) {
    const { list, loading } = useListDetails(listId);
    const task = useMemo(() => {
        if (!loading && list) {
            return getTaskFromList(list, taskId);
        }
        return null;
    }, [list, loading, taskId]);
    const error = !loading && list && taskId && !task;

    return {
        task,
        error,
        loading
    };
}

export default useTaskDetails;
