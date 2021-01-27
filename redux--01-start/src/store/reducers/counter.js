import * as actionTypes from '../actions';

const initState = {
  counter: 0
};

const counterReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      }
    case actionTypes.DECREASEMENT:
      return {
        ...state, // update state immutably
        counter: state.counter - 1
      }
    case actionTypes.ADD:
      return {
       ...state,
       counter: state.counter + action.payload.value
      }
    case actionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.payload.value
      }
    default:
      return state;
  }
}

export default counterReducer;
