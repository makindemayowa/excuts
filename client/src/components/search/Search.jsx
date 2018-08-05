/* eslint-env jquery */

import React, { Component } from 'react';
import SubNav from '../common/SubNav';
import SearchEscorts from './SearchEscorts';
import SearchEvents from './SearchEvents';
import countriesWithStates from '../../helpers/states'
import './search.scss';

class SearchEscort extends Component {
  constructor() {
    super();
    this.state = {
      filterOpen: false,
      value: { min: 2, max: 10 },
      maxDistance: 5,
      maxAge: 40
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeEvent = this.changeEvent.bind(this);
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

  onChange(e) {
    const name = e.target.name
    this.setState({
      [name]: e.target.value,
      error: ''
    }, () => {
      if (name === "country") {
        const index = countriesWithStates.countries.findIndex(countries => countries.country === this.state.country);
        this.setState({
          countryIndex: index,
          states: countriesWithStates.countries[index].states
        })
      }
    });
  }

  render() {
    return (
      <div>
        <SubNav currentPage={'search'}/>
        <div className="searchcontainer row">
          <div className="col tabscol s12">
            <ul className="tabs">
              <li className="tab col s6"><a className="active" href="#events">Events</a></li>
              <li className="tab col s6"><a href="#excuts">Excuts</a></li>
            </ul>
          </div>

          <div id="events" className="col s12">
            <SearchEvents />
          </div>
          <div id="excuts" className="col s12">
            <SearchEscorts />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchEscort;
