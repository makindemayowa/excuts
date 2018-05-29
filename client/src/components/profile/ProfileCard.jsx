import React from 'react';
import { Link } from 'react-router-dom';
// import './userCard.scss';

export default props => (
  <div className="col s6 m6 l4">
    <div className="card">
      <div className="card-image">
        <img className="profile-image" src={props.userInfo.avatar} />
      </div>
      <div className="">
        <i className="far fa-trash-alt delete"></i>
      </div>
    </div>
  </div>
);
