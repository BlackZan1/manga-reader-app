import React, { useEffect, Fragment } from 'react';

import useHTTP from '../../hooks/http.hook';
import MangaList from './MangaList';
import usePaginate from '../../hooks/paginate.hook';
import { BigLoader } from '../Loader/Loader';

const MangaListContainer = () => {
    let { httpRequest, isFetching, toggleFetching } = useHTTP();
    let { paginate, setCurrentPage, pageData, data, page } = usePaginate(50);

    const changePage = (page) => {
        sessionStorage.setItem('ani.ma', `${page}`);

        setCurrentPage(page - 1);
    }

    useEffect(() => {
        let sData = sessionStorage.getItem('ani.ma');

        setCurrentPage(!!sData ? +sData - 1 : 0);
    }, [setCurrentPage])

    useEffect(() => {
        httpRequest('https://www.mangaeden.com/api/list/0?p=0&l=600').then(res => {
            paginate(res.manga);

            debugger;

            console.log(res.manga)

            toggleFetching(false);
        })
    }, [httpRequest, paginate, toggleFetching])

    return <Fragment>
        {
            isFetching ?
            <BigLoader />
            :
            <MangaList 
                data={pageData} 
                changePage={changePage}
                pagesLength={data.length}
                page={page}
            />
        }
    </Fragment>
}

export default MangaListContainer;