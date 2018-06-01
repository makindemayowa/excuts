/*eslint-env jquery*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../../actions/simpleAction';
import NavBar from '../common/Nav';
import UserCard from '../common/UserCard';
import Footer from '../common/Footer';
import EventsHomeCard from './EventsHomeCard'


const img = require('../../images/date2.jpg')
const user1 = {
  name: 'Jones Jimoh',
  age: 24,
  job: 'Bricklayer',
  avatar: img,
  location: 'Lagos, Uk',
  about: 'I love to cook, sing, dance and whatever else you can imagine a good person doing up and about',
};
const event = {
  name: 'Movie',
  time: '9.50p.m',
  date: '24th march, 2018.',
  venue: 'IMAX cinema, Lekki, Lagos',
  city: 'Lekki',
  state: 'Lagos',
  photo: img,
  createdBy: 'Oriyomi O.O',
  preference: 'Only people staying on the mainland please',
  details: "Avengers will be showing and I'll rather not watch it alone, It'll also be a good opportunity to know people around me",
  extra: "Please note that I won't be paying for your transport. Just the movie is all"
};

class App extends Component {
  componentDidMount() {
    $('.authModal').modal();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div id="homepage">
          <div className="background-wrap gradient">
            <div className="hmpg-text">
              Who knows? <br />
              Your date might turn <br />out to be <span className="d1">THE ONE</span>
            </div>
            <div className="hmpg-btn">
              <button className="btn btn-large modal-trigger waves-effect waves-light getStarted" data-target="signupModal" type="submit" name="action">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
        <div className="bottom_margin" />
        <div className="new-hires">
          <div className="smaller-container">
            <div className="row">
              <EventsHomeCard event={event} />
              <EventsHomeCard event={event} />
              <EventsHomeCard event={event} />
              <EventsHomeCard event={event} />
              <EventsHomeCard event={event} />
              <EventsHomeCard event={event} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
