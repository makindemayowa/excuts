/*eslint-env jquery*/

import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import UserCard from '../common/UserCard';
import SubNav from '../common/SubNav';
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
      filterOpen: false
    };
  }

  render() {
    return (
      <div>
        <SubNav />
        <div className="discover bg-3">
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
                    <div className="card white darken-1">
                      <div className="card-content black-text">
                        <span className="card-title">Quick Search</span>
                      </div>

                      <div className="input-field col s12">
                        State
                        <select>
                          <option value="1">Ogun</option>
                          <option value="2">Osun</option>
                          <option value="3">Oyo</option>
                        </select>
                      </div>

                      <form action="#">
                        <p className="range-field">
                          <input type="range" id="test5" min="18" max="55+" />
                        </p>
                      </form>
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
