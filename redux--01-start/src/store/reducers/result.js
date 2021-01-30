import * as actionTypes from '../actions/actions';

const initState = {
  result: []
};

const resultReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.storeDefault().type:
      const newState = Object.assign({}, state); // clone the old object, mục đích để update state immutably
      return {
        counter: newState.counter,
        // result: [...newState.result, newState.counter]
        result: state.result.concat({id: (new Date()).toISOString(), value: action.payload.counter}) // đây cũng là 1 cách.
      }
    case actionTypes.deleteResult().type:
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
