import useSWR from 'swr';
import ms from 'ms.macro';

import createSharedHook from './internal/createSharedHook';
import { getProfileUrl } from './internal/urls';

function useProfileOnce() {
    const { data, error } = useSWR(getProfileUrl(), {
        dedupingInterval: ms('2hr')
    });

    return {
        error: error,
        loading: Boolean(!data),
        profile: data ? data : {}
    };
}

const { Provider, Context, useConsumer: useProfile } = createSharedHook(
    useProfileOnce
);

export { Provider as ProfileProvider, Context as ProfileContext };
export default useProfile;
