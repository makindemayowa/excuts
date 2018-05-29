import React from 'react';
import { Link } from 'react-router-dom';
import './userCard.scss';

export default props => (
  <div className="col s12 m6 l3">
    <div className="card">
      <div className="card-image">
        <img className="materialboxed" width="650"  alt={props.userInfo.name} src={props.userInfo.avatar} />
      </div>

      <div className="card-content">
        <div className="save">
          <Link to="/save"> Request Date</Link>
        </div>
        <p className="content-title"><a href="">{props.userInfo.name}, {props.userInfo.age}</a></p>
        <p>{props.userInfo.job}</p>
        <p>{props.userInfo.about}</p>
        <hr />
        <div className="flex">
          <p className="location"><i className="fas fa-map-marker-alt" /> {props.userInfo.location}</p>
        </div>
      </div>
    </div>
  </div>
);
