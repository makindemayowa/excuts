/* eslint-env jquery */
/* global M */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import SubNav from '../common/SubNav';

const img = require('../../images/date2.jpg');
const img1 = require('../../images/quote1.jpg');
const img2 = require('../../images/quote2.jpg');
const img3 = require('../../images/single.jpg');
const img4 = require('../../images/love.jpg');

const userInfo = {
  name: 'Jones Jimoh',
  age: 24,
  job: 'Bricklayer',
  avatar: img,
  location: 'Lagos, Nigeria',
  about: 'I love to cook, sing, dance and whatever else you can imagine a good person doing up and about',
};

class PublicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      currentImg: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const carousel = document.querySelectorAll('.carousel');
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
    const materialboxed = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxed);
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
    // $('.carousel').carousel({
    //   indicators: true,
    // });
    // $('.materialboxed').materialbox();
    // $('.collapsible').collapsible();
    $('input#input_text, textarea#textarea1').characterCounter();

    // $('.carousel').carousel({
    //   duration: 100,
    //   indicators: true,
    //   onCycleTo: (data) => {
    //     const currentImg = data.getElementsByTagName("img")[0];
    //    this.setState({
    //     currentImg: currentImg.src
    //    })
    //  }
    // });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div>
        <SubNav currentPage={'profile'} />
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
                  <img className="materialboxed" alt="" width="650" src={this.state.currentImg || userInfo.avatar} />
                </div>
              </div>
            </div>
            <div className="col s12 m7 l8">
              <div className="slider">
                <div className="carousel">
                  <a className="carousel-item" href="#one!"><img src={userInfo.avatar} /></a>
                  <a className="carousel-item" href="#two!"><img src={img1} /></a>
                  <a className="carousel-item" href="#three!"><img src={img2} /></a>
                  <a className="carousel-item" href="#four!"><img src={img3} /></a>
                  <a className="carousel-item" href="#five!"><img src={img4} /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="my_bold">
              About
            </div>
            <p>
              Material box is a material design implementation of the Lightbox plugin.
              When a user clicks on an image that can be enlarged,
              Material box centers the image and enlarges it in a smooth,
              non-jarring manner. To dismiss the image, the user can either click on the image again,
              scroll away, or press the ESC key.
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
                19
              </p>
            </div>
            <div className="row">
              <p className="col s6 m4 l3">
                Country
              </p>
              <p className="col s6 m4 l3">
                Nigeria
              </p>
            </div>
            <div className="row">
              <p className="col s6 m4 l3">
                State
              </p>
              <p className="col s6 m4 l3">
                Ogun
              </p>
            </div>
            <div className="row">
              <p className="col s6 m4 l3">
                City
            </p>
              <p className="col s6 m4 l3">
                Abeokuta
            </p>
            </div>
            <div className="row">
              <p className="col s6 m4 l3">
                Phone No
            </p>
              <p className="col s6 m4 l3">
                070223344567
            </p>
            </div>
            <div className="row">
              <p className="col s6 m4 l3">
                Best time to reach me
            </p>
              <p className="col s6 m4 l3">
                Anytime from 8p.m
            </p>
            </div>
            <div className="row">
              <p className="col s6 m4 l3">
                Occupation
            </p>
              <p className="col s6 m4 l3">
                Software developer
            </p>
            </div>
            <div className="row">
              <p className="col s6 m4 l3">
                Education
            </p>
              <p className="col s6 m4 l3">
                B.Sc Computer Science
            </p>
            </div>
          </div>
          <div className="row">
            <div className="my_bold">
              Rates
          </div>
            <p>
              I'm just here to have fun
          </p>
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
          <div className="row">
            <div className="my_bold">
              Instagram
          </div>
            <div className="bottom_margin" />
            <div className="col s12 m7 l8">
              <div className="slider">
                <div className="carousel">
                  <a className="carousel-item" href="#one!"><img src={userInfo.avatar} /></a>
                  <a className="carousel-item" href="#two!"><img src={userInfo.avatar} /></a>
                  <a className="carousel-item" href="#three!"><img src={userInfo.avatar} /></a>
                  <a className="carousel-item" href="#four!"><img src={userInfo.avatar} /></a>
                  <a className="carousel-item" href="#five!"><img src={userInfo.avatar} /></a>
                </div>
              </div>
            </div>
          </div>
          <ul className="collapsible">
            <li>
              <div className="collapsible-header"><i className="material-icons">message</i>Contact Mayowa</div>
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
        </div>
      </div>
    );
  }
}

export default PublicProfile;
