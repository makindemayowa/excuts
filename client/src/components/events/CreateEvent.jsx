/* eslint-env jquery */
/*global M*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import SubNav from '../common/SubNav';
import Loader from '../common/Loader';
import { getUserDetails } from '../../actions/auth';
import { createEventRequest } from '../../actions/events';

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      eventDate: '',
      location: '',
      state: '',
      city: '',
      details: '',
      preference: '',
      extra: '',
      success: '',
      interestedIn: '',
      loading: true,
      error: '',
      user: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUserDetails().then(() => {
      this.setState({
        user: this.props.user,
        loading: false
      });
      const elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
      $('textarea#textarea1, textarea#textarea2, textarea#textarea3')
        .characterCounter();
    }).catch(() => {
      this.setState({
        loading: false
      });
      const elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
      $('textarea#textarea1, textarea#textarea2, textarea#textarea3')
        .characterCounter();
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  onSubmit(e) {
    const eventDetail = {
      title: this.state.title,
      date: this.state.eventDate,
      location: this.state.location,
      state: this.state.state.toLowerCase(),
      city: this.state.city,
      details: this.state.details,
      preference: this.state.preference,
      extra: this.state.extra,
      interestedIn: this.state.interestedIn
    }
    // ensure you cannot create an event for past days    
    this.props.createEventRequest(eventDetail).then((res) => {
      this.setState({
        success: true
      })
    }).catch((err) => {
      this.setState({
        error: err.response.data
      });
    })
  }

  render() {
    const { user, loading } = this.state;
    if (this.state.success) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <SubNav />
        <div className="create_event">
          {
            loading ? <Loader /> :
              <div>
                <div className="center">
                  <h3 className="my_bold">
                    Create an Event
              </h3>
                </div>
                <div className="bottom_margin" />
                {
                  (user.profilePhoto && user.phone_no) ?
                    <div className="newEventContainer">
                      <div className="container">
                        <div className="bottom_margin" />
                        <div className="bottom_padding" />
                        <form>
                          <div className="row push-up">
                            <div className="input-field col s12">
                              <input
                                name="title"
                                type="text"
                                className=""
                                value={this.state.title}
                                onChange={this.onChange}
                              />
                              <label htmlFor="title">Title</label>
                            </div>
                          </div>
                          <div className="row push-up">
                            <div className="input-field col s12">
                              <input
                                name="location"
                                type="text"
                                className=""
                                value={this.state.location}
                                onChange={this.onChange}
                              />
                              <label htmlFor="location">Location</label>
                            </div>
                          </div>
                          <div className="row push-up">
                            <div className="input-field col s12">
                              <input
                                name="state"
                                type="text"
                                className=""
                                required
                                onChange={this.onChange}
                                value={this.state.state}
                              />
                              <label htmlFor="state">State</label>
                            </div>
                          </div>
                          <div className="row push-up">
                            <div className="input-field col s12">
                              <input
                                name="city"
                                type="text"
                                className=""
                                required
                                onChange={this.onChange}
                                value={this.state.city}
                              />
                              <label htmlFor="city">City</label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-fields">
                              <div className="col s12 m4 l3 push-up">
                                <select name="interestedIn" defaultValue="" onChange={this.onChange} className="size1">
                                  <option disabled value="">Interested in</option>
                                  <option value="female">female</option>
                                  <option value="male">male</option>
                                  <option value="others">others</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col s12 m4 l4">
                              Date
                            </div>
                            <div className="col s12 m4 l4">
                              <input onChange={this.onChange} type="date" name="eventDate" />
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
                                onChange={this.onChange}
                                value={this.state.details}
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
                                onChange={this.onChange}
                                value={this.state.preference}
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
                                onChange={this.onChange}
                                value={this.state.extra}
                              />
                            </div>
                          </div>
                          <div className="submitContainer">
                            <a
                              className="waves-effect waves-light btn save-btn"
                              onClick={this.onSubmit}
                            >save</a>
                          </div>
                          <div className="error_message">
                            <div className="bottom_margin" />
                            {this.state.error}
                          </div>
                          <div className="bottom_margin" />
                        </form>
                      </div>
                    </div> :
                    <div>
                      <h5 className="emptyProfile center">Please complete your profile
                    <Link to="/profile">&nbsp;here</Link>
                      </h5>
                      <div className="center">
                        You cannot create an event until your account is fully set up
                  </div>
                    </div>}
              </div>}
        </div>
        <div className="bottom_margin" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.auth.success,
  isLogged: state.auth.isLogged,
  user: state.auth.userDetails,
});

export default connect(mapStateToProps,
  { createEventRequest, getUserDetails })(Events);
