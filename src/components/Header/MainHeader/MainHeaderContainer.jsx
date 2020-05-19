import React from 'react';
import { useSelector } from 'react-redux';

import MainHeader from './MainHeader';

const MainHeaderContainer = () => {
    let isAuth = useSelector(state => state.data.isAuth);

    return <MainHeader isAuth={isAuth} />
}

export default MainHeaderContainer;