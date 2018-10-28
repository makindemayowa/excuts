/* eslint-env jquery */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import toastr from 'toastr';
import Loader from '../common/Loader';
import SocialButton from './SocialButton';
import storage from '../../actions/storage'
import { userLoginRequest, socialUserLoginRequest } from '../../actions/auth';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: true,
      loadingSocial: false
    }
    this.nodes = {}
    this.submitLogin = this.submitLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  setNodeRef(provider, node) {
    if (node) {
      this.nodes[provider] = node
    }
  }

  handleSocialLogin = (event) => {
    this.setState({
      loading: true,
      loadingSocial: true
    })
    const locData = storage.getItem('locdata')
    const provider = event._provider;
    const token = provider === 'google' ? event._token.idToken : event._token.accessToken
    let userdata;
    if (provider === 'facebook') {
      const user = event._profile;
      userdata = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePhoto: user.profilePicURL,
        photos: [user.profilePicURL],
        provider,
        token,
        loc: {
          type: "Point",
          coordinates: [locData.long, locData.lat]
        }
      };
    } else if (provider === 'google') {
      userdata = {
        provider,
        token,
        loc: {
          type: "Point",
          coordinates: [locData.long, locData.lat]
        }
      };
    }
    this.props
      .socialUserLoginRequest(userdata)
      .then(() => {
        this.setState({
          loading: false,
          loadingSocial: false
        })
        toastr.success('login successful')
      })
      .catch((errorData) => {
        this.setState({
          loading: false,
          loadingSocial: false
        })
        toastr.error(errorData.response.data.message || 'An error occurred')
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
    return toastr.error('An error occurred')
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitLogin(e) {
    e.preventDefault();
    this.setState({
      loading: true
    })
    const userdata = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props
      .userLoginRequest(userdata)
      .then(() => {
        this.setState({
          loading: false
        })
        toastr.success('login successful')
      })
      .catch((errorData) => {
        this.setState({
          loading: false
        })
        toastr.error(errorData.response.data.message)
      });
  }

  render() {
    const { isLogged } = this.props;
    const { loadingSocial } = this.state;
    if (isLogged) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="container">
        <div className="login row">
          {
            loadingSocial ? <Loader /> :
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
                    disabled={this.state.loading}
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
                      getInstance={this.setNodeRef.bind(this, 'google')}
                      key={'google'}
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
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { userLoginRequest, socialUserLoginRequest })(Login);

