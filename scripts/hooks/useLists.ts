import useSWR from 'swr';

import List from '../../types/list';

import createSharedHook from './internal/createSharedHook';
import { getListsUrl } from './internal/urls';

function useListsOnce() {
    const { data, error } = useSWR<List[]>(getListsUrl(), {
        dedupingInterval: 600000 //10min
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
