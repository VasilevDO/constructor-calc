import {put, takeEvery} from 'redux-saga/effects';

import {PayloadAction} from '@reduxjs/toolkit';
import {SWITCHER_VALUE_CHANGE, SWITCHER_VALUE_CHANGE_S} from './switcher.type';

export function * switcherStateChange(action:PayloadAction<string>) {
	const {payload} = action;
	yield put({
		type: SWITCHER_VALUE_CHANGE_S,
		payload,
	});
}

export function * switcherWatcher() {
	yield takeEvery(SWITCHER_VALUE_CHANGE, switcherStateChange);
}
