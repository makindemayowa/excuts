/* eslint-env jquery */
/*global M*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import socket from '../../index';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import storage from '../../actions/storage'
import Loader from './Loader'

const imgUrl = require('../../images/noavatar.png')

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      logged: true,
      notifications: [{
        message: `is interested in your event`
      }],
      success: false,
      isLogged: false,
      loading: false,
      profilePhoto: imgUrl
    }
    this.logout = this.logout.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
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
    this.setState({
      loading: false,
      profilePhoto: this.props.user.profilePhoto || imgUrl
    });
    const elems = document.querySelectorAll('.sidenav');
    this.sidenav = M.Sidenav.init(elems);
    $('.dropdown-trigger').dropdown({
      inDuration: 600,
      outDuration: 225,
      hover: true
    });
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

  logout() {
    this.props.logout().then(() => {
      this.setState({
        logged: this.props.islogged
      })
    });
  }

  render() {
    const { loading, profilePhoto } = this.state;
    // const notificationsCount = this.state.notifications.length;
    // const notificationsCount = 3;
    return (
      <div>
        {
          loading ? <Loader /> :
            <div className="">
              <nav className="nav-extended">
                <div className="nav-wrapper">
                  <Link to="/" className="brand-logo companyLogo">
                    eXcuts
                  </Link>
                  <a data-target="slide-out" className="sidenav-trigger">
                    <div className="imageContainer">
                      <img className="circle profileImage" src={profilePhoto} alt="" />
                    </div>
                  </a>
                  <ul id="navDropdown" className="dropdown-content">
                    {/* <li><Link
                      to="#"
                    data-target='dropdown1'
                    className="dropdown-trigger home-link"
                    onKeyDown={() => this.setState({
                      notifications: []
                    })}
                    >
                      <i className="far fa-bell"></i>
                    </Link>
                      <span className="red-text">{notificationsCount > 0 && notificationsCount}</span>
                    </li> */}
                    <li><Link to="/publicprofile"><i className="button-collapse fas fa-user nav-icon" />Profile</Link></li>
                    <li><Link to="/safety"><i className="fas fa-user-secret nav-icon"></i>Safety</Link></li>
                    <li><Link to="/contact"><i className="far fa-comment nav-icon"></i>Contact us</Link></li>
                    <li><Link to="#" onClick={this.logout}><i className="fas fa-sign-out-alt nav-icon"></i>Logout</Link></li>
                  </ul>
                  {
                    this.props.isAuthenticated ? (
                      <ul className="right hide-on-med-and-down">

                        <li>
                          <a className="dropdown-trigger" data-beloworigin="true" data-target="navDropdown">
                            <div className="b-s-imageContainer">
                              <img className="circle profileImage" src={profilePhoto} alt="" />
                            </div>
                          </a>
                        </li>
                      </ul>
                    ) :
                      <ul className="right hide-on-med-and-down">
                        <li><Link className="modal-trigger" to="/login">Login</Link></li>
                        <li><Link className="modal-trigger" to="/signup">Register</Link></li>
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
                  this.props.isAuthenticated && (
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
                  (this.props.isAuthenticated && (this.props.user.status === 'pending' || this.props.success)) ? (
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
                            to="/login"
                            className="modal-trigger sidenav-close"
                            activeClassName="clicked"
                          ><i className="fas fa-sign-in-alt nav-icon" /><span>Login</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/signup"
                            className="modal-trigger sidenav-close"
                            activeClassName="clicked"
                          ><i className="fas fa-user-plus nav-icon" /><span>Signup</span>
                          </NavLink>
                        </li>
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
                      </div>
                    )
                }
              </ul>
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

export default connect(mapStateToProps, { logout })(NavBar);
