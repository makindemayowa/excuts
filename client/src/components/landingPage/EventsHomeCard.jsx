import React from 'react';

export default props => (

  <div className="col s12 m6 l4">
    <div className="eventsContainer">
      <div className="card-panel eventCard">
        <div className="">
          <span>
            <strong>Date: &nbsp;&nbsp;</strong>
          </span>
          {props.event.date}
        </div>
        <div className="">
          <span>
            <strong>Venue: &nbsp;&nbsp;</strong>
          </span>
          {props.event.venue}
        </div>
        <div className="">
          <span>
            <strong>Details: &nbsp;&nbsp;</strong>
          </span>
          {props.event.details}
        </div>
        <div className="">
          <span>
            <strong>Extra: &nbsp;&nbsp;</strong>
          </span>
          {props.event.extra}
        </div>
        <br/>
        <div className="cardfooter">{'Created By: Anonymous'}</div>
      </div>
    </div>
  </div>
);
