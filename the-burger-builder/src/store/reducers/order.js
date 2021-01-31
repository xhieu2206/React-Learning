import * as actionTypes from '../actions/actionTypes';

const initState = {
  orders: [],
  loading: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      }
      return {
        ...reducer,
        loading: false,
        orders: state.orders.concat(newOrder)
      }
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}

export default reducer;
