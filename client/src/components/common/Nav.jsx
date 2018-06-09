/*global M*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import socket from '../../index';
import Login from '../landingPage/Login';
import Signup from '../landingPage/Signup';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth'

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      logged: true,
      notifications: [{
        message: `is interested in your event`
      }]
    }
    this.logout = this.logout.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
    this.sidenav = '';
  }
  componentDidMount() {
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

  logout() {
    this.props.logout().then(() => {
      this.setState({
        logged: this.props.islogged
      })
    });
  }

  render() {
    const { logged } = this.state;
    // const notificationsCount = this.state.notifications.length;
    const notificationsCount = 3;
    if (!logged) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <nav className="nav-extended">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              <img
                alt=""
                className="companyLogo"
                src={require('../../images/takemeout.png')}
              />
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
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
        <ul id='dropdown1' class='dropdown-content'>
        {
          this.state.notifications.map((notification) => <li>
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
        {this.props.state && (
          <div>
            <Login
              onChange={this.props.onChange}
              onSubmit={this.props.submitLogin}
              state={this.props.state}
            />
            <Signup
              onChange={this.props.onChange}
              onSubmit={this.props.submitSignup}
              state={this.props.state}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  islogged: state.auth.islogged,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
