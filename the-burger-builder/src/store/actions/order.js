import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart()); // execute trước khi send post request
    axios.post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrderSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrderFailed = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  }
}

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrder = (token, userId) => {
  // có thể dùng
  // return (dispatch, getState) => {}
  // để lấy giá trị của token vì chúng ta có store token bằng redux, tuy nhiên cách này là không khuyến khích
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get(`https://react-burger-builder-64bad-default-rtdb.firebaseio.com/orders.json${queryParams}`)
      .then(({data}) => {
        const orderArr = [];
        for (const key in data) {
          orderArr.push({
            ...data[key],
            id: key
          });
        }
        dispatch(fetchOrderSuccess(orderArr));
      })
      .catch(err => {
        dispatch(fetchOrderFailed(err));
      });
  }
}
