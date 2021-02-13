import { useCallback, useReducer } from 'react';

const initState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null
}

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier
      }
    case 'RESPONSE':
      return {
        ...httpState,
        loading: false,
        data: action.data,
        extra: action.extra
      }
    case 'CLEAR':
      return initState
    case 'ERROR':
      return {
        loading: false,
        error: action.error
      }
    default: throw new Error('Should never get here!!!');
  }
}

const useHttp = () => {
  const [httpState, dispatchHttpState] = useReducer(httpReducer, initState);

  const clear = useCallback(() => {
    dispatchHttpState({ type: 'CLEAR' });
  }, []);

  const sendRequest = (url, method, body, reqExtra, reqIdentifier) => {
    dispatchHttpState({ type: 'SEND', identifier: reqIdentifier });
    fetch(`${url}`, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then(responseData => {
      dispatchHttpState({
        type: 'RESPONSE',
        data: responseData,
        extra: reqExtra
      })
    }).catch(err => {
      dispatchHttpState({
        type: 'ERROR',
        error: err.message
      });
    });
  }

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clear: clear
  };
}

export default useHttp;
