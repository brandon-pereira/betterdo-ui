import { useState, useCallback } from 'react';
import { mutate } from 'swr';
import { updateList } from '@utilities/server';

import { getListsUrl } from './internal/urls';

function useModifyList() {
    return useCallback(async (listId, updatedProps) => {
        await mutate(
            getListUrl(listId),
            async currentList => {
                return {
                    ...currentList,
                    ...updatedProps
                };
            },
            false
        );
        await updateList(listId, updatedProps);
        await mutate(getListsUrl());
        await mutate(getListUrl(listId));
    }, []);
}

const getListUrl = listId => `${process.env.SERVER_URL}/api/lists/${listId}`;

export default useModifyList;
