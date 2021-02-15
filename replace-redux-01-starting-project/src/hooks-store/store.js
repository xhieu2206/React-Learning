import { useState, useEffect } from 'react';

let globalState = {};
let listeners = []; // là một list các functions mà chúng ta sẽ call để update all component using hook này.
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload); // concept tương tự với redux, chúng ta sẽ trả về một new state tương ứng với mối action được dispatch
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    // cleanup listeners
    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    }
  }, [setState, shouldListen]);

  return [globalState, dispatch]; // gần tương tự với những gì mà useReducer return về cho chúng ta. Tuy nhiên useReducer không thích hợp để manage state giữa các component, do đó chúng ta sử dụng một custom hook của riêng chúng ta.
};

export const initStore = (userActions, initState) => {
  if (initState) {
    globalState = { ...globalState, ...initState};
  }
  actions = { ...actions, ...userActions};
}
