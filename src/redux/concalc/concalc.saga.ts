import {put, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';

import {CONCALC_COMPONENTS_AREA_SET, CONCALC_COMPONENTS_AREA_SET_S, CONCALC_CONSTRUCTOR_AREA_SET, CONCALC_CONSTRUCTOR_AREA_SET_S} from './concalc.type';

export function * setComponentsArea(action:PayloadAction<string[]>) {
	const {payload} = action;
	yield put({
		type: CONCALC_COMPONENTS_AREA_SET_S,
		payload,
	});
}

export function * setConstructorArea(action:PayloadAction<string[]>) {
	const {payload} = action;
	console.log(payload);
	yield put({
		type: CONCALC_CONSTRUCTOR_AREA_SET_S,
		payload,
	});
}

export function * concalcWatcher() {
	yield takeEvery(CONCALC_COMPONENTS_AREA_SET, setComponentsArea);
	yield takeEvery(CONCALC_CONSTRUCTOR_AREA_SET, setConstructorArea);
}
