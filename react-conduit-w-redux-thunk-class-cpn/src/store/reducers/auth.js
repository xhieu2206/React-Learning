import * as actionTypes from '../actions/actionTypes';

const initState = {
  token: null,
  isLoggedIn: false,
  user: null,
  loading: false,
  errors: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: []
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user,
        isLoggedIn: true,
        loading: false,
        error: []
      }
    case actionTypes.LOGIN_FAILED:
      console.log(action.errors)
      return {
        ...state,
        loading: false,
        errors: [...action.errors]
      }
    default:
      return state;
  }
}

export default reducer;
