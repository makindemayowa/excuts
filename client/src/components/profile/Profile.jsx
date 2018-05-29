import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import SubNav from '../common/SubNav';
import './profile.scss';

const img = require('../../images/date2.jpg')
const userInfo = {
  name: 'Jones Jimoh',
  age: 24,
  job: 'Bricklayer',
  avatar: img,
  location: 'Lagos, Nigeria',
  about: 'I love to cook, sing, dance and whatever else you can imagine a good person doing up and about',
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      filterOpen: false
    };
  }

  render() {
    return (
      <div>
        <SubNav currentPage={'profile'} />
        <div className="profile">
          <div className="bottom_margin" />
          <div className="container">
            <div className="">
              <span className="my_bold">PERSONAL DETAILS</span>
            </div>
            <div className="row">
              <div className="col s4 m4 l3">
                <input placeholder="Age" name="age" type="number" className="" />
              </div>
              <div className="col s4 m4 l3">
                <input placeholder="Sex" name="sex" type="text" className="" />
              </div>
              <div className="col s4 m4 l3">
                <input placeholder="Country" name="country" type="text" className="" />
              </div>
              <div className="col s4 m4 l3">
                <input placeholder="State" name="state" type="text" className="" />
              </div>
              <div className="col s4 m4 l3">
                <input placeholder="City" name="city" type="text" className="" />
              </div>
              <div className="col s4 m4 l3">
                <input placeholder="Best time to reach you" name="time" type="text" className="" />
              </div>
              <div className="col s4 m4 l3">
                <input placeholder="Occupation" name="occupation" type="text" className="" />
              </div>
              <div className="col s4 m4 l3">
                <input placeholder="Education" name="education" type="text" className="" />
              </div>
            </div>
            <form action="">
              <div className="row">
                <div className="col s4 m4 l3">
                  <input placeholder="Phone No" name="phoneNo" type="number" className="" />
                </div>
                <span className="makePublic col s6 m6 l6">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      id="show"
                      checked="checked"
                    />
                    <span>Make Public</span>
                  </label>
                </span>
              </div>
            </form>
          </div>
          <div className="container">
            <div className="bottom_margin" />
            <div className="">
              <span className="my_bold">ABOUT YOURSELF</span>
            </div>
            <div className="bottom_margin" />
            <div className="row">
              <div className="col s12">
                <textarea placeholder="Tell us about yourself..." id="textarea1" className="materialize-textarea" data-length="120" />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="">
              <span className="my_bold">RATES</span>
            </div>
            <div className="bottom_margin" />
            <div className="row">
              <form action="">
                <span className="col s12 m4 l4">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      id="justFun"
                      checked="checked"
                    />
                    <span>I'm just here to have fun</span>
                  </label>
                </span>
                <span className="col s12 m4 l4">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      id="justFun"
                      checked="checked"
                    />
                    <span>I'm here to hire</span>
                  </label>
                </span>
                <span className="col s12 m4 l4">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      id="justFun"
                      checked="checked"
                    />
                    <span>Professional Escort</span>
                  </label>
                </span>
              </form>
            </div>
            <div className="row">
              <div className="row">
                <div className="col s6 m4 l4">
                  <input placeholder="2 hours" name="2hr" type="text" className="" />
                </div>
                <div className="col s6 m4 l4">
                  <input placeholder="#1,000" name="rate1" type="text" className="" />
                </div>
              </div>
              <div className="row">
                <div className="col s6 m4 l4">
                  <input placeholder="8 hours" name="8hr" type="text" className="" />
                </div>
                <div className="col s6 m4 l4">
                  <input placeholder="#2,000" name="rate2" type="text" className="" />
                </div>
              </div>
              <div className="row">
                <div className="col s6 m4 l4">
                  <input placeholder="Weekend" name="weekend" type="text" className="" />
                </div>
                <div className="col s6 m4 l4">
                  <input placeholder="#3,000" name="weekendRate" type="text" className="" />
                </div>
              </div>
              <div className="row">
                <div className="col s6 m4 l4">
                  <input placeholder="Tour" name="tour" type="text" className="" />
                </div>
                <div className="col s6 m4 l4">
                  <input placeholder="#5,000" name="tourRate" type="text" className="" />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="my_bold">PHOTOS</div>
              <p>Upload images for your photos section and try to mix different photo styles <br />
                Please try to upload high resolution images
            </p>
              <p className="warning-text">
                ***We’re not asking you to put on your Sunday best; just try to keep it classy and appropriate for public consumption.
                No nudity, no sexually explicit content, no sex toys.
                Photos that violate these guidelines may be deleted, and the most severe cases may result in account removal.***
            </p>
            </div>
            <div className="new_uploads">
              <div className="row">
                <ProfileCard
                  userInfo={userInfo}
                />
                <ProfileCard
                  userInfo={userInfo}
                />
                <ProfileCard
                  userInfo={userInfo}
                />
                <ProfileCard
                  userInfo={userInfo}
                />
                <div className="col s12 m12 l12 upload-more">
                  <a className="waves-effect waves-light btn upload-more-button"><i className="fas fa-cloud-upload-alt fa-3x left" />UPLOAD MORE PHOTOS</a>
                </div>
              </div>
            </div>
          </div>
          <div className="submitContainer">
            <a className="waves-effect waves-light btn save-btn">Save</a>
            <a className="waves-effect waves-light btn cancel-btn">Cancel</a>
          </div>
          <div className="bottom_margin" />
        </div>
      </div>
    );
  }
}

export default Profile;
