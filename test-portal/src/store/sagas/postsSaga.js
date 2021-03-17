import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { ENDPOINT } from '../../constants/ENDPOINT';
import * as actionTypes from '../actions/actionTypes';
import * as postsActions from '../actions/posts';

function* loadPosts(action) {
  yield put(postsActions.loadPostsStart());
  try {
    const response = yield axios.get(`${ENDPOINT}/posts.json`);
    let posts = []
    for (const key in response.data) {
      posts.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(postsActions.loadPostsSuccess(posts));
  } catch(err) {
    const errorArr = err.response.data.error.errors.map(error => {
      return error.message;
    });
    yield put(postsActions.loadPostsFailed(errorArr));
  }
}

export function* watchPosts() {
  yield takeEvery(actionTypes.LOAD_POSTS, loadPosts);
}
