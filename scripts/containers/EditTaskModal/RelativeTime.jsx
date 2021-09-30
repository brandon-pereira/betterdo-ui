import React, { useState, useEffect } from 'react';

const units = [
    { unit: 'year', ms: 31536000000 },
    { unit: 'month', ms: 2628000000 },
    { unit: 'day', ms: 86400000 },
    { unit: 'hour', ms: 3600000 },
    { unit: 'minute', ms: 60000 }
];
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export default function RelativeTime({ date }) {
    const [relativeTime, setRelativeTime] = useState(
        relativeTimeFromDates(date)
    );
    useEffect(() => {
        // immediately call for side effects in date prop changing
        setRelativeTime(relativeTimeFromDates(date));
        setInterval(() => {
            setRelativeTime(relativeTimeFromDates(date));
        }, 30000); // 30s
    }, [date]);
    return <>{relativeTime}</>;
}

/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param pivot     - the dateTime of reference, generally is the current time
 */
export function relativeTimeFromDates(relative, pivot = new Date()) {
    if (!relative) return '';
    const elapsed = relative.getTime() - pivot.getTime();
    return relativeTimeFromElapsed(elapsed);
}

/**
 * Get language-sensitive relative time message from elapsed time.
 * @param elapsed   - the elapsed time in milliseconds
 */
export function relativeTimeFromElapsed(elapsed) {
    for (const { unit, ms } of units) {
        if (Math.abs(elapsed) >= ms) {
            return rtf.format(Math.round(elapsed / ms), unit);
        }
    }
    return 'a few seconds ago';
}
