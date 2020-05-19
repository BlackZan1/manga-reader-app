import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import SignUp from './SignUp';
import useHTTP from '../../hooks/http.hook';

const SignUpContainer = () => {
    let { httpRequest, error } = useHTTP();
    let [registrationPassed, setRegistrationPassed] = useState(false);

    const onSubmitHandler = ({ email, password, username }) => httpRequest('https://ani-ma-api.herokuapp.com/api/auth/signup', 'POST', { email, password, username })
    const onSuccessSubmit = () => setRegistrationPassed(true);

    return registrationPassed ? <Redirect to={'/login'} /> : <SignUp onSubmitHandler={onSubmitHandler} onSuccessSubmit={onSuccessSubmit} error={error} />
}

export default SignUpContainer;