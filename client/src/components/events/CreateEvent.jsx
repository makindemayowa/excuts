import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SubNav from '../common/SubNav';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

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
            <div className="container">
              <div className="container">
                <h3 className="my_bold">
                  Create an Event
                </h3>
                <div className="bottom_margin" />
                <div className="newEventContainer">
                  <div className="container push-right">
                    <div className="bottom_margin" />
                    <div className="bottom_padding" />
                    <div className="row">
                      <div className="col s6 m4 l4">
                        Date
                      </div>
                      <div className="col s6 m4 l4 push-up">
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
                      <div className="col s6 m4 l4 push-up">
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
                      <div className=" col s6 m4 l4">
                        Location (Event place name)
                      </div>
                      <div className="col s6 m4 l3 push-up">
                        <input placeholder="location" name="location" type="text" className="" />
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col s6 m4 l4">
                        State
                      </div>
                      <div className="col s6 m4 l3 push-up">
                        <input placeholder="state" name="state" type="text" className="" />
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col s6 m4 l4">
                        City
                      </div>
                      <div className="col s6 m4 l3 push-up">
                        <input placeholder="city" name="city" type="text" className="" />
                      </div>
                    </div>
                    <div className="row reduce-margin">
                      <div className="col s12 m12 l12">
                        Details
                      </div>
                      <div className="col s12">
                        <textarea placeholder="Describe this event in brief..." id="textarea1" className="materialize-textarea" data-length="120" />
                      </div>
                    </div>
                    <div className="row reduce-margin">
                      <div className="col s12 m12 l12">
                        Preference
                      </div>
                      <div className="col s12">
                        <textarea placeholder="Who would you rather go out with..." id="textarea1" className="materialize-textarea" data-length="120" />
                      </div>
                    </div>
                    <div className="row reduce-margin">
                      <div className="col s12 m12 l12">
                        Extra
                      </div>
                      <div className="col s12">
                        <textarea placeholder="Any other thing we should know..." id="textarea1" className="materialize-textarea" data-length="120" />
                      </div>
                    </div>
                    <div className="submitContainer">
                      <a className="waves-effect waves-light btn save-btn">Create</a>
                      <a className="waves-effect waves-light btn cancel-btn">Cancel</a>
                    </div>
                    <div className="bottom_margin" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom_margin" />
      </div>
    );
  }
}

export default Events;
