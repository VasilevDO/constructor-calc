import {put, select, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {ConcalcActionTypes} from './concalc.type';
import store, {RootState} from '../store';
import {ConcalcState} from './concalc.reducer';
import MathOperator from '../../models/MathOperator.model';

export function * setScreen(value:string|number|null) {
	let valueToSet;
	if (!value) {
		valueToSet = '0';
	} else if (typeof value === 'number') {
		valueToSet = String(value).replace(/\./, ',');
	} else {
		valueToSet = value.replace(/\./, ',');
	}

	yield put({
		type: ConcalcActionTypes.CONCALC_SCREEN_SET_S,
		payload: valueToSet,
	});
}

export function * storeOperator(operator:MathOperator) {
	yield put({
		type: ConcalcActionTypes.CONCALC_STORE_OPERATOR_S,
		payload: operator,
	});
}

export function * storeNumber(value:number|string|null) {
	let valueToStore;
	if (typeof value === 'string') {
		valueToStore = Number(value.replace(/,/g, '.'));
	} else {
		valueToStore = value;
	}

	yield put({
		type: ConcalcActionTypes.CONCALC_STORE_NUMBER_S,
		payload: valueToStore,
	});
}

const getScreenValue = ():number => {
	const state = store.getState().concalc;
	const {screen} = state;
	return Number(screen.replace(/,/g, '.'));
};

const cut = (val:number):string => {
	const state = store.getState().concalc;
	const {screenCharsMax} = state;

	if (String(val).length > screenCharsMax) {
		if (val % 1) {
			const [charsBeforeDot] = String(val).split('.');
			if (charsBeforeDot.length <= screenCharsMax - 2) {
				const fixedVal = val.toFixed(screenCharsMax - charsBeforeDot.length - 1);
				if (Number(fixedVal) !== 0) {
					return fixedVal.replace(/0+$/, '');
				}
			}
		}

		const offset = val.toExponential(1).match(/(?<=e[+-])\d+/)[0].length;
		const fractionDigits = screenCharsMax - 4 - offset;
		return val.toExponential(fractionDigits);
	}

	return String(val);
};

const calculate = ():number => {
	const state = store.getState().concalc;
	const {storedNumber, storedOperator} = state;
	const {fn} = storedOperator;

	const a = storedNumber;
	const b = getScreenValue();

	const res = fn(a, b);

	if (isNaN(res)) {
		throw new Error('calculation failed');
	}

	return res;
};

const filterScreen = (str:string) => str.replace(/^0(?!,)/g, '').replace(/[^0-9,]/g, '').replace(/^,$/, '0,');

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

export function * reset() {
	yield storeOperator(null);
	yield storeNumber(null);
	yield setScreen(null);
}

export function * resolve() {
	try {
		const state:ConcalcState = yield select((state:RootState) => state.concalc);

		const {storedOperator} = state;

		if (!storedOperator) {
			return;
		}

		const calculatedValue = cut(calculate());

		yield storeOperator(null);
		yield storeNumber(null);
		yield setScreen(calculatedValue);
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

		if (storedOperator) {
			const calculatedValue = cut(calculate());
			yield storeNumber(calculatedValue);
			yield storeOperator(null);
		} else {
			yield storeNumber(screen);
		}

		yield storeOperator(payload);
		yield setScreen(payload.symbol);
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

	yield setScreen(trimmedScreen);
}

export function * concalcWatcher() {
	yield takeEvery(ConcalcActionTypes.CONCALC_COMPONENTS_AREA_SET, setComponentsArea);
	yield takeEvery(ConcalcActionTypes.CONCALC_CONSTRUCTOR_AREA_SET, setConstructorArea);
	yield takeEvery(ConcalcActionTypes.CONCALC_RESOLVE, resolve);
	yield takeEvery(ConcalcActionTypes.CONCALC_OPERATOR_ACTION, handleOperatorAction);
	yield takeEvery(ConcalcActionTypes.CONCALC_DIGITS_ACTION, handleDigitsAction);
}
