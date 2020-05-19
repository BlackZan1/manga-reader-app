import React, { useState } from 'react';

import useHTTP from '../../hooks/http.hook';
import Search from './Search';

const SearchContainer = () => {
    let { httpRequest, isFetching, toggleFetching } = useHTTP();
    let [data, setData] = useState([]);

    const searchHandler = (title) => {
        httpRequest(`https://ani-ma-api.herokuapp.com/api/search/${title}?limit=150`, 'GET').then(res => {
            setData(res.result);

            toggleFetching(false);
        })
    }

    return <Search searchHandler={searchHandler} data={data} isFetching={isFetching} />
}

export default SearchContainer;