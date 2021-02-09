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
  return dispatch => {
    dispatch(loginStart());
    const user = new User();
    user.signIn(email, password)
      .then(res => {
        const userData = {
          bio: res.data.user.bio,
          createdAt: res.data.user.createdAt,
          email: res.data.user.email,
          id: res.data.user.id,
          image: res.data.user.image,
          updatedAt: res.data.user.updatedAt,
          username: res.data.user.username
        }
        localStorage.setItem('token', res.data.user.token);
        dispatch(loginSuccess(res.data.user.token, userData));
      })
      .catch(err => {
        const errors = [...errorTransform(err.response.data.errors)]
        dispatch(loginFailed(errors));
      })
  }
}

export const register = (username, email, password) => {
  return dispatch => {
    dispatch(registerStart());
    const user = new User();
    user.signUp(username, email, password)
      .then(res => {
        const userData = {
          bio: res.data.user.bio,
          createdAt: res.data.user.createdAt,
          email: res.data.user.email,
          id: res.data.user.id,
          image: res.data.user.image,
          updatedAt: res.data.user.updatedAt,
          username: res.data.user.username
        }
        localStorage.setItem('token', res.data.user.token);
        dispatch(registerSuccess(res.data.user.token, userData));
      })
      .catch(err => {
        const errors = [...errorTransform(err.response.data.errors)]
        dispatch(registerFailed(errors));
      });
  }
}

export const update = (token, username, bio, email, password, image) => {
  return async dispatch => {
    dispatch(updateStart());
    const user = new User();
    const userAwait = await user.update(token, username, bio, email, password, image);
    if (userAwait.errors) {
      const errors = [...errorTransform(userAwait.errors)];
      dispatch(updateFailed(errors));
    } else if (userAwait.user) {
      const userData = {
        bio: userAwait.user.bio,
        createdAt: userAwait.user.createdAt,
        email: userAwait.user.email,
        id: userAwait.user.id,
        image: userAwait.user.image,
        updatedAt: userAwait.user.updatedAt,
        username: userAwait.user.username
      };
      dispatch(updateSuccess(userData));
    }
  }
}

export const tryToLogin = () => {
  const token = localStorage.getItem('token');
  const user = new User();
  return async dispatch => {
    if (!token) {
      dispatch(logout());
    } else {
      const userAwait = await user.getCurrentUser(token);
      if (userAwait.user) {
        const userData = {
          bio: userAwait.user.bio,
          createdAt: userAwait.user.createdAt,
          email: userAwait.user.email,
          id: userAwait.user.id,
          image: userAwait.user.image,
          updatedAt: userAwait.user.updatedAt,
          username: userAwait.user.username
        }
        localStorage.setItem('token', userAwait.user.token);
        dispatch(loginSuccess(userAwait.user.token, userData));
      } else {
        dispatch(logout());
      }
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: actionTypes.LOGOUT
  }
}
