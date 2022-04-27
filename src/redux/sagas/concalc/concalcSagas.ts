import {takeEvery} from 'redux-saga/effects';

export function * workerSaga() {
	console.log('worker');
}

export function * switcherSaga() {
	yield takeEvery('CLICK', workerSaga);
}
