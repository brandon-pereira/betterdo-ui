import { useCallback, useState } from 'react';
import useSWR from 'swr';

import createSharedHook from './internal/createSharedHook';

function useCurrentListOnce() {
    const { data, error } = useSWR(`${process.env.SERVER_URL}/api/init`);
    console.log(data);
    return {
        loading: Boolean(!data),
        currentList: data ? data.currentList : {}
    };
}

const {
    Provider: CurrentListProvider,
    Context: CurrentListContext,
    useConsumer: useCurrentList
} = createSharedHook(useCurrentListOnce);

export { CurrentListContext, CurrentListProvider };
export default useCurrentList;
