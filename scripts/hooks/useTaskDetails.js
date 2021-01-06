import { useEffect } from 'react';
import useSWR from 'swr';

import { useHistory } from 'react-router-dom';
import { getTaskDetailUrl } from './internal/urls';

function useTaskDetails(taskId) {
    const history = useHistory();
    const { data, loading, error } = useSWR(getTaskDetailUrl(taskId), {
        dedupingInterval: 5000,
        refreshInterval: 30000
    });

    return {
        error,
        loading,
        task: data
    };
}

export default useTaskDetails;
