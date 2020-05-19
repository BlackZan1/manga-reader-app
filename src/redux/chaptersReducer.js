const SET_DATA = 'chapters/SET_DATA',
SET_ITEM = 'chapters/SET_ITEM',
DELETE_ITEM = 'chapters/DELETE_ITEM',
TOGGLE_IS_UPDATING = 'chapters/TOGGLE_IS_UPDATING'

let inititalState = {
    favouritesChapters: [],
    isUpdating: false
}

const chaptersReducer = (state = inititalState, action) => {
    let newState = [];

    switch(action.type) {
        case SET_DATA: 
            return {
                ...state,
                favouritesChapters: action.data
            }
        case SET_ITEM:
            return {
                ...state,
                isUpdating: true,
                favouritesChapters: [
                    ...state.favouritesChapters,
                    action.item
                ]
            }
        case DELETE_ITEM:
            newState = state.favouritesChapters.filter(item => item.id !== action.itemId);

            return {
                ...state,
                isUpdating: true,
                favouritesChapters: [ ...newState ]
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

export const setChaptersDataAction = (data) => ({type: SET_DATA, data});
export const setItemChaptersAction = (item) => ({type: SET_ITEM, item});
export const deleteItemChaptersAction = (itemId) => ({ type: DELETE_ITEM, itemId });
export const toggleIsUpdating = (isUpdating) => ({ type: TOGGLE_IS_UPDATING, isUpdating })

export default chaptersReducer;