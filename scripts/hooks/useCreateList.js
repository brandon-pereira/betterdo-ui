import { useCallback } from 'react';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';

import { getListsUrl } from './internal/urls';

import { createList } from '@utilities/server';

function useCreateList() {
    const navigate = useNavigate();
    return useCallback(
        async (title, color) => {
            await mutate(
                getListsUrl(),
                async lists => {
                    return [
                        ...lists,
                        {
                            _id: Math.random(), // temp id
                            title,
                            color
                        }
                    ];
                },
                false
            );
            const list = await createList({ title, color });
            navigate(`/${list._id}`);
            await mutate(getListsUrl());
        },
        [navigate]
    );
}

export default useCreateList;
