import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Divider, Pagination } from 'antd';

import noImage from '../../img/no-image.png';
import MainHeaderContainer from '../Header/MainHeader/MainHeaderContainer';
import { BottomButton, UpButton } from '../ScrollButton/ScrollButton';

import './MangaList.scss';

const MangaList = ({ data, changePage, pagesLength, page }) => {
    const onChangeHandler = (page) => changePage(page);
    const onErrorHandler = (ev, im) => {
        ev.currentTarget.src = `https://cdn.mangaeden.com/mangasimg/200x/${im}`

        // console.clear();
    };
    
    return (
        <div className='main'>
            <MainHeaderContainer />

            <div className='main-top' style={{width: '85%', margin: '0 auto' }}>
                <Divider orientation={'left'} style={{ fontSize: '32px', fontFamily: 'Lobster, Arial, sans-serif' }}>
                    Manga list
                </Divider>

                <Pagination
                    className='main-pagination'
                    defaultCurrent={page + 1} 
                    total={pagesLength * 10} 
                    showSizeChanger={false}
                    onChange={onChangeHandler}
                />
            </div>

            <div className='main-list'>
                {
                    data.length ?
                    data.map(item => {
                        return <NavLink className='main-list-item' key={item.i} to={`/manga/${item.i}`}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img onError={(ev) => onErrorHandler(ev, item.im)} src={!!item.im ? `https://cdn.mangaeden.com/mangasimg/${item.im}` : noImage} width={300} alt={'loading...'} />}
                            >
                                <h3 style={{fontWeight: 500}}>{item.t}</h3>                    
                            </Card>
                        </NavLink>
                    })
                    :
                    <p>No manga</p>
                }
            </div>

            <BottomButton />

            <UpButton />
        </div>
    )
}

export default MangaList;