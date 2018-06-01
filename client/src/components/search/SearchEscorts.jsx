/*eslint-env jquery*/

import React, { Component } from 'react';
import moment from 'moment';
import SubNav from '../common/SubNav';
import './search.scss';

class SearchEscort extends Component {
  constructor() {
    super();
    this.state = {
      filterOpen: false,
      startDate: moment(),
      value: { min: 2, max: 10 },
      maxDistance: 5,
      maxAge: 40
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
  }

  componentDidMount() {
    $('select').formSelect();
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  changeEvent(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    return (
      <div className="mobilesearch">
        <SubNav />
        <div className="searchForm paddMobile">
          <div className="flex">
            <div className="form-fields">
              <label>Gender</label>
              <select className="size1">
                <option value="1">Female</option>
                <option value="">Male</option>
                <option value="2">Other</option>
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
            <form action="#">
              Maximum Distance: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span id="maxDistance">{this.state.maxDistance}km</span>
              <p className="range-field">
                <input type="range" name="maxDistance" value={this.state.maxDistance} onChange={this.changeEvent} min="0" max="100" />
              </p>
            </form>
            <form action="#">
              Maximum Age:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span id="maxAge">{this.state.maxAge}</span>
              <p className="range-field">
                <input type="range" name="maxAge" value={this.state.maxAge} onChange={this.changeEvent} min="18" max="60" />
              </p>
            </form>
            <div className="">
              <button className="waves-effect waves-light btn">
                Search
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchEscort;
