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
        <div className="cardfooter">{`Created By: Anonymous`}</div>
      </div>
      {/* <ul class="collapsible">
        <li>
          <div className="collapsible-header text-center"><i className="material-icons">message</i>{`Reviews for ${props.event.createdBy}`}</div>
          <div class="collapsible-body">
            <div className="row">
              <div className="">
                <textarea placeholder="Add review..." id="textarea1" className="materialize-textarea" data-length="120" />
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
      </ul> */}
    </div>
  </div>
);
const event = {
  name: 'Movie',
  time: '24th march, 2018',
  venue: 'IMAX cinema, Lekki, Lagos',
  city: 'Lekki',
  state: 'Lagos',
  photo: 'img',
  createdBy: 'Oriyomi O.O',
  preference: 'Only people staying on the mainland please',
  details: "Avengers will be showing and I'll rather not watch it alone, It'll also be a good opportunity to know people around me",
  extra: "Please note that I won't be paying for your transport. Just the movie is all"
};