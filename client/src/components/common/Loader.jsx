import React from 'react';
import './loader.scss';

export default props => (
  <div className="loader">
    {/* <div className="bar">
      <div className="circle"></div>
      <p>Loading</p>
    </div> */}
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  </div>
)