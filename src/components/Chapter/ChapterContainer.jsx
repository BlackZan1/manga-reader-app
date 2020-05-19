import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import useHTTP from '../../hooks/http.hook';
import { BigLoader } from '../Loader/Loader';
import Chapter from './Chapter';
import useChapters from '../../hooks/chapters.hook';
import { setItemChaptersAction } from '../../redux/chaptersReducer';
import { setItemWaitingListAction } from '../../redux/waitingListReducer';

const ChapterContainer = ({ chapterData, mangaName }) => {
    let [ data, setData ] = useState([]);
    let [ isFavourite, setIsFavourite] = useState(false);
    let [ inWaiting, setInWaiting] = useState(false);

    let { chapter, chapterPage, setPage } = useChapters(data);

    let { httpRequest, isFetching, toggleFetching } = useHTTP();

    let dispatch = useDispatch();

    let isAuth = useSelector(state => state.data.isAuth);
    let waitingList = useSelector(state => state.waiting.waitingList);
    let favouritesChapters = useSelector(state => state.chapters.favouritesChapters);

    const changePage = (page) => (page <= data.length) ? setPage(page - 1) : null;
    const onBack = chapterData.clickHandler;

    const addToFavouritesChapters = () => {
        if(!isAuth) {
            message.warning('You need authorization');

            return;
        }

        if(isFavourite) {
            message.loading('You already added');

            return;
        }

        let item = {
            id: chapterData.id,
            title: chapterData.name,
            mangaName,
            mangaId: chapterData.mangaId,
            num: chapterData.number
        }

        dispatch(setItemChaptersAction(item));

        message.success('Added to favourites');
    }

    const addToWaitingList = () => {
        if(!isAuth) {
            message.warning('You need authorization');

            return;
        }

        if(inWaiting) {
            message.loading('You already added');

            return;
        }

        let item = {
            id: chapterData.id,
            type: 'chapter',
            title: chapterData.name,
            mangaName,
            mangaId: chapterData.mangaId,
            num: chapterData.number
        }

        dispatch(setItemWaitingListAction(item));
    }
       

    useEffect(() => {
        httpRequest(`https://www.mangaeden.com/api/chapter/${chapterData.id}`).then(res => {
            setData(res.images.reverse());

            toggleFetching(false);
        })
    }, [httpRequest, chapterData, toggleFetching])

    useEffect(() => {
        if(waitingList) setInWaiting(waitingList.some(i => i.id === chapterData.id));
    }, [chapterData, waitingList])

    useEffect(() => {
        if(favouritesChapters) setIsFavourite(favouritesChapters.some(i => i === chapterData.id));
    }, [chapterData, favouritesChapters])

    return <Fragment>
        {
            isFetching ?
            <BigLoader />
            :
            <Chapter 
                data={chapter} 
                chapterPage={chapterPage}
                mangaName={mangaName} 
                chaptersLength={data.length}
                chapterName={chapterData.name} 
                chapterNumber={chapterData.number} 
                changePage={changePage}
                onBack={onBack}
                addToFavouritesChapters={addToFavouritesChapters}
                addToWaitingList={addToWaitingList}
                isFavourite={isFavourite}
                inWaiting={inWaiting}
            />
        }
    </Fragment>
}

export default ChapterContainer;