import { useCallback } from 'react';
import { mutate } from 'swr';
import { deleteList } from '@utilities/server';

import { getListsUrl } from './internal/urls';
import { useHistory } from 'react-router-dom';

function useDeleteList() {
    const history = useHistory();
    return useCallback(
        async listId => {
            await mutate(
                getListsUrl(),
                async lists => lists.filter(list => list.id !== listId),
                false
            );
            try {
                await deleteList(listId);
            } catch (err) {
                await mutate(getListsUrl());
                throw err;
            }
            await mutate(getListsUrl());
            history.replace('/inbox');
        },
        [history]
    );
}

export default useDeleteList;
