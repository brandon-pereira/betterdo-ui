import { useEffect, useCallback, useState } from 'react';
import createSharedHook from './internal/createSharedHook';

const localStorageKey = '_beta_doesBetterDoPreferDarkMode';

function useDarkModeOnce() {
    const [isOSinDarkMode, setOSinDarkMode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    const [doesUserPreferDarkMode, setUserDarkPreference] = useState(
        parseValue(localStorage.getItem(localStorageKey))
    );

    useEffect(() => {
        const matcher = window.matchMedia('(prefers-color-scheme: dark)');
        const fn = e => setOSinDarkMode(Boolean(e.matches));
        matcher.addEventListener('change', fn);
        return () => matcher.removeEventListener('change', fn);
    }, []);

    const shouldUseDarkMode =
        isOSinDarkMode && doesUserPreferDarkMode
            ? true
            : doesUserPreferDarkMode;
    const setPrefersDarkMode = useCallback(bool => {
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

function parseValue(val) {
    if (val === 'true') return true;
    else if (val === 'false') return false;
    else return;
}

const {
    Provider: DarkModeProvider,
    Context: DarkModeContext,
    useConsumer: useDarkMode
} = createSharedHook(useDarkModeOnce);

export { DarkModeContext, DarkModeProvider };
export default useDarkMode;
