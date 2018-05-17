import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './styles/index.css';
import App from './components/App.jsx';

const url = '/api/user';

// fetch(url)
//   .then((resp) => resp.json()) // Transform the data into json
//   .then(function (data) {
//     console.log(data)
//   })

ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
