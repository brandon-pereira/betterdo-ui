import useSWR from 'swr';

import { getTaskDetailUrl } from './internal/urls';

import Task from '@customTypes/task';

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
