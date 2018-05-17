import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';

const url = '/api/user';

fetch(url)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function (data) {
    console.log(data)
  })

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
