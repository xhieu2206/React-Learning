import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

const contactData = props => {
  const [orderForm, setOrderForm] = useState({
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
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formEle in orderForm) {
      formData[formEle] = orderForm[formEle].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    }

    props.onOrderBurger(order, props.token);
  }

  const inputChangedHandler = (e, key) => {
    let updateOrderForm = {...orderForm};
    updateOrderForm[key].value = e.target.value;
    updateOrderForm[key].valid = checkValidity(e.target.value, updateOrderForm[key].validation);
    updateOrderForm[key].touched = true; // nếu input đã được thay đổi, toggle touch props value

    let formIsValid = true;
    for (let key in updateOrderForm) {
      if (!updateOrderForm[key].valid) formIsValid = false;
    }

    setOrderForm(updateOrderForm);
    setFormIsValid(formIsValid);
  }

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact please</h4>
      {!props.loading ? (
      <form onSubmit={orderHandler} >
        {formElementsArray.map(formElement => {
          return <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid} // truyền valid props vào cho Input component
            shouldValidate={formElement.config.validation} // để không check validation cho dropdown
            touched={formElement.config.touched}
            changed={(e) => inputChangedHandler(e, formElement.id)}
          />
        })}
        <Button
          disabled={!formIsValid} // disabled custom Button component tương ứng với props.disabled
          btnType="Success"
          clicked={orderHandler}>
            ORDER
        </Button>
      </form>
      ) : <Spinner />}
    </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
