import { AUTH_SUCCESS, AUTH_LOGOUT, GET_USER_KEY } from "../actionsType"

const initialState = {
    token: null,
    login: null,
    userKey: null
}

export default function authReducer(state=initialState, action){
    switch (action.type){
        case AUTH_SUCCESS:
            return{
                ...state,
                token: action.token,
                login: action.localId
            }
        case AUTH_LOGOUT:
            return{
                ...state, token: null
            }
        case GET_USER_KEY:
            return{
                ...state, userKey: action.key
            }
        default: 
            return state
    }
}