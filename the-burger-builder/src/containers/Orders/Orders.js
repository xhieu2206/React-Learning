import React from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    axios.get(`https://react-burger-builder-64bad-default-rtdb.firebaseio.com/orders.json`)
      .then(({data}) => {
        const orderArr = [];
        for (const key in data) {
          orderArr.push({
            ...data[key],
            id: key
          });
        }
        this.setState({
          orders: [...orderArr],
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      });
  }

  render() {
    let orders = <Spinner />;
    if (this.state.orders.length > 0) {
      orders = this.state.orders.map(order => {
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

export default withErrorHandler(Orders, axios);
