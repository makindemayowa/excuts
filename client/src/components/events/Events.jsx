/*eslint-env jquery*/
/*global M*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SubNav from '../common/SubNav';
import EventsCard from './EventsCard'
import countriesWithStates from '../../helpers/states'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../common/Loader';
import moment from 'moment';
import './event.scss';
import { getAllEventRequest, searchEventRequest } from '../../actions/events';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      events: [],
      loading: true,
      country: countriesWithStates.countries[0].country,
      sex: 'female',
      state: 'lagos',
      countryIndex: 0,
      states: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSexStateChange = this.onSexStateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    this.props.getAllEventRequest().then(() => {
      this.setState({
        events: this.props.events,
        loading: false,
        states: countriesWithStates.countries[this.state.countryIndex].states
      }, () => {
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);
        const collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
      });
    }).catch(() => {
      this.setState({
        loading: false
      }, () => {
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);
        const collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const events = nextProps.events;
    const loading = nextProps.loading
    this.setState({
      events,
      loading
    });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleSelectChange(e) {
    this.setState({
      loading: true
    })
    this.props.getAllEventRequest(e.target.value).then(() => {
      this.setState({
        events: this.props.events,
        loading: false
      }, () => {
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);
        const collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
      });
    }).catch(() => {
      this.setState({
        loading: false
      }, () => {
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);
        const collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
      });
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
        loading: false
      })
    }).catch((err) => {
      this.setState({
        error: err.response.data,
        loading: false
      });
    })
  }

  onSexStateChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { loading, states } = this.state;
    return (
      <div className="events">
        <SubNav />
        <div className="bottom_margin" />
        <div className="navSelect">
          <div className="form-fields">
            <select
              className="size1"
              onChange={this.handleSelectChange}
            >
              <option value="all">All Events</option>
              <option value="mine">Created by Me</option>
            </select>
          </div>
        </div>
        <div className="container">
          <div className="right createEvent">
            <Link to="/new-event" className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></Link>
          </div>
          <div className="row">
            <div className="col s12 m8 l10">
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
                        <h5 className="notFound">
                          No event found
                      </h5>
                    }
                  </div>
              }
            </div>
            <div className="col s12 m4 l2 searchForm">
              <div className="flex">
                <div className="form-fields">
                  <label>Interested in</label>
                  <select name="sex" onChange={this.onSexStateChange} className="size1">
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
                    onChange={this.onSexStateChange}
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
                    className="waves-effect right waves-light btn"
                    onClick={this.onSearchSubmit}
                  >
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

Events.defaultProps = {
  events: [],
};

Events.propTypes = {
  events: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = state => ({
  events: state.event.events,
  pagination: state.event.pagination,
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(mapStateToProps,
  { getAllEventRequest, searchEventRequest })(Events);
