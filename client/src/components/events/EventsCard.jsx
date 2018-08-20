import React from 'react';
import { Link } from 'react-router-dom';
import imgUrl from '../../images/datenight.jpg';

export default props => {
  const currentId = `${props.id}`;
  return (
    <div className="col s12 m12 l12">
      <div className="eventsContainer">
        <div className="card eventCard">
          <div className="bottom_margin" />
          <div className="imageContainer">
            <img className="circle profileImage" src={props.event.imgUrl || imgUrl} alt="" />
          </div>
          <div className="detailsContainer">
            {
              (props.currentUser.email === props.event.created_by) &&
              (
                props.event.interested.length ?
                  <div>
                    <div className="bottom_margin" />
                    <Link to={`/interests/${currentId}`}>
                      <div className="">
                        {`${props.event.interested.length}${` interest shown`}`}
                      </div>
                    </Link>
                  </div> :
                  <div>
                    <div className="bottom_margin" />
                    <div className="noInterest">
                      <div className="">
                        {`${props.event.interested.length}${` interest shown`}`}
                      </div>
                    </div>
                  </div>
              )
            }
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
              <Link className="" to={`/event/${currentId}`}>
                <span className="more cardfooter">
                  view details
              </span>
              </Link>
            </div>
          </div>
          <div className="bottom_margin" />
        </div>
      </div >
    </div >
  );
};
