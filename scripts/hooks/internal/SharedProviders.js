import React from 'react';

import { ModalsProvider } from '@hooks/useHamburgerNav';
import { ProfileProvider } from '@hooks/useProfile';
import { ListsProvider } from '@hooks/useLists';
import { CompletedTasksProvider } from '@hooks/useCompletedTasks';

// Order matters for some of these!
const Providers = [
    ModalsProvider,
    ProfileProvider,
    ListsProvider,
    CompletedTasksProvider
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
