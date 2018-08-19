/* eslint-env jquery */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import storage from '../../actions/storage';
import SocialButton from './SocialButton';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import { userSignUpRequest, socialUserLoginRequest } from '../../actions/auth';

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

  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSocialLogin = (event) => {
    const user = event._profile;
    const locData = storage.getItem('locdata')
    const userdata = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePhoto: user.profilePicURL,
      photos: [user.profilePicURL],
      loc: {
        type: "Point",
        coordinates: [locData.long, locData.lat]
      }
    };
    this.props
      .socialUserLoginRequest(userdata)
      .then(() => {
        toastr.success('registration successful')
      })
      .catch((errorData) => {
        toastr.error(errorData.response.data.message)
      });
  }

  handleSocialLoginFailure = (err) => {
    if (err.message) {
      if (err.message.indexOf('popup_closed_by_user') > -1) {
        return window.location.reload()
      }
    }
    if (err.indexOf('SDK not loaded') > -1) {
      return toastr.error('please try again')
    }
    console.log(err)
    toastr.error('An error occurred')
  }

  submitSignup(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return toastr.error('passwords do not match')
    }
    const locData = storage.getItem('locdata')
    const userdata = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      loc: {
        type: "Point",
        coordinates: [locData.long, locData.lat]
      }
    };
    this.props
      .userSignUpRequest(userdata)
      .then(() => {
        toastr.success('signup successful')
      })
      .catch((errorData) => {
        toastr.error(errorData.response.data.message)
      });
  }

  render() {
    const { success } = this.props;
    if (success) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="container">
        <div className="signup row">
          <div className="signupForm">
            <div className="">
              <form className="col s12" onSubmit={this.submitSignup}>
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
                  className="btn waves-effect waves-light bottom_margin col s12"
                  type="submit"
                  name="action"
                >Sign Up
              <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
            <div className="center forms_divider">
              or
            </div>
            <div className="social_login_container">
              <div className="row">
                <SocialButton
                  provider='facebook'
                  appId='268972600371103'
                  onLoginSuccess={this.handleSocialLogin}
                  onLoginFailure={this.handleSocialLoginFailure}
                  className="waves-effect waves-light btn facebook social-button"
                >
                  <i
                    className="fab fa-facebook-f fa-lg newLogo left"
                    aria-hidden="true"
                  />
                  SIGN IN WITH FACEBOOK
                </SocialButton>
              </div>
              <div className="row">
                <SocialButton
                  provider='google'
                  appId='746132111884-kf33l884cs137i1obkht8535c1nvq3iq.apps.googleusercontent.com'
                  onLoginSuccess={this.handleSocialLogin}
                  onLoginFailure={this.handleSocialLoginFailure}
                  className="waves-effect waves-light btn google social-button"
                >
                  <i className="fab fa-google fa-lg newLogo left" aria-hidden="true" />
                  SIGN IN WITH GOOGLE
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.auth.success,
});

export default connect(mapStateToProps, { userSignUpRequest, socialUserLoginRequest })(Signup);
