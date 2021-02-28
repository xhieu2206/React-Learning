import * as actionTypes from '../actions/actionTypes';

const initState = {
  lat: '',
  lng: '',
  fullAddress: '',
  isLoading: false,
  errors: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case (actionTypes.LOAD_LOCATION_START):
      return {
        ...state,
        isLoading: true
      }
    case (actionTypes.LOAD_LOCATION_FAILED):
      return {
        ...state,
        errors: [...action.errors],
        isLoading: false
      }
    case (actionTypes.LOAD_LOCATION_SUCCESS):
      return {
        ...state,
        isLoading: false,
        errors: [],
        lat: action.lat,
        lng: action.lng,
        fullAddress: action.fullAddress
      }
    default:
      return state;
  }
}

export default reducer;
