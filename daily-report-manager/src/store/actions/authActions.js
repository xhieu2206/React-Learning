import * as actionTypes from './actionTypes';

export const register = (username, email, password) => {
  return {
    type: actionTypes.REGISTER,
    username, email, password
  }
}

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START
  }
}

