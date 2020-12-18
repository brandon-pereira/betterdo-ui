import { useRef, useEffect, useCallback, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { COLORS } from '../constants';

import createSharedHook from './internal/createSharedHook';
import { useHistory, useParams } from 'react-router-dom';

function useCurrentListOnce() {
    const previousList = useRef({
        color: COLORS.defaultList,
        tasks: [],
        completedTasks: []
    });
    const { currentListId } = useParams();
    const history = useHistory();
    const { data, error } = useSWR(getUrl(currentListId), {
        dedupingInterval: 5000,
        refreshInterval: 30000
    });

    useEffect(() => {
        if (data && !error) {
            previousList.current = data;
        }
    }, [data, error]);

    useEffect(() => {
        if (error && error.message === 'Invalid List ID') {
            console.warn('Invalid list detected, redirecting to inbox.');
            history.replace('/inbox');
        }
    }, [error, history]);

    const switchList = useCallback(
        async nextList => {
            // update the local data immediately, but disable the revalidation
            await mutate(
                getUrl(nextList.id),
                list => ({ ...nextList, ...list }),
                false
            );
            // setCurrentListId(nextList.id);
            // update url
            history.replace(`/${nextList.id}`);
        },
        [history]
    );

    const loadCompletedTasks = useCallback(async () => {
        console.log('LAOD MORE');
    }, []);

    return {
        error,
        loading: Boolean(!data),
        switchList,
        loadCompletedTasks,
        currentListId,
        currentList: data ? data : previousList.current
    };
}

const getUrl = listId => `${process.env.SERVER_URL}/api/lists/${listId}`;

const {
    Provider: CurrentListProvider,
    Context: CurrentListContext,
    useConsumer: useCurrentList
} = createSharedHook(useCurrentListOnce);

export { CurrentListContext, CurrentListProvider };
export default useCurrentList;
