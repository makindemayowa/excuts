import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import './scss/index.scss';
import AuthContainer from './containers/Auth'
import routes from './Routes';
// var $ = require ('jquery')



// One degree of latitude =  111.66 km or  69.38 mi

// window.navigator.geolocation.getCurrentPosition(function (pos) {
//   console.log(pos.coords.longitude, pos.coords.latitude)
// });
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
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
