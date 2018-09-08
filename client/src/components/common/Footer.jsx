import React from 'react';

const Footer = () => (
  <footer className="page-footer">
    <div className="">
      <div className="flex__container">
        <div className="contact_c">
          <ul>
            <li><a className="grey-text text-lighten-3" href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="safety_c">
          <ul>
            <li><a className="grey-text text-lighten-3" href="/safety">Safety</a></li>
          </ul>
        </div>
        <div className="social__container social">
          <span className="log">
            Follow us on social media
            </span>
          <span className="point social_log twi">
            <a target="_blank" rel="noopener noreferrer" className="grey-text text-lighten-3" href="https://twitter.com/excuts1"><i className="fab fa-twitter" aria-hidden="true" /></a>
          </span>
          <span className="point social_log instagram">
            <a target="_blank" rel="noopener noreferrer" className="grey-text text-lighten-3" href="https://www.instagram.com/e_x_c_u_t_s/"><i className="fab fa-instagram" aria-hidden="true" /></a>
          </span>
        </div>
        <div className="footer-copyright">
            © 2018 Rent-a-Date
        </div>
      </div>
    </div>
  </footer>
)

export default Footer;