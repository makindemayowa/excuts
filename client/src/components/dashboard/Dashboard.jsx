/*eslint-env jquery*/

import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import UserCard from '../common/UserCard';
import SubNav from '../common/SubNav';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './dashboard.scss';

const img = require('../../images/date2.jpg')
const userInfo = {
  name: 'Jones Jimoh',
  age: 24,
  job: 'Bricklayer',
  avatar: img,
  location: 'Lagos, Nigeria',
  about: 'I love to cook, sing, dance and whatever else you can imagine a good person doing up and about',
};

class Discover extends Component {
  constructor() {
    super();
    this.state = {
      filterOpen: false,
      startDate: moment(),
      value: { min: 2, max: 10 },
      maxDistance: 5,
      maxAge: 40
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
  }

  componentDidMount() {
    $('select').formSelect(); 
    $('.materialboxed').materialbox();
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  changeEvent(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    return (
      <div>
        <SubNav />
        <div className="discover bg-3">
          <div className="bottom_margin" />
          <div className="content-div bg-3">
            <section className="new-idols">
              <div className="smaller-container">
                <div className="row">
                  <div className="col s12 m10 l10">
                    <UserCard userInfo={userInfo} />
                    <UserCard userInfo={userInfo} />
                    <UserCard userInfo={userInfo} />
                    <UserCard userInfo={userInfo} />
                    <UserCard userInfo={userInfo} />
                    <UserCard userInfo={userInfo} />
                    <UserCard userInfo={userInfo} />
                    <UserCard userInfo={userInfo} />
                    <UserCard userInfo={userInfo} />
                  </div>
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
                </div>
              </div>
            </section>
          </div>

          <div className="content-div">
            <div className="content" style={{ minHeight: '100px' }}>
              <div className="custom-pagination">
                <ReactPaginate
                  previousLabel={<span><i className="fas fa-arrow-circle-left" /> <span>PREVIOUS</span> </span>}
                  nextLabel={<span><span>NEXT</span><i className="fas fa-arrow-circle-right" /></span>}
                  breakLabel={<a href="">...</a>}
                  breakClassName="break-me"
                  pageCount={10}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={() => { console.log('hello'); }}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  activeClassName="active"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discover;
