import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import MainHeaderMenu from './MainHeaderMenu';
import { deleteUserDataAction } from '../../../../redux/userReducer';

const { confirm } = Modal;

const MainHeaderMenuContainer = () => {
    let { username, email } = useSelector(state => state.data);
    let waitingList = useSelector(state => state.waiting.waitingList);
    let favouritesChapters = useSelector(state => state.chapters.favouritesChapters);
    let favouritesManga = useSelector(state => state.manga.favouritesManga);

    let dispatch = useDispatch();

    const onClickHandler = () => {
        confirm({
            title: 'Do you want to log out?',
            style: {zIndex: 999999},
            maskStyle: {zIndex: 9999},
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dispatch(deleteUserDataAction());
                
                sessionStorage.removeItem('ani.ma_U');
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }

    return <MainHeaderMenu 
        username={username} 
        email={email} 
        favouritesManga={favouritesManga} 
        favouritesChapters={favouritesChapters} 
        waitingList={waitingList}
        onClickHandler={onClickHandler}
    />
}

export default MainHeaderMenuContainer;