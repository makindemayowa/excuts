/* eslint-env jquery */
/*global M*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import toastr from 'toastr';
import socket from '../../index';
import Login from '../landingPage/Login';
import Signup from '../landingPage/Signup';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import storage from '../../actions/storage'
import Loader from './Loader'
import { userSignUpRequest, userLoginRequest } from '../../actions/auth';

const imgUrl = require('../../images/noavatar.png')

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      logged: true,
      notifications: [{
        message: `is interested in your event`
      }],
      email: '',
      password: '',
      confirmPassword: '',
      success: false,
      isLogged: false,
      loading: false,
      profilePhoto: imgUrl
    }
    this.logout = this.logout.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sidenav = '';
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
    const authModals = document.querySelectorAll('.authModal');
    M.Modal.init(authModals, {
      onCloseEnd: () => {
        this.setState({
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    });
    this.setState({
      loading: false,
      profilePhoto: this.props.user.profilePhoto
    });
    const elems = document.querySelectorAll('.sidenav');
    this.sidenav = M.Sidenav.init(elems);
    // const dropdown = document.querySelectorAll('.dropdown-trigger');
    // M.Dropdown.init(dropdown);
    socket.on('user_interested', (msg) => this.handleNotification(msg));
  }

  handleNotification(msg) {
    const user = this.props.user;
    if (msg.owner === user.id) {
      this.state.notifications.push({
        message: `${msg.user} is interested in your event`
      })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  closeModal(e) {
    e.preventDefault();
    const signupModal = document.getElementById('signupModal');
    const instance = M.Modal.getInstance(signupModal);
    instance.close(signupModal);
  }

  submitLogin(e) {
    const elem = document.querySelector('#loginModal');
    const instance = M.Modal.getInstance(elem);
    e.preventDefault();
    const userdata = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props
      .userLoginRequest(userdata)
      .then(() => {
        instance.close();
        toastr.success('login successful')
        this.setState({ isLogged: this.props.isLogged });
      })
      .catch((errorData) => {
        toastr.error(errorData.response.data.message)
      });
  }

  submitSignup(e) {
    const elem = document.querySelector('#signupModal');
    const instance = M.Modal.getInstance(elem);
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
        instance.close()
        this.setState({ success: this.props.success })
      })
      .catch((errorData) => {
        toastr.error(errorData.response.data.message)
      });
  }

  logout() {
    this.props.logout().then(() => {
      this.setState({
        logged: this.props.islogged
      })
    });
  }

  render() {
    const { logged, loading, profilePhoto } = this.state;
    // const notificationsCount = this.state.notifications.length;
    // const notificationsCount = 3;
    if (!logged) {
      return <Redirect to="/" />
    }
    return (
      <div>
        {
          loading ? <Loader /> :
            <div className="">
              <nav className="nav-extended">
                <div className="nav-wrapper">
                  <Link to="/" className="brand-logo companyLogo">
                    {/* <img
                      alt=""
                      className="companyLogo"
                      src={require('../../images/takemeout.png')}
                    /> */}
                    eXcuts
                  </Link>
                  <a to="/publicprofile" data-target="slide-out" className="sidenav-trigger">
                    <div className="imageContainer">
                      <img className="circle profileImage" src={profilePhoto} alt="" />
                    </div>
                  </a>
                  {
                    this.props.isAuthenticated ? (
                      <ul className="right hide-on-med-and-down">
                        <li><Link to="#" onClick={this.logout}>Logout</Link></li>
                        <li><Link
                          to="#"
                          // data-target='dropdown1'
                          className="dropdown-trigger home-link"
                        // onKeyDown={() => this.setState({
                        //   notifications: []
                        // })}
                        >
                          <i className="far fa-bell"></i>
                        </Link>
                          {/* <span className="red-text">{notificationsCount > 0 && notificationsCount}</span> */}
                        </li>
                      </ul>
                    ) :
                      <ul className="right hide-on-med-and-down">
                        <li><a className="modal-trigger" href="#loginModal">Login</a></li>
                        <li><a className="modal-trigger" href="#signupModal">Register</a></li>
                      </ul>
                  }
                </div>
              </nav>
              {/* <ul id='dropdown1' className='dropdown-content'>
                {
                  this.state.notifications.map((notification) => <li key={notification.message}>
                    {notification.message}
                  </li>)
                }
              </ul> */}
              <ul className="sidenav" id="slide-out">
                {
                  this.props.user.status === 'verified' && (
                    <div>
                      <li>
                        <NavLink
                          to="/"
                          activeClassName="clicked"
                          className="sidenav-close"
                        ><i className="button-collapse fas fa-home nav-icon" /><span>Home</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/publicprofile"
                          activeClassName="clicked"
                          className="sidenav-close"
                        ><i className="button-collapse fas fa-user nav-icon" /><span>Profile</span>
                        </NavLink>
                      </li>
                    </div>
                  )
                }
                {
                  (this.props.user.status === 'pending' || this.props.success) ? (
                    <div>
                      <li>
                        <NavLink
                          to="/contact"
                          activeClassName="clicked"
                          className="sidenav-close"
                        ><i className="far fa-comment nav-icon"></i><span>Contact Us</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/safety"
                          className="sidenav-close"
                          activeClassName="clicked"
                        ><i className="fas fa-user-secret nav-icon"></i><span>Safety</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={this.logout}
                          to="#"
                          className="sidenav-close"
                          activeClassName="clicked"
                        ><i className="fas fa-sign-out-alt nav-icon"></i><span>Logout</span>
                        </NavLink>
                      </li>
                    </div>
                  ) : (
                      <div>
                        <li>
                          <NavLink
                            to="/"
                            activeClassName="clicked"
                            className="sidenav-close"
                          ><i className="fas fa-home nav-icon" /><span>Home</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="#loginModal"
                            className="modal-trigger sidenav-close"
                            activeClassName="clicked"
                          ><i className="fas fa-sign-in-alt nav-icon" /><span>Login</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="#signupModal"
                            className="modal-trigger sidenav-close"
                            activeClassName="clicked"
                          ><i className="fas fa-user-plus nav-icon" /><span>Signup</span>
                          </NavLink>
                        </li>
                      </div>
                    )
                }
              </ul>
              <div>
                <Login
                  onChange={this.onChange}
                  onSubmit={this.submitLogin}
                  state={this.state}
                />
                <Signup
                  onChange={this.onChange}
                  onSubmit={this.submitSignup}
                  state={this.state}
                  closeModal={this.closeModal}
                />
              </div>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.auth.success,
  isAuthenticated: state.auth.isAuthenticated,
  islogged: state.auth.islogged,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout, userSignUpRequest, userLoginRequest })(NavBar);
