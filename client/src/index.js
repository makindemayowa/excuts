import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';
import './scss/index.scss';
import AuthContainer from './containers/Auth'
import routes from './Routes';
const io = require('socket.io-client');

const socket = io.connect();

export default socket;

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            {
              routes.map((route) => (
                <AuthContainer
                  path={route.path}
                  name={route.name}
                  exact={route.exact}
                  Comp={route.component}
                  key={route.path}
                  secured={route.secured}
                />
              ))
            }
          </Switch>
        </div>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
