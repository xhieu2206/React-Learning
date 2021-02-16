import { put } from 'redux-saga/effects';

import User from '../../models/User';
import * as actions from '../actions/index';
import { errorTransform } from '../../utils/ErrorTransform';

export function* loginUser(action) {
  yield put(actions.loginStart());
  const user = new User();
  try {
    const res = yield user.signIn(action.email, action.password);
    const userData = {
      bio: res.data.user.bio,
      createdAt: res.data.user.createdAt,
      email: res.data.user.email,
      id: res.data.user.id,
      image: res.data.user.image,
      updatedAt: res.data.user.updatedAt,
      username: res.data.user.username
    }
    yield localStorage.setItem('token', res.data.user.token);
    yield put(actions.loginSuccess(res.data.user.token, userData));
  } catch(err) {
    const errors = [...errorTransform(err.response.data.errors)];
    yield put(actions.loginFailed(errors));
  }
}

export function* signupUser(action) {
  yield put(actions.registerStart());
  const user = new User();
  try {
    const res = yield user.signUp(action.username, action.email, action.password);
    const userData = {
      bio: res.data.user.bio,
      createdAt: res.data.user.createdAt,
      email: res.data.user.email,
      id: res.data.user.id,
      image: res.data.user.image,
      updatedAt: res.data.user.updatedAt,
      username: res.data.user.username
    }
    yield localStorage.setItem('token', res.data.user.token);
    yield put(actions.registerSuccess(res.data.user.token, userData));
  } catch(err) {
    const errors = [...errorTransform(err.response.data.errors)];
    yield put(actions.registerFailed(errors));
  }
}

export function* updateUser(action) {
  yield put(actions.updateStart());
  const user = new User();
  const userAwait = yield user.update(action.token, action.username, action.bio, action.email, action.password, action.image);
  if (userAwait.errors) {
    const errors = [...errorTransform(userAwait.errors)];
    yield put(actions.updateFailed(errors));
  } else if (userAwait.user) {
    const userData = {
      bio: userAwait.user.bio,
      createdAt: userAwait.user.createdAt,
      email: userAwait.user.email,
      id: userAwait.user.id,
      image: userAwait.user.image,
      updatedAt: userAwait.user.updatedAt,
      username: userAwait.user.username
    };
    yield put(actions.updateSuccess(userData));
  }
}

export function* tryLoginUser(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const user =  yield new User();
    const userAwait = yield user.getCurrentUser(token);
    if (userAwait.user) {
      const userData = {
        bio: userAwait.user.bio,
        createdAt: userAwait.user.createdAt,
        email: userAwait.user.email,
        id: userAwait.user.id,
        image: userAwait.user.image,
        updatedAt: userAwait.user.updatedAt,
        username: userAwait.user.username
      }
      yield localStorage.setItem('token', userAwait.user.token);
      yield put(actions.loginSuccess(userAwait.user.token, userData));
    } else {
      yield put(actions.logout());
    }
  }
}
