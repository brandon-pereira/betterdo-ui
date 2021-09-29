import { useCallback } from 'react';
import { mutate } from 'swr';
import { updateUser } from '@utilities/server';

import { getListsUrl, getProfileUrl } from './internal/urls';

function useModifyProfile() {
    return useCallback(async updatedProps => {
        if (updatedProps.lists) {
            await mutate(getListsUrl(), async () => updatedProps.lists, false);
            updatedProps.lists = updatedProps.lists
                .filter(t => t.type === 'default')
                .map(t => t._id);
        }
        await updateUser(updatedProps);
        await mutate(getProfileUrl());
        if (updatedProps.lists || updatedProps.customLists) {
            await mutate(getListsUrl());
        }
    }, []);
}

export default useModifyProfile;
