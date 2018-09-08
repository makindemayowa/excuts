/* eslint-env jquery */
/*global M*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css';
import toastr from 'toastr';
import SubNav from '../common/SubNav';
import {
  getOneEventRequest,
  postInterestedRequest,
  deleteInterestRequest
} from '../../actions/events';
import Loader from '../common/Loader';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {
        created_by_id: '',
        interested: false,
        loading: true
      },
    };
    this.eventId = '';
    this.showInterest = this.showInterest.bind(this);
  }

  componentDidMount() {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
    this.eventId = this.props.match.params.id
    this.props.getOneEventRequest(this.eventId).then((res) => {
      const index = this.props.event.interested.findIndex(
        interested => interested.email
          === this.props.user.email
      );
      const interested = index !== -1 ? true : false
      this.setState({
        event: this.props.event,
        loading: false,
        interested
      })
    }).catch((err) => {
      this.setState({
        error: err.response.data,
        loading: false
      });
    })
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }
  componentWillReceiveProps(nextProps) {
    const event = nextProps.event;
    this.setState({
      event,
      // loading
    });
  }

  showInterest() {
    if (!this.props.user.here_to || !this.props.user.profilePhoto) {
      return toastr.error('please complete your profile')
    }
    if (!this.state.interested) {
      this.props.postInterestedRequest(this.eventId).then((res) => {
        this.setState({
          success: true,
          interested: true
        })
        toastr.success('interest registered')
      }).catch((err) => {
        toastr.error(err.response.data.message)
      })
    } else if (this.state.interested) {
      this.props.deleteInterestRequest(this.eventId).then((res) => {
        this.setState({
          success: true,
          interested: false
        })
        toastr.success('interest deleted')
      }).catch((err) => {
        toastr.error(err.response.data.message)
      })
    }
  }

  render() {
    const { event, loading, interested } = this.state;
    const { user } = this.props;
    const interestStatus = !interested ? 'Interested?': 'No longer interested?';
    return (
      <div>
        <SubNav />
        <div className="create_event">
          {
            loading ? <Loader /> :
              <div className="">
                <div className="">
                  <div className="">
                    <div>
                      {
                        user.email !== event.created_by ?
                          <div onClick={this.showInterest} className="interest__contained">
                            <span className="showinterest">
                              {interestStatus}
                            </span>
                            <a className="interestedC">
                              <i className="far fa-thumbs-up interested"></i>
                            </a>
                          </div> :
                          <Link className="" to={`/interests/${event._id}`}>
                            <span className="interest__contained showinterest">
                              {event.interested.length}{' '}Interested
                              </span>
                          </Link>
                      }
                    </div>
                    <div className="newEventContainer">
                      <div className="bottom_margin" />
                      <div className="created_by red-text">
                        <Link className="red-text" to={`/publicProfile/${event.created_by_id}`}>
                          By:&nbsp;&nbsp;&nbsp;{event.created_by}
                        </Link>
                      </div>
                      <div className="container push-right">
                        <div className="bottom_padding" />
                        <div className="row">
                          <div className="event_key col s6 m4 l4">
                            Title
                          </div>
                          <div className="col s6 m4 l3">
                            {event.title}
                          </div>
                        </div>
                        <div className="row">
                          <div className="event_key col s6 m4 l4">
                            Date
                          </div>
                          <div className="col s6 m4 l4">
                            {`${new Date(event.date).toDateString()}`}
                          </div>
                        </div>
                        <div className="row">
                          <div className="event_key col s6 m4 l4">
                            Event venue
                          </div>
                          <div className="col s6 m4 l3">
                            {event.location}
                          </div>
                        </div>
                        <div className="row">
                          <div className="event_key col s6 m4 l4">
                            State
                          </div>
                          <div className="col s6 m4 l3">
                            {event.state}
                          </div>
                        </div>
                        <div className="row">
                          <div className="event_key col s6 m4 l4">
                            City
                          </div>
                          <div className="col s6 m4 l3">
                            {event.city}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-fields">
                            <div className="event_key col s6 m4 l4">
                              Interested in
                            </div>
                            <div className="col s6 m8 l8">
                              {event.interestedIn}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="event_key col s12 m4 l4">
                            Details
                          </div>
                          <div className="row__content col s12 m8 l8">
                            {event.details}
                          </div>
                        </div>
                        <div className="row">
                          <div className="event_key col s12 m4 l4">
                            Preference
                          </div>
                          <div className="row__content col s12 m8 l8">
                            {event.preference}
                          </div>
                        </div>
                        <div className="row">
                          <div className="event_key col s12 m4 l4">
                            Extra
                          </div>
                          <div className="row__content col s12 m8 l8">
                            {event.extra}
                          </div>
                        </div>
                        <div className="bottom_margin" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
        <div className="bottom_margin" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.event,
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(mapStateToProps,
  { getOneEventRequest, postInterestedRequest, deleteInterestRequest })(Events);