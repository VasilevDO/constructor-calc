import {put, select, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {ConcalcActionTypes} from './concalc.type';
import store, {RootState} from '../store';
import {ConcalcState} from './concalc.reducer';
import MathOperator from '../../models/MathOperator.model';

const getScreenValue = () => {
	const state = store.getState().concalc;
	const {screen} = state;
	return Number(screen.replace(/,/g, '.'));
};

const cut = (val:number) => {
	const state = store.getState().concalc;
	const {screenCharsMax} = state;

	if (String(val).length > screenCharsMax) {
		if (val % 1) {
			const [charsBeforeDot, charsAfterDot] = String(val).split('.');
			if (charsBeforeDot.length <= screenCharsMax - 2) {
				const fixedVal = val.toFixed(screenCharsMax - charsBeforeDot.length - 1);
				if (Number(fixedVal) !== 0) {
					return Number(fixedVal.replace(/0+$/, ''));
				}
			}
		}

		const offset = val.toExponential(1).match(/(?<=e[+-])\d+/)[0].length;
		const fractionDigits = screenCharsMax - 4 - offset;
		return val.toExponential(fractionDigits);
	}

	return val;
};

const calculate = () => {
	const state = store.getState().concalc;
	const {storedNumber, storedOperator} = state;
	const {fn} = storedOperator;

	const a = storedNumber;
	const b = getScreenValue();
	console.log(a);
	console.log(b);

	const res = fn(a, b);
	if (isNaN(res)) {
		throw new Error('calculation failed');
	}

	console.log(res);

	return res;
};

const filterScreen = (str:string) => {
	const trimmedZeroes = str.replace(/^0(?!,)/g, '');
	return trimmedZeroes.replace(/[^0-9,]/g, '');
};

export function * setComponentsArea(action:PayloadAction<string[]>) {
	const {payload} = action;
	yield put({
		type: ConcalcActionTypes.CONCALC_COMPONENTS_AREA_SET_S,
		payload,
	});
}

export function * setConstructorArea(action:PayloadAction<string[]>) {
	const {payload} = action;
	yield put({
		type: ConcalcActionTypes.CONCALC_CONSTRUCTOR_AREA_SET_S,
		payload,
	});
}

export function * setScreenValue(action:PayloadAction<string>) {
	const {payload} = action;
	yield put({
		type: ConcalcActionTypes.CONCALC_SCREEN_SET_S,
		payload,
	});
}

export function * storeNumber(action:PayloadAction<string>) {
	const payload = Number(action.payload);
	yield put({
		type: ConcalcActionTypes.CONCALC_STORE_NUMBER_S,
		payload,
	});
}

export function * reset() {
	yield put({
		type: ConcalcActionTypes.CONCALC_STORE_OPERATOR,
		payload: null,
	});
	yield put({
		type: ConcalcActionTypes.CONCALC_STORE_NUMBER_S,
		payload: null,
	});
	yield put({
		type: ConcalcActionTypes.CONCALC_SCREEN_SET_S,
		payload: 0,
	});
}

export function * storeOperator(action:PayloadAction<string>) {
	const {payload} = action;
	yield put({
		type: ConcalcActionTypes.CONCALC_STORE_OPERATOR_S,
		payload,
	});
}

export function * resolve() {
	try {
		const state:ConcalcState = yield select((state:RootState) => state.concalc);

		const {storedOperator} = state;

		if (!storedOperator) {
			return;
		}

		const calculatedValue = cut(calculate());

		yield put({
			type: ConcalcActionTypes.CONCALC_STORE_OPERATOR,
			payload: null,
		});
		yield put({
			type: ConcalcActionTypes.CONCALC_STORE_NUMBER_S,
			payload: null,
		});
		yield put({
			type: ConcalcActionTypes.CONCALC_SCREEN_SET_S,
			payload: calculatedValue,
		});
	} catch (e) {
		console.log(e);
		yield reset();
	}
}

export function * handleOperatorAction(action:PayloadAction<MathOperator>) {
	try {
		const {payload} = action;
		const state:ConcalcState = yield select((state:RootState) => state.concalc);
		const {storedOperator, screen} = state;
		if (!isNaN(Number(screen))) {
			if (storedOperator) {
				const calculatedValue = cut(calculate());
				yield put({
					type: ConcalcActionTypes.CONCALC_STORE_NUMBER_S,
					payload: calculatedValue,
				});
			} else {
				const numberToStore = Number(screen);
				yield put({
					type: ConcalcActionTypes.CONCALC_STORE_NUMBER_S,
					payload: numberToStore,
				});
			}
		}

		yield put({
			type: ConcalcActionTypes.CONCALC_STORE_OPERATOR_S,
			payload,
		});
		yield put({
			type: ConcalcActionTypes.CONCALC_SCREEN_SET_S,
			payload: payload.symbol,
		});
	} catch (e) {
		console.log(e);
		yield reset();
	}
}

export function * handleDigitsAction(action:PayloadAction<string>) {
	const {payload} = action;
	const state:ConcalcState = yield select((state:RootState) => state.concalc);
	const {screen, screenCharsMax} = state;

	if (screen.length >= screenCharsMax) {
		return;
	}

	if (payload === ',' && screen.includes(payload)) {
		return;
	}

	const newScreen = `${screen}${payload}`;

	const trimmedScreen = filterScreen(newScreen);

	yield put({
		type: ConcalcActionTypes.CONCALC_SCREEN_SET_S,
		payload: trimmedScreen,
	});
}

export function * concalcWatcher() {
	yield takeEvery(ConcalcActionTypes.CONCALC_COMPONENTS_AREA_SET, setComponentsArea);
	yield takeEvery(ConcalcActionTypes.CONCALC_CONSTRUCTOR_AREA_SET, setConstructorArea);
	yield takeEvery(ConcalcActionTypes.CONCALC_SCREEN_SET, setScreenValue);
	yield takeEvery(ConcalcActionTypes.CONCALC_STORE_NUMBER, storeNumber);
	yield takeEvery(ConcalcActionTypes.CONCALC_STORE_OPERATOR, storeOperator);
	yield takeEvery(ConcalcActionTypes.CONCALC_RESOLVE, resolve);
	yield takeEvery(ConcalcActionTypes.CONCALC_OPERATOR_ACTION, handleOperatorAction);
	yield takeEvery(ConcalcActionTypes.CONCALC_DIGITS_ACTION, handleDigitsAction);
}
