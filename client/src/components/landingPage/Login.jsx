/* eslint-env jquery */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import toastr from 'toastr';
import SocialButton from './SocialButton';
import storage from '../../actions/storage'
import { userLoginRequest, socialUserLoginRequest } from '../../actions/auth';

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

  handleSocialLogin = (event) => {
    const user = event._profile;
    const userdata = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePhoto: user.profilePicURL,
      photos: [user.profilePicURL],
      loc: {
        type: "Point",
        coordinates: [this.long, this.lat]
      }
    };
    this.props
      .socialUserLoginRequest(userdata)
      .then(() => {
        toastr.success('login successful')
        this.setState({ isLogged: true });
      })
      .catch((errorData) => {
        toastr.error(errorData.response.data.message)
      });
  }

  handleSocialLoginFailure = (err) => {
    toastr.error(err)
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
          <div className="loginForm">
            <form className="col s12" onSubmit={this.submitLogin}>
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
                className="btn waves-effect waves-light col s12 bottom_margin"
                type="submit"
                name="action"
              >
                Sign in
            <i className="material-icons right">send</i>
              </button>
            </form>
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
            <div className="center">
              <Link to="/reset-password">
                forgot password?
              </Link>
            </div>
          </div>

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

export default connect(mapStateToProps, { userLoginRequest, socialUserLoginRequest })(Login);

