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
    email: '',
    password: '',
    errors: []
  }

  static contextType = AuthContext;

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

  login = e => {
    e.preventDefault();
    const user = new User();
    user.signIn(this.state.email, this.state.password)
      .then(res => {
        this.context.login(res.data);
        this.props.history.replace("/");
      })
      .catch(err => {
        this.setState({
          errors: [...errorTransform(err.response.data.errors)]
        });
      });
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
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/signup">
                  Need an account?
                </Link>
              </p>

              {errors}

              <form>
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
                  clicked={this.login}
                >
                  Sign in
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
