import React, { memo } from 'react';
import { Avatar, Tabs, Collapse, Button, Card } from 'antd';
import { NavLink } from 'react-router-dom';

import MainHeaderContainer from '../Header/MainHeader/MainHeaderContainer';
import HomeMangaListContainer from './HomeMangaList/HomeMangaListContainer';
import HomeUser from './HomeUser/HomeUser';

import './Home.scss';
import '../Chapter/ChapterList/ChapterList.scss';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const Home = memo(({
    username,
    email,
    waitingList,
    favouritesChapters,
    deleteItemFromWaitingList,
    deteletItemFromFavouritesChapters
    }) => {    
    let chapterWaitingList = [...waitingList].filter(item => item.type === 'chapter');
    let mangaWaitingList = [...waitingList].filter(item => item.type === 'manga');

    const saveReadingHistory = (mangaId, id, title, mangaName, num) => {
        sessionStorage.setItem(`ani.ma_M:${mangaId}`, JSON.stringify({ mangaId, id, title, mangaName, num }));
    }

    return <div className='home'>
        <MainHeaderContainer />

        <HomeUser username={username} email={email} />

        <Tabs 
            defaultActiveKey="1" 
            className='home-tabs'
            onChange={() => console.log(1)}
            type={'card'}
            tabBarStyle={{color: 'deeppink', fontSize: '24px'}}
        >
            <TabPane tab="Favourite manga" key="1">
                <HomeMangaListContainer />
            </TabPane>
            <TabPane tab="Favourite chapters" key="2">
                <div className='chapters-list' style={{width: '100%'}} >
                    {
                        favouritesChapters.length ? favouritesChapters.map(item => {
                            return <Card
                                key={item.id}
                                style={{margin: '10px auto', borderRadius: '10px', boxShadow: '1px 1px 6px #dcdcdc'}}
                                className='chapter-list-item'
                                title={`${item.mangaName}. ${item.title}`} 
                                extra={
                                    <p style={{fontSize: 24, fontWeight: '500'}}>
                                        {`№ ${item.num}`}
                                    </p>
                                }
                                onClick={() => saveReadingHistory(
                                    item.mangaId, item.id, item.title, item.mangaName, item.num
                                )}
                            >   
                                <NavLink to={`/manga/${item.mangaId}`} style={{width: '100%'}}>
                                    <Button type={'ghost'} size={'middle'} style={{marginRight: '20px'}}>
                                        Read
                                    </Button>
                                </NavLink>


                                <Button size={'middle'} type={'ghost'} onClick={() => deteletItemFromFavouritesChapters(item.id)}>
                                    Delete
                                </Button>
                            </Card>
                        })
                        :
                        <p className='result-title'>Is empty here</p>
                    }
                </div>
            </TabPane>
            <TabPane tab="Waiting list" key="3">
                <Collapse defaultActiveKey={'1'} accordion style={{width: '90%', margin: '0 auto 30px', borderRadius: 5, fontSize: 20}}>
                    <Panel header="Manga" key="1">
                        {
                            mangaWaitingList.length ? mangaWaitingList.map(item => {
                                return <div className='home-tabs-waiting-item' key={item.id}> 
                                    <Avatar src={item.img} alt="..." size={64} />

                                    <p style={{fontWeight: 500}}>{item.title}</p>

                                    <div>
                                        <NavLink to={`/manga/${item.id}`}>
                                            <Button size={'large'} type={'ghost'}>
                                                Read
                                            </Button>
                                        </NavLink>

                                        <Button size={'large'} type={'ghost'}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            })
                            :
                            <p>Is empty here</p>
                        }
                    </Panel>

                    <Panel header="Chapters" key="2">
                        {
                            chapterWaitingList.length ? chapterWaitingList.map(item => {
                                return <div key={item.id} className='home-tabs-waiting-item' style={{justifyContent: 'space-between'}}>
                                    <p style={{fontSize: 18}}><span style={{fontWeight: 500}}>{ item.mangaName }</span>. {item.title}</p>

                                    <div>
                                        <NavLink to={`/manga/${item.mangaId}`}>
                                            <Button 
                                                size={'large'} 
                                                type={'ghost'} 
                                                onClick={() => saveReadingHistory(
                                                    item.mangaId, item.id, item.title, item.mangaName, item.num
                                                )}
                                            >
                                                Read
                                            </Button>
                                        </NavLink>

                                        <Button size={'large'} type={'ghost'} onClick={() => deleteItemFromWaitingList(item.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            })
                            :
                            <p>Is empty here</p>
                        }
                    </Panel>
                </Collapse>
            </TabPane>
        </Tabs>
    </div>
})

export default Home;