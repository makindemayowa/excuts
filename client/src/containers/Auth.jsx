import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import DashboardContainer from '../components/dashboard/DashboardContainer';

const AuthContainer = ({ name, Comp, path, secured, exact }) => {
  const isToken = localStorage.getItem('token');

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
      <DashboardContainer Comp={Comp} />
    )}
    exact={exact}
    name={name}
  />
}

export default AuthContainer;