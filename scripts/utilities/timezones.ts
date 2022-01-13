import { getTimeZones, TimeZone } from '@vvo/tzdb';

export const timeZones = getTimeZones();

export function getTimeZone(timeZone: string): TimeZone {
    const value = timeZones.find(tz => {
        return timeZone === tz.name || tz.group.includes(timeZone);
    });
    return value || getTimeZone('America/Edmonton');
}
