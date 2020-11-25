import { useRef, useEffect, useState } from 'react';
import useSWR from 'swr';

function useCreateTask() {
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

export default useCreateTask;
