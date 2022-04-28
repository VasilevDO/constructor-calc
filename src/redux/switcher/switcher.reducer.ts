import {PayloadAction} from '@reduxjs/toolkit';
import {SWITCHER_VALUE_CHANGE_S} from './switcher.type';

const initialValues = ['open', 'close'];
const startingValue = initialValues[0];

const init = {
	values: initialValues,
	currentValue: startingValue,
};

const switcherReducer = (state = init, action:PayloadAction<string>) => {
	switch (action.type) {
		case SWITCHER_VALUE_CHANGE_S:
			return {...state, currentValue: action.payload};
		// Case 'ADD_TODO':
		// 	return state.concat([action.text]);
		default:
			return state;
	}
};

export default switcherReducer;
