import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
  result: []
};

const deleteResult = (state, action) => {
  const id = action.payload.id;
  const newArr = [...state.result];
  const updatedArr = newArr.filter(item => item.id !== id);
  return updateObject(state, updatedArr);
}

const resultReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      const newState = Object.assign({}, state); // clone the old object, mục đích để update state immutably
      return updateObject(state, { result: state.result.concat({id: (new Date()).toISOString(), value: action.payload.counter}) });
    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);
    default:
      return state;
  }
}

export default resultReducer;
