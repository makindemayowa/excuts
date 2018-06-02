import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import DashboardContainer from '../components/dashboard/DashboardContainer';
const jwt = require('jsonwebtoken');

class AuthContainer extends Component {
  render() {
    const token = localStorage.getItem('tmo_token');
    let isAuthenticated = false;
    let user = {};
    if (token) {
      const decoded = jwt.decode(token)
      user = decoded.userDetails
      isAuthenticated = decoded.exp > Date.now() / 1000;
    }
  
    if (!isAuthenticated && (this.props.name === 'home' || this.props.name === 'verifymail')) {
      return <Route
        path={this.props.path}
        component={this.props.Comp}
        exact={this.props.exact}
        name={this.props.name}
      />
    }

    if (isAuthenticated && (this.props.name === 'verifymail')) {
      return <Route
        path={this.props.path}
        component={this.props.Comp}
        exact={this.props.exact}
        name={this.props.name}
      />
    }
  
    if (this.props.name === 'verify') {
      if(this.props.success) {
        return <Route
        path={this.props.path}
        component={this.props.Comp}
        exact={this.props.exact}
        name={this.props.name}
      />
      }
    }
  
    if (this.props.secured && !isAuthenticated) {
      return <Redirect to="/" />
    }
  
    if (isAuthenticated && user.status === 'pending') {
      console.log('hereeeee 444444')
      if (this.props.name === 'verify') {
        return <Route
          path={this.props.path}
          component={this.props.Comp}
          exact={this.props.exact}
          name={this.props.name}
        />
      }
      return <Redirect to="/verify" />
    }
  
    if (isAuthenticated && this.props.name === 'home') {
      return <Redirect to="/dashboard" />
    }
  
    return <Route
      path={this.props.path}
      render={() => (
        <DashboardContainer Comp={this.props.Comp} />
      )}
      exact={this.props.exact}
      name={this.props.name}
    />
  }
}

const mapStateToProps = state => ({
  success: state.auth.success,
  isLogged: state.auth.isLogged
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);