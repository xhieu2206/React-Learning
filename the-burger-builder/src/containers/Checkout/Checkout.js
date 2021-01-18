import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends React.Component {
  state = { // tạm thời hardcode
    ingredients: null,
    totalPrice: 0
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {};
    let totalPrice;
    for (const param of query.entries()) {
      if (param[0] === 'price') {
        totalPrice = parseFloat(param[1])
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice
    })
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack(); // go back to BurgerBuilder
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data'); // go to contact form to fill-out some information
  }

  render() {
    return (
      <div>
        {this.state.ingredients ? <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        /> : <Spinner />}
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (<ContactData {...this.state} {...props} />)}
          // render={() => (<ContactData {...this.state} {...this.props} />)}
        />
      </div>
    )
  }
}

export default Checkout;
