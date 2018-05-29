import React from 'react';
import { NavLink } from 'react-router-dom';
import Login from '../landingPage/Login';
import Signup from '../landingPage/Signup';
import SubNav from './SubNav';


const NavBar = () => (
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
        <ul className="right hide-on-med-and-down">
          <li><a className="modal-trigger" href="#loginModal">Login</a></li>
          <li><a className="modal-trigger" href="#signupModal">Register</a></li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav" id="mobile-demo">
      <li>
        <NavLink
          to="/"
          activeClassName="clicked"
        ><i className="fas fa-home nav-icon" /><span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/discover"
          activeClassName="clicked"
        ><i className="fas fa-search nav-icon" /><span>Blog</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/activities"
          activeClassName="clicked"
        ><i className="fas fa-fire nav-icon" /><span>Notifications</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/jobs"
          activeClassName="clicked"
        ><i className="fas fa-suitcase nav-icon" /><span>Search</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pricing"
          activeClassName="clicked"
        ><i className="fas fa-tag nav-icon" /><span>Blog</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Blog"
          activeClassName="clicked"
        ><i className="fas fa-rss nav-icon" /><span>Blog</span>
        </NavLink>
      </li>
    </ul>
    <Login />
    <Signup />
  </div>
)

export default NavBar;