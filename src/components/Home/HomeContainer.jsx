import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Home from './Home';
import { deleteItemWaitingListAction } from '../../redux/waitingListReducer';
import { deleteItemChaptersAction } from '../../redux/chaptersReducer';

const HomeContainer = () => {
    let isAuth = useSelector(state => state.data.isAuth);
    let username = useSelector(state => state.data.username);
    let email = useSelector(state => state.data.email);
    let waitingList = useSelector(state => state.waiting.waitingList);
    let favouritesChapters = useSelector(state => state.chapters.favouritesChapters);

    let dispatch = useDispatch();

    const deleteItemFromWaitingList = (id) => dispatch(deleteItemWaitingListAction(id));
    const deteletItemFromFavouritesChapters = (id) => dispatch(deleteItemChaptersAction(id));

    return isAuth && email && username ? 
    <Home 
        username={username} 
        email={email}
        waitingList={waitingList}
        favouritesChapters={favouritesChapters}
        deleteItemFromWaitingList={deleteItemFromWaitingList}
        deteletItemFromFavouritesChapters={deteletItemFromFavouritesChapters}
    /> 
    :
    <Redirect to={'/'} />
}

export default HomeContainer;