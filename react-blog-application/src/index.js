import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.request.use(request => {
  // console.log(request);
  // Edit request config if needed
  return request;
}, err => {
  console.log('This is the error from request: ', err);
  return Promise.reject(err);
});

axios.interceptors.response.use(response => {
  // console.log(response);
  return response;
}, err => {
  console.log('This is the error from response: ', err);
  return Promise.reject(err);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
