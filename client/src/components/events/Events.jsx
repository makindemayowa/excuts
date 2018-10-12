/*eslint-env jquery*/
/*global M*/

import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SubNav from '../common/SubNav';
import EventsCard from './EventsCard';
import SearchEvent from './SearchEvent';
import countriesWithStates from '../../helpers/states'
import Loader from '../common/Loader';
import moment from 'moment';
import './event.scss';
import { getAllEventRequest, searchEventRequest } from '../../actions/events';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date().toISOString().slice(0, 10),
      events: [],
      loading: false,
      loadMore: false,
      showLoadMore: false,
      country: countriesWithStates.countries[131].country,
      sex: 'female',
      state: countriesWithStates.countries[131].states[0],
      countryIndex: 131,
      currentPage: 1,
      states: []
    };
    this.onChange = this.onChange.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSexStateChange = this.onSexStateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    var dropdown = document.querySelectorAll('#eventsDropdown');
    M.Dropdown.init(dropdown);
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    this.setState({
      states: countriesWithStates.countries[this.state.countryIndex].states,
      loading: true
    })
    this.getEvents()
  }

  componentWillReceiveProps(nextProps) {
    const events = nextProps.events;
    this.setState({
      events,
    });
  }

  getEvents(page) {
    this.setState({
      loading: true
    });
    this.props.getAllEventRequest(page).then(() => {
      this.setState({
        events: this.props.events,
        loading: false,
      }, () => {
        if (this.props.pagination.pages === this.state.currentPage
          || !this.props.pagination.pages) {
          this.setState({
            showLoadMore: false,
          })
        } else {
          this.setState({
            showLoadMore: true,
          })
        }
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

  loadItems() {
    let currentPage = this.state.currentPage
    if (this.props.pagination.pages === currentPage) {
      this.setState({ showLoadMore: false })
    } else {
      this.setState({
        currentPage: currentPage += 1,
        loadMore: true,
        showLoadMore: true,
      }, () => {
        const newEvents = Promise.resolve(this.getEvents(this.state.currentPage))
        newEvents.then(() => {
          this.setState({
            loadMore: false
          })
        })
      });
    }
  }

  handleSelectChange(selected) {
    this.setState({
      loading: true,
      currentPage: 1,
      events: [],
    }, () => {
      this.props.getAllEventRequest(selected).then(() => {
        this.setState({
          events: this.props.events,
          loading: false
        }, () => {
          const select = document.querySelectorAll('select');
          M.FormSelect.init(select);
          const collapsible = document.querySelectorAll('.collapsible');
          M.Collapsible.init(collapsible);
          if (this.props.pagination.pages === this.state.currentPage || !this.props.pagination.pages) {
            this.setState({ showLoadMore: false })
          } else {
            this.setState({ showLoadMore: true })
          }
        });
      }).catch(() => {
        this.setState({
          loading: false,
          events: [],
        }, () => {
          const select = document.querySelectorAll('select');
          M.FormSelect.init(select);
          const collapsible = document.querySelectorAll('.collapsible');
          M.Collapsible.init(collapsible);
        });
      });
    })
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
      loading: true,
      currentPage: 1,
    })
    const eventDetail = {
      sex: this.state.sex,
      state: this.state.state,
      startDate: moment(this.state.startDate).format("YYYY-MM-DDT00:00:00.000") + "Z",
    }
    // ensure you cannot create an event for past days    
    this.props.searchEventRequest(eventDetail).then((res) => {
      this.setState({
        success: true,
        loading: false
      }, () => {
        this.setState({
          page: 1
        })
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
    const { loading, states, loadMore, startDate, showLoadMore } = this.state;
    return (
      <div className="events">
        <SubNav currentPage={'home'} />
        <div className="event__container">
          <div className="containerOnBigscreen">
            <div className="row">

              <div className="col s12 m8 l8 cardsContainer">
                {
                  loading ? <Loader /> :
                    <div className="row">
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
                      {
                        showLoadMore &&
                        <div className="row center">
                          <button
                            id="loadMore"
                            onClick={this.loadItems}
                            className="waves-effect waves-light btn"
                          >
                            {loadMore ? 'loading...' : 'Load More'}
                          </button>
                        </div>
                      }
                    </div>
                }
              </div>
              <SearchEvent
                onSexStateChange={this.onSexStateChange}
                onChange={this.onChange}
                countriesWithStates={countriesWithStates}
                states={states}
                startDate={startDate}
                onSearchSubmit={this.onSearchSubmit}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="dateDropdownContainer">
            <a className="btn-floating btn-large waves-effect waves-light" id="eventsDropdown" data-target='dropdown2'><i className="fas pointUp fa-chevron-circle-up"></i></a>
          </div>
          <div>
            <ul id='dropdown2' className='eventul dropdown-content'>
              <li value="mine"><a onClick={() => this.handleSelectChange('mine')}>Created by me</a></li>
              <li value="all"><a onClick={() => this.handleSelectChange('')}>All events</a></li>
            </ul>
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
