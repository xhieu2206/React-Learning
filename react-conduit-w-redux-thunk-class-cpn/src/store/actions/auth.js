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

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    const user = new User();
    user.signIn(email, password)
      .then(res => {
        console.log(res);
        const userData = {
          bio: res.data.bio,
          createdAt: res.data.createdAt,
          email: res.data.email,
          id: res.data.id,
          image: res.data.image,
          updatedAt: res.data.updatedAt,
          username: res.data.username
        }
        dispatch(loginSuccess(res.data.token, userData));
      })
      .catch(err => {
        const errors = [...errorTransform(err.response.data.errors)]
        console.log(errors);
        dispatch(loginFailed(errors))
      })
  }
}
