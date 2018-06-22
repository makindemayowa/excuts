/* eslint-env jquery */
/* global M */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import UserCard from '../common/UserCard';
import SubNav from '../common/SubNav';
import {
  getAllUsers
} from '../../actions/auth';
import './dashboard.scss';
import Loader from '../common/Loader'

class Discover extends Component {
  constructor() {
    super();
    this.state = {
      filterOpen: false,
      loading: false,
      startDate: moment(),
      value: { min: 2, max: 10 },
      maxDistance: 5,
      maxAge: 40,
      loadingText: '',
      currentPage: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
    window.onscroll = () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        this.loadItems()
      }
    };
  }

  getUsers(long, lat, page) {
    this.props.getAllUsers(long, lat, page).then((res) => {
      this.setState({
        loading: false
      }, () => {
        const materialboxed = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(materialboxed);
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
      })
    })
  }

  componentDidMount() {
    const materialboxed = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxed);
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    this.setState({
      loading: true
    })
    var geoOptions = {
      timeout: 10 * 1000
    }
    document.getElementsByTagName("footer")[0].style.display = 'none'
    const prevLong = this.props.user.location.coordinates[0];
    const prevLat = this.props.user.location.coordinates[1];
    const geoError = () => {
      this.long = prevLong;
      this.lat = prevLat;
      this.getUsers(this.long, this.lat)
    };
    if (!this.props.users.length) {
      window.navigator.geolocation.getCurrentPosition((pos) => {
        this.long = pos.coords.longitude;
        this.lat = pos.coords.latitude;
        this.getUsers(this.long, this.lat)
      }, geoError, geoOptions);
    } else {
      let currentPage = Number(this.props.pagination.currentPage)
      this.setState({
        currentPage: currentPage,
        loading: false
      }
    )
    }
  }

  loadItems() {
    // I still need to find an efficient way to deal with current location
    if (!this.long) {
      this.long = this.props.user.location.coordinates[0];
      this.lat = this.props.user.location.coordinates[1];
    }
    let page = this.state.currentPage
    if (this.props.pagination.pages === page) {
      this.setState({
        loadingText: ''
      });
      document.getElementsByTagName("footer")[0].style.display = 'block'
    } else {
      this.setState({
        currentPage: page+=1,
        loadingText: 'please wait...'
      }, () => {
        this.getUsers(this.long, this.lat, this.state.currentPage)
      });
    }
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  changeEvent(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    const { loading } = this.state
    return (
      <div>
        <SubNav />
        {
          loading && <Loader />
        }
        <div className="discover bg-3">
          <div className="bottom_margin" />
          <div className="content-div bg-3">
            <section className="new-idols">
              <div className="smaller-container">
                <div className="row">
                  {
                    <div className="col s12 m10 l10">
                      {
                        this.props.users.map(user =>
                          <UserCard
                            key={user._id}
                            userInfo={user}
                          />
                        )
                      }
                    </div>
                  }
                  <div>
                    {this.state.loadingText}
                  </div>
                  {
                    !loading &&
                    <div className="col m2 l2">
                      <div className="searchForm">
                        <div className="flex">
                          <div className="form-fields">
                            <label>Gender</label>
                            <select className="size1">
                              <option value="1">Female</option>
                              <option value="">Male</option>
                              <option value="2">Other</option>
                            </select>
                          </div>

                          <div className="form-fields">
                            <label>Country</label>
                            <select className="size1">
                              <option value="">Nigeria</option>
                              <option value="3">Norway</option>
                              <option value="1">Oman</option>
                              <option value="2">Pakistan</option>
                            </select>
                          </div>

                          <div className="form-fields">
                            <label>State</label>
                            <select className="size1">
                              <option value="">Lagos</option>
                              <option value="1">Abuja</option>
                              <option value="2">Abeokuta</option>
                            </select>
                          </div>
                          <form action="#">
                            Maximum Distance: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span id="maxDistance">{this.state.maxDistance}km</span>
                            <p className="range-field">
                              <input type="range" name="maxDistance" value={this.state.maxDistance} onChange={this.changeEvent} min="0" max="100" />
                            </p>
                          </form>
                          <form action="#">
                            Maximum Age:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span id="maxAge">{this.state.maxAge}</span>
                            <p className="range-field">
                              <input type="range" name="maxAge" value={this.state.maxAge} onChange={this.changeEvent} min="18" max="60" />
                            </p>
                          </form>
                          <div className="">
                            <button className="waves-effect waves-light btn">
                              Search
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.auth.users,
  user: state.auth.user,
  loc: state.auth.loc,
  pagination: state.auth.pagination,
  loading: state.auth.loading
});

export default connect(mapStateToProps,
  {
    getAllUsers,
  })(Discover);
