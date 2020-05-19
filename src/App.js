import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import useHTTP from './hooks/http.hook';
import { setUserDataAction, toggleIsAuthAction, deleteUserDataAction } from './redux/userReducer';
import { BigLoader } from './components/Loader/Loader';
import MainContainer from './components/Main/MainContainer';
import { setMangaDataAction } from './redux/mangaReducer';
import { setChaptersDataAction } from './redux/chaptersReducer';
import { setWaitingListDataAction } from './redux/waitingListReducer';
import { useLocalStorage } from './hooks/localStorage.hook';

import './App.scss';
import 'antd/dist/antd.css';

const App = () => {
  let { httpRequest, isFetching, toggleFetching } = useHTTP();
  let { get, remove } = useLocalStorage('ani.ma_U');
  let isAuth = useSelector(state => state.data.isAuth);
  let dispatch = useDispatch();

  useEffect(() => {
    let userToken = get();

    if(!!userToken.t) {
      httpRequest('https://ani-ma-api.herokuapp.com/api/user/me', 'GET', null, { 'Authorization': `Bearer: ${userToken.t}` }).then(res => {
        console.log(res);

        if(res.error && res.error.name === 'TokenExpiredError') {
          dispatch(toggleIsAuthAction(false));
          dispatch(deleteUserDataAction());

          toggleFetching(false);

          remove();

          return;
        }

        let { waitingList, favouritesManga, favouritesChapters, username, email } = res;

        dispatch(setUserDataAction({ username, email, token: userToken.t }));
        dispatch(setMangaDataAction(favouritesManga));
        dispatch(setChaptersDataAction(favouritesChapters));
        dispatch(setWaitingListDataAction(waitingList));
        dispatch(toggleIsAuthAction(true));
 
        if(isAuth) {  
          setTimeout(() => {
            message.success(`Welcome, ${res.username}`);
          }, 500)
        }

        toggleFetching(false);
      })
    }
    else toggleFetching(false);
  }, [httpRequest, dispatch, toggleFetching, isAuth, get, remove])

  return isFetching ? <BigLoader /> : <MainContainer isAuth={isAuth} />
}

export default App;
