import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import storage from '../actions/storage';
import Dashboard from '../components/Dashboard.jsx';

const AuthContainer = ({ name, Comp, path, secured, exact }) => {
  const isToken = localStorage.getItem('ays-token');

  if (secured && !isToken) {
    return <Redirect to="/" />
  }

  if (isToken && name === 'login') {
    return <Redirect to="/dashboard" />
  }

  if (!isToken && name === 'login') {
    return <Route
      path={path}
      component={Comp}
      exact={exact}
      name={name}
    />
  }

  return <Route
    path={path}
    render={() => (
      <Dashboard Comp={Comp} />
    )}
    exact={exact}
    name={name}
  />
}

export default AuthContainer;