import React from 'react';
import { Link } from 'react-router-dom';
import './userCard.scss';

export default props => {
  const currentId = `${props.userInfo._id}`;
  const noAvatar = require('../../images/noavatar.png')
  return (
    <div className="col s12 m6 l3">
      <div className="card">
        <div className="card-image">
          <img className="materialboxed" width="650" alt={props.userInfo.firstName} src={props.userInfo.profilePhoto || noAvatar} />
        </div>
        <div className="card-content">
          <p className="content-title">
            <Link to={`/publicProfile/${currentId}`}>
              <span className="">
                {`${props.userInfo.firstName}${` `}${props.userInfo.lastName}`}{`, `}
              </span>
            </Link>
            {props.userInfo.age}
          </p>
          <div className="userDetails">
            <p>{props.userInfo.occupation}</p>
          </div>
          <hr />
          <div className="flex">
            <p className="location"><i className="fas fa-map-marker-alt" /> {props.userInfo.state}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
