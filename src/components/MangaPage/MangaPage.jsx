import React, { Fragment, useState, useEffect } from 'react';
import { Descriptions, Divider, Tag } from 'antd';
import { AiOutlineHeart, AiOutlineHistory, AiFillHeart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import noImage from '../../img/no-image.png';
import Header from '../Header/Header';
import ChapterList from '../Chapter/ChapterList/ChapterList';
import ChapterContainer from '../Chapter/ChapterContainer';

import './MangaPage.scss';

export let tags = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
];

const MangaPage = ({ 
    data, 
    addToFavouritesManga, 
    addToWaitingList, 
    isFavourite, 
    inWaiting, 
    chapterHistoryData, 
    mangaId 
    }) => {
    let [readingMode, setReadingMode] = useState(false);
    let [chapterData, setChapterData] = useState({
        id: '',
        name: '',
        number: 0,
        mangaId: mangaId
    });

    useEffect(() => {
        if(chapterHistoryData.id && !readingMode) {
            setReadingMode(true);
            setChapterData({
                id: chapterHistoryData.id,
                name: chapterHistoryData.title,
                number: chapterHistoryData.num,
                mangaId,
                mangaName: chapterHistoryData.mangaName,
                clickHandler: null
            });
        }
    }, [chapterHistoryData, chapterData, mangaId, readingMode])

    const onClickHandler = (id, chapterName, number) => {
        setReadingMode(true);
        setChapterData({
            mangaId,
            id,
            name: chapterName,
            number,
            clickHandler: () => setReadingMode(false)
        });
    }

    const resizeXImg = (ev) => {
        let topX = ev.currentTarget.height / 2;

        ev.currentTarget.style.top = `-${topX}px`;
    }

    const optionClick = (type, ev) => {
        ev.currentTarget.style.animation = 'tada .7s ease';

        ev.currentTarget.addEventListener('animationend', (e) => {
            e.currentTarget.style.animation = '';
        })

        switch(type) {
            case 'manga':
                return addToFavouritesManga();

            case 'waitingList':
                return addToWaitingList();

            default:
                return;
        }
    }

    return (
        <div className='page'>
            {
                !readingMode ?
                <Fragment>
                    <Header title={data.title} subTitle={data.author} />

                    <div className="page-bottom">
                        <div className='page-bottom-desc'>
                            <div className='page-bottom-title'>
                                <p>
                                    {
                                        data.title
                                    }
                                </p>

                                <div className='options'>
                                    <button 
                                        onClick={(ev) => optionClick('manga', ev)}
                                        style={{color: isFavourite ? '#e84e6a' : '#fff'}}
                                    >
                                        {
                                            isFavourite ?
                                            <AiFillHeart />
                                            :
                                            <AiOutlineHeart />
                                        }
                                    </button>

                                    <button 
                                        onClick={(ev) => optionClick('waitingList', ev)}
                                        style={{color: inWaiting ? '#e84e6a' : '#fff'}}
                                    >
                                        <AiOutlineHistory />
                                    </button>
                                </div>
                            </div>

                            {
                                !!data.description ?
                                <div dangerouslySetInnerHTML={{__html: data.description}} />
                                :
                                <div>No description</div>
                            }
                        </div>

                        <div className='page-bottom-info'>
                            <div>
                                <img 
                                    className='page-bottom-img' 
                                    src={
                                        !!data.image ? 
                                        `https://cdn.mangaeden.com/mangasimg/${data.image}` 
                                        : 
                                        noImage
                                    } 
                                    onLoad={resizeXImg}
                                    alt={`${data.title}...`} 
                                    width={300}
                                />
                            </div>

                            <div className='page-bottom-about'>
                                <Divider style={{fontSize: '2rem', color: '#fff', fontFamily: 'Lobster, Arial, sans-serif' }}>About</Divider>
                            </div>
                        
                            <Descriptions bordered style={{width: '80vw', margin: '0 0 0 5%'}}>
                                <Descriptions.Item span={3} label="Name">
                                    { 
                                        data.title 
                                    }
                                    &nbsp;

                                    {
                                        data.aka && <Fragment>
                                            (
                                                <span dangerouslySetInnerHTML={{__html: data.aka}} />
                                            )
                                        </Fragment>
                                    }
                                </Descriptions.Item>

                                <Descriptions.Item span={3} label="Author">
                                    { 
                                        !!data.author ? data.author : 'No author'
                                    }
                                </Descriptions.Item>

                                <Descriptions.Item span={3} label="Created at">
                                    {
                                        new Date(Math.floor(data.created * 1000)).toLocaleDateString()
                                    }
                                </Descriptions.Item>
                                
                                <Descriptions.Item span={3} label="Chapters">{ data.chapters_len }</Descriptions.Item>
                                
                                <Descriptions.Item span={3} label="Categories">
                                    {
                                        data.categories && 
                                        data.categories.map((category, index) => {
                                            return <NavLink to={`/tag/${category.toLowerCase()}`}>
                                                <Tag key={index} color={tags[index]}>{category}</Tag>
                                            </NavLink>
                                        })
                                    }
                                </Descriptions.Item>
                            </Descriptions>

                            {
                                data.chapters &&
                                <Fragment>
                                    {
                                        data.chapters.length ?
                                        <ChapterList onClickHandler={onClickHandler} chapters={data.chapters} />
                                        :
                                        null
                                    }
                                </Fragment>
                            }
                        </div>

                    </div>
                </Fragment>
                :
                <ChapterContainer 
                    chapterData={chapterData} 
                    mangaName={data.title}
                />
            }
        </div>
    )
}

export default MangaPage;