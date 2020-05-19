import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import useHTTP from '../../hooks/http.hook';
import TagResult from './TagResult';

const TagResultContainer = ({ match: { params: { tag } } }) => {
    let { httpRequest, isFetching, toggleFetching } = useHTTP();
    let [data, setData] = useState([]);
    let [limitQuery, setLimitQuery] = useState(30);

    const changeLimitQuery = (value) => setLimitQuery(value);

    useEffect(() => {
        if(tag) {
            httpRequest(`https://ani-ma-api.herokuapp.com/api/tag/${tag}?limit=${limitQuery}`).then(res => {                
                if(!res) {
                    setData([]);

                    return;
                }
    
                setData(res.result);
                toggleFetching(false);
            })
        }
    }, [tag, httpRequest, toggleFetching, limitQuery])

    return <TagResult
        data={data} 
        limitQuery={limitQuery} 
        isFetching={isFetching}
        changeLimitQuery={changeLimitQuery} 
        tag={tag}
    />
}

export default withRouter(TagResultContainer);