const SET_DATA = 'user/SET_DATA',
TOGGLE_IS_AUTH = 'user/TOGGLE_IS_AUTH',
DELETE_DATA = 'user/DELETE_DATA'

let inititalState = {
    isAuth: false,
    username: '',
    token: '',
    email: ''
}

const userReducer = (state = inititalState, action) => {
    switch(action.type) {
        case SET_DATA: 
            return {
                ...state,
                username: action.data.username,
                token: action.data.token,
                email: action.data.email
            }
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }
        case DELETE_DATA:
            return {
                isAuth: false,
                username: '',
                token: '',
                email: ''
            }
        default:
            return state;
    }
}

export const toggleIsAuthAction = (isAuth) => ({type: TOGGLE_IS_AUTH, isAuth});
export const deleteUserDataAction = () => ({type: DELETE_DATA});
export const setUserDataAction = (data) => ({type: SET_DATA, data});

export default userReducer;