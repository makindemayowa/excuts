import React from 'react';

const Footer = () => (
  <footer className="page-footer">
    <div className="container">
      <div className="row">
        <div className="col l12 s12">
          <div className="social">
            <span className="log">
              Follow us on social media
            </span>
            {/* <span className="point fb social_log">
              <a target="_blank" rel="noopener noreferrer" className="grey-text text-lighten-3" href="/safety"><i className="fab fa-facebook-f" /></a>
            </span> */}
            <span className="point social_log twi">
              <a target="_blank" rel="noopener noreferrer" className="grey-text text-lighten-3" href="https://twitter.com/excuts1"><i className="fab fa-twitter" aria-hidden="true" /></a>
            </span>
            <span className="point social_log instagram">
              <a target="_blank" rel="noopener noreferrer" className="grey-text text-lighten-3" href="https://www.instagram.com/e_x_c_u_t_s/"><i className="fab fa-instagram" aria-hidden="true" /></a>
            </span>
          </div>
        </div>
        <div className="col l6 m6 s6">
          <ul>
            <li><a className="grey-text text-lighten-3" href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="col l6 m6 s6">
          <ul>
            <li><a className="grey-text text-lighten-3" href="/safety">Safety</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright center">
      <div className="container">
        © 2018 Rent-a-Date
      </div>
    </div>
  </footer>
)

export default Footer;