/* eslint-env jquery */
/* global M */

import React, { Component } from 'react';
import ProfileCard from './ProfileCard';
import SubNav from '../common/SubNav';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './profile.scss';

const img = require('../../images/quote1.jpg');

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
      age: '',
      sex: '',
      country: '',
      state: '',
      city: '',
      best_time: '',
      occupation: '',
      education: '',
      phone_no: '',
      public: true,
      about: '',
      here_for_fun: false,
      here_to_hire: false,
      professional: false,
      time1: '',
      rate1: '',
      time2: '',
      rate2: '',
      time3: '',
      rate3: '',
      time4: '',
      rate4: '',
      error: '',
      imgurl: '',
      myfile: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.toggleChange = this.toggleChange.bind(this);
  }

  componentDidMount() {
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
    const materialboxed = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxed);
    $('input#input_text, textarea#textarea1').characterCounter();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  _crop() {
    // image in dataUrl
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  toggleChange(checkbox) {
    const checkboxes = document.getElementsByName('1')
    checkboxes.forEach((item) => {
      if (item !== checkbox.target) {
        item.checked = false
        this.setState({
          [item.id]: false,
        });
      } else {
        item.checked = true
        this.setState({
          [item.id]: true,
        });
      }
    })
  }

  onSubmit(e) {
    if (this.state.about.length > 120) {
      return 'error'
    }
  }

  handleClick = (data) => {
  }

  render() {
    if (this.state.here_for_fun) {

    }
    return (
      <div>
        <SubNav currentPage={'profile'} />
        <div className="profile">
          <div className="bottom_margin" />
          <div className="container">
            <div className="row">
              <div className="my_bold">Profile Photo</div>
              <div className="col s6 m6 l6">
                <div>
                  <div className="row">
                    <div className="col s12 m12 l8">
                      <div>
                        {
                          this.state.imgurl &&
                          <Cropper
                            ref='cropper'
                            src={img}
                            autoCropArea={1.0}
                            style={{ height: 512, width: 600 }}
                            aspectRatio={16 / 9}
                            cropBoxResizable={false}
                            crop={this._crop.bind(this)}
                          />
                        }
                      </div>
                      <div>
                        {
                          this.state.savedAlready ?
                            <div className="card">
                              <div className="card-image image_container">
                                <img alt="" className="profile-image" src={img} />
                              </div>
                              <div className="">
                                <i className="far fa-trash-alt delete" />
                              </div>
                            </div> :
                            <div className="card upload_card">
                              <div className="card-image image_upload_container">
                                <img alt="" className="profile-image" src={require('../../images/upload.jpg')} />
                                <input
                                  name="imgurl"
                                  type="file"
                                  id="file"
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s6 m6 l6 txt-bs">
                <p className="img-txt">Upload images for your photos section and try to mix different photo styles <br />
                  Please try to upload high resolution images
                </p>
                <p className="warning-text">
                  ***We’re not asking you to put on your Sunday best; just try to keep it classy and appropriate for public consumption.
                  No nudity, no sexually explicit content, no sex toys.
                  Photos that violate these guidelines may be deleted, and the most severe cases may result in account removal.***
              </p>
              </div>
            </div>
            <div className="new_uploads">
              <div className="row">
                {/* <ProfileCard
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
                /> */}
                <div className="col s12 m12 l12 upload-more">
                  <a className="waves-effect waves-light btn upload-more-button"><i className="fas fa-cloud-upload-alt fa-3x left" />UPLOAD MORE PHOTOS</a>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="">
              <span className="my_bold">PERSONAL DETAILS</span>
            </div>
            <div className="row">
              <div className="col s4 m4 l3">
                <input
                  placeholder="Age"
                  name="age"
                  type="number"
                  className="validate"
                  required
                  onChange={this.onChange}
                  value={this.state.age}
                />
              </div>
              <div className="col s4 m4 l3">
                <input
                  placeholder="Sex"
                  name="sex"
                  type="text"
                  className="validate"
                  required
                  onChange={this.onChange}
                  value={this.state.sex}
                />
              </div>
              <div className="col s4 m4 l3">
                <input
                  placeholder="Country"
                  name="country"
                  type="text"
                  className="validate"
                  required
                  onChange={this.onChange}
                  value={this.state.country}
                />
              </div>
              <div className="col s4 m4 l3">
                <input
                  placeholder="State"
                  name="state"
                  type="text"
                  className="validate"
                  required
                  onChange={this.onChange}
                  value={this.state.state}
                />
              </div>
              <div className="col s4 m4 l3">
                <input
                  placeholder="City"
                  name="city"
                  type="text"
                  className="validate"
                  required
                  onChange={this.onChange}
                  value={this.state.city}
                />
              </div>
              <div className="col s4 m4 l3">
                <input
                  placeholder="Best time to reach you"
                  name="best_time"
                  type="text"
                  className="validate"
                  required
                  onChange={this.onChange}
                  value={this.state.best_time}
                />
              </div>
              <div className="col s4 m4 l3">
                <input
                  placeholder="Occupation"
                  name="occupation"
                  type="text"
                  className="validate"
                  required
                  onChange={this.onChange}
                  value={this.state.occupation}
                />
              </div>
              <div className="col s4 m4 l3">
                <input
                  placeholder="Education"
                  name="education"
                  type="text"
                  className="validate"
                  required
                  onChange={this.onChange}
                  value={this.state.education}
                />
              </div>
            </div>
            <form action="">
              <div className="row">
                <div className="col s4 m4 l3">
                  <input
                    placeholder="Phone No"
                    name="phone_no"
                    type="number"
                    className="validate"
                    required
                    onChange={this.onChange}
                    value={this.state.phone_no}
                  />
                </div>
                <span className="makePublic col s6 m6 l6">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in checkbox-color"
                      id="show"
                      name="public"
                      checked={this.state.public}
                      onChange={this.toggleChange}
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
                <textarea
                  placeholder="Tell us about yourself..."
                  id="about"
                  className="materialize-textarea"
                  data-length="120"
                  maxlength="120"
                  name="about"
                  value={this.state.about}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="">
              <span className="my_bold">PREFERENCE</span>
            </div>
            <div className="bottom_margin" />
            <div className="row">
              <form action="">
                <span className="col s12 m4 l4">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in checkbox-color"
                      id="here_for_fun"
                      name="1"
                      onClick={this.toggleChange.bind(this)}
                    />
                    <span>I'm just here to have fun</span>
                  </label>
                </span>
                <span className="col s12 m4 l4">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in checkbox-color"
                      id="here_to_hire"
                      name="1"
                      onClick={this.toggleChange.bind(this)}
                    />
                    <span>I'm here to hire</span>
                  </label>
                </span>
                <span className="col s12 m4 l4">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in checkbox-color"
                      id="professional"
                      name="1"
                      onClick={this.toggleChange.bind(this)}
                    />
                    <span>Professional Escort</span>
                  </label>
                </span>
              </form>
            </div>

            {
              this.state.professional &&
              <div className="row">
                <div className="row">
                  <div className="col s6 m4 l4">
                    <input
                      placeholder="2 hours"
                      name="time1"
                      type="text"
                      className="validate"
                      required
                      onChange={this.onChange}
                      value={this.state.time1}
                    />
                  </div>
                  <div className="col s6 m4 l4">
                    <input
                      placeholder="#1,000"
                      name="rate1"
                      type="text"
                      className="validate"
                      required
                      onChange={this.onChange}
                      value={this.state.rate1}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s6 m4 l4">
                    <input
                      placeholder="8 hours"
                      name="time2"
                      type="text"
                      className="validate"
                      required
                      onChange={this.onChange}
                      value={this.state.time2}
                    />
                  </div>
                  <div className="col s6 m4 l4">
                    <input
                      placeholder="#2,000"
                      name="rate2"
                      type="text"
                      className="validate"
                      required
                      onChange={this.onChange}
                      value={this.state.rate2}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s6 m4 l4">
                    <input
                      placeholder="Weekend"
                      name="time3"
                      type="text"
                      className="validate"
                      required
                      onChange={this.onChange}
                      value={this.state.time3}
                    />
                  </div>
                  <div className="col s6 m4 l4">
                    <input
                      placeholder="#3,000"
                      name="rate3"
                      type="text"
                      className="validate"
                      required
                      onChange={this.onChange}
                      value={this.state.rate3}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s6 m4 l4">
                    <input
                      placeholder="Tour"
                      name="time4"
                      type="text"
                      className="validate"
                      required
                      onChange={this.onChange}
                      value={this.state.time4}
                    />
                  </div>
                  <div className="col s6 m4 l4">
                    <input
                      placeholder="#5,000"
                      name="rate4"
                      type="text"
                      className="validate"
                      required
                      onChange={this.onChange}
                      value={this.state.rate4}
                    />
                  </div>
                </div>
              </div>
            }
          </div>
          {/* <div className="container">
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
          </div> */}
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
