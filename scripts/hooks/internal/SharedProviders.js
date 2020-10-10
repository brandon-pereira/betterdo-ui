import React from 'react';

import { ModalsProvider } from '../useModals';

// Order matters for some of these!
const Providers = [ModalsProvider].reverse();

function SharedProviders({ children }) {
    return React.cloneElement(
        Providers.reduce(
            (acc, provider) => React.createElement(provider, {}, acc),
            children
        )
    );
}

export default SharedProviders;
