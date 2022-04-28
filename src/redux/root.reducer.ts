import {combineReducers} from 'redux';
import concalcReducer from './concalc/concalc.reducer';
import switcherReducer from './switcher/switcher.reducer';

const rootReducer = combineReducers({concalc: concalcReducer, switcher: switcherReducer});

export default rootReducer;
