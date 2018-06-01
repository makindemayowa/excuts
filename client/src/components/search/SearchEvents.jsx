/*eslint-env jquery*/

import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import SubNav from '../common/SubNav';
import 'react-datepicker/dist/react-datepicker.css';
import './search.scss';

class SearchEvent extends Component {
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
    );
  }
}

export default SearchEvent;
