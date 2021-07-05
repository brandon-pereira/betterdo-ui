import useSWR from 'swr';

import { getTaskDetailUrl } from './internal/urls';

function useTaskDetails(taskId) {
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
