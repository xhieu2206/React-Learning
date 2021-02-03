import React from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => {
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
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrder(token))
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
