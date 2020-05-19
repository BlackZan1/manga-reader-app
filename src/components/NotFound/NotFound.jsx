import React from 'react';
import { NavLink } from 'react-router-dom';

import _404ErrorImg from '../../img/404.png';

import './NotFound.scss';

const NotFound = () => {
    return (
        <div className='error-page'>
            <img src={_404ErrorImg} alt="404.error" />

            <h1>Hey! Don't worry! It's just a 404 error</h1>
            <NavLink to={'/'}>
                Click here to be with us again
            </NavLink>
        </div>
    )
}

export default NotFound;