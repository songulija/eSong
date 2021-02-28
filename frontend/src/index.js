import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css'
import App from './App.js';
import store from './store.js'
import {Provider} from 'react-redux';//provider just connects our global state(Store) to whole App


ReactDOM.render(//provider just connects our global state(Store) to whole App, and provide store
  <React.StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals