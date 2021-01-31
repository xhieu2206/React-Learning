import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
  counter: 0
};

const counterReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return updateObject(state, { counter: state.counter + 1 });
    case actionTypes.DECREASEMENT:
      return updateObject(state, { counter: state.counter - 1 });
    case actionTypes.ADD:
      return updateObject(state, { counter: state.counter + action.payload.value });
    case actionTypes.SUBTRACT:
      return updateObject(state, { counter: state.counter - action.payload.value });
    default:
      return state;
  }
}

export default counterReducer;
