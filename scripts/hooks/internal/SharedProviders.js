import React from 'react';

import { ModalsProvider } from '../useModals';
// import { CurrentListProvider } from '../useListDetails';
import { ProfileProvider } from '../useProfile';
import { ListsProvider } from '../useLists';
// import { CurrentTaskProvider } from '../useCurrentTask';

// Order matters for some of these!
const Providers = [
    ModalsProvider,
    ProfileProvider,
    ListsProvider
    // CurrentListProvider,
    // CurrentTaskProvider
].reverse();

function SharedProviders({ children }) {
    return React.cloneElement(
        Providers.reduce(
            (acc, provider) => React.createElement(provider, {}, acc),
            children
        )
    );
}

export default SharedProviders;
