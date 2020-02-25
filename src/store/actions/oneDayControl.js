import axios from "axios"
import { GET_USER_COMPONENT,
         NEW_MONEY_MOVE, 
         SET_CURRENT_DATA, 
         SET_TOTAL_BALANCE, 
         CHANGE_VALID_VALUE, 
         INVALID_VALUE,
         DELETE_ITEM, 
         DEFAULT} from '../actionsType'

export function setItemsCollection(key, state){
    return async dispatch =>{

        const url = 'https://money-app-f9b14.firebaseio.com/user/' + key + '/items.json';
        const response = await axios.get(url)
        
        const data = response.data
        let customItems = []
        if(!response.data){
            return{
                type: DEFAULT
            }
        }
        // eslint-disable-next-line
        Object.keys(data).map((dataKey, i)=>{
            
            customItems.push(data[dataKey])
            customItems[i].firebaseKey = dataKey
        })
        
        const newItemCollection = customItems
        
        
        dispatch(getUserComponentsSuccess(newItemCollection))
    }
    
}

export function getUserComponentsSuccess(userItems){
    return{
        type: GET_USER_COMPONENT,
        payload: userItems
    }
}

function getCurrentDate(){
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const currentDate= day+'. '+(month+1)+'. '+year;
        return(
            currentDate
        )
    }

export function setCurrentDate(){
    const data = getCurrentDate()
    return{
        type: SET_CURRENT_DATA,
        payload: data
    }
}
export function setTotalBalance(props){
        let totalIncome = 0;
        let totalCosts = 0;
        props.catItem.map(item =>{
           return(  item.type === 'costs'
                  ? totalCosts+=item.money
                  : totalIncome+=item.money
                )
          })   
        return {
            type: SET_TOTAL_BALANCE,
            sumCosts: totalCosts,
            sumIncome: totalIncome
        }
}

export function newMoneyMove(e, value, id, catItem){
    e.preventDefault();
    const newMoneyArr = [ ...catItem ]
    newMoneyArr[id].money = +value + newMoneyArr[id].money
    newMoneyArr[id].value = ''
    return{
        type: NEW_MONEY_MOVE,
        payload: newMoneyArr
    }
}

export function preventInvalidValue(e, id, catItem){
        if(isNaN(e.target.value)){ 
            return {
                type: INVALID_VALUE
            }
        }
        else{ 
            const newCatItem = [ ...catItem ]
            newCatItem[id].value = e.target.value
            return{
                type: CHANGE_VALID_VALUE,
                payload: newCatItem
            }
        }
       
}
export function deleteItem(id, firebaseKey, catItem, key){
    console.log(id, firebaseKey, catItem, key)
    if(firebaseKey){
        return async dispatch => {
            const newArr = [...catItem];
            const url = 'https://money-app-f9b14.firebaseio.com/user/' + key + '/items/' + firebaseKey +'.json';

            axios.delete(url)
                 
               .then( () => {
                    newArr.splice(id, 1)
                    dispatch(refreshAfterDelete(newArr))
                })
                
                
        }
    }else{
        return {
            type: DEFAULT
        }
    }
}

export function refreshAfterDelete(newArr){
    return{
        type: DELETE_ITEM,
        payload: newArr
    }
}