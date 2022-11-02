import { createElement, cloneElement } from 'react';

import { ResponsiveProvider } from '@hooks/useResponsive';
import { ModalsProvider } from '@hooks/useHamburgerNav';
import { ProfileProvider } from '@hooks/useProfile';
import { ListsProvider } from '@hooks/useLists';
import { CompletedTasksProvider } from '@hooks/useCompletedTasks';

// Order matters for some of these!
const Providers = [
    ResponsiveProvider,
    ModalsProvider,
    ProfileProvider,
    ListsProvider,
    CompletedTasksProvider
].reverse();

function SharedProviders({ children }: { children: React.ReactElement }) {
    return cloneElement(
        Providers.reduce(
            (acc, provider) => createElement(provider, null, acc),
            children
        )
    );
}

export default SharedProviders;
