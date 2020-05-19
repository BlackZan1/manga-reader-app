import React, { useEffect, Fragment, memo } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useHTTP from '../../hooks/http.hook';
import MangaPageContainer from '../MangaPage/MangaPageContainer';
import MangaListContainer from '../MangaList/MangaListContainer';
import HomeContainer from '../Home/HomeContainer';
import LoginContainer from '../Login/LoginContainer';
import SignUpContainer from '../SignUp/SignUpContainer';
import SearchContainer from '../Search/SearchContainer';
import TagResultContainer from '../TagResult/TagResultContainer';

import { toggleIsUpdating as setWaitingUpdating } from '../../redux/waitingListReducer';
import { toggleIsUpdating as setMangaUpdating } from '../../redux/mangaReducer';
import { toggleIsUpdating as setChaptersUpdating } from '../../redux/chaptersReducer';

const MainContainer = memo(({ isAuth }) => {
    let { httpRequest } = useHTTP();

    let waitingList = useSelector(state => state.waiting.waitingList);
    let favouritesManga = useSelector(state => state.manga.favouritesManga);
    let favouritesChapters = useSelector(state => state.chapters.favouritesChapters);
    let waitingListUpdating = useSelector(state => state.waiting.isUpdating);
    let mangaUpdating = useSelector(state => state.manga.isUpdating);
    let chaptersUpdating = useSelector(state => state.chapters.isUpdating);
    let token = useSelector(state => state.data.token);

    let dispatch = useDispatch();

    useEffect(() => {
        if(waitingList && isAuth && waitingListUpdating) {
            httpRequest('https://ani-ma-api.herokuapp.com/api/user/update', 'PUT', { waitingList }, { 'Authorization': `Bearer: ${token}` })
            .then(res => {
                console.log(res);

                dispatch(setWaitingUpdating(false));
            })
        }
    }, [waitingList, httpRequest, token, isAuth, waitingListUpdating, dispatch])

    useEffect(() => {
        if(favouritesManga && isAuth && mangaUpdating) {
            httpRequest('https://ani-ma-api.herokuapp.com/api/user/update', 'PUT', { favouritesManga }, { 'Authorization': `Bearer: ${token}` })
            .then(res => {
                console.log(res);

                dispatch(setMangaUpdating(false));
            })
        }
    }, [favouritesManga, httpRequest, token, isAuth, mangaUpdating, dispatch])

    useEffect(() => {
        if(favouritesChapters && isAuth && chaptersUpdating) {
            httpRequest('https://ani-ma-api.herokuapp.com/api/auth/user/update', 'PUT', { favouritesChapters }, { 'Authorization': `Bearer: ${token}` })
            .then(res => {
                console.log(res);

                dispatch(setChaptersUpdating(false));
            })
        }
    }, [favouritesChapters, httpRequest, token, isAuth, chaptersUpdating, dispatch])

    return (
        <div className="app">
            <Switch>
                <Route path={'/'} exact component={MangaListContainer} />
                <Route path={'/manga/:id?'} component={MangaPageContainer} />
                <Route path={'/home'} component={HomeContainer} />
                <Route path={'/search'} component={SearchContainer} />
                <Route path={'/tag/:tag?'} component={TagResultContainer} />

                {
                    !isAuth && <Fragment>
                        <Route path={'/login'} component={LoginContainer} />
                        <Route path={'/signup'} component={SignUpContainer} />
                    </Fragment>
                }
                
                <Redirect to={'/'} />
            </Switch>

            <footer></footer>
        </div>
    )
})

export default MainContainer;