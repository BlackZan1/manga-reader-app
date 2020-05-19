import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import HomeMangaList from './HomeMangaList';
import { deleteItemMangaAction } from '../../../redux/mangaReducer';

const HomeMangaListContainer = memo(() => {
    let favouritesManga = useSelector(state => state.manga.favouritesManga);
    let dispatch = useDispatch();

    const deleteItemFromState = (id) => {
        dispatch(deleteItemMangaAction(id));

        message.success('Success deleted');
    }

    return <HomeMangaList favouritesManga={favouritesManga} deleteItemFromState={deleteItemFromState} />
})

export default HomeMangaListContainer;