import {PayloadAction} from '@reduxjs/toolkit';
import DraggableItem from '../../models/DraggableItem.model';

import {CONCALC_SWITCHER_STATE_CHANGE_SUCCESS} from './concalc.type';

type concalcInitType= {
	components:DraggableItem[]
}

const init:concalcInitType = {
	components: [],
};

const concalcReducer = (state = init, action:PayloadAction<string>) => {
	switch (action.type) {
		case CONCALC_SWITCHER_STATE_CHANGE_SUCCESS:
			return {...state, switcherValue: action.payload};
		// Case 'ADD_TODO':
		// 	return state.concat([action.text]);
		default:
			return state;
	}
};

export default concalcReducer;
