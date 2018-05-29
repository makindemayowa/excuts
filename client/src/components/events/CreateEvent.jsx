import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SubNav from '../common/SubNav';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


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

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div>
        <SubNav currentPage={'events'} />
        <div className="create_event">
          <div className="container">
            <h4 className="my_bold">
              Create an Event
            </h4>
            <div className="row">
              <div className=" col s6 m4 l4">
                Date
              </div>
              <div className="col s6 m4 l4">
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className=" col s6 m4 l4">
                Time
              </div>
              <div className="col s6 m4 l4">
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />
              </div>
            </div>
            <div className="row">
              <div className="col s4 m4 l3">
                <input placeholder="location" name="location" type="text" className="" />
              </div>
              <div className="col s4 m4 l3">
                <input placeholder="state" name="state" type="text" className="" />
              </div>
            </div>
            <div className="submitContainer">
              <a className="waves-effect waves-light btn save-btn">Save</a>
              <a className="waves-effect waves-light btn cancel-btn">Cancel</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
