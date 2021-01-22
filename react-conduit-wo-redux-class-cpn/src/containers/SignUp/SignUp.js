import React from "react";
import { Link } from 'react-router-dom';

import AuthContext from '../../context/authContext';

import { errorTransform } from '../../utils/ErrorTransform';
import User from '../../models/User';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

class SignIn extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: []
  }

  static contextType = AuthContext;

  usernameChangedHandler = e => {
    this.setState({
      username: e.target.value
    });
  }

  emailChangedHandler = e => {
    this.setState({
      email: e.target.value
    });
  }

  passwordChangedHandler = e => {
    this.setState({
      password: e.target.value
    });
  }

  signup = async (e) => {
    e.preventDefault();
    const user = new User();
    try {
      const res = await user.signUp(this.state.username, this.state.email, this.state.password);
      this.context.login(res.data);
      this.props.history.replace("/");
    } catch(err) {
      this.setState({
        errors: [...errorTransform(err.response.data.errors)]
      });
    }
  }

  render() {
    let errors = null;
    if (this.state.errors.length > 0) {
      errors = <ErrorMessages errors={this.state.errors} />
    }

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to="/signin">
                  Have an account?
                </Link>
              </p>

              {errors}

              <form>
                <Input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  changed={this.usernameChangedHandler} />
                <Input
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  changed={this.emailChangedHandler} />
                <Input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  changed={this.passwordChangedHandler} />
                <Button
                  type="primary"
                  position="right"
                  outline={false}
                  clicked={this.signup}
                >
                  Sign up
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
