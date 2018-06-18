/* eslint-env jquery */
/* global M */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SubNav from '../common/SubNav';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import toastr from 'toastr';
import './profile.scss';
import { updateUserDetails,
  getUserDetails,
  uploadPictureRequest,
  deletePictureRequest
 } from '../../actions/auth';
import setAuthorisation from '../../setAuthorisation'
import ProfileCard from './ProfileCard'

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
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
      here_to: '',
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
      myCroppedFile: '',
      src: '',
      uploadedImg: '',
      imageUrls: [],
      success: false,
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.setDp = this.setDp.bind(this);
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
  }

  componentDidMount() {
    this.props.getUserDetails().then(() => {
      this.setState({
        age: this.props.user.age || '',
        sex: this.props.user.sex || '',
        country: this.props.user.country || '',
        state: this.props.user.state || '',
        city: this.props.user.city || '',
        best_time: this.props.user.best_time || '',
        occupation: this.props.user.occupation || '',
        education: this.props.user.education || '',
        phone_no: this.props.user.phone_no || '',
        public: this.props.user.public || true,
        about: this.props.user.about || '',
        here_to: this.props.user.here_to || '',
        imageUrls: this.props.user.photos || [],
        loading: this.props.loading || false,
        firstName: this.props.user.firstName || '',
        lastName: this.props.user.lastName || '',
        
      }, () => {
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);
        const materialboxed = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(materialboxed);
        $('input#input_text, textarea#textarea1').characterCounter();
      });
    })
  }

  componentWillReceiveProps(nextProps) {
    const loading = nextProps.loading;
    const user = nextProps.user
    this.setState({
      loading,
      imageUrls: user.photos || [],
      age: user.age || '',
      sex: user.sex || '',
      country: user.country || '',
      state: user.state || '',
      city: user.city || '',
      best_time: user.best_time || '',
      occupation: user.occupation || '',
      education: user.education || '',
      phone_no: user.phone_no || '',
      public: user.public || true,
      about: user.about || '',
      here_to: user.here_to || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  fileChangeHandler = (event) => {
    if (this.props.user.photos.length >= 5) {
      return toastr.error('You can"t upload more than 5 pictures')
    }
    if (!event.target.files[0].type.includes('image')) {
      return toastr.error('You can only upload images')
    }
    const imageFile = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", () => {
      this.setState({
        imgurl: imageFile,
        src: reader.result,
      });
    }, false);

  }

  uploadFile() {
    const formData = new FormData();
    formData.append("file", this.state.myCroppedFile);
    formData.append("upload_preset", "umwse311");
    formData.append("timestamp", (Date.now() / 1000) | 0);
    this.props.uploadPictureRequest(formData).then(() => {
      this.setState({
        imgurl: '',
      })
    })
    const token = localStorage.getItem('tmo_token');
    setAuthorisation(token)
  }

  deleteFile(e, imgurl) {
    e.preventDefault()
    this.props.deletePictureRequest(imgurl).then((res) => {
      console.log(res)
    })
  }

  setDp(e, imgurl) {
    e.preventDefault()
    const dp = {
      profilePhoto: imgurl
    }
    this.props.updateUserDetails(dp).then((res) => {
      console.log(res)
    })
  }

  _crop() {
    this.setState({
      myCroppedFile: this.refs.cropper.getCroppedCanvas().toDataURL(),
    });
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
          here_to: [item.id],
        });
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const userDetails = {
      age: this.state.age,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      sex: this.state.sex,
      country: this.state.country,
      state: this.state.state,
      city: this.state.city,
      best_time: this.state.best_time,
      occupation: this.state.occupation,
      education: this.state.education,
      phone_no: this.state.phone_no,
      public: true,
      about: this.state.about,
      here_to: this.state.here_to,
      time1: this.state.time1,
      rate1: this.state.rate1,
      time2: this.state.time2,
      rate2: this.state.rate2,
      time3: this.state.time3,
      rate3: this.state.rate3,
      time4: this.state.time4,
      rate4: this.state.rate4,
      imgurls: this.state.imageUrls,
    }
    this.props.updateUserDetails(userDetails).then(() => {
      this.setState({
        success: true,
      });
    })
  }

  render() {
    const { imageUrls, imgurl, loading, src } = this.state;
    if (this.state.success) {
      return <Redirect to="/publicprofile" />;
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
                          imgurl ?
                            <div className="row">
                              {
                                loading &&
                                <div className="progress">
                                  <div className="indeterminate"></div>
                                </div>
                              }
                              <Cropper
                                ref='cropper'
                                src={src}
                                autoCropArea={1.0}
                                style={{ maxHeight: 300, maxWidth: 340 }}
                                aspectRatio={16 / 12}
                                cropBoxResizable={false}
                                crop={this._crop.bind(this)}
                              />
                              <button
                                className="waves-effect waves-light btn"
                                type="submit"
                                onClick={this.uploadFile}
                                name="action"
                              >Done</button>
                              <div>
                                <input
                                  name="imgurl"
                                  type="file"
                                  accept="image/*"
                                  onChange={this.fileChangeHandler}
                                />
                              </div>
                            </div> :
                            <div className="card upload_card">
                              <div className="card-image image_upload_container">
                                <img alt="" className="profile-image" src={require('../../images/upload.jpg')} />
                                <input
                                  name="imgurl"
                                  type="file"
                                  id="file"
                                  onChange={this.fileChangeHandler}
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
                {
                  imageUrls.map(url =>
                    <ProfileCard
                      key={url}
                      img={url}
                      id={url}
                      deletePhoto={this.deleteFile}
                      setDp={this.setDp}
                    />
                  )
                }
              </div>
            </div>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="container">
              <div className="">
                <span className="my_bold">PERSONAL DETAILS</span>
              </div>
              <div className="row">
                <div className="col s4 m4 l3">
                  <input
                    placeholder="First name"
                    name="firstName"
                    type="text"
                    className="validate"
                    required
                    onChange={this.onChange}
                    value={this.state.firstName}
                  />
                </div>
                <div className="col s4 m4 l3">
                  <input
                    placeholder="Last name"
                    name="lastName"
                    type="text"
                    className="validate"
                    required
                    onChange={this.onChange}
                    value={this.state.lastName}
                  />
                </div>
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
                      onChange={this.handleChange}
                    />
                    <span>Make Public</span>
                  </label>
                </span>
              </div>
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
                    maxLength="120"
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
                <span className="col s12 m4 l4">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in checkbox-color"
                      id="here_for_fun"
                      name="1"
                      onClick={this.toggleChange}
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
                      onClick={this.toggleChange}
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
                      onClick={this.toggleChange}
                    />
                    <span>Professional Escort</span>
                  </label>
                </span>
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
            <div className="submitContainer">
              <button
                className="waves-effect waves-light btn save-btn"
                type="submit"
                name="action"
              >Save</button>
              <button
                className="waves-effect waves-light btn cancel-btn"
              >Cancel</button>
            </div>
          </form>
          <div className="bottom_margin" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.auth.success,
  user: state.auth.userDetails,
  isLogged: state.auth.isLogged,
  loading: state.auth.loading,
});

export default connect(mapStateToProps,
  { updateUserDetails,
    getUserDetails,
    uploadPictureRequest,
    deletePictureRequest
  })(Profile);

