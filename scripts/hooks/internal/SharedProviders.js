import React from 'react';

import { ModalsProvider } from '../useHamburgerNav';
import { ProfileProvider } from '../useProfile';
import { ListsProvider } from '../useLists';
import { CompletedTasksProvider } from '../useCompletedTasks';
import { DarkModeProvider } from '@hooks/useDarkMode';

// Order matters for some of these!
const Providers = [
    ModalsProvider,
    ProfileProvider,
    ListsProvider,
    CompletedTasksProvider,
    DarkModeProvider
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
