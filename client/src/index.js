import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './styles/index.css';
import Routes from './Routes';

const url = '/api/user';

// fetch(url)
//   .then((resp) => resp.json()) // Transform the data into json
//   .then(function (data) {
//     console.log(data)
//   })

ReactDOM.render(
  <Provider store={store()}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
