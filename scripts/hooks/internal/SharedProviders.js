import React from 'react';

import { ModalsProvider } from '../useHamburgerNav';
import { ProfileProvider } from '../useProfile';
import { ListsProvider } from '../useLists';

// Order matters for some of these!
const Providers = [ModalsProvider, ProfileProvider, ListsProvider].reverse();

function SharedProviders({ children }) {
    return React.cloneElement(
        Providers.reduce(
            (acc, provider) => React.createElement(provider, {}, acc),
            children
        )
    );
}

export default SharedProviders;
