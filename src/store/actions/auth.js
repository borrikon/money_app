import axios from 'axios';
import {AUTH_SUCCESS, AUTH_LOGOUT, GET_USER_KEY} from '../actionsType'

export function auth(email, password, isLogin){
    return async dispatch => {
        const userData = {
            email,
            password,
            returnSecureToken: true
        }
        
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8RoDO3FJVkdkrK4gkuud435HEWQ76gfc";

        if(isLogin){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8RoDO3FJVkdkrK4gkuud435HEWQ76gfc"
        }
        
            const response = await axios.post(url, userData)
            const data = response.data

            const expiresData = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('idToken', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expiresData', expiresData)

            if(!isLogin){
                
                const userId = {[data.localId]: ""}
                const response = await axios.post('https://money-app-f9b14.firebaseio.com/user.json', userId);
                const userKey = response.data.name
                console.log(userKey)
                localStorage.setItem('userKey', userKey)
                dispatch(getUserKey(userKey))
            }
            const userKey = localStorage.getItem('userKey')
            dispatch(getUserKey(userKey))
            dispatch(authSuccess(data.idToken, data.localId))
            dispatch(autoLogaut(data.expiresIn))
            
    }
}
export function getUserKey(userKey){
    
    return{
        type: GET_USER_KEY,
        key: userKey 
    }
}

export function autoLogaut(time){
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
        }, time * 1000)
    }
}
export function logout(){
    localStorage.removeItem('idToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiresData')
    return{
        type: AUTH_LOGOUT
    }
}

export function authSuccess(token, localId){
    
    return{
        type: AUTH_SUCCESS,
        token,
        localId
    }
}