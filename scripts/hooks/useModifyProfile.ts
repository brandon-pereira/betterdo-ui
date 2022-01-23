import { useCallback } from 'react';
import { mutate } from 'swr';

import { getListsUrl, getProfileUrl } from './internal/urls';

import { _UpdateUserPayload, UpdateUserObject } from '@customTypes/user';
import { updateUser } from '@utilities/server';

function useModifyProfile() {
    return useCallback(async (updatedProps: UpdateUserObject) => {
        const formattedProps = { ...updatedProps } as _UpdateUserPayload;
        if (updatedProps.lists) {
            await mutate(getListsUrl(), async () => updatedProps.lists, false);
            formattedProps.lists = updatedProps.lists
                .filter(t => t.type === 'default')
                .map(t => t._id);
        }
        await updateUser(formattedProps);
        await mutate(getProfileUrl());
        if (updatedProps.lists || updatedProps.customLists) {
            await mutate(getListsUrl());
        }
    }, []);
}

export default useModifyProfile;
