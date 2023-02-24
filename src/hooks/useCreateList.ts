import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { useNavigate } from 'react-router-dom';

import { getListsUrl } from './internal/urls';

import List from '@customTypes/list';
import { createList } from '@utilities/server';

function useCreateList() {
    const { mutate } = useSWRConfig();

    const navigate = useNavigate();
    return useCallback(
        async (title: string, color: string) => {
            await mutate(
                getListsUrl(),
                async (lists?: List[]) => {
                    return [
                        ...(lists || []),
                        {
                            _id: Math.random(), // temp id
                            title,
                            color
                        }
                    ] as List[];
                },
                false
            );
            const list = await createList({ title, color });
            navigate(`/${list._id}`);
            await mutate(getListsUrl());
        },
        [navigate, mutate]
    );
}

export default useCreateList;
