import useSWR from 'swr';
import ms from 'ms.macro';

import createSharedHook from './internal/createSharedHook';
import { getListsUrl } from './internal/urls';

function useListsOnce() {
    const { data, error } = useSWR(getListsUrl(), {
        dedupingInterval: ms('10m')
    });

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
