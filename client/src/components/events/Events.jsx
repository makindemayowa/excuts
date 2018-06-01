/*eslint-env jquery*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SubNav from '../common/SubNav';
import EventsCard from './EventsCard'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
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
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $('.collapsible').collapsible();
    $('select').formSelect();
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
            <div className="col s12 m5 l2 searchForm">
              <div className="flex">
                <div className="form-fields">
                  <label>Interested in</label>
                  <select className="size1">
                    <option value="1">Female</option>
                    <option value="">Male</option>
                  </select>
                </div>

                <div className="form-fields">
                  <label>Country</label>
                  <select className="size1">
                    <option value="">Nigeria</option>
                    <option value="3">Norway</option>
                    <option value="1">Oman</option>
                    <option value="2">Pakistan</option>
                  </select>
                </div>

                <div className="form-fields">
                  <label>State</label>
                  <select className="size1">
                    <option value="">Lagos</option>
                    <option value="1">Abuja</option>
                    <option value="2">Abeokuta</option>
                  </select>
                </div>

                <div className="form-fields">
                  Date Range
                  <div className="bottom_margin" />
                  <div className="row">
                    <div className="col s12">
                      <div>
                        From
                      </div>
                    </div>
                    <div className="col s10 m9 l8">
                      <div className="dtpcker">
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      To
                    </div>
                    <div className="col s10 m9 l8">
                      <div className="dtpcker">
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <button className="waves-effect right waves-light btn">
                    Search
                  </button>
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
