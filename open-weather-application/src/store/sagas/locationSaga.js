import { call, put } from 'redux-saga/effects';

import Location from '../../models/Location';
import * as locationActions from '../actions/locationActions';

export function* loadLocation(action) {
  yield put(locationActions.loadLocationStart());
  const { getLocation } = yield call(userPositionPromised);
  const { error, location: position } = yield call(getLocation);
  if (error) {
    const errorArr = [];
    errorArr.push(error.message);
    yield put(locationActions.loadLocationFailed(errorArr));
  } else {
    const location = new Location();
    const data = yield location.getLocationDetail(position.coords.latitude, position.coords.longitude);
    if (data.status === "OK") {
      yield put(locationActions.loadLocationSuccess(data.results[0].formatted_address, position.coords.latitude, position.coords.longitude));
    } else {
      const errorArr = [];
      errorArr.push("Something went wrong when trying to get current location with Google API");
      yield put(locationActions.loadLocationFailed(errorArr));
    }
  }
}

function userPositionPromised() {
  const position = {}
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (
      location  => position.on({location}),
      error     => position.on({error}),
      { enableHighAccuracy: true }
    )
  }
  return { getLocation: () => new Promise(location => position.on = location) }
}
