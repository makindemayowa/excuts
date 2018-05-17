import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App.jsx';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/home" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
