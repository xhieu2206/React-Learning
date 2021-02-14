import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
  try {
    const { data } = yield axios.get('https://react-burger-builder-64bad-default-rtdb.firebaseio.com/ingredients.json');
    const ingredients = {...data};
    yield put(actions.setIngredients(ingredients));
  } catch(e) {
    yield put(actions.fetchIngredientsFailed());
  }
}
