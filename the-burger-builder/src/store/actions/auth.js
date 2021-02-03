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
        dispatch(authSuccess(data.idToken, data.localId));
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(authFailed(err.response.data.error));
      })
  }
}
