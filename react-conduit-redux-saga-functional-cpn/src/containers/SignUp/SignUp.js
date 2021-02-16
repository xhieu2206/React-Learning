import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import LoadingSpinner  from '../../components/UI/LoadingSpinner/LoadingSpinner';
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';
import authGuard from '../../hoc/AuthGuard/AuthGuard';
import * as actions from '../../store/actions/index';

const SignUp = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(async () => {
    return () => {
      props.onUnmount();
    }
  }, []);

  const usernameChangedHandler = e => {
    setUsername(e.target.value);
  }

  const emailChangedHandler = e => {
    setEmail(e.target.value);
  }

  const passwordChangedHandler = e => {
    setPassword(e.target.value);
  }

  const signup = async (e) => {
    e.preventDefault();
    await props.onRegister(username, email, password);
  }

  let errors = null;
  if (props.errors.length > 0) {
    errors = <ErrorMessages errors={props.errors} />
  }

  let redirect = null;
  if (props.isLoggedIn) {
    redirect = <Redirect to="/" />
  }

  let loading = null;
  if (props.loading) {
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
                value={username}
                changed={usernameChangedHandler} />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                changed={emailChangedHandler} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                changed={passwordChangedHandler} />
              <Button
                type="primary"
                position="right"
                outline={false}
                clicked={signup}
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
