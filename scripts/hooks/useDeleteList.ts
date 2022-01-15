import { useCallback } from 'react';
import { mutate } from 'swr';
import { useHistory } from 'react-router-dom';

import { getListsUrl } from './internal/urls';

import List from '@customTypes/list';
import { deleteList } from '@utilities/server';

function useDeleteList() {
    const history = useHistory();
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
            history.replace('/');
        },
        [history]
    );
}

export default useDeleteList;
