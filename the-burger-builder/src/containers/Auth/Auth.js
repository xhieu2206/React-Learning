import React from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends React.Component {
  state = {
    controls: {
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
    },
    isSignup: true
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  checkValidity(value, rules) {
    let isValid = true;

    // check for required field
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    // check for min length
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    // check for max length
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (e, key) => {
    let updatedControls = {...this.state.controls, [key]: {
      ...this.state.controls[key],
      value: e.target.value,
      valid: this.checkValidity(e.target.value, this.state.controls[key].validation),
      touched: true
    }};

    this.setState({
      controls: updatedControls
    });
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      }
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
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
          changed={(e) => this.inputChangedHandler(e, formEle.id)}
        />
      )
    });

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger">
            Switch to {this.state.isSignup ? "Signin" : "Signup"}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);