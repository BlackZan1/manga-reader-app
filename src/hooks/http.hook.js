import { useState, useCallback } from "react";

const useHTTP = () => {
    let [isFetching, setIsFetching] = useState(true);
    let [error, setError] = useState('');

    const toggleFetching = useCallback((isFetch) => setIsFetching(isFetch), [])

    const httpRequest = useCallback((url, method = 'GET', body = null, headers = {}) => {
        if(!!body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        setError('');
        setIsFetching(true);

        let fetchOptions = {
            headers,
            method
        }

        if(method !== 'GET') fetchOptions.body = body; 

        return fetch(url, {
            ...fetchOptions
        })
        .then(res => res.json())
        .then(res => {
            if(res.error) setError(res.error);

            return res;
        })
        .catch(err => {
            console.log(err);
            
            setError(err);
        })
    }, [])

    return {
        httpRequest,
        isFetching,
        error,
        toggleFetching
    }
}

export default useHTTP;