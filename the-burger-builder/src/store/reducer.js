import * as actionTypes from './actions';

const initState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients, // cần phải clone cả các nested object, không chỉ object cha
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1 // syntax để override dynamically property trong JS object
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients, // cần phải clone cả các nested object, không chỉ object cha
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1 // syntax để override dynamically property trong JS object
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    default:
      return state;
  }
}

export default reducer;