import { useCallback } from "react"

export const useLocalStorage = (name) => {
    const set = useCallback((item) => {
        localStorage.setItem(name, JSON.stringify(item));
    }, [name])

    const get = useCallback(() => {
        return JSON.parse(localStorage.getItem(name) || '{}');
    }, [name])

    const remove = useCallback(() => {
        localStorage.removeItem(name);
    }, [name])

    return {
        set,
        get,
        remove
    }
}