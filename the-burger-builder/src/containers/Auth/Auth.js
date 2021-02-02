import React from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

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
    }
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

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formEle => {
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

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    )
  }
}

export default Auth;
