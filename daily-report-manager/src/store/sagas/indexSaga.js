import { takeEvery } from 'redux-saga/effects';

import * as actionType from '../actions/actionTypes';

import { registerUser } from './authSaga';

export function* watchAuth() {
  yield takeEvery(actionType.REGISTER, registerUser);
}
