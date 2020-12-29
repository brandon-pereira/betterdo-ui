import { useRef, useEffect, useState } from 'react';
import useSWR from 'swr';
import { COLORS } from '../constants';

import { useHistory } from 'react-router-dom';

function useListDetails(listId) {
    const previousList = useRef({
        color: COLORS.defaultList,
        tasks: [],
        completedTasks: []
    });
    const [isCompletedTasksIncluded, setIncludeCompletedTasks] = useState(
        false
    );
    const history = useHistory();
    const { data, error } = useSWR(getUrl(listId, isCompletedTasksIncluded), {
        dedupingInterval: 5000,
        refreshInterval: 30000
    });

    // cleanup on list change
    useEffect(() => {
        setIncludeCompletedTasks(false);
    }, [listId]);

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
        isCompletedTasksIncluded,
        setIncludeCompletedTasks,
        list: data ? data : previousList.current
    };
}

const getUrl = (listId, includeCompleted) =>
    `${process.env.SERVER_URL}/api/lists/${listId}${
        includeCompleted ? `?includeCompleted=true` : ''
    }`;

export default useListDetails;
