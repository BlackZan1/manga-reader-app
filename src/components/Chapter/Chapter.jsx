import React, { useState, Fragment } from 'react';
import { Pagination } from 'antd';
import { AiOutlineHeart, AiOutlineHistory } from 'react-icons/ai';

import Header from '../Header/Header';
import { SmallLoader } from '../Loader/Loader';

import './Chapter.scss';

const Chapter = ({ 
    data, 
    chaptersLength, 
    mangaName, 
    chapterPage, 
    chapterName, 
    chapterNumber, 
    changePage,
    onBack,
    isFavourite,
    inWaiting,
    addToWaitingList,
    addToFavouritesChapters
    }) => {    
    let [loading, setLoading] = useState(true);

    const onErrorHandler = (ev, imgUrl) => {
        ev.currentTarget.src = `https://cdn.mangaeden.com/mangasimg/600x/${imgUrl}`;
        // window.console.clear();
    }

    const onChangeHandler = (page) => {
        setLoading(true);
        changePage(page);
    }
    const onClickHandler = () => {
        setLoading(true);

        document.querySelector('.header').scrollIntoView({block: "center", behavior: "smooth"});

        changePage(chapterPage + 2);
    }

    const onLoadHandler = () => setLoading(false);

    const optionClick = (type, ev) => {
        ev.currentTarget.style.animation = 'bounce .8s ease';

        switch(type) {
            case 'chapter':
                return addToFavouritesChapters();

            case 'waitingList':
                return addToWaitingList();

            default:
                return;
        }
    }

    return (
        <div className='chapter-page'>
            <Header 
                title={mangaName} 
                subTitle={`${chapterName} № ${chapterNumber}`} 
                breadcrumbs={[]}
                onBack={onBack}  
            />

            <Pagination 
                current={chapterPage + 1}
                total={chaptersLength * 10} 
                onChange={onChangeHandler} 
                className='chapter-page-paginator'
            />

            <div className='options' style={{margin: '40px auto -10px', height: 50, width: 200, alignItems: 'center', justifyContent: 'center'}}>
                <button 
                    onClick={(ev) => optionClick('chapter', ev)}
                    style={{color: isFavourite ? '#e84e6a' : '#a9a9a9'}}
                >
                    <AiOutlineHeart />
                </button>

                <button 
                    onClick={(ev) => optionClick('waitingList', ev)}
                    style={{color: inWaiting ? '#e84e6a' : '#a9a9a9'}}
                >
                    <AiOutlineHistory />
                </button>
            </div>
        
            {
                !!data && <Fragment>
                    {
                        loading && <SmallLoader />
                    }

                    <img 
                        onLoad={onLoadHandler}
                        className='chapter-page-img' 
                        onClick={onClickHandler} 
                        onError={(ev) => onErrorHandler(ev, data[1])} 
                        src={data[1] && `https://cdn.mangaeden.com/mangasimg/${data[1]}`} 
                        alt="Loading..." 
                    />
                </Fragment>
            }
        </div>
    )
}

export default Chapter;