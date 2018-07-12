/* eslint-env jquery */
/* global M */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import UserCard from '../common/UserCard';
import NotFound from '../common/NotFound'
import SubNav from '../common/SubNav';
import storage from '../../actions/storage'
import {
  getAllUsers, searchAllUsers
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
      sex: 'female',
      here_to: 'here_to_hire',
      loadingText: '',
      currentPage: 1,
    };
    this.searchUsers = this.searchUsers.bind(this);
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

  searchUsers() {
    this.setState({
      loading: true
    })
    const searchParams = {
      maxDistance: this.state.maxDistance,
      maxAge: this.state.maxAge,
      here_to: this.state.here_to,
      sex: this.state.sex,
    }
    this.props.searchAllUsers(this.long, this.lat, searchParams).then((res) => {
      this.setState({
        loading: false,
        maxDistance: 5,
        maxAge: 40,
        sex: 'female',
        here_to: 'here_to_hire',
      }, () => {
        const materialboxed = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(materialboxed);
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
      })
    }).catch(() => {
      this.setState({
        loading: false,
        maxDistance: 5,
        maxAge: 40,
        sex: 'female',
        here_to: 'here_to_hire',
      })
      const materialboxed = document.querySelectorAll('.materialboxed');
      M.Materialbox.init(materialboxed);
      const elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
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
    document.getElementsByTagName("footer")[0].style.display = 'none'
    const prevLong = this.props.user.location.coordinates[0];
    const prevLat = this.props.user.location.coordinates[1];
    if (!this.props.users.length) {
      const locData = storage.getItem('locdata')
      if (locData) {
        this.long = locData.long;
        this.lat = locData.lat;
        this.getUsers(this.long, this.lat)
      } else {
        this.long = prevLong;
        this.lat = prevLat;
        this.getUsers(this.long, this.lat)
      }
    } else {
      let currentPage = Number(this.props.pagination.currentPage)
      this.setState({
        currentPage: currentPage,
        loading: false
      })
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
        currentPage: page += 1,
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
        <SubNav currentPage={'people'} />
        <div className="discover bg-3">
          <div className="bottom_margin" />
          <div className="content-div bg-3">
            <section className="new-idols">
              <div className="smaller-container">
                <div className="row">
                  {
                    <div className="col s12 m10 l10">
                      {
                        loading ? <Loader /> :
                          <div>
                            {
                              this.props.users.length ?
                                <div>
                                  {
                                    this.props.users.map(user => {
                                      if (user.profilePhoto && user.occupation && user.state) {
                                        return <UserCard
                                          key={user._id}
                                          userInfo={user}
                                        />
                                      }
                                    })
                                  }
                                </div> : <NotFound type="user" />
                            }
                          </div>
                      }
                    </div>
                  }
                  <div>
                    {this.state.loadingText}
                  </div>
                  {
                    <div className="col m2 l2">
                      <div className="searchForm">
                        <div className="flex">
                          <div className="form-fields">
                            <label>Gender</label>
                            <select onChange={this.changeEvent} name="sex" className="size1">
                              <option value="female">Female</option>
                              <option value="male">Male</option>
                              <option value="others">Others</option>
                            </select>
                          </div>
                          <div className="form-fields">
                            <label>Here</label>
                            <select onChange={this.changeEvent} name="here_to" className="size1">
                              <option value="here_to_hire"> To Hire</option>
                              <option value="here_for_fun">For Fun</option>
                              <option value="professsional">Professional Escort</option>
                            </select>
                          </div>
                          <form action="#">
                            Maximum Distance: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span id="maxDistance">{`${this.state.maxDistance} km`}</span>
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
                            <button onClick={this.searchUsers} className="waves-effect waves-light btn">
                              Go
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
    getAllUsers, searchAllUsers
  })(Discover);
