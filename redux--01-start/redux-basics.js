const redux = require('redux');
const createStore = redux.createStore;

const initState = {
  counter: 0
}

/* Reducer */
const rootReducer = (state = initState, action) => {
  if (action.type === 'INC_COUNTER') {
    return {
      ...state,
      counter: state.counter + 1
    };
  }
  if (action.type === 'ADD_COUNTER') {
    return {
      ...state,
      counter: state.counter + action.value
    };
  }
  return state;
}

/* Store */
// - Store cần được khởi tạo với một reducer, sau tất cả chúng ta chỉ có một reducer ngay cả khi chúng ta combile nhiều reducer
// - Reducer liên kết trực tiếp với store, là thứ duy nhất có thể update state.
const store = createStore(rootReducer);
console.log("First: ", store.getState()); // { counter: 0 }

// Subcription
store.subscribe(() => { // nhận vào 1 callback function được executed mỗi khi state được updated
  console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({
  type: 'INC_COUNTER' // convention
});
store.dispatch({ type: 'ADD_COUNTER', value: 10 });
// console.log("Second: ", store.getState()); // { counter: 11 }
