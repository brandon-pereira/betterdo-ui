import { useRef, useEffect, useState } from 'react';
import useSWR from 'swr';
import { COLORS } from '../constants';

import { useHistory } from 'react-router-dom';
import { getListDetailUrl } from './internal/urls';
import useCompletedTasks from './useCompletedTasks';

function useListDetails(listId) {
    const previousList = useRef({
        color: COLORS.defaultList,
        tasks: [],
        completedTasks: []
    });
    const [isCompletedTasksIncluded] = useCompletedTasks();
    const history = useHistory();
    const { data, error } = useSWR(
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
