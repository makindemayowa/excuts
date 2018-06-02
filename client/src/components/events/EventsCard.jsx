import React from 'react';
import { Link } from 'react-router-dom';

export default props => (

  <div className="col s12 m6 l4">
    <div className="eventsContainer">
      <div className="card-panel eventCard">
        <div className="">
          <span>
            <strong>Time: &nbsp;&nbsp;</strong>
          </span>
          {props.event.time}
        </div>
        <div className="">
          <span>
            <strong>Date: &nbsp;&nbsp;</strong>
          </span>
          {props.event.date}
        </div>
        <div className="">
          <span>
            <strong>Details: &nbsp;&nbsp;</strong>
          </span>
          {props.event.details}
        </div>
        <div className="">
          <span>
            <strong>Venue: &nbsp;&nbsp;</strong>
          </span>
          {props.event.venue}
        </div>
        <div className="">
          <span>
            <strong>Preference: &nbsp;&nbsp;</strong>
          </span>
          {props.event.preference}
        </div>
        <div className="">
          <span>
            <strong>Extra: &nbsp;&nbsp;</strong>
          </span>
          {props.event.extra}
        </div>
        <div className="bottom_margin" />
        <Link to="/profile">
          <div className="cardfooter">
            {`Created By: ${props.event.createdBy}`}
          </div>
        </Link>
      </div>
      <ul className="collapsible">
        <li>
          <div className="collapsible-header text-center">
            <i className="material-icons">message</i>
            {`Reviews for ${props.event.createdBy}`}</div>
          <div className="collapsible-body">
            <div className="row">
              <div className="">
                <textarea
                  placeholder="Add review..."
                  id="textarea1"
                  className="materialize-textarea"
                  data-length="120"
                />
              </div>
              <div className="bottom_margin" />
              <div className="row ">
                <button className="col s6 m5 l4 waves-effect right waves-light btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
);
