/* eslint-env jquery */
/* global M */

import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux'
import Loader from '../common/Loader'
import EventsCard from '../events/EventsCard'
import NotFound from '../common/NotFound'
import countriesWithStates from '../../helpers/states'
import { searchEventRequest } from '../../actions/events';
import './search.scss';

class SearchEvent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      startDate: moment(),
      sex: 'female',
      events: [],
      searchStarted: false,
      state: countriesWithStates.countries[0].states[0],
      countryIndex: 0,
      states: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      states: countriesWithStates.countries[this.state.countryIndex].states
    })
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    $('.tabs').tabs();
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  onStateChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChange(e) {
    const name = e.target.name
    this.setState({
      [name]: e.target.value,
      error: ''
    }, () => {
      if (name === "country") {
        const index = countriesWithStates.countries.findIndex(countries => countries.country === this.state.country);
        this.setState({
          countryIndex: index,
          states: countriesWithStates.countries[index].states
        })
      }
    });
  }
  onSearchSubmit() {
    this.setState({
      loading: true
    })
    const eventDetail = {
      sex: this.state.sex,
      state: this.state.state,
      startDate: this.state.startDate.format("YYYY-MM-DDT00:00:00.000") + "Z",
    }
    // ensure you cannot create an event for past days    
    this.props.searchEventRequest(eventDetail).then((res) => {
      this.setState({
        success: true,
        loading: false,
        searchStarted: true,
        events: this.props.events,
      })
    }).catch((err) => {
      this.setState({
        error: err.response.data,
        loading: false,
        searchStarted: true
      });
    })
  }

  render() {
    const { states, loading, searchStarted } = this.state;
    return (
      <div className="mobilesearch">
        <div className="searchForm">
          <div className="bottom_margin" />
          <div className="flex">
            <div className="form-fields">
              <label>Interested in</label>
              <select name="sex" onChange={this.onStateChange} className="size1">
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="others">others</option>
              </select>
            </div>
            <div className="form-fields">
              <label>Country</label>
              <select
                name="country"
                onChange={this.onChange}
                className="size1"
              >
                {
                  countriesWithStates.countries.map((country) =>
                    <option
                      key={country.country}
                      value={country.country}
                    >
                      {country.country}
                    </option>
                  )
                }
              </select>
            </div>

            <div className="form-fields">
              <label>State</label>
              <select
                name="state"
                onChange={this.onStateChange}
                className="size1 browser-default"
              >
                {
                  states.map((state) =>
                    <option
                      key={state}
                      value={state}
                    >
                      {state}
                    </option>
                  )
                }
              </select>
            </div>

            <div className="form-fields">
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
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <button
                className="waves-effect waves-light btn"
                onClick={this.onSearchSubmit}
              >
                Go
                  </button>
            </div>
          </div>
        </div>
        {
          searchStarted &&
          <div className="row">
            {
              loading ? <Loader /> :
                <div>
                  {
                    this.state.events.length ?
                      <div className="row">
                        {
                          this.state.events.map((event) => <EventsCard
                            event={event}
                            id={event._id}
                            key={event._id}
                            onChange={this.onChange}
                            currentUser={this.props.user}
                          />)
                        }
                      </div> :
                      <NotFound type="event" />
                  }
                </div>
            }
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.event.events,
  pagination: state.event.pagination,
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(mapStateToProps,
  { searchEventRequest })(SearchEvent);
