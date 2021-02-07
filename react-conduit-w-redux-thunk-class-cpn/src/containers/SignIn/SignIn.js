import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';
import * as actions from '../../store/actions/index';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
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

  login = async e => {
    e.preventDefault();
    await this.props.onLogin(this.state.email, this.state.password);
  }

  render() {
    let errors = null;
    if (this.props.errors.length > 0) {
      errors = <ErrorMessages errors={this.props.errors} />
    }

    let redirect = null;
    if (this.props.isLoggedIn) {
      redirect = <Redirect to="/" />
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

              {redirect}
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

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errors: state.auth.errors,
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
