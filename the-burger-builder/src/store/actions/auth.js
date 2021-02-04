import * as actionTypes from './actionTypes';
import axios from 'axios';
const APIKEY = 'AIzaSyA9N6B2-ufdcR_5JtpTyTQDFBg_Ujtu85c';
const ENDPOINTSIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
const ENDPOINTSIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  console.log(email, password);
  return dispatch => {
    dispatch(authStart());
    const authData = {
      "email": email,
      "password": password,
      "returnSecureToken": true
    };
    let url = ENDPOINTSIGNUP;
    if (!isSignup) url = ENDPOINTSIGNIN;
    axios.post(url, authData)
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('expirationDate', new Date(new Date().getTime() + data.expiresIn * 1000));
        localStorage.setItem('userId', data.localId);
        dispatch(authSuccess(data.idToken, data.localId));
        dispatch(checkAuthTimeout(data.expiresIn));
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(authFailed(err.response.data.error));
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate.getTime() > new Date().getTime()) {
        dispatch(authSuccess(token, userId));
        console.log(expirationDate.getTime() - new Date().getTime())
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  };
}
