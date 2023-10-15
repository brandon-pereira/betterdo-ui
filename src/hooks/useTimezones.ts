import useLocalStorage from './useLocalStorage';
import useProfile from './useProfile';

import { getTimeZone } from '@utilities/timezones';

function useTimezones() {
    const { profile } = useProfile();
    const [dismissed, setDismissed] = useLocalStorage('banners.tz', false);
    const localTimeZone = getTimeZone(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    ).name;
    const serverTimeZone = profile?.timeZone;
    const isTimezoneChanged =
        !dismissed && serverTimeZone && localTimeZone !== serverTimeZone;

    return {
        isTimezoneChanged,
        setDismissed
    };
}

export default useTimezones;
