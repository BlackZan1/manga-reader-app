import React from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

import './ScrollButton.scss';

export const BottomButton = () => {
    const onClickHandler = () => {
        document.querySelector('footer').scrollIntoView({block: "center", behavior: "smooth"});
    }

    return (
        <div className='scroll-btn bottom' onClick={onClickHandler}>
            <AiOutlineDown size={55} />
        </div>
    )
}

export const UpButton = () => {
    const onClickHandler = () => {
        document.querySelector('.main-header').scrollIntoView({block: "center", behavior: "smooth"});
    }

    return (
        <div className='scroll-btn up' onClick={onClickHandler}>
            <AiOutlineUp size={55} />
        </div>
    )
}