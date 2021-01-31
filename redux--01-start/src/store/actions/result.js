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
  return dispatch => { // func này nhận vào một dispatch là một arg, và chúng ta get this dispatch due to redux-thunk. Có thể nói middware chạy giữa khoảng thời gian dispatching một action và thời điểm action reaches the reducer
    setTimeout(() => {
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
