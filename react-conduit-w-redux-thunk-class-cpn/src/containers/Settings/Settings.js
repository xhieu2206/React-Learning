import React from 'react';
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

class Settings extends React.Component {
  state = {
    image: '',
    username: '',
    bio: '',
    email: '',
    password: 'password'
  }

  componentDidMount() {
    const displayImage = this.props.image ? this.props.image : '';
    const displayBio = this.props.bio ? this.props.bio : '';
    this.setState({
      image: displayImage,
      username: this.props.username,
      bio: displayBio,
      email: this.props.email
    });
  }

  componentWillUnmount() {
    this.props.onUnmount();
    this.props.onResetUpdatedSuccess();
  }

  submittedFormHandler = async e => {
    e.preventDefault();
    await this.props.onUpdated(this.props.token, this.state.username, this.state.bio, this.state.email, this.state.password, this.state.image);
    if (this.props.isUpdateSuccess) {
      this.props.history.replace({
        pathname: `/users/${this.props.username}`
      });
    }
  }

  logoutButtonClickedHandler = _ => {
    this.props.onLogout();
    this.props.history.replace({
      pathname: '/'
    });
  }

  render() {
    let errors = null;
    if (this.props.errors.length) {
      errors = <ErrorMessages errors={this.props.errors} />
    }

    let loading = null;
    if (this.props.loading) {
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

              <form onSubmit={this.submittedFormHandler}>
                <fieldset>
                  <Input
                    type="text"
                    placeholder="URL of profile picture"
                    value={this.state.image}
                    changed={(e) => { this.setState({ image: e.target.value }) }}
                  />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    changed={(e) => { this.setState({ username: e.target.value }) }}
                  />
                  <Textarea
                    placeholder="Short bio about you"
                    value={this.state.bio}
                    changed={(e) => { this.setState({ bio: e.target.value }) }}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    changed={(e) => { this.setState({ email: e.target.value }) }}
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={this.state.password}
                    changed={(e) => { this.setState({ password: e.target.value }) }}
                  />
                  <Button
                    clicked={this.submittedFormHandler}
                    type="primary"
                    outline={false}
                    position="right"
                  >Update Settings</Button>
                </fieldset>
              </form>
              <hr />
              <Button
                clicked={this.logoutButtonClickedHandler}
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
