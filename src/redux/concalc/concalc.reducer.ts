import MathOperator from '../../models/MathOperator.model';
import {ConcalcActionTypes} from './concalc.type';

interface ScreenSetAction {
	type:ConcalcActionTypes.CONCALC_SCREEN_SET_S,
	payload:string
}

interface ComponentsSetAction {
	type:ConcalcActionTypes.CONCALC_COMPONENTS_AREA_SET_S,
	payload:string[]
}

interface ConstructorSetAction {
	type:ConcalcActionTypes.CONCALC_CONSTRUCTOR_AREA_SET_S,
	payload:string[]
}

interface StoreNumberAction {
	type:ConcalcActionTypes.CONCALC_STORE_NUMBER_S,
	payload:number
}

interface StoreOperatorAction {
	type:ConcalcActionTypes.CONCALC_STORE_OPERATOR_S,
	payload:MathOperator
}

type ConcalcAction = ScreenSetAction|ComponentsSetAction|ConstructorSetAction|StoreNumberAction|StoreOperatorAction;

export interface ConcalcState {
	componentsArea:string[];
	constructorArea:string[];
	storedNumber:number;
	storedOperator:MathOperator;
	screen:string;
	screenCharsMax:number;
}

const init:ConcalcState = {
	componentsArea: [],
	constructorArea: [],
	screen: '0',
	screenCharsMax: 10,
	storedNumber: null,
	storedOperator: null,
};

const concalcReducer = (state = init, action:ConcalcAction) => {
	switch (action.type) {
		case ConcalcActionTypes.CONCALC_COMPONENTS_AREA_SET_S:
			return {...state, componentsArea: action.payload};
		case ConcalcActionTypes.CONCALC_CONSTRUCTOR_AREA_SET_S:
			return {...state, constructorArea: action.payload};
		case ConcalcActionTypes.CONCALC_SCREEN_SET_S:
			return {...state, screen: action.payload};
		case ConcalcActionTypes.CONCALC_STORE_NUMBER_S:
			return {...state, storedNumber: action.payload};
		case ConcalcActionTypes.CONCALC_STORE_OPERATOR_S:
			return {...state, storedOperator: action.payload};
		// Case 'ADD_TODO':
		// 	return state.concat([action.text]);
		default:
			return state;
	}
};

export default concalcReducer;
