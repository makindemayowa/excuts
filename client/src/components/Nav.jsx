import React from 'react';
import Login from './Login.jsx';
import Signup from './Signup';


const NavBar = () => (
  <div>
    <nav>
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo">
          <img
            alt=""
            className="companyLogo"
            src={require('../images/mylogo.png')}
          />
        </a>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><a className="modal-trigger" href="#loginModal">Login</a></li>
          <li><a className="modal-trigger" href="#signupModal">Signup</a></li>
        </ul>
      </div>
    </nav>

    <ul className="sidenav" id="mobile-demo">
      <li><a className="waves-effect waves-light btn modal-trigger" href="#loginModal">Login</a></li>
      <li><a href="badges.html">Signup</a></li>
    </ul>

    <Login />
    <Signup />


  </div>
)

export default NavBar;