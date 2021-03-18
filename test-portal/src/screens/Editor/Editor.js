import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { ENDPOINT } from '../../constants/ENDPOINT';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, TextareaAutosize, Button } from '@material-ui/core/';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import AuthGuard from '../../hoc/AuthGuard/AuthGuard';

const Editor = props => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {

  }, []);

  React.useEffect(() => {
    async function loadPosts() {
      const postId = props.match.params.postId;
      if (props.match.path === '/posts/:postId/edit') {
        try {
          const response = await axios.get(`${ENDPOINT}/posts.json?orderBy="$key"&equalTo="${postId}"`);
          setTitle(response.data[postId].title);
          setContent(response.data[postId].content);
          setErrors([]);
        } catch(err) {
          const errorArr = err.response.data.error.errors.map(error => {
            return error.message;
          });
          setErrors(errorArr);
        }
      } else {
        setTitle('');
        setContent('');
      }
    }

    loadPosts();
  }, [props.match.params.postId, props.match.path]);

  const submittedHandler = async () => {
    if (!title || !content) return;
    try {
      if (props.match.path === '/posts/:postId/edit') {
        const postId = props.match.params.postId;
        const body = {
          [postId]: {
            "title": title,
            "content": content
          }
        }
        await axios({
          method: 'PATCH',
          url: `${ENDPOINT}/posts.json`,
          data: body
        });
        setErrors([]);
      } else {
        await axios.post(`${ENDPOINT}/posts.json`, {
          title: title,
          content: content
        });
      }
      setErrors([]);

      props.history.replace({
        pathname: `/posts`
      });
    } catch(err) {
      let errorArr;
      if (err.response) {
        errorArr = err.response.data.error.errors.map(error => {
          return error.message;
        });
      } else {
        errorArr = ['CORS Error'];
      }
      setErrors(errorArr);
    }
  }

  return (
    <>
      {errors.length > 0 ?
        <>
          <Backdrop open={true}>
            <Modal messages={errors}></Modal>
          </Backdrop>
        </> : null
      }
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={10}>
          <TextField
            id="standard-full-width"
            label="Title"
            value={title}
            onChange={(event) => { setTitle(event.target.value) }}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextareaAutosize
            value={content}
            onChange={event => { setContent(event.target.value) }}
            aria-label="minimum height"
            rowsMin={5}
            placeholder="Content"
            style={{ width: '100%' }}
            required
          />
          <Button variant="contained" color="primary" onClick={submittedHandler}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token
  }
}

export default withRouter(connect(mapStateToProps, null)(AuthGuard(Editor, true)));
