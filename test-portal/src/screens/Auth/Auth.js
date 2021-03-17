import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import AuthGuard from '../../hoc/AuthGuard/AuthGuard';

import * as authActions from '../../store/actions/auth';

const Auth = props => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { history } = props;

  React.useEffect(() => {
    if (props.location.pathname === '/auth/signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [props.location.pathname]);

  React.useEffect(() => {
    if (props.isLoggedIn) {
      history.replace({
        pathname: `/posts`
      });
    }
  }, [props.isLoggedIn, history]);

  const submittedHandler = async () => {
    if (props.location.pathname === '/auth/signup') {
      await props.onSignUp(email, password);
    } else {
      await props.onSignIn(email, password);
    }
  }

  return (
    <>
      {props.errors.length > 0 ?
        <>
          <Backdrop open={true}>
            <Modal messages={props.errors}></Modal>
          </Backdrop>
        </> : null
      }
      {!props.loading ? <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h3">{isLogin ? 'Login' : 'Sign Up'}</Typography>
          <TextField
            label="Email"
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            type="email"
            required
          />
          <TextField
            label="Password"
            value={password}
            onChange={(event) => { setPassword(event.target.value) }}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            type="password"
            required
          />
          <Button variant="contained" color="primary" onClick={submittedHandler}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </Grid>
      </Grid> : <Backdrop open={true}><CircularProgress color="inherit" /></Backdrop>}
    </>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    errors: state.auth.errors,
    loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, password) => dispatch(authActions.signUp(email, password)),
    onSignIn: (email, password) => dispatch(authActions.signIn(email, password))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthGuard(Auth, false)));
