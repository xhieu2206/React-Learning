import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: [],
  loading: false,
  errors: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_POSTS_START:
      return {
        ...state,
        loading: true,
        errors: []
      }
    case actionTypes.LOAD_POSTS_FAILED:
      return {
        ...state,
        loading: false,
        errors: [...action.errors]
      }
    case actionTypes.LOAD_POSTS_SUCCESS:
      return {
        loading: false,
        errors: [],
        posts: [...action.posts]
      }
    case actionTypes.REMOVE_ERRORS:
      return {
        ...state,
        errors: []
      }
    default:
      return state;
  }
}

export default reducer;
