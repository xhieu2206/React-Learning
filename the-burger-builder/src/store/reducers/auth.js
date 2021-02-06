import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path
  });
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {
        loading: true,
        error: null
      });
    case actionTypes.AUTH_FAILED:
      return updateObject(state, {
        loading: false,
        error: action.error
      });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        userId: action.userId,
        token: action.idToken,
        error: null,
        loading: false
      });
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      }
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state
  }
}

export default reducer
