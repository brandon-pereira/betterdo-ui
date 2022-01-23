import { useEffect, useState } from 'react';

import { QUERIES } from '../constants';

import createSharedHook from './internal/createSharedHook';

function useResponsive() {
    const initial = getActiveBreakpoints();
    const [screenSizes, setScreenSizes] = useState(initial);

    useEffect(() => {
        const handler = () => {
            const current = getActiveBreakpoints();
            setScreenSizes(current);
        };
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, [screenSizes.currentScreen]);

    return screenSizes;
}

/**
 * This function will return the current screen sizes.
 * Typically, use the hook 'useResponsive', however, if you need to access
 * the current breakpoint outside of React, you can call this function.
 *
 * This function returns an object with currentScreen (biggest size) and activeScreens which
 * resolves to an array of matching breakpoints.
 * @returns {Object}
 */
function getActiveBreakpoints() {
    const activeScreens = (
        Object.keys(QUERIES) as unknown as Array<keyof typeof QUERIES>
    ).filter(
        query =>
            window.matchMedia(QUERIES[query].replace('@media ', '')).matches
    );

    // current screen returns the exact screen size of window
    const currentScreen = activeScreens[0];

    return {
        currentScreen,
        activeScreens
    };
}

const { useConsumer, Provider } = createSharedHook(useResponsive);
export default useConsumer;
export { Provider as ResponsiveProvider };
