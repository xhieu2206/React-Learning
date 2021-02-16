import { takeEvery } from 'redux-saga/effects';

import { loginUser, signupUser, updateUser, tryLoginUser } from './authSaga';
import * as actionType from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(actionType.AUTH_USER, loginUser);
  yield takeEvery(actionType.REGISTER_USER, signupUser);
  yield takeEvery(actionType.UPDATE_USER, updateUser);
  yield takeEvery(actionType.TRY_LOGIN_USER, tryLoginUser);
}
