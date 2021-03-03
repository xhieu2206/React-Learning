import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/authActions';
import classes from './SignUp.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const SignUp = props => {
  const [username, setUsetname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmittedHander = async () => {
    await props.onSubmitted(username, email, password);
  }

  let loading = null;
  if (props.isLoading) {
    loading = (
      <React.Fragment>
        <Backdrop show={true} clicked={() => {}} />
        <div style={{
          "zIndex": "250",
          "height": "100%",
          "width": "100%",
          "position": "fixed",
          "display": "flex",
          "justifyContent": "center",
          "alignItems": "center"
        }}>
          <Spinner />
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {loading}
      <form onSubmit={onSubmittedHander} className={classes.SignUp}>
        <h1>Sign Up</h1>
        <label>Username:</label>
        <Input value={username} placeholder="Username" type="text" changed={(text) => { setUsetname(text)}} />
        <br />
        <label>Email:</label>
        <Input value={email} placeholder="Email" type="email" changed={(text) => { setEmail(text)}} />
        <br />
        <label>Password:</label>
        <Input value={password} placeholder="Password" type="password" changed={(text) => { setPassword(text)}} />
        <br />
        <Button isDisabled={false} type="Primary" clicked={onSubmittedHander}>Sign Up</Button>
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitted: (username, email, password) => dispatch(actions.register(username, email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
