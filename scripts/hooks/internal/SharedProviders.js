import React from 'react';

import { ModalsProvider } from '../useModals';
import { CurrentListProvider } from '../useCurrentList';
import { ProfileProvider } from '../useProfile';
import { ListsProvider } from '../useLists';

// Order matters for some of these!
const Providers = [
    ModalsProvider,
    ProfileProvider,
    ListsProvider,
    CurrentListProvider
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
