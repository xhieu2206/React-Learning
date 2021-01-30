import * as actionTypes from '../actions/actions';

const initState = {
  counter: 0
};

const counterReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.increment().type:
      return {
        ...state,
        counter: state.counter + 1,
      }
    case actionTypes.decreasement().type:
      return {
        ...state, // update state immutably
        counter: state.counter - 1
      }
    case actionTypes.add().type:
      return {
       ...state,
       counter: state.counter + action.payload.value
      }
    case actionTypes.subtract().type:
      return {
        ...state,
        counter: state.counter - action.payload.value
      }
    default:
      return state;
  }
}

export default counterReducer;
