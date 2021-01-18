import React from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  async componentDidMount () {
    const { data } = await axios.get('https://react-burger-builder-64bad-default-rtdb.firebaseio.com/ingredients.json');
    const ingredients = {...data};
    this.setState({
      ingredients: ingredients
    });
  }

  updatePurchaseState(updatingIngredients) {
    const ingredients = {...updatingIngredients};
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatingIngredient = {...this.state.ingredients};
    updatingIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatingIngredient
    });
    this.updatePurchaseState(updatingIngredient);
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatingIngredient = {...this.state.ingredients};
    updatingIngredient[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatingIngredient
    });
    this.updatePurchaseState(updatingIngredient);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => { // tạm commnet-out code cũ vì chúng ta sẽ không handle việc sending order ở đây
    // this.setState({
    //   loading: true
    // });

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'xhieu2206',
    //     address: {
    //       street: 'Hanoi',
    //       zipCode: '100000',
    //       country: 'Vietnam'
    //     },
    //     email: 'xhieu04@gmail.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }

    // axios.post('/orders.json', order)
    //   .then(_ => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   })
    //   .catch(_ => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     })
    //   });
    let queryParams = '?';
    for (const key in this.state.ingredients) {
      queryParams = queryParams.concat(`${key}=${this.state.ingredients[key]}&`);
    }
    this.props.history.push({
      pathname: '/checkout',
      search: queryParams.slice(0, queryParams.length - 1)
    });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null; // init null cho orderSummary
    let burger = <Spinner />; // init với spinner trong thời gian loading ingredients từ backend
    if (this.state.ingredients) { // nếu có ingredients mới render burger và orderSummary
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return(
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios); // BurgerBuilder is WrappedComponent
