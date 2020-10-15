import useSWR from 'swr';

import createSharedHook from './internal/createSharedHook';

function useProfileOnce() {
    const { data, error } = useSWR(`${process.env.SERVER_URL}/api/init`);

    return {
        error: error,
        loading: Boolean(!data),
        profile: data ? data.user : null
    };
}

const { Provider, Context, useConsumer: useProfile } = createSharedHook(
    useProfileOnce
);

export { Provider as ProfileProvider, Context as ProfileContext };
export default useProfile;
