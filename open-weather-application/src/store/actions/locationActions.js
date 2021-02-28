import * as actionTypes from './actionTypes';

export const loadLocation = () => {
  return {
    type: actionTypes.LOAD_LOCATION
  }
}

export const loadLocationStart = () => {
  return {
    type: actionTypes.LOAD_LOCATION_START
  }
}

export const loadLocationFailed = (errors) => {
  return {
    type: actionTypes.LOAD_LOCATION_FAILED,
    errors: errors
  }
}

export const loadLocationSuccess = (fullAddress, lat, lng) => {
  return {
    type: actionTypes.LOAD_LOCATION_SUCCESS,
    fullAddress: fullAddress,
    lat: lat,
    lng: lng
  }
}
