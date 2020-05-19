import React, { useEffect, Fragment, useState } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import useHTTP from '../../hooks/http.hook';
import MangaPage from './MangaPage';
import { BigLoader } from '../Loader/Loader';
import { deleteItemMangaAction, setItemMangaAction } from '../../redux/mangaReducer';
import { deleteItemWaitingListAction, setItemWaitingListAction } from '../../redux/waitingListReducer';
import NotFound from '../NotFound/NotFound';

const MangaPageContainer = ({ match: { params: { id } } }) => {
    let { httpRequest, isFetching, toggleFetching } = useHTTP();

    let [chapterHistoryData, setChapterHistoryData] = useState({});
    let [data, setData] = useState({});
    let [isFavourite, setIsFavourite] = useState(false);
    let [inWaiting, setInWaiting] = useState(false);

    let waitingList = useSelector(state => state.waiting.waitingList);
    let favouritesManga = useSelector(state => state.manga.favouritesManga);
    let isAuth = useSelector(state => state.data.isAuth);

    let dispatch = useDispatch();

    useEffect(() => {
        let historyData = JSON.parse(sessionStorage.getItem(`ani.ma_M:${id}`));

        if(!!historyData) {
            setChapterHistoryData(historyData);

            sessionStorage.removeItem(`ani.ma_M:${id}`);
        }
        else setChapterHistoryData({});
    }, [id])

    useEffect(() => {
        if(id.length) {
            httpRequest(`https://www.mangaeden.com/api/manga/${id}`)
            .then(res => {
                setData(res);
                toggleFetching(false);
            })
        }
    }, [httpRequest, id, toggleFetching])

    useEffect(() => {
        if(waitingList) setInWaiting(waitingList.some(i => i.id === id));
    }, [id, waitingList])

    useEffect(() => {
        if(favouritesManga) setIsFavourite(favouritesManga.some(i => i.id === id));
    }, [id, favouritesManga])

    const addToFavouritesManga = () => {
        if(!isAuth) {
            message.warning('You need authorization');

            return;
        }

        if(isFavourite) {
            message.success('Removed from favourites');

            dispatch(deleteItemMangaAction(id));

            return;
        }

        let item = {
            id,
            img: `https://cdn.mangaeden.com/mangasimg/${data.image}`,
            title: data.title,
            chapters: data.chapters.length
        }

        dispatch(setItemMangaAction(item));

        message.success('Added to favourites');
    }

    const addToWaitingList = () => {
        if(!isAuth) {
            message.warning('You need authorization');

            return;
        }

        if(inWaiting) {
            message.success('Removed from waiting list');

            dispatch(deleteItemWaitingListAction(id));

            return;
        }

        let item = {
            id,
            img: `https://cdn.mangaeden.com/mangasimg/${data.image}`,
            title: data.title,
            chapters: data.chapters.length,
            type: 'manga',
            tags: data.categories
        }

        dispatch(setItemWaitingListAction(item));

        message.success('Added to waiting list');
    }

    return <Fragment>
        {
            isFetching ?
            <BigLoader />
            :
            (
                !data ?
                <NotFound />
                :
                <MangaPage 
                    addToFavouritesManga={addToFavouritesManga}
                    data={data} 
                    addToWaitingList={addToWaitingList}
                    isFavourite={isFavourite}
                    inWaiting={inWaiting}
                    chapterHistoryData={chapterHistoryData}
                    mangaId={id}
                />
            )
        }
    </Fragment>
}

export default withRouter(MangaPageContainer);