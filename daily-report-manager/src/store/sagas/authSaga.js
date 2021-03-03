import { put } from 'redux-saga/effects';

import Authentication from '../../models/Authentication';
import * as actionTypes from '../actions/actionTypes';
import { registerStart } from '../actions/authActions';

export function* registerUser(action) {
  yield put(registerStart());
  const authentication = new Authentication();
  const response = yield authentication.signUp(action.username, action.email, action.password);
  // console.log(response);
}
