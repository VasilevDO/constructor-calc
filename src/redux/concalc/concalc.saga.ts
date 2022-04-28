import {put, takeEvery} from 'redux-saga/effects';
import {CONCALC_SWITCHER_STATE_CHANGE, CONCALC_SWITCHER_STATE_CHANGE_SUCCESS} from './concalc.type';
import {PayloadAction} from '@reduxjs/toolkit';

export function * switcherStateChange(action:PayloadAction<string>) {
	const {payload} = action;
	console.log(payload);
	yield put({
		type: CONCALC_SWITCHER_STATE_CHANGE_SUCCESS,
		payload,
	});
}

export function * concalcWatcher() {
	yield takeEvery(CONCALC_SWITCHER_STATE_CHANGE, switcherStateChange);
}
