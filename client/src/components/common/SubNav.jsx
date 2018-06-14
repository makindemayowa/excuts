import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './subNav.scss';

const Subnav = ({ currentPage }) => (
  <div className="m-nav bgc2">
    <ul>
      <li><Link to="/" href="#" className="home-link"><i className="fas fa-home" /></Link></li>
      <li><Link to="/events" className={currentPage === 'events' ? 'active-nav' : ''} href="#">Events</Link></li>
      <li><Link to="/publicprofile" className={currentPage === 'profile' ? 'active-nav' : ''} href="#">Profile</Link></li>
    </ul>
  </div>
);

Subnav.propTypes = {
  currentPage: PropTypes.string
};

export default Subnav;
