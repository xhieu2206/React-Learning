import { put } from 'redux-saga/effects'; // put sẽ dispatch a new action
import * as actionTypes from '../actions/actionTypes';

export function* logoutSaga(action) { // generator
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  put({
    type: actionTypes.AUTH_LOGOUT
  })
}
