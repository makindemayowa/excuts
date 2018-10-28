/* eslint-env jquery */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import { resetPasswordRequest } from '../../actions/auth';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    }
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.props
      .resetPasswordRequest({ email: this.state.email })
      .then(() => {
        toastr.success('successful, check your mail to continue')
      })
      .catch((errorData) => {
        toastr.error(errorData.response.data.message)
      });
  }

  render() {
    return (
      <div className="container">
        <div className="login row">
          <form className="loginForm col s12" onSubmit={this.submitForm}>
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
            <button
              className="btn waves-effect waves-light col s12 bottom_margin"
              type="submit"
              name="action"
            >
              Reset Password
            <i className="material-icons right">send</i>
            </button>
          </form>
          <div className="center">
          <Link to="/login">
            Back to login
          </Link>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { resetPasswordRequest })(ResetPassword);

