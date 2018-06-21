import React from 'react';
import './loader.scss';

const img = require('../../images/42.gif')

export default props => (
  <div className="loader">
    <div className="bar">
      <div className="circle"></div>
      <p>Loading</p>
    </div>
  </div>
)