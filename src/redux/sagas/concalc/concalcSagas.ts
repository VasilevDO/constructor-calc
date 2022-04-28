import {put, takeEvery, take} from 'redux-saga/effects';
import {CONCALC_SWITCHER_STATE_CHANGE} from '../../types';
import {createAction, PayloadAction} from '@reduxjs/toolkit';

export function * switcherStateChange(action:PayloadAction<number>) {
	const {payload} = action;
	console.log(payload);
	yield put(action);
}

export function * concalcWatcher() {
	yield takeEvery(CONCALC_SWITCHER_STATE_CHANGE, switcherStateChange);
}
