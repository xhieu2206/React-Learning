import * as actionTypes from '../actions/actionTypes';

const initState = {
  token: '',
  isLoggedIn: false,
  username: '',
  isLoading: false,
  errors: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return {
        ...state,
        errors: [],
        isLoading: true
      }
    default:
      return state;
  }
}

export default reducer;
