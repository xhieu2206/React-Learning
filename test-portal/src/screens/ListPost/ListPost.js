import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as postsActions from '../../store/actions/posts';
import { ENDPOINT } from '../../constants/ENDPOINT';

import Post from '../../components/Post/Post';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';

const ListPost = props => {
  const { onLoadPosts, posts } = props;
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    onLoadPosts();
  }, [onLoadPosts]);

  const editButtonClickedHandler = id => {
    props.history.push({
      pathname: `posts/${id}/edit`
    });
  }

  const deleteButtonClickedHandler = async id => {
    try {
      await axios.delete(`${ENDPOINT}/posts/${id}.json`);
      await onLoadPosts();
    } catch(err) {
      const errorArr = err.response.data.error.errors.map(error => {
        return error.message;
      });
      setErrors(errorArr);
    }
  }

  return (
    <>
      {props.errors.length > 0 ?
        <>
          <Backdrop open={true}>
            <Modal messages={props.errors}></Modal>
          </Backdrop>
        </> : null
      }
      {errors.length > 0 ?
        <>
          <Backdrop open={true}>
            <Modal messages={errors}></Modal>
          </Backdrop>
        </> : null
      }
      {!props.loading ? posts.map(post => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            editButtonClicked={(id) => { editButtonClickedHandler(id) }}
            deleteButtonClicked={id => { deleteButtonClickedHandler(id) }}
          />
        )
      }) : <Backdrop open={true}><CircularProgress color="inherit" /></Backdrop>}
    </>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    posts: state.posts.posts,
    loading: state.posts.loading,
    errors: state.posts.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPosts: () => dispatch(postsActions.loadPosts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPost));
