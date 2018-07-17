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
  postInterestedRequest
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
      this.setState({
        event: this.props.event,
        loading: false
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
    // const loading = nextProps.loading;
    this.setState({
      event,
      // loading
    });
  }

  showInterest() {
    this.setState({
      interested: !this.state.interested
    }, () => {
      if (this.state.interested) {
        this.props.postInterestedRequest(this.eventId).then((res) => {
          this.setState({
            success: true
          })
          toastr.success('interest registered')
        }).catch((err) => {
          toastr.error(err.response.data.message)
        })
      }
    }
    );
  }

  render() {
    const { event, loading } = this.state
    return (
      <div>
        <SubNav />
        <div className="create_event">
          {
            loading ? <Loader /> :
              <div className="">
                <div className="">
                  <div className="">
                    <div className="bottom_margin" />
                    <div>
                      <span className="showinterest">
                        Interested?
                      </span>
                      <a className="interestedC" onClick={this.showInterest}>
                        <i className="far fa-thumbs-up interested"></i>
                      </a>
                    </div>
                    <div className="bottom_margin" />
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
                          <div className=" col s6 m4 l4">
                            Title
                          </div>
                          <div className="col s6 m4 l3">
                            {event.title}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s6 m4 l4">
                            Date
                          </div>
                          <div className="col s6 m4 l4">
                            {`${new Date(event.date).toDateString()}`}
                          </div>
                        </div>
                        <div className="row">
                          <div className=" col s6 m4 l4">
                            Event venue
                          </div>
                          <div className="col s6 m4 l3">
                            {event.location}
                          </div>
                        </div>
                        <div className="row">
                          <div className=" col s6 m4 l4">
                            State
                          </div>
                          <div className="col s6 m4 l3">
                            {event.state}
                          </div>
                        </div>
                        <div className="row">
                          <div className=" col s6 m4 l4">
                            City
                          </div>
                          <div className="col s6 m4 l3">
                            {event.city}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-fields">
                            <div className=" col s6 m4 l4">
                              Interested in
                            </div>
                            <div className="col s6 m4 l3">
                              {event.interestedIn}
                            </div>
                          </div>
                        </div>
                        <div className="row reduce-margin">
                          <div className="col s12 m12 l12">
                            Details
                          </div>
                          <div className="col s12">
                            <textarea
                              placeholder="Describe this event in brief..."
                              id="textarea1"
                              className="materialize-textarea"
                              data-length="120"
                              name="details"
                              maxLength="120"
                              required
                              value={event.details}
                            />
                          </div>
                        </div>
                        <div className="row reduce-margin">
                          <div className="col s12 m12 l12">
                            Preference
                          </div>
                          <div className="col s12">
                            <textarea
                              placeholder="Who would you rather go out with..."
                              id="textarea2"
                              className="materialize-textarea"
                              name="preference"
                              data-length="120"
                              maxLength="120"
                              required
                              value={event.preference}
                            />
                          </div>
                        </div>
                        <div className="row reduce-margin">
                          <div className="col s12 m12 l12">
                            Extra
                          </div>
                          <div className="col s12">
                            <textarea
                              placeholder="Any other thing we should know..."
                              id="textarea3"
                              className="materialize-textarea"
                              name="extra"
                              data-length="120"
                              maxLength="120"
                              required
                              value={event.extra}
                            />
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
});

export default connect(mapStateToProps,
  { getOneEventRequest, postInterestedRequest })(Events);