import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux'; // combineReducers là func nhận vào js object mapping các reducers thành các slices của state như là các input và sẽ merges tất cả thành một reducer và 1 state cho chúng ta (như chúng ta làm ban đầu)
import { Provider } from 'react-redux';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
});
const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root')); // đây là một helper component để inject store vào React component
registerServiceWorker();
