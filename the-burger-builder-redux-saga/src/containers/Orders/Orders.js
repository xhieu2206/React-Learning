import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const orders = props => {
  const {onFetchOrders} = props;
  useEffect(() => {
    onFetchOrders(props.token, props.userId);
  }, [props])


  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map(order => {
      return (
        <Order
          key={order.id}
          price={order.price}
          ingredients={order.ingredients}
        />
      )
    });
  }
  return (
    <div>
      {orders}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrder(token, userId))
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
