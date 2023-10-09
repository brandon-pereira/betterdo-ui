import { useCallback, useState } from 'react';

export default function useLocalStorage<T>(
    key: string,
    defaultValue: T | null
) {
    const [_val, _setValue] = useState(
        getLocalStorageValue(key) || defaultValue
    );

    const setValue = useCallback(
        (value: T | null) => {
            _setValue(value);
            const parsed = formatValue(value);
            if (!parsed) {
                localStorage.removeItem(key);
                return;
            }
            localStorage.setItem(key, parsed);
        },
        [key]
    );

    return [_val, setValue] as const;
}

function parseValue<T>(val: string | null): T | null {
    if (!val) {
        return null;
    }
    try {
        return JSON.parse(val);
    } catch (err) {
        return null;
    }
}

function formatValue<T>(val: T | null): string | null {
    if (!val) {
        return null;
    }
    try {
        return JSON.stringify(val);
    } catch (err) {
        return null;
    }
}

function getLocalStorageValue(key: string) {
    return parseValue(localStorage.getItem(key));
}
