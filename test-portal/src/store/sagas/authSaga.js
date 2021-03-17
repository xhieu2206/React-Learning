import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { APIKEY } from '../../constants/APIKEY';
import { SIGNIN_ENDPOINT, SIGNUP_ENDPOINT } from '../../constants/ENDPOINT';
import * as actionTypes from '../actions/actionTypes';
import * as authActions from '../actions/auth';

function* signUp(action) {
  yield put(authActions.signUpStart());
  const url = SIGNUP_ENDPOINT + APIKEY;
  try {
    const body = {
      "email": action.email,
      "password": action.password,
      "returnSecureToken": true
    }
    const response = yield axios.post(url, body);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('email', response.data.email);
    yield put(authActions.signUpSuccess(response.data.idToken, response.data.email));
  } catch (err) {
    const errorArr = err.response.data.error.errors.map(error => {
      return error.message;
    });
    yield put(authActions.signUpFailed(errorArr));
  }
}

function* signIn(action) {
  yield put(authActions.signUpStart());
  const url = SIGNIN_ENDPOINT + APIKEY;
  try {
    const body = {
      "email": action.email,
      "password": action.password,
      "returnSecureToken": true
    }
    const response = yield axios.post(url, body);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('email', response.data.email);
    yield put(authActions.signUpSuccess(response.data.idToken, response.data.email));
  } catch (err) {
    const errorArr = err.response.data.error.errors.map(error => {
      return error.message;
    });
    yield put(authActions.signUpFailed(errorArr));
  }
}

export function* watchAuth() {
  yield takeEvery(actionTypes.SIGN_UP, signUp);
  yield takeEvery(actionTypes.SIGN_IN, signIn);
}
