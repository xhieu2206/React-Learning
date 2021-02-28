import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { loadLocation } from './locationSaga';

export function* watchLocation() {
  yield takeEvery(actionTypes.LOAD_LOCATION, loadLocation);
}
