import { useState } from 'react';

import createSharedHook from './internal/createSharedHook';

function useHamburgerNavOnce() {
    return useState(false);
}

const {
    Provider: ModalsProvider,
    Context: ModalsContext,
    useConsumer: useHamburgerNav
} = createSharedHook(useHamburgerNavOnce);

export { ModalsContext, ModalsProvider };
export default useHamburgerNav;
