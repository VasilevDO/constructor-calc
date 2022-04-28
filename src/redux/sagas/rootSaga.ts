import {fork} from 'redux-saga/effects';
import {concalcWatcher} from './concalc/concalcSagas';

function * rootSaga() {
	yield fork(concalcWatcher);
}

export default rootSaga;
