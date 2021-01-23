import React from 'react';

import AuthContext from '../../context/authContext';
import User from '../../models/User';

import { errorTransform } from '../../utils/ErrorTransform';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Textarea from '../../components/UI/Textarea/Textarea';
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

class Settings extends React.Component {
  state = {
    image: '',
    username: '',
    bio: '',
    email: '',
    password: 'password',
    errors: []
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.setState({
      image: this.context.image,
      username: this.context.username,
      bio: this.context.bio,
      email: this.context.email
    });
  }

  submittedFormHandler = async e => {
    e.preventDefault();
    const user = new User();
    const userAwait = await user.update(this.context.token, this.state.username, this.state.bio, this.state.email, this.state.password, this.state.image);
    console.log(userAwait);
    if (userAwait.errors) {
      this.setState({
        errors: [...errorTransform(userAwait.errors)]
      });
    } else if (userAwait.user) {
      this.context.login(userAwait);
      this.props.history.replace({
        pathname: `/users/${userAwait.user.username}`
      });
    }
  }

  logoutButtonClickedHandler = _ => {

  }

  render() {
    let errors = null;
    if (this.state.errors.length) {
      errors = <ErrorMessages errors={this.state.errors} />
    }

    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              {errors}

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

export default Settings;
