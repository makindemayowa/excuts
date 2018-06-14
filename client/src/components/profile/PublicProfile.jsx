/* eslint-env jquery */
/* global M */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserDetails } from '../../actions/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import SubNav from '../common/SubNav';

class PublicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      currentImg: '',
      user: this.props.user || {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const carousel = document.querySelectorAll('.carousel');
    const materialboxed = document.querySelectorAll('.materialboxed');
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
    M.Carousel.init(carousel, {
      duration: 100,
      indicators: true,
      onCycleTo: (data) => {
        const currentImg = data.getElementsByTagName('img')[0];
        this.setState({
          currentImg: currentImg.src
        });
      }
    });
    M.Materialbox.init(materialboxed);
    this.props.getUserDetails().then(() => {
      this.setState({
        user: this.props.user
      }, () => {
        const carousel = document.querySelectorAll('.carousel');
        const materialboxed = document.querySelectorAll('.materialboxed');
        const collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
        M.Carousel.init(carousel, {
          duration: 100,
          indicators: true,
          onCycleTo: (data) => {
            const currentImg = data.getElementsByTagName('img')[0];
            this.setState({
              currentImg: currentImg.src
            });
          }
        });
        M.Materialbox.init(materialboxed);
        $('input#input_text, textarea#textarea1').characterCounter();
      });
    })
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    const { user } = this.state
    return (
      <div>
        <SubNav currentPage={'profile'} />
        {
          user.profilePhoto ?
            <div className="publicProfile container">
              <div className="bottom_margin" />
              <div className="row">
                <div className="col s9 m10 l10 my_bold">
                  MAYOWA ORIYOMI
            </div>
                <div className="col s3 m2 l2 edit">
                  <Link to="/profile">
                    <div>
                      <i className="left material-icons">edit</i>
                      <span className="edit">Edit</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="bottom_margin" />
              <div className="row">
                <div className="col s12 m5 l4">
                  <div className="card">
                    <div className="card-image">
                      <img className="materialboxed" alt="" width="650" src={this.state.currentImg || user.profilePhoto} />
                    </div>
                  </div>
                </div>
                <div className="col s12 m7 l8">
                  <div className="slider">
                    <div className="carousel">
                      {
                        user.photos.map(url =>
                          <a
                            className="carousel-item"
                            href={url}
                            key={url}
                          >
                            <img alt="" src={url} />
                          </a>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="my_bold">
                  About
            </div>
                <p>
                  {user.about}
                </p>
              </div>
              <div className="row">
                <div className="my_bold">
                  Personal Details
                </div>
                <div className="row">
                  <p className="col s6 m4 l3">
                    Age
                  </p>
                  <p className="col s6 m4 l3">
                    {user.age}
                  </p>
                </div>
                <div className="row">
                  <p className="col s6 m4 l3">
                    Country
              </p>
                  <p className="col s6 m4 l3">
                    {user.country}
                  </p>
                </div>
                <div className="row">
                  <p className="col s6 m4 l3">
                    State
              </p>
                  <p className="col s6 m4 l3">
                    {user.state}
                  </p>
                </div>
                <div className="row">
                  <p className="col s6 m4 l3">
                    City
            </p>
                  <p className="col s6 m4 l3">
                    {user.city}
                  </p>
                </div>
                <div className="row">
                  <p className="col s6 m4 l3">
                    Phone No
            </p>
                  <p className="col s6 m4 l3">
                    {user.phone_no}
                  </p>
                </div>
                <div className="row">
                  <p className="col s6 m4 l3">
                    Best time to reach me
            </p>
                  <p className="col s6 m4 l3">
                    {user.best_time}
                  </p>
                </div>
                <div className="row">
                  <p className="col s6 m4 l3">
                    Occupation
            </p>
                  <p className="col s6 m4 l3">
                    {user.occupation}
                  </p>
                </div>
                <div className="row">
                  <p className="col s6 m4 l3">
                    Education
            </p>
                  <p className="col s6 m4 l3">
                    {user.education}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="my_bold">
                  Rates
          </div>
                {user.here_to === 'here_for_fun' &&
                  <p>
                    I'm just here to have fun
              </p>
                }
                {user.here_to === 'here_to_hire' &&
                  <p>
                    I'm here to hire
              </p>
                }
                {user.here_to === 'professional' &&
                  <div>
                    <div className="row">
                      <p className="col s6 m4 l3">
                        2 hours
                  </p>
                      <p className="col s6 m4 l3">
                        #13,000
                  </p>
                    </div>
                    <div className="row">
                      <p className="col s6 m4 l3">
                        8 hours
                  </p>
                      <p className="col s6 m4 l3">
                        #25,000
                  </p>
                    </div>
                    <div className="row">
                      <p className="col s6 m4 l3">
                        Weekend
                  </p>
                      <p className="col s6 m4 l3">
                        #250,000
                  </p>
                    </div>
                    <div className="row">
                      <p className="col s6 m4 l3">
                        Tour
                  </p>
                      <p className="col s6 m4 l3">
                        #1,000,000
                  </p>
                    </div>
                  </div>
                }
              </div>
              <div className="row">
                <div className="my_bold">
                  Instagram
                </div>
                <div className="bottom_margin" />
                <div className="col s12 m7 l8">
                  <div className="slider">
                    <div className="carousel">
                      {
                        user.photos.map(url =>
                          <a
                            className="carousel-item"
                            href={url}
                            key={url}
                          >
                            <img alt="" src={url} />
                          </a>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <ul className="collapsible">
                <li>
                  <div className="collapsible-header"><i className="material-icons">message</i>Contract Mayowa</div>
                  <div className="collapsible-body">
                    <div className="row">
                      <div className="my_bold col s12 m12 l12">
                        From
                </div>
                      <div className="col s6 m6 l6">
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col s6 m6 l6">
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
                      <div className="my_bold col s12 m12 l12">
                        To
                </div>
                      <div className="col s6 m6 l6">
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col s6 m6 l6">
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
                      <div className="bottom_margin" />
                      <div className="col s12 m12 l12">
                        <div className="my_bold">Date Description</div>
                      </div>
                      <div className="bottom_margin" />
                      <div className="row">
                        <div className="col s12 m8 l8">
                          <textarea placeholder="Interest me..." id="textarea1" className="materialize-textarea" data-length="120" />
                        </div>
                      </div>
                    </div>
                    <div className="bottom_margin" />
                    <div className="row ">
                      <button className="col s12 m8 l8 waves-effect waves-light btn edit-button">
                        Send Request
                </button>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="bottom_margin" />
            </div> :
            <h5 className="emptyProfile center">Please update your profile
          <Link to="/profile">&nbsp;here</Link>
            </h5>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.userDetails,
});

export default connect(mapStateToProps,
  { getUserDetails })(PublicProfile);
