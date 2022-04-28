import {all, spawn} from 'redux-saga/effects';
import {concalcWatcher} from './concalc/concalc.saga';
import {switcherWatcher} from './switcher/switcher.saga';

function * rootSaga() {
	const sagas = [concalcWatcher, switcherWatcher];

	yield all(sagas.map(u => spawn(u)));
}

export default rootSaga;
