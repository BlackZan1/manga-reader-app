const SET_DATA = 'waiting/SET_DATA',
SET_ITEM = 'waiting/SET_ITEM',
DELETE_ITEM = 'waiting/DELETE_ITEM',
TOGGLE_IS_UPDATING = 'waiting/TOGGLE_IS_UPDATING'

let inititalState = {
    waitingList: [],
    isUpdating: false
}

const waitingListReducer = (state = inititalState, action) => {
    let newState = [];

    switch(action.type) {
        case SET_DATA: 
            return {
                ...state,
                waitingList: action.data
            }
        case SET_ITEM:
            return {
                ...state,
                isUpdating: true,
                waitingList: [
                    ...state.waitingList,
                    action.item
                ]
            }
        case DELETE_ITEM:
            newState = state.waitingList.filter(item => item.id !== action.itemId);

            return {
                ...state,
                isUpdating: true,
                waitingList: [ ...newState ]
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

export const setWaitingListDataAction = (data) => ({type: SET_DATA, data});
export const setItemWaitingListAction = (item) => ({type: SET_ITEM, item});
export const deleteItemWaitingListAction = (itemId) => ({ type: DELETE_ITEM, itemId });
export const toggleIsUpdating = (isUpdating) => ({ type: TOGGLE_IS_UPDATING, isUpdating })

export default waitingListReducer;