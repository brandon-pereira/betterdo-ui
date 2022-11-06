import { useState, useEffect } from 'react';
import { formatRelative } from 'date-fns';

export default function RelativeTime({ date }: { date: Date }) {
    const [relativeTime, setRelativeTime] = useState(
        relativeTimeFromDates(date)
    );
    useEffect(() => {
        // immediately call for side effects in date prop changing
        setRelativeTime(relativeTimeFromDates(date));
        const interval = setInterval(() => {
            setRelativeTime(relativeTimeFromDates(date));
        }, 30000); // 30s
        return () => clearInterval(interval);
    }, [date]);
    return <>{relativeTime}</>;
}

/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param pivot     - the dateTime of reference, generally is the current time
 */
function relativeTimeFromDates(relative: Date, pivot = new Date()) {
    if (!relative) return '';
    return formatRelative(relative, pivot);
}
