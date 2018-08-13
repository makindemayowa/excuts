/* eslint-env jquery */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import { updatePasswordRequest } from '../../actions/auth';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      success: false,
      password: '',
      confirmPassword: ''
    }
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    this.token = query.get('t');
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.props
      .updatePasswordRequest({
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        token: this.token
      })
      .then(() => {
        this.setState({ success: true });
      })
      .catch((errorData) => {
        toastr.error(errorData.response.data.message)
      });
  }

  render() {
    if (this.state.success) {
      return <Redirect to="/login" />
    }
    return (
      <div className="container">
        <div className="login row">
          <form className="loginForm col s12" onSubmit={this.submitForm}>
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                name="password"
                required
                onChange={this.onChange}
                value={this.state.password}
                className="validate"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s12">
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
                onChange={this.onChange}
                value={this.state.confirmPassword}
                className="validate"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <button
              className="btn waves-effect waves-light col s12 bottom_margin"
              type="submit"
              name="action"
            >
              Reset Password
            <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, { updatePasswordRequest })(ResetPassword);

