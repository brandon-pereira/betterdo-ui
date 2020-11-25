import useSWR from 'swr';
import ms from 'ms.macro';

import createSharedHook from './internal/createSharedHook';

function useProfileOnce() {
    const { data, error } = useSWR(`${process.env.SERVER_URL}/api/user`, {
        dedupingInterval: ms('2hr')
    });

    return {
        error: error,
        loading: Boolean(!data),
        profile: data ? data : null
    };
}

const { Provider, Context, useConsumer: useProfile } = createSharedHook(
    useProfileOnce
);

export { Provider as ProfileProvider, Context as ProfileContext };
export default useProfile;
