/* eslint-env jquery */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import storage from '../../actions/storage'
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import { userSignUpRequest } from '../../actions/auth';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    }
    this.submitSignup = this.submitSignup.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.long = parseFloat(pos.coords.longitude);
      this.lat = parseFloat(pos.coords.latitude);
      const locData = {
        long: parseFloat(pos.coords.longitude),
        lat: parseFloat(pos.coords.latitude)
      }
      storage.setItem('locdata', locData)
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitSignup(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return toastr.error('passwords do not match')
    }
    const userdata = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      loc: {
        type: "Point",
        coordinates: [this.long, this.lat]
      }
    };
    this.props
      .userSignUpRequest(userdata)
      .then(() => {
        toastr.success('signup successful')
        this.setState({ success: this.props.success })
      })
      .catch((errorData) => {
        toastr.error(errorData.response.data.message)
      });
  }

  render() {
    const { success } = this.state;
    if (success) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="container">
        <div className="">
          <div className="signup row">
            <form className="signupForm col s12" onSubmit={this.submitSignup}>
              <div className="input-field col s12">
                <input
                  id="signUpemail"
                  type="email"
                  className="validate"
                  name="email"
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                />
                <label htmlFor="signUpemail">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  type="password"
                  className="validate"
                  name="password"
                  required
                  onChange={this.onChange}
                  value={this.state.password}
                  id="signUpPassword"
                />
                <label htmlFor="signUpPassword">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="signUpPassword2"
                  className="validate"
                  type="password"
                  required
                  name="confirmPassword"
                  onChange={this.onChange}
                  value={this.state.confirmPassword}
                />
                <label htmlFor="signUpPassword2">Confirm Password</label>
              </div>
              <button
                className="btn waves-effect waves-light col s12"
                type="submit"
                name="action"
              >Sign Up
              <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.auth.success,
});

export default connect(mapStateToProps, { userSignUpRequest })(Signup);

