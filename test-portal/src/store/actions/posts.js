import * as actionTypes from './actionTypes';

export const loadPosts = () => {
  return {
    type: actionTypes.LOAD_POSTS
  }
}

export const loadPostsStart = () => {
  return {
    type: actionTypes.LOAD_POSTS_START
  }
}

export const loadPostsFailed = errors => {
  return {
    type: actionTypes.LOAD_POSTS_FAILED,
    errors: errors
  }
}

export const loadPostsSuccess = posts => {
  return {
    type: actionTypes.LOAD_POSTS_SUCCESS,
    posts: posts
  }
}

export const removeErrors = () => {
  return {
    type: actionTypes.REMOVE_ERRORS
  }
}
