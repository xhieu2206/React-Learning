import * as actionTypes from './actionTypes';

const saveResult = counter => {
  return {
    type: actionTypes.STORE_RESULT,
    payload: {
      counter: counter
    }
  }
}

export const storeDefault = counter => {
  return (dispatch, getState) => { // method để get current state
    setTimeout(() => {
      const oldCounter = getState().ctr.counter; // getvalue of old state.
      console.log('Old counter:', oldCounter);
      dispatch(saveResult(counter)); // execute saveResult(counter) để return về action
    }, 2000);
  }
}

export const deleteResult = id => {
  return {
    type: actionTypes.DELETE_RESULT,
    payload: {
      id: id
    }
  }
}
