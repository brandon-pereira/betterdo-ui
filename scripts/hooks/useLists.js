import { useCallback, useState } from 'react';
import useSWR from 'swr';

import createSharedHook from './internal/createSharedHook';

function useListsOnce() {
    const { data, error } = useSWR(`${process.env.SERVER_URL}/api/lists`);

    if (error) {
        console.error(error);
    }
    return {
        error,
        loading: Boolean(!data),
        lists: data ? data : []
    };
}

const {
    Provider: ListsProvider,
    Context: ListsContext,
    useConsumer: useLists
} = createSharedHook(useListsOnce);

export { ListsContext, ListsProvider };
export default useLists;
