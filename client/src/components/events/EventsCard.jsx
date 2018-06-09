import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  const currentId = `${props.id}`;
  return (
    <div className="col s12 m6 l4">
      <div className="eventsContainer">
        <div className="card-panel eventCard">
          <div className="">
            <span>
              <strong>Title: &nbsp;&nbsp;</strong>
            </span>
            {props.event.title}
          </div>
          <div className="">
            <span>
              <strong>Date: &nbsp;&nbsp;</strong>
            </span>
            {props.event.date}
          </div>
          <div className="">
            <span>
              <strong>Time: &nbsp;&nbsp;</strong>
            </span>
            {props.event.time}
          </div>
          <div className="">
            <span>
              <strong>Venue: &nbsp;&nbsp;</strong>
            </span>
            {props.event.location}
          </div>
          <div className="">
            <span>
              <strong>Details: &nbsp;&nbsp;</strong>
            </span>
            {props.event.details}
          </div>
          <div className="bottom_margin" />
          <Link to={`/event/${currentId}`}>
            <div className="cardfooter right">
              Read more
            </div>
          </Link>
          <div className="bottom_margin" />
        </div>
      </div>
    </div>
  );
};
