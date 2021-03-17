import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from './store/reducers/auth';
import postsReducer from './store/reducers/posts';

import createSagaMiddleware from 'redux-saga';
import { watchPosts } from './store/sagas/postsSaga';
import { watchAuth } from './store/sagas/authSaga';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchPosts);
sagaMiddleware.run(watchAuth);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
