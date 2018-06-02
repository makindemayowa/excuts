import React from 'react';

export default props => (
  <div className="col s6 m6 l4">
    <div className="card">
      <div className="card-image">
        <img alt="" className="profile-image" src={props.userInfo.avatar} />
      </div>
      <div className="">
        <i className="far fa-trash-alt delete" />
      </div>
    </div>
  </div>
);
