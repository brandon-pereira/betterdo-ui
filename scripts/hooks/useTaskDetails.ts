import useSWR from 'swr';

import Task from '../../types/task';

import { getTaskDetailUrl } from './internal/urls';

function useTaskDetails(taskId: string) {
    const { data, error } = useSWR<Task>(getTaskDetailUrl(taskId), {
        dedupingInterval: 5000,
        refreshInterval: 30000
    });

    return {
        error,
        loading: Boolean(!data),
        task: data
    };
}

export default useTaskDetails;
