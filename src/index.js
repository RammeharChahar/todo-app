import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import Provider component to wrap our application
import { Provider } from 'react-redux';
//import redux store and provide access to all components
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


