import {PayloadAction} from '@reduxjs/toolkit';

import {CONCALC_COMPONENTS_AREA_SET_S, CONCALC_CONSTRUCTOR_AREA_SET_S} from './concalc.type';

type concalcInitType= {
	componentsArea:string[],
	constructorArea:string[]
}

const init:concalcInitType = {
	componentsArea: [],
	constructorArea: [],
};

const concalcReducer = (state = init, action:PayloadAction<string[]>) => {
	switch (action.type) {
		case CONCALC_COMPONENTS_AREA_SET_S:
			console.log('1');
			return {...state, componentsArea: action.payload};
		case CONCALC_CONSTRUCTOR_AREA_SET_S:
			console.log('2');
			return {...state, constructorArea: action.payload};
		// Case 'ADD_TODO':
		// 	return state.concat([action.text]);
		default:
			return state;
	}
};

export default concalcReducer;
