import {combineReducers} from 'redux';
import allDaysReducer from './reducers/AllDaysreducer';
import authReducer from './reducers/auth';
import createItemReducer  from './reducers/creatorItem';
import { oneDayReducer } from './reducers/oneDayReducer';


export default combineReducers({
    allDaysTotal: allDaysReducer,
    auth: authReducer,
    wiCreator: createItemReducer,
    oneDay: oneDayReducer
})