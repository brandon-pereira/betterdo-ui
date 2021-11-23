import { getTimeZones } from '@vvo/tzdb';

export const timeZones = getTimeZones();

export function getTimeZone(timeZone: string) {
    const value = timeZones.find(tz => {
        return timeZone === tz.name || tz.group.includes(timeZone);
    });
    return value || 'America/Edmonton';
}
