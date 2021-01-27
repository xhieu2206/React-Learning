const initState = {
  counter: 0,
  result: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1,
        result: [...state.result] // chúng ta phải thực hiện thêm lại state cho result, vì trong redux state sẽ không được merged mà sẽ override giá trị cũ
      }
    case 'DECREASEMENT':
      return {
        ...state, // update state immutably
        counter: state.counter - 1
      }
    case 'ADD':
      return {
        counter: state.counter + action.payload.value, // counter là một value type nên có thể làm như thế này
        result: [...state.result]
      }
    case 'SUBTRACT':
      return {
        ...state,
        counter: state.counter - action.payload.value
      }
    case 'STORE_RESULT':
      const newState = Object.assign({}, state); // clone the old object, mục đích để update state immutably
      return {
        counter: newState.counter,
        // result: [...newState.result, newState.counter]
        result: state.result.concat({id: (new Date()).toISOString(), value: state.counter}) // đây cũng là 1 cách.
      }
    case 'DELETE_RESULT':
      const id = action.payload.id;
      const newArr = [...state.result];
      const updatedArr = newArr.filter(item => item.id !== id);
      return {
        ...state,
        result: updatedArr
      }
    default:
      return state;
  }
}

export default reducer;
