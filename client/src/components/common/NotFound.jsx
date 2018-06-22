import React from 'react';
import './notfound.scss';

export default props => (
  <div className="notfound">
    <h5>No {`${` `}${props.type}`} found</h5>
  </div>
)