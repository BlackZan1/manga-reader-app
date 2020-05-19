import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';

import Drawer from './Drawer';
import { deleteUserDataAction } from '../../../../redux/userReducer';
import { useLocalStorage } from '../../../../hooks/localStorage.hook';

const DrawerContainer = ({ isAuth, fadeDrop }) => {
    let dispatch = useDispatch();

    let { remove } = useLocalStorage('ani.ma_U');

    let { username } = useSelector(state => state.data);
    let waitingList = useSelector(state => state.waiting.waitingList);
    let favouritesChapters = useSelector(state => state.chapters.favouritesChapters);
    let favouritesManga = useSelector(state => state.manga.favouritesManga);

    const onClickHandler = () => {
        confirm({
            title: 'Do you want to log out?',
            style: {zIndex: 999999},
            maskStyle: {zIndex: 9999},
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dispatch(deleteUserDataAction());
                
                remove();
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }

    return <Drawer
        onClickHandler={onClickHandler}
        isAuth={isAuth} 
        fadeDrop={fadeDrop} 
        username={username}
        waitingList={waitingList}
        favouritesChapters={favouritesChapters}
        favouritesManga={favouritesManga}
    />
}

export default DrawerContainer;