import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import LoadingSpinner  from '../../components/UI/LoadingSpinner/LoadingSpinner';
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';
import authGuard from '../../hoc/AuthGuard/AuthGuard';
import * as actions from '../../store/actions/index';

class SignUp extends React.Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

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
    await this.props.onRegister(this.state.username, this.state.email, this.state.password);
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

    let loading = null;
    if (this.props.loading) {
      loading = <LoadingSpinner />
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

              {redirect}
              {errors}
              {loading}

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

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errors: state.auth.errors,
    isLoggedIn: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (username, email, password) => dispatch(actions.register(username, email, password)),
    onUnmount: () => dispatch(actions.emptyErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(authGuard(SignUp, false));
