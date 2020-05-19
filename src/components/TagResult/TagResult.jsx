import React, { useEffect, useState, Fragment } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Card, Tag, Divider, InputNumber } from 'antd';

import noImage from '../../img/no-image.png';
import { SearchLoader } from '../Loader/Loader';
import { tags } from '../MangaPage/MangaPage';
import MainHeaderContainer from '../Header/MainHeader/MainHeaderContainer';

import './TagResult.scss';

const TagResult = ({ 
    data, 
    limitQuery,
    changeLimitQuery, 
    isFetching, 
    tag 
}) => {
    let [limit, setLimit] = useState(limitQuery);
    let [tagColor, setTagColor] = useState('');

    const onErrorHandler = (ev, im) => {
        ev.currentTarget.src = `https://cdn.mangaeden.com/mangasimg/200x/${im}`;

        // console.clear();
    };

    useEffect(() => {
        setTagColor(tags[Math.round(Math.random() * tags.length)]);
    }, [])

    const onChangeHandler = (value) => setLimit(value);
    const onBlurHandler = () => changeLimitQuery(limit);

    return (
        <div className='tag-result-page'>
            <MainHeaderContainer />

            <div className='tag-results'>
                <div className='tag-results-options'>
                    Filter: &nbsp; 
                    <Tag color={tagColor} style={{fontSize: 22}}>{tag}</Tag> 
                    &nbsp; 
                    Limit: &nbsp;
                    <InputNumber 
                        style={{borderRadius: 5}}
                        min={1} 
                        max={150}
                        defaultValue={limit} 
                        onBlur={onBlurHandler}
                        onChange={onChangeHandler}          
                    />
                </div>

                {
                    isFetching ?
                    <SearchLoader /> 
                    :
                    <Fragment>
                        <Divider orientation={'left'} style={{ fontSize: '32px', fontFamily: 'Lobster, Arial, sans-serif' }}>
                            Results
                        </Divider>

                        <div className='main-list' style={{width: '100%'}}>
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
                                    No manga with <span style={{color: 'dodgerblue'}}>{tag}</span> tag
                                </h1>
                            }
                        </div>
                    </Fragment>
                }
            </div>
        </div>
    )
}

export default withRouter(TagResult);