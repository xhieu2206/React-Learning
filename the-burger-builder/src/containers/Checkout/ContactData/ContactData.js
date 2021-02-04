import React from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

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
        valid: false,
        touched: false // tương tự với các field có validation khác
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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
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
        value: 'fastest',
        validation: {}, // luôn luôn không có validation
        valid: true // luôn luôn là true vì chúng ta không có validation cho dropdown
      }
    },
    formIsValid: false // check xem form đã valid chưa
  }

  orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formEle in this.state.orderForm) {
      formData[formEle] = this.state.orderForm[formEle].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token);
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
    orderForm[key].touched = true; // nếu input đã được thay đổi, toggle touch props value

    let formIsValid = true;
    for (let key in orderForm) {
      if (!orderForm[key].valid) formIsValid = false;
    }

    this.setState({
      orderForm: orderForm,
      formIsValid: formIsValid
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
        {!this.props.loading ? (
        <form onSubmit={this.orderHandler} >
          {formElementsArray.map(formElement => {
            return <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid} // truyền valid props vào cho Input component
              shouldValidate={formElement.config.validation} // để không check validation cho dropdown
              touched={formElement.config.touched}
              changed={(e) => this.inputChangedHandler(e, formElement.id)}
            />
          })}
          <Button
            disabled={!this.state.formIsValid} // disabled custom Button component tương ứng với props.disabled
            btnType="Success"
            clicked={this.orderHandler}>
              ORDER
          </Button>
        </form>
        ) : <Spinner />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
