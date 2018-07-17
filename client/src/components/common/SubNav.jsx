import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './subNav.scss';

const Subnav = ({ currentPage }) => (
  <div className="m-nav bgc2">
    <ul>
      <li><Link to="/" href="#" className={currentPage === 'home' ? 'active-nav home-link' : 'home-link'}><i className="fas fa-lg fa-home" /></Link></li>
      <li><Link to="/people" className={currentPage === 'people' ? 'active-nav people-link' : 'people-link'} href="#"><i className="fas fa-lg fa-users"></i></Link></li>
      <li><Link to="/search" className={currentPage === 'search' ? 'active-nav search-link hide-on-med-and-up' : 'search-link hide-on-med-and-up'} href="#"><i className="fas fa-lg fa-search"></i></Link></li>
      {/* <li><Link to="/publicprofile" className={currentPage === 'profile' ? 'active-nav profile-link' : 'profile-link'} href="#"><i className="fas fa-user"></i></Link></li> */}
      <li><Link to="/date-requests" className={currentPage === 'daterequests' ? 'active-nav request-link' : 'request-link'} href="#"><i className="fa-lg fas fa-inbox"></i></Link></li>
    </ul>
  </div>
);

Subnav.propTypes = {
  currentPage: PropTypes.string
};

export default Subnav;
