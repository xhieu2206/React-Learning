import * as actionTypes from '../actions/actionTypes';

const initState = {
  token: null,
  isLoggedIn: false,
  user: {
    bio: '',
    createdAt: '',
    email: '',
    id: '',
    image: '',
    updatedAt: '',
    username: ''
  },
  loading: false,
  isUpdateSuccess: false,
  errors: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        errors: []
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: {...action.user},
        isLoggedIn: true,
        loading: false,
        errors: []
      }
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        errors: [...action.errors]
      }
    case actionTypes.REGISTER_START:
      return {
        ...state,
        loading: true,
        errors: []
      }
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: {...action.user},
        isLoggedIn: true,
        loading: false,
        errors: []
      }
    case actionTypes.REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        errors: [...action.errors]
      }
    case actionTypes.UPDATE_START:
      return {
        ...state,
        loading: true,
        errors: []
      }
    case actionTypes.UPDATE_FAILED:
      return {
        ...state,
        loading: false,
        errors: [...action.errors]
      }
    case actionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: [],
        isUpdateSuccess: true,
        user: {
          ...state.user,
          ...action.user
        }
      }
    case actionTypes.EMPTY_ERRORS:
      return {
        ...state,
        errors: []
      }
    case actionTypes.RESET_UPDATED_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: false
      }
    case actionTypes.LOGOUT:
      return initState
    default:
      return state;
  }
}

export default reducer;
