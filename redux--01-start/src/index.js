import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux'; // combineReducers là func nhận vào js object mapping các reducers thành các slices của state như là các input và sẽ merges tất cả thành một reducer và 1 state cho chúng ta (như chúng ta làm ban đầu). applyMiddleware để apply middleware
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
});

const logger = store => {
  return next => {
    return action => { // action chúng ta dispatch. Ở đây chúng ta có thể access đến store và next() function
      console.log('[Middleware] Dispatching', action);
      const result = next(action); // let the action continue to the reducer, và ở đây chúng ta có thể change the action
      console.log('[Middleware] next state', store.getState());
      return result;
    }
  }
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk)); // có thể là một list các middleware, ở đây chúng ta chỉ apply 1 middleware

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root')); // đây là một helper component để inject store vào React component
registerServiceWorker();
