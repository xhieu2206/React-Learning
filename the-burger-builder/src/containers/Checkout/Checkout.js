import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends React.Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack(); // go back to BurgerBuilder
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data'); // go to contact form to fill-out some information
  }

  render() {
    return (
      <div>
        {this.props.ings ? <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        /> : <Spinner />}
        <Route
          path={this.props.match.path + '/contact-data'}
          // render={(props) => (<ContactData {...this.state} {...props} />)}
          component={ContactData}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
}

export default connect(mapStateToProps, null)(Checkout);
