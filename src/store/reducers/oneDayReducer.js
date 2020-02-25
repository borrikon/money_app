import { GET_USER_COMPONENT, NEW_MONEY_MOVE, SET_CURRENT_DATA, SET_TOTAL_BALANCE, CHANGE_VALID_VALUE, INVALID_VALUE, DELETE_ITEM, DEFAULT } from "../actionsType"

const initialState = {
    catItem: [
        {
            name: 'Home',
            money: 0,
            type: 'costs', 
            value: ""
        },
        {
            name: 'Food',
            money: 0, 
            type: 'costs', 
            value: "" 
        },
        {
            name: 'Slary',
            money: 0, 
            type: 'income', 
            value: "" 
        }
    ],
    sumCosts: 0, 
    sumIncome: 0,
    date: ''
}

export function oneDayReducer(state = initialState, action){
    switch(action.type){
        case GET_USER_COMPONENT:
            return{
                ...state,
                catItem: action.payload
            }
        case NEW_MONEY_MOVE:
            return{
                ...state,
                catItem: action.payload
            }
        case SET_CURRENT_DATA:
            return{
                ...state,
                date: action.payload
            }
        case SET_TOTAL_BALANCE: 
            return{
                ...state,
                sumIncome: action.sumIncome,
                sumCosts: action.sumCosts
            }
        case CHANGE_VALID_VALUE:
            return{
                ...state,
                catItem: action.payload
            }
        case INVALID_VALUE: 
            return{
                ...state
            }
        case DELETE_ITEM:
            return{
                ...state,
                catItem: action.payload
            }
        case DEFAULT:
            return{
                ...state
            }
        default:
            return state
    }
}