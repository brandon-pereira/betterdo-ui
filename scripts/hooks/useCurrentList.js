import { useRef, useEffect, useState } from 'react';
import useSWR from 'swr';

import createSharedHook from './internal/createSharedHook';

function useCurrentListOnce() {
    const previousList = useRef({
        color: 'red',
        tasks: [],
        completedTasks: []
    });
    const [currentList, setCurrentList] = useState('inbox');
    const { data, error } = useSWR(
        `${process.env.SERVER_URL}/api/init/${currentList}`
    );

    useEffect(() => {
        if (data && !error) {
            previousList.current = data.currentList;
        }
    }, [data, error]);

    return {
        loading: Boolean(!data),
        switchList: id => setCurrentList(id),
        currentList: data ? data.currentList : previousList.current
    };
}

const {
    Provider: CurrentListProvider,
    Context: CurrentListContext,
    useConsumer: useCurrentList
} = createSharedHook(useCurrentListOnce);

export { CurrentListContext, CurrentListProvider };
export default useCurrentList;
