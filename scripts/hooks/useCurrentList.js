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
    console.log(currentList);
    console.log(`${process.env.SERVER_URL}/api/lists/${currentList}`);
    const { data, error } = useSWR(
        `${process.env.SERVER_URL}/api/lists/${currentList}`
    );

    useEffect(() => {
        if (data && !error) {
            previousList.current = data;
        }
    }, [data, error]);

    return {
        error,
        loading: Boolean(!data),
        switchList: id => setCurrentList(id),
        currentList: data ? data : previousList.current
    };
}

const {
    Provider: CurrentListProvider,
    Context: CurrentListContext,
    useConsumer: useCurrentList
} = createSharedHook(useCurrentListOnce);

export { CurrentListContext, CurrentListProvider };
export default useCurrentList;
