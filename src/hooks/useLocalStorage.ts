import { useState, useEffect } from 'react';

/**
 * Syncs a state variable with localStorage under the given key.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => 
        {
            const json = localStorage.getItem(key);
            return json != null ? (JSON.parse(json) as T) : initialValue;
        }
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}