import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch(error) {
    yield put(actions.purchaseBurgerFailed(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrderStart());
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const res = yield axios.get(`https://react-burger-builder-64bad-default-rtdb.firebaseio.com/orders.json${queryParams}`);
    const orderArr = [];
    for (const key in res.data) {
      orderArr.push({
        ...res.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrderSuccess(orderArr));
  } catch(error) {
    yield put(actions.fetchOrderFailed(error));
  }
}
