import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
  componentDidUpdate() {
    console.log('[OrderSummary.js] componentDidUpdate');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>
            {igKey}</span>: {this.props.ingredients[igKey]}
        </li>);
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: </strong>{this.props.price.toFixed(2)}</p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
      </Aux>
    )
  }
};

export default OrderSummary;
