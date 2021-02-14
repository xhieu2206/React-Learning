import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false // tương tự với các field có validation khác
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false // tương tự với các field có validation khác
    }
  });
  const [isSignup, setIsSignup] = useState(true);

  const { onSetAuthRedirectPath, buildingBurger, authRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [onSetAuthRedirectPath, buildingBurger, authRedirectPath]);


  const submitHandler = e => {
    e.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  }

  const inputChangedHandler = (e, key) => {
    const updatedControls = updateObject(authForm, {
      [key]: {
        ...authForm[key],
        value: e.target.value,
        valid: checkValidity(e.target.value, authForm[key].validation),
        touched: true
      }
    });

    setAuthForm(updatedControls);
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }


  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }

  let form = formElementsArray.map(formEle => {
    return (
      <Input
        key={formEle.id}
        elementType={formEle.config.elementType}
        elementConfig={formEle.config.elementConfig}
        value={formEle.config.value}
        invalid={!formEle.config.valid} // truyền valid props vào cho Input component
        shouldValidate={formEle.config.validation} // để không check validation cho dropdown
        touched={formEle.config.touched}
        changed={(e) => inputChangedHandler(e, formEle.id)}
      />
    )
  });

  if (props.loading) {
    form = <Spinner />
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button
        clicked={switchAuthModeHandler}
        btnType="Danger">
          Switch to {isSignup ? "Signin" : "Signup"}
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);
