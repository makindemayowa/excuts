/* eslint-env jquery */
/* global M */

import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import storage from '../../actions/storage'
import UserCard from '../common/UserCard';
import NotFound from '../common/NotFound'
import Loader from '../common/Loader'
import {
  searchAllUsers
} from '../../actions/auth';
import './search.scss';

class SearchEscort extends Component {
  constructor() {
    super();
    this.state = {
      filterOpen: false,
      startDate: moment(),
      value: { min: 2, max: 10 },
      maxDistance: 5,
      loading: false,
      sex: 'female',
      here_to: 'here_to_hire',
      maxAge: 40,
      searchStarted: false
    };
    this.changeEvent = this.changeEvent.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
  }

  componentDidMount() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    // $('select').formSelect();
  }

  changeEvent(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  searchUsers() {
    this.setState({
      loading: true
    })
    const locData = storage.getItem('locdata')
    this.long = locData.long;
    this.lat = locData.lat;
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
        searchStarted: true
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
        searchStarted: true
      })
      const materialboxed = document.querySelectorAll('.materialboxed');
      M.Materialbox.init(materialboxed);
      const elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
    })
  }

  render() {
    const { loading, searchStarted } = this.state
    return (
      <div className="mobilesearch">
        <div className="searchForm">
          <div className="bottom_margin" />
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
        {
          searchStarted &&
          <div className="row">
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
    searchAllUsers
  })(SearchEscort);
