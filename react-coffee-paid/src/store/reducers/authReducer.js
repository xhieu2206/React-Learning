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
    default:
      return state;
  }
}

export default reducer;
