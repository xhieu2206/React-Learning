import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import authGuard from '../../hoc/AuthGuard/AuthGuard';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Textarea from '../../components/UI/Textarea/Textarea';
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import * as actions from '../../store/actions/index';
import { RESET_UPDATED_SUCCESS } from '../../store/actions/actionTypes';

const Settings = props => {
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password')

  useEffect(async () => {
    const displayImage = props.image ? props.image : '';
    const displayBio = props.bio ? props.bio : '';
    setImage(displayImage);
    setUsername(props.username);
    setBio(displayBio);
    setEmail(props.email);

    return () => {
      props.onUnmount();
      props.onResetUpdatedSuccess();
    }
  }, []);

  const submittedFormHandler = async e => {
    e.preventDefault();
    await props.onUpdated(props.token, username, bio, email, password, image);
    if (props.isUpdateSuccess) {
      props.history.replace({
        pathname: `/users/${props.username}`
      });
    }
  }

  const logoutButtonClickedHandler = () => {
    props.onLogout();
    props.history.replace({
      pathname: '/'
    });
  }

  let errors = null;
  if (props.errors.length) {
    errors = <ErrorMessages errors={props.errors} />
  }

  let loading = null;
  if (props.loading) {
    loading = <LoadingSpinner />
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            {errors}
            {loading}

            <form onSubmit={submittedFormHandler}>
              <fieldset>
                <Input
                  type="text"
                  placeholder="URL of profile picture"
                  value={image}
                  changed={(e) => { setImage(e.target.value) }}
                />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  changed={(e) => { setUsername(e.target.value) }}
                />
                <Textarea
                  placeholder="Short bio about you"
                  value={bio}
                  changed={(e) => { setBio(e.target.value) }}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  changed={(e) => { setEmail(e.target.value) }}
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  changed={(e) => { setPassword(e.target.value) }}
                />
                <Button
                  clicked={submittedFormHandler}
                  type="primary"
                  outline={false}
                  position="right"
                >Update Settings</Button>
              </fieldset>
            </form>
            <hr />
            <Button
              clicked={logoutButtonClickedHandler}
              type="danger"
              outline={true}
              position="left"
            >Or click here to logout.</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdated: (token, username, bio, email, password, image) => dispatch(actions.update(token, username, bio, email, password, image)),
    onUnmount: () => dispatch(actions.emptyErrors()),
    onResetUpdatedSuccess: () => dispatch({
      type: RESET_UPDATED_SUCCESS
    }),
    onLogout: () => dispatch(actions.logout())
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isUpdateSuccess: state.auth.isUpdateSuccess,
    token: state.auth.token,
    isLoggedIn: state.auth.isLoggedIn,
    image: state.auth.user.image,
    username: state.auth.user.username,
    bio: state.auth.user.bio,
    email: state.auth.user.email,
    errors: state.auth.errors
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(authGuard(Settings, true)));
