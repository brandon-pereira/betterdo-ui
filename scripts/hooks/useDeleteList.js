import { useCallback } from 'react';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';

import { getListsUrl } from './internal/urls';

import { deleteList } from '@utilities/server';

function useDeleteList() {
    const navigate = useNavigate();
    return useCallback(
        async listId => {
            await mutate(
                getListsUrl(),
                async lists => lists.filter(list => list._id !== listId),
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
