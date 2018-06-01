import React from 'react';
import { NavLink } from 'react-router-dom';
import Login from '../landingPage/Login';
import Signup from '../landingPage/Signup';
import { Link } from 'react-router-dom';
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
          <li><Link to="/" href="#" className="home-link"><i className="far fa-bell"></i></Link></li>
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
    </ul>
    <Login />
    <Signup />
  </div>
)

export default NavBar;