import useSWR from 'swr';
import { useCallback } from 'react';

import User from '../../types/user';

import createSharedHook from './internal/createSharedHook';
import { getProfileUrl } from './internal/urls';

import { SERVER_URL } from '@utilities/env';

function useProfileOnce() {
    const { data, error } = useSWR<User>(getProfileUrl(), {
        dedupingInterval: 7200000 // 2hr
    });

    const logout = useCallback(() => {
        window.location.href = `${SERVER_URL}/auth/logout`;
    }, []);

    return {
        logout,
        error,
        loading: Boolean(!data),
        profile: data ? data : {}
    };
}

const {
    Provider,
    Context,
    useConsumer: useProfile
} = createSharedHook(useProfileOnce);

export { Provider as ProfileProvider, Context as ProfileContext };
export default useProfile;
