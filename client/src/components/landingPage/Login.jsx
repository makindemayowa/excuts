/* eslint-env jquery */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import { userLoginRequest } from '../../actions/auth';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      success: false,
      isLogged: false,
      loading: false,
    }
    this.submitLogin = this.submitLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({ isLogged: this.props.isLogged });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitLogin(e) {
    e.preventDefault();
    const userdata = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props
      .userLoginRequest(userdata)
      .then(() => {
        toastr.success('login successful')
        this.setState({ isLogged: true });
      })
      .catch((errorData) => {
        toastr.error(errorData.response.data.message)
      });
  }

  render() {
    const { isLogged } = this.state;
    if (isLogged) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="container">
        <div className="login row">
          <form className="loginForm col s12" onSubmit={this.submitLogin}>
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                name="email"
                required
                onChange={this.onChange}
                value={this.state.email}
                className="validate"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                id="loginPassword"
                type="password"
                name="password"
                required
                onChange={this.onChange}
                value={this.state.password}
                className="validate" />
              <label htmlFor="loginPassword">Password</label>
            </div>
            <button
              className="btn waves-effect waves-light col s12"
              type="submit"
              name="action"
            >
              Login
            <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.auth.success,
  isLogged: state.auth.isLogged,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { userLoginRequest })(Login);

