import { FETCH_DAYS_START, FETCH_DAYS_SUCCESS, FETCH_DAYS_ERROR, GET_TOTAL_ALL_DAYS, REFRESH_ALL_DAYS } from "../actionsType";

const initialState = {
        allDays: [],
        totalIncome: 0,
        totalCosts: 0,
        totalBalace: 0,
        loading: false,
        error: null
    }
    
    const allDaysReducer = (state = initialState, action)=>{
        switch (action.type){
            case FETCH_DAYS_START:
                return{
                    ...state, loading: true
                }
            case FETCH_DAYS_SUCCESS:
                return{
                    ...state,
                    allDays: action.allDays,
                    loading: false
                }
            case FETCH_DAYS_ERROR:
                return{
                    ...state,
                    error: action.error
                }
            case GET_TOTAL_ALL_DAYS:
                return{
                    ...state,
                    totalBalace: action.totalBalace,
                    totalCosts: action.totalCosts,
                    totalIncome: action.totalIncome
                }
            case REFRESH_ALL_DAYS:
                return{
                    ...state,
                    allDays: action.newDays
                }
            default: 
                return state
        }
    }
    export default allDaysReducer;