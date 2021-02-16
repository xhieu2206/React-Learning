import * as actionTypes from './actionTypes';

import User from '../../models/User';
import { errorTransform } from '../../utils/ErrorTransform';

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  }
}

export const loginSuccess = (token, user) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    user: {...user}
  }
}

export const loginFailed = errors => {
  return {
    type: actionTypes.LOGIN_FAILED,
    errors: errors
  }
}

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START
  }
}

export const registerSuccess = (token, user) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    token: token,
    user: {...user}
  }
}

export const registerFailed = errors => {
  return {
    type: actionTypes.REGISTER_FAILED,
    errors: errors
  }
}

export const updateStart = () => {
  return {
    type: actionTypes.UPDATE_START
  }
}

export const updateSuccess = (user) => {
  return {
    type: actionTypes.UPDATE_SUCCESS,
    user: {...user}
  }
}

export const updateFailed = errors => {
  return {
    type: actionTypes.UPDATE_FAILED,
    errors: errors
  }
}

export const emptyErrors = () => {
  return {
    type: actionTypes.EMPTY_ERRORS
  }
}

export const login = (email, password) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password
  }
}

export const register = (username, email, password) => {
  return {
    type: actionTypes.REGISTER_USER,
    username, email, password
  }
}

export const update = (token, username, bio, email, password, image) => {
  return {
    type: actionTypes.UPDATE_USER,
    token, username, bio, email, password, image
  }
}

export const tryToLogin = () => {
  return {
    type: actionTypes.TRY_LOGIN_USER
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: actionTypes.LOGOUT
  }
}
