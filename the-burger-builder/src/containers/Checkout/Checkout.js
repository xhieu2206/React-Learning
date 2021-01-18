import React from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends React.Component {
  state = { // tạm thời hardcode
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {};
    for (const param of query.entries()) {
      ingredients[param[0]] = +param[1]
    }
    this.setState({
      ingredients: ingredients
    })
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack(); // go back to BurgerBuilder
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data'); // go to contact form to fill-out some information
    // TODO later
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    )
  }
}

export default Checkout;
