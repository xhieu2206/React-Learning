import { put } from 'redux-saga/effects'; // put sẽ dispatch a new action
import { delay } from 'redux-saga/effects';
import * as actions from '../actions/index';

import axios from 'axios';
const APIKEY = 'AIzaSyA9N6B2-ufdcR_5JtpTyTQDFBg_Ujtu85c';
const ENDPOINTSIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
const ENDPOINTSIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;

export function* logoutSaga(action) { // generator
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    "email": action.email,
    "password": action.password,
    "returnSecureToken": true
  };
  let url = ENDPOINTSIGNUP;
  if (!action.isSignup) url = ENDPOINTSIGNIN;
  try {
    const res = yield axios.post(url, authData)
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', new Date(new Date().getTime() + res.data.expiresIn * 1000));
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFailed(err.response.data.error))
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  const userId = yield localStorage.getItem('userId');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate.getTime() > new Date().getTime()) {
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    } else {
      yield put(actions.logout());
    }
  }
}
