import React from 'react';

import BigLoaderGIF from '../../img/loader.gif';
import SmallLoaderGIF from '../../img/smallLoader.gif';

import './Loader.scss';

export const BigLoader = () => {
    return (
        <div className='big-loader'>
            <img src={BigLoaderGIF} alt="Loader..."/>
        </div>
    )
}

export const SmallLoader = () => {
    return (
        <div className='small-loader'>
            <img src={SmallLoaderGIF} alt="Loader..." />
        </div>
    )
}

export const SearchLoader = () => {
    return (
        <div className='search-loader'>
            <img src={BigLoaderGIF} alt="Loader..."/>
        </div>
    )
}