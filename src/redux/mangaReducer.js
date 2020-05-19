const SET_DATA = 'manga/SET_DATA',
SET_ITEM = 'manga/SET_ITEM',
DELETE_ITEM = 'manga/DELETE_ITEM',
TOGGLE_IS_UPDATING = 'manga/TOGGLE_IS_UPDATING'

let inititalState = {
    favouritesManga: [],
    isUpdating: false
}

const mangaReducer = (state = inititalState, action) => {
    let newState = [];

    switch(action.type) {
        case SET_DATA: 
            return {
                ...state,
                favouritesManga: action.data
            }
        case SET_ITEM:
            return {
                ...state,
                isUpdating: true,
                favouritesManga: [
                    ...state.favouritesManga,
                    action.item
                ]
            }
        case DELETE_ITEM:
            newState = state.favouritesManga.filter(item => item.id !== action.itemId);

            return {
                ...state,
                isUpdating: true,
                favouritesManga: [ ...newState ]
            }
        case TOGGLE_IS_UPDATING:
            return {
                ...state,
                isUpdating: action.isUpdating
            }
        default:
            return state;
    }
}

export const setMangaDataAction = (data) => ({type: SET_DATA, data});
export const setItemMangaAction = (item) => ({type: SET_ITEM, item});
export const deleteItemMangaAction = (itemId) => ({ type: DELETE_ITEM, itemId });
export const toggleIsUpdating = (isUpdating) => ({ type: TOGGLE_IS_UPDATING, isUpdating })

export default mangaReducer;