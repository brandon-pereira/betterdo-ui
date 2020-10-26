import { useCallback, useState } from 'react';
import useSWR from 'swr';

import createSharedHook from './internal/createSharedHook';

function useCurrentListOnce() {
    const [currentList, setCurrentList] = useState('inbox');
    const { data, error } = useSWR(
        `${process.env.SERVER_URL}/api/init/${currentList}`
    );
    console.log(data);
    return {
        loading: Boolean(!data),
        switchList: id => setCurrentList(id),
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
