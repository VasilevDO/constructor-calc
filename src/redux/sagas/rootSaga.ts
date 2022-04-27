import {fork} from 'redux-saga/effects';
import {switcherSaga} from './concalc/concalcSagas';

function * rootSaga() {
	yield fork(switcherSaga);
}

export default rootSaga;
