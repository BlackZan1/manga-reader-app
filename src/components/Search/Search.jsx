import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button, Card } from 'antd';
import { AiOutlineReload, AiOutlineSearch } from 'react-icons/ai';

import MainHeaderContainer from '../Header/MainHeader/MainHeaderContainer';
import { SearchLoader } from '../Loader/Loader';
import noImage from '../../img/no-image.png';

import './Search.scss';
import '../MangaList/MangaList.scss';

const Search = ({ searchHandler, isFetching, data }) => {
    let [title, setTitle] = useState('');

    const onChangeHandler = (ev) => {
        let { value } = ev.currentTarget;

        setTitle(value);
    }

    const resetTitle = () => setTitle('');
    const onKeyUpHandler = (ev) => {
        if(ev.key === 'Enter' && !title.trim().trim.length) {
            searchHandler(title.trim().toLowerCase().replace(/\s/g, ''));
        }
    }
    const onClickHandler = () => searchHandler(title.trim().toLowerCase().replace(/\s/g, ''));
    const onErrorHandler = (ev, im) => {
        ev.currentTarget.src = `https://cdn.mangaeden.com/mangasimg/200x/${im}`

        // console.clear();
    };

    return (
        <div className='search'>
            <MainHeaderContainer />

            <div className='search-form'>
                <Button 
                    size={'large'} 
                    shape="circle" 
                    className='search-btn'
                    icon={<AiOutlineSearch size={28} />} 
                    onClick={() => onClickHandler()}
                    disabled={!title.trim().length}
                />

                <Input
                    className='search-form-input'
                    placeholder="What do you want to find" 
                    onChange={onChangeHandler}
                    value={title}
                    onKeyUp={onKeyUpHandler}
                />

                <AiOutlineReload className='search-form-reset' size={32} onClick={resetTitle} />
            </div>

            <div className='main-list'>
                {
                    !!title.length ?
                    <Fragment>
                        {
                            isFetching ?
                            <SearchLoader />
                            :
                            <Fragment>
                                {
                                    !!data.length ?
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
                                    <h1 className='search-title'>
                                        No results
                                    </h1>
                                }
                            </Fragment>
                        }
                    </Fragment>
                    :
                    <h1 className='search-title'>
                        Find me a manga!
                        &nbsp;
                        <NavLink to={'/'} style={{fontFamily: 'Roboto, Arial'}}>
                            Go to serve in the main list
                        </NavLink>
                    </h1>
                }
            </div>
        </div>
    )
}

export default Search;