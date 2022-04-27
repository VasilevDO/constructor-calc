import {Action} from 'redux';

const concalcReducer = (state = {}, action:Action) => {
	switch (action.type) {
		// Case 'ADD_TODO':
		// 	return state.concat([action.text]);
		default:
			return state;
	}
};

export default concalcReducer;
