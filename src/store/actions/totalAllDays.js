import { FETCH_DAYS_START, FETCH_DAYS_SUCCESS, FETCH_DAYS_ERROR, GET_TOTAL_ALL_DAYS, REFRESH_ALL_DAYS } from "../actionsType";
import axios from "axios";

export function fetchDays(key, id){
    return async dispatch => {
    try{
        dispatch(fetchDaysStart())
        const urlDays = `https://money-app-f9b14.firebaseio.com/user/` + key + `/`+ id + `.json`
        const respons = await axios.get(urlDays)
            let allDays = [];
             // eslint-disable-next-line
           Object.keys(respons.data).map((item, index) => {
            allDays.push(respons.data[item])
            allDays[index].push(item)
           })
           if(respons !== null){
              dispatch(fetchDaysSuccess(allDays))
              dispatch(getTotalAllDays(allDays))
           }
       } catch(e){
        dispatch(fetchDaysError(e))
       }    
    }
}
export function fetchDaysStart(){
    return{
        type: FETCH_DAYS_START,
        loading: true
    }
}
export function fetchDaysSuccess(allDays){
    return{
        type: FETCH_DAYS_SUCCESS,
        allDays
    }
}
export function fetchDaysError(e){
    return{
        type: FETCH_DAYS_ERROR,
        error: e
    }
}
export function getTotalAllDays(allDays){
       return async (dispatch) =>{  
        let totalBalace =0;
        let totalCosts =0;
        let totalIncome =0;
        allDays.forEach(item => {
                totalCosts += item[0];
                totalIncome += item[1];
           })
        totalBalace = (totalIncome - totalCosts);
        dispatch(setTotalValues(totalBalace, totalCosts, totalIncome))
       }
}
export function setTotalValues(totalBalace, totalCosts, totalIncome){
    return{
        type: GET_TOTAL_ALL_DAYS,
        totalBalace,
        totalCosts,
        totalIncome
    }
}
export function deleteOneDay(i, allDaysArr, key, id){
    console.log('key', key, 'id', id )
    console.log('allDays', allDaysArr[i][3])
   return async dispatch => {
        const newArr = [...allDaysArr];
        const url = 'https://money-app-f9b14.firebaseio.com/user/'+ key + '/' + id +  `/${allDaysArr[i][3]}.json`
           axios.delete(url)
           .then( () => {
                newArr.splice(i, 1)
               dispatch(refreshAllDays(newArr))
            })
            .then(()=>{
                dispatch(getTotalAllDays(newArr))
            })
    }
}
export function refreshAllDays(newDays){
    return{
        type: REFRESH_ALL_DAYS,
        newDays
    }
}