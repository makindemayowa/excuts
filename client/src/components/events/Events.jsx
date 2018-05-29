import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SubNav from '../common/SubNav';
import EventsCard from './EventsCard'
import './event.scss';


const img = require('../../images/date2.jpg')
const event = {
  name: 'Movie',
  time: '24th march, 2018',
  venue: 'IMAX cinema, Lekki, Lagos',
  city: 'Lekki',
  state: 'Lagos',
  photo: img,
  createdBy: 'Oriyomi O.O',
  preference: 'Only people staying on the mainland please',
  details: "Avengers will be showing and I'll rather not watch it alone, It'll also be a good opportunity to know people around me",
  extra: "Please note that I won't be paying for your transport. Just the movie is all"
};

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div className="events">
        <SubNav currentPage={'events'} />
        <div className="container">
          <div className="bottom_margin" />
          <div className="row">
            <div className="right createEvent">
              <Link to="/new-event" class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">add</i></Link>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m8 l10">
              <EventsCard event={event} />
              <EventsCard event={event} />
              <EventsCard event={event} />
              <EventsCard event={event} />
            </div>
            <div className="col s12 m5 l2">
              <div className="card white darken-1">
                <div className="card-content black-text">
                  <span className="card-title">Search</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
