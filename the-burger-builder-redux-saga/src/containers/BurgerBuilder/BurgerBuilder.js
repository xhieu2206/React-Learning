import React, { useState, useEffect, useCallback} from 'react';
import axios from '../../axios-orders';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients
  });

  const price = useSelector(state => {
    return state.burgerBuilder.totalPrice
  });

  const error = useSelector(state => {
    return state.burgerBuilder.error
  });

  const isAuthenticated = useSelector(state => {
    return state.auth.token !== null;
  });

  const dispatch = useDispatch();
  const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemove = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []); // sử dụng useCallback để ngăn việc function này bị re-created, dẫn đến khi component bị re-render, function này cũng bị re-created, gặp tình trạng infinite loop call API ở useEffect tương ứng với componentDidMount
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(async () => {
    await onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = updatingIngredients => {
    const ingredients = {...updatingIngredients};
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push({
      pathname: '/checkout'
    });
  }


  const disabledInfo = {
    ...ings
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null; // init null cho orderSummary
  let burger = <Spinner />; // init với spinner trong thời gian loading ingredients từ backend
  if (ings) { // nếu có ingredients mới render burger và orderSummary
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemove}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          price={price}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Aux>
    )
    orderSummary = <OrderSummary
      ingredients={ings}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={price}
    />
  }
  return(
    <Aux>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

export default withErrorHandler(burgerBuilder, axios); // BurgerBuilder is WrappedComponent
