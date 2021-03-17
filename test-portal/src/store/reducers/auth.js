import * as actionTypes from '../actions/actionTypes';

const initState = {
  token: null,
  email: '',
  isLoggedIn: false,
  loading: false,
  errors: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_START:
      return {
        ...state,
        loading: true,
        errors: []
      }
    case actionTypes.SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors
      }
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: [],
        token: action.token,
        email: action.email,
        isLoggedIn: true
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        email: '',
        loading: false,
        errors: []
      }
    case actionTypes.TRY_LOGIN:
      return {
        ...state,
        loading: false,
        errors: [],
        token: action.token,
        email: action.email,
        isLoggedIn: true
      }
    default:
      return state;
  }
}

export default reducer;
