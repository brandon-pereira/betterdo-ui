import { useCallback } from 'react';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';

import { getListsUrl } from './internal/urls';

import List from '@customTypes/list';
import { deleteList } from '@utilities/server';

function useDeleteList() {
    const navigate = useNavigate();
    return useCallback(
        async (listId: string) => {
            await mutate(
                getListsUrl(),
                async (lists: List[]) =>
                    lists.filter(list => list._id !== listId),
                false
            );
            try {
                await deleteList(listId);
            } catch (err) {
                await mutate(getListsUrl());
                throw err;
            }
            await mutate(getListsUrl());
            navigate('/');
        },
        [navigate]
    );
}

export default useDeleteList;
