import { createElement, cloneElement } from 'react';

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
    return cloneElement(
        Providers.reduce(
            (acc, provider) => createElement(provider, {}, acc),
            children
        )
    );
}

export default SharedProviders;
