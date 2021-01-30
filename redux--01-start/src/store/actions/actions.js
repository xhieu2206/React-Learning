const INCREMENT = 'INCREMENT';
const DECREASEMENT = 'DECREASEMENT';
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const STORE_RESULT = 'STORE_RESULT';
const DELETE_RESULT = 'DELETE_RESULT';

export const increment = () => {
  return {
    type: INCREMENT
  }
}

export const decreasement = () => {
  return {
    type: DECREASEMENT
  }
}

export const add = (val) => {
  return {
    type: ADD,
    payload: {
      value: val
    }
  }
}

export const subtract = (val) => {
  return {
    type: SUBTRACT,
    payload: {
      value: val
    }
  }
}

export const storeDefault = counter => {
  return {
    type: STORE_RESULT,
    payload: {
      counter: counter
    }
  }
}

export const deleteResult = id => {
  return {
    type: DELETE_RESULT,
    payload: {
      id: id
    }
  }
}
