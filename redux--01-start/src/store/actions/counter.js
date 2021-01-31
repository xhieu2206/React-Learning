import * as actionTypes from './actionTypes';

export const increment = () => {
  return {
    type: actionTypes.INCREMENT
  }
}

export const decreasement = () => {
  return {
    type: actionTypes.DECREASEMENT
  }
}

export const add = (val) => {
  return {
    type: actionTypes.ADD,
    payload: {
      value: val
    }
  }
}

export const subtract = (val) => {
  return {
    type: actionTypes.SUBTRACT,
    payload: {
      value: val
    }
  }
}
