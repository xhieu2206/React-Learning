import React from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
          placeholder: 'Delivery Method:'
        },
        value: ''
      }
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const formData = {};
    for (let formEle in this.state.orderForm) {
      formData[formEle] = this.state.orderForm[formEle].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    }

    axios.post('/orders.json', order)
      .then(_ => {
        this.setState({
          loading: false
        });
        this.props.history.push({ // redirect về "/" nếu submit thành công
          pathname: '/'
        });
      })
      .catch(_ => {
        this.setState({
          loading: false
        });
      });
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
    let orderForm = {...this.state.orderForm};
    orderForm[key].value = e.target.value;
    orderForm[key].valid = this.checkValidity(e.target.value, orderForm[key].validation);
    console.log(orderForm);
    this.setState({
      orderForm: orderForm
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact please</h4>
        {!this.state.loading ? (
        <form onSubmit={this.orderHandler} >
          {formElementsArray.map(formElement => {
            return <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(e) => this.inputChangedHandler(e, formElement.id)}
            />
          })}
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        ) : <Spinner />}
      </div>
    )
  }
}

export default ContactData;
