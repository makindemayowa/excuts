import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  const currentId = `${props.id}`;
  return (
    <div className="col s12 m6 l4">
      <div className="eventsContainer">
        <div className="card-panel eventCard">
          {
            (props.currentUser.email === props.event.created_by) &&
            (
              props.event.interested.length ?
                <div>
                  <Link to={`/interests/${currentId}`}>
                    <div className="">
                      {`${props.event.interested.length}${` interest shown`}`}
                    </div>
                  </Link>
                  <br />
                </div> :
                <div>
                  <div className="noInterest">
                    <div className="">
                      {`${props.event.interested.length}${` interest shown`}`}
                    </div>
                  </div>
                </div>
            )
          }
          <div className="bottom_margin" />
          <div className="">
            <span>
              <strong>Date: &nbsp;&nbsp;</strong>
            </span>
            {`${new Date(props.event.date).toDateString()}`}
          </div>
          <div className="">
            <span>
              <strong>State: &nbsp;&nbsp;</strong>
            </span>
            {props.event.state}
          </div>
          <div className="">
            <span>
              <strong>Venue: &nbsp;&nbsp;</strong>
            </span>
            {props.event.location}
          </div>
          <div className="bottom_margin" />
          <div className="action_container">
            {
              (props.currentUser.email === props.event.created_by) &&
              <span>
                <Link className="delete" to={`/event/${currentId}`}>
                  <span className="right cardfooter">
                    delete
                  </span>
                </Link>
              </span>
            }
            <Link className="" to={`/event/${currentId}`}>
              <span className="right more cardfooter">
                read more
              </span>
            </Link>
          </div>
          <div className="bottom_margin" />
        </div>
      </div >
    </div >
  );
};
