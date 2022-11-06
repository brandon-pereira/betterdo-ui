import { useEffect, useCallback, useState } from 'react';

import createSharedHook from './internal/createSharedHook';

const localStorageKey = 'doesBetterDoPreferDarkMode';

function useDarkModeOnce(): [boolean, (bool: boolean) => void] {
    const [isOSinDarkMode, setOSinDarkMode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    const [doesUserPreferDarkMode, setUserDarkPreference] = useState(
        parseValue(localStorage.getItem(localStorageKey))
    );

    useEffect(() => {
        const matcher = window.matchMedia('(prefers-color-scheme: dark)');
        const fn = (e: MediaQueryListEvent) =>
            setOSinDarkMode(Boolean(e.matches));
        matcher.addEventListener('change', fn);
        return () => matcher.removeEventListener('change', fn);
    }, []);

    const shouldUseDarkMode =
        isOSinDarkMode && doesUserPreferDarkMode ? true : false;

    const setPrefersDarkMode = useCallback((bool: boolean) => {
        if (bool) {
            setUserDarkPreference(true);
            localStorage.setItem(localStorageKey, 'true');
        } else {
            setUserDarkPreference(false);
            localStorage.setItem(localStorageKey, 'false');
        }
    }, []);

    return [shouldUseDarkMode, setPrefersDarkMode];
}

function parseValue(val: string | null): boolean {
    if (val === 'true') return true;
    else if (val === 'false') return false;
    // if no pref set, assume dark mode enabled
    else return true;
}

const {
    Provider: DarkModeProvider,
    Context: DarkModeContext,
    useConsumer: useDarkMode
} = createSharedHook(useDarkModeOnce);

export { DarkModeContext, DarkModeProvider };
export default useDarkMode;
