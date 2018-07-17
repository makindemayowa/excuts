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
            <span className="point fb social_log">
              <i className="fab fa-facebook-f" />
            </span>
            <span className="point social_log twi">
              <i className="fab fa-twitter" aria-hidden="true" />
            </span>
            <span className="point social_log goog">
              <i className="fab fa-google" aria-hidden="true" />
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