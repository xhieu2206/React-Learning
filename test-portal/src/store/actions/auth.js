import * as actionTypes from './actionTypes';

export const signUp = (email, password) => {
  return {
    type: actionTypes.SIGN_UP,
    email: email,
    password: password
  }
}

export const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START
  }
}

export const signUpSuccess = (token, email) => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    token: token,
    email: email
  }
}

export const signUpFailed = (errors) => {
  return {
    type: actionTypes.SIGN_UP_FAILED,
    errors: errors
  }
}

export const signIn = (email, password) => {
  return {
    type: actionTypes.SIGN_IN,
    email: email,
    password: password
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

export const tryLogin = (token, email) => {
  return {
    type: actionTypes.TRY_LOGIN,
    token: token,
    email: email
  }
}

export const removeErrors = () => {
  return {
    type: actionTypes.REMOVE_ERRORS
  }
}
