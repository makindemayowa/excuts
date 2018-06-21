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
import Loader from './Loader'
import { userSignUpRequest, userLoginRequest } from '../../actions/auth';

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
    }
    this.logout = this.logout.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sidenav = '';
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.long = parseFloat(pos.coords.longitude);
      this.lat = parseFloat(pos.coords.latitude);
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
    });
    const elems = document.querySelectorAll('.sidenav');
    this.sidenav = M.Sidenav.init(elems);
    const dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown);
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
    const { logged, loading } = this.state;
    // const notificationsCount = this.state.notifications.length;
    const notificationsCount = 3;
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
                  <Link to="/" className="brand-logo">
                    <img
                      alt=""
                      className="companyLogo"
                      src={require('../../images/takemeout.png')}
                    />
                  </Link>
                  <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                  {
                    this.props.isAuthenticated ? (
                      <ul className="right hide-on-med-and-down">
                        <li><Link to="#" onClick={this.logout}>Logout</Link></li>
                        <li><Link
                          to="/"
                          href="#"
                          data-target='dropdown1'
                          className="dropdown-trigger home-link"
                          onKeyDown={() => this.setState({
                            notifications: []
                          })}
                        >
                          <i className="far fa-bell"></i>
                        </Link>
                          <span className="red-text">{notificationsCount > 0 && notificationsCount}</span>
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
              <ul id='dropdown1' className='dropdown-content'>
                {
                  this.state.notifications.map((notification) => <li key={notification.message}>
                    {notification.message}
                  </li>)
                }
              </ul>
              <ul className="sidenav" id="mobile-demo">
                {
                  this.props.user.status === 'verified' && (
                    <div>
                      <li>
                        <NavLink
                          to="/"
                          activeClassName="clicked"
                        ><i className="fas fa-home nav-icon" /><span>Home</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/search-event"
                          activeClassName="clicked"
                        ><i className="fas fa-search nav-icon" /><span>Search Events</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/search-escort"
                          activeClassName="clicked"
                        ><i className="fas fa-search nav-icon" /><span>Search Escorts</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/notifications"
                          activeClassName="clicked"
                        ><i className="far fa-bell nav-icon"></i><span>Notifications</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/events"
                          activeClassName="clicked"
                        ><i className="fas fa-suitcase nav-icon" /><span>Events</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/new-event"
                          activeClassName="clicked"
                        ><i className="fas fa-tag nav-icon" /><span>Create Event</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/publicprofile"
                          activeClassName="clicked"
                        ><i className="fas fa-rss nav-icon" /><span>Profile</span>
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
                          onClick={this.logout}
                          to="#"
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
                          ><i className="fas fa-home nav-icon" /><span>Home</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="#loginModal"
                            className="modal-trigger"
                            activeClassName="clicked"
                          ><i className="fas fa-sign-in-alt nav-icon" /><span>Login</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="#signupModal"
                            className="modal-trigger"
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
