import React from 'react';
import { Badge, Button } from 'antd';
import { NavLink } from 'react-router-dom';

import './HomeMangaItem.scss';

const HomeMangaItem = ({ id, img, chapters, title, onClickHandler }) => {
    const onHoverHandler = (ev) => ev.currentTarget.classList.add('active');
    const onLeaveHandler = (ev) => ev.currentTarget.classList.remove('active');

    const onErrorHandler = (ev) => {
        ev.currentTarget.src = `https://cdn.mangaeden.com/mangasimg/200x/${img}`

        // console.clear();
    };

    return (
        <Badge overflowCount={101}>
            <div className='home-tab-item' onMouseEnter={onHoverHandler} onMouseLeave={onLeaveHandler}>
                <img src={img} alt="Loading..." onError={onErrorHandler} />

                <h1>
                    { title }
                </h1>

                <div className='home-tab-item-abs'>
                    <p>Chapters: {chapters}</p>

                    <NavLink to={`/manga/${id}`}>
                        <Button size={'large'} type={'ghost'}>
                            Read
                        </Button>
                    </NavLink>

                    <Button size={'large'} type={'ghost'} onClick={() => onClickHandler(id)}>
                        Delete
                    </Button>
                </div>
            </div>
        </Badge>
    )
}

export default HomeMangaItem;