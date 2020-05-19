import React, { Fragment, useState, useEffect } from 'react';
import { Input } from 'antd';

import HomeMangaItem from '../HomeMangaItem/HomeMangaItem';
import { AiOutlineRedo } from 'react-icons/ai';

const HomeMangaList = ({ favouritesManga, deleteItemFromState }) => {
    let [data, setData] = useState([]);
    let [tags, setTags] = useState([]);
    let [title, setTitle] = useState('');

    const onSearchHandler = (value) => {
        setTitle(value);

        let title = value.toLowerCase();
        let newData = [...favouritesManga].filter(item => item.title.trim().toLowerCase().includes(title));

        setData(newData);
    }

    const resetSearching = () => setTitle('');

    useEffect(() => {
        if(!title.length) setData(favouritesManga);
    }, [favouritesManga, title])

    return (
        <Fragment>
            <div className='home-tabs-form'>
                <Input
                    placeholder="Search in your favourites"
                    style={{ fontSize: 16, borderRadius: 5 }}
                    onChange={(ev) => onSearchHandler(ev.currentTarget.value)}
                    value={title}
                />
            </div>

            <div className='home-tabs-list'> 
                {
                    data.map(item => {
                        let { id, img, chapters, title } = item;

                        return <HomeMangaItem 
                            key={id} 
                            id={id} 
                            img={img} 
                            chapters={chapters} 
                            title={title} 
                            onClickHandler={deleteItemFromState} 
                        />
                    })
                }

                {
                    !data.length && title.length ? <p className='result-title'>No results</p> : null
                }

                {
                    !data.length && !title.length && <p className='result-title'>No manga</p> 
                }
            </div>

            {
                title.length ? <AiOutlineRedo size={48} className='reset-btn' onClick={() => resetSearching()} /> : null
            }
        </Fragment>
    )
}

export default HomeMangaList;