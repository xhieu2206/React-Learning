import React from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: { // tạm thời hardcode, handle khi học đến Form module
        name: 'xhieu2206',
        address: {
          street: 'Hanoi',
          zipCode: '100000',
          country: 'Vietnam'
        },
        email: 'xhieu04@gmail.com'
      },
      deliveryMethod: 'fastest'
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

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact please</h4>
        {!this.state.loading ? (<form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
          <input className={classes.Input} type="street" name="street" placeholder="Street" />
          <input className={classes.Input} type="postal" name="postal" placeholder="Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>) : <Spinner />}
      </div>
    )
  }
}

export default ContactData;
