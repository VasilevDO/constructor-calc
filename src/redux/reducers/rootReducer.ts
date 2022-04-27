import {combineReducers} from 'redux';
import concalcReducer from './concalc/concalc';

const rootReducer = combineReducers({concalc: concalcReducer});

export default rootReducer;
