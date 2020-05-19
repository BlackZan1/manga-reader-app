import React, { useEffect } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

import Login from './Login';
import useHTTP from '../../hooks/http.hook';
import { toggleIsAuthAction } from '../../redux/userReducer';

const LoginContainer = () => {
    let { httpRequest, error } = useHTTP();
    let dispatch = useDispatch();

    useEffect(() => {
        if(!!error) message.error(error);
    }, [error])

    const onSubmitHandler = ({ email, password }) => httpRequest('https://ani-ma-api.herokuapp.com/api/auth/login', 'POST', { email, password});
    const onSuccessSubmit = () => dispatch(toggleIsAuthAction(true));

    return <Login onSubmitHandler={onSubmitHandler} error={error} onSuccessSubmit={onSuccessSubmit} />
}

export default LoginContainer;