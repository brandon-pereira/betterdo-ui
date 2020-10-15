import React from 'react';

import { ModalsProvider } from '../useModals';
import { CurrentListProvider } from '../useCurrentList';
import { ProfileProvider } from '../useProfile';

// Order matters for some of these!
const Providers = [
    ModalsProvider,
    ProfileProvider,
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
