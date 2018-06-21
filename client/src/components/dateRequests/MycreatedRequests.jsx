import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  const requestedsId = `${props.daterequest.requested._id}`;
  return (
    <div className="requestCard col s12 m6 l6">
      <div className="">
        <div className="card-panel eventCard">
          <div className="requester">
            <span className="">
              {`${`You requested to take `}`}
            </span>
            <Link to={`/publicProfile/${requestedsId}`}>
              <span className="">
                {`${props.daterequest.requested.firstName}`}
              </span>
            </Link>
            <span className="">
              {`${` out`}`}
            </span>
          </div>
          <div className="bottom_margin" />
          <div className="">
            <span>
              <b>Date: &nbsp;&nbsp;</b>
            </span>
            <span>
              {`${new Date(props.daterequest.date).toDateString()}`} &nbsp;&nbsp;
            </span>
          </div>
          <div className="">
            <span>
              <b>Venue: &nbsp;&nbsp;</b>
            </span>
            {props.daterequest.venue}
          </div>
          <div className="">
            <span>
              <b>Date description: &nbsp;&nbsp;</b>
            </span>
            {props.daterequest.description}
          </div>
          {
            (props.daterequest.status === 'pending' || !props.daterequest.status
            ) &&
            <div>
              <div className="bottom_margin" />
              <div className="dateActions">
                <a
                  className="decline"
                >
                  No response yet from your date
              </a>
              </div>
            </div>
          }
          {
            props.daterequest.status === 'accepted' &&
            <div>
              <div className="">
                <span>
                  <b>Comment: &nbsp;&nbsp;</b>
                </span>
                {props.daterequest.comment || 'none'}
              </div>
              <div className="bottom_margin" />
              <div className="dateActions">
                <a
                  className="accept"
                >
                  <i className="far actionicons fa-check-circle"></i>{`${props.daterequest.requested.firstName}${` `}`}Accepted
              </a>
              </div>
            </div>
          }
          {
            props.daterequest.status === 'declined' &&
            <div>
              <div className="">
                <span>
                  <b>Comment: &nbsp;&nbsp;</b>
                </span>
                {props.daterequest.comment || 'none'}
              </div>
              <div className="bottom_margin" />
              <div className="dateActions">
                <a
                  className="decline"
                >
                  <i className="fas actionicons fa-ban"></i>{`${props.daterequest.requested.firstName}${` `}`}Declined
              </a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
