import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  const requestersId = `${props.daterequest.requester._id}`;
  const currentRequestId = `${props.daterequest._id}`;
  const modalId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9);
  return (
    <div className="requestCard col s12 m6 l6">
      <div className="">
        <div className="card-panel eventCard">
          <div className="requester action">
            <Link to={`/publicProfile/${requestersId}`} className="action">
              <span className="">
                {`${props.daterequest.requester.firstName}`}
              </span>
            </Link>
            <span className="">
              {`${` has requested to take you out`}`}
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
          <div className="bottom_margin" />
          {
            (props.daterequest.status === 'pending' || !props.daterequest.status
          ) &&
            <div className="dateActions">
              <a
                href={`#${currentRequestId}`}
                className="decline action modal-trigger"
              >
                <i className="fas actionicons fa-ban"></i>Decline
              </a>
              <a
                href={`#${modalId}`}
                className="accept action modal-trigger"
              >
                <i className="far actionicons fa-check-circle"></i>Accept
              </a>
            </div>
          }
          {
            props.daterequest.status === 'accepted' &&
            <div className="dateActions">
              <a
                className="accept"
              >
                <i className="far actionicons fa-check-circle"></i>You Accepted
            </a>
            </div>
          }
          {
            props.daterequest.status === 'declined' &&
            <div className="dateActions">
              <a
                className="decline"
              >
                <i className="fas actionicons fa-ban"></i>You Declined
              </a>
            </div>
          }
        </div>
      </div>

      {/* Reject modal */}
      <div id={currentRequestId} className="modal">
        <div className="">
          <i className="right modal-close material-icons">close</i>
          <div className="modal-content">
            <p>Awww, please inform {`${props.daterequest.requester.firstName}${` `}`}
              why this date was declined</p>
          </div>
          <div className="rejectContainer">
            <textarea
              id="rejectionReason"
              name="comment"
              value={props.comment}
              onChange={props.onChange}
              className="materialize-textarea"
              data-length="120"
            />
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              onClick={(e) => props.updateDateStatus(e, currentRequestId, 'declined')}
              className="modal-close waves-effect waves-green btn-flat">
              No Need
          </a>
            <a
              href="#!"
              onClick={(e) => props.updateDateStatus(e, currentRequestId, 'declined')}
              className="modal-close waves-effect waves-green btn-flat">
              Agree
          </a>
          </div>
        </div>
      </div>

      {/* Accept modal */}
      <div id={modalId} className="modal">
        <div className="">
          <i className="right modal-close material-icons">close</i>
          <div className="modal-content">
            <p>Oh yeah!!! <br /> Anything you'll like {`${` `}${props.daterequest.requester.firstName}${` `}`}
              to know before the date?</p>
          </div>
          <div className="rejectContainer">
            <textarea
              id="accepted"
              name="comment"
              value={props.comment}
              onChange={props.onChange}
              className="materialize-textarea"
              data-length="120"
            />
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              onClick={(e) => props.updateDateStatus(e, currentRequestId, 'accepted')}
              className="modal-close waves-effect waves-green btn-flat">
              No Need
          </a>
            <a
              href="#!"
              onClick={(e) => props.updateDateStatus(e, currentRequestId, 'accepted')}
              className="modal-close waves-effect waves-green btn-flat">
              Submit
          </a>
          </div>
        </div>
      </div>
    </div>
  )
}
