import * as actionTypes from '../actions/actionTypes';

const initState = {
  result: []
};

const resultReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      const newState = Object.assign({}, state); // clone the old object, mục đích để update state immutably
      return {
        counter: newState.counter,
        // result: [...newState.result, newState.counter]
        result: state.result.concat({id: (new Date()).toISOString(), value: action.payload.counter}) // đây cũng là 1 cách.
      }
    case actionTypes.DELETE_RESULT:
      const id = action.payload.id;
      const newArr = [...state.result];
      const updatedArr = newArr.filter(item => item.id !== id);
      return {
        ...state,
        result: updatedArr
      }
    default:
      return state;
  }
}

export default resultReducer;
