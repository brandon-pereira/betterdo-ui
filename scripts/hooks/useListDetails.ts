import { useRef, useEffect } from 'react';
import useSWR from 'swr';
import { useHistory } from 'react-router-dom';

import List from '../../types/list';
import { DEFAULT_LIST_COLOR } from '../constants';

import { getListDetailUrl } from './internal/urls';

import useCompletedTasks from '@hooks/useCompletedTasks';

function useListDetails(listId: string) {
    const previousList = useRef<Partial<List>>({
        color: DEFAULT_LIST_COLOR,
        tasks: [],
        completedTasks: []
    });
    const [isCompletedTasksIncluded] = useCompletedTasks();
    const history = useHistory();
    const { data, error } = useSWR<List>(
        getListDetailUrl(listId, isCompletedTasksIncluded),
        {
            dedupingInterval: 5000,
            refreshInterval: 30000
        }
    );

    useEffect(() => {
        if (data && !error) {
            previousList.current = data;
        }
    }, [data, error]);

    useEffect(() => {
        if (error && error.message === 'Invalid List ID') {
            console.warn('Invalid list detected, redirecting to inbox.');
            history.replace('/');
        }
    }, [error, history]);

    return {
        error,
        loading: Boolean(!data),
        list: data ? data : previousList.current
    };
}

export default useListDetails;
