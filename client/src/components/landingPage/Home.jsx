import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from '../common/Nav';
import Footer from '../common/Footer';
import EventsHomeCard from './EventsHomeCard';

const event = {
  date: new Date().toDateString(),
  venue: 'IMAX cinema, Lekki',
  details: `It'll also be a good opportunity to meet people around me`,
  extra: `Please note that you'll be responsible for your 
  transport. Just the movie is all.`
};

const event2 = {
  date: new Date().toDateString(),
  venue: 'Ember creek, Ikoyi',
  details: `Been cancelling plans to visit this place for a while since the friends I was supposed to go with always cancel...`,
  extra: `I'll prefer a male working on the mainland between the age of 30 - 34.`
};

const event3 = {
  date: new Date().toDateString(),
  venue: 'Paintball at ziggie"s, Ikosi Ketu',
  details: `Friends going out with their significant others. Would rather not go alone.`,
  extra: `Don't show interest if you're not fun :) `
};

const event4 = {
  date: new Date().toDateString(),
  venue: 'Road Runners nightclub, Lagos',
  details: `Plan on checking out the club as it is relatively new and would prefer to go along with an escort`,
  extra: `I'll come pick you up where-ever you are as long as it's within lagos. `
};

const event5 = {
  date: new Date().toDateString(),
  venue: 'Saam Health Holiday Resort, Idiroko',
  details: `A weekend getaway from office stress. And yes, I got you covered`,
  extra: `Married guys please keep off. Yes I'm a lady and yes I'll foot your bills.`
};

const event6 = {
  date: new Date().toDateString(),
  venue: 'Sky Bar rooftop lounge, Asokoro.',
  details: `It's always fun around me.`,
  extra: `Reach out for any questions.`
};

const App = () => (
  <div className="homehome">
    <NavBar />
    <div id="homepage">
      <div className="background-wrap gradient">
        <div className="hmpg-text">
          Who knows? <br />
          Your date might turn <br />out to be
        <span className="d1">THE ONE</span>
        </div>
        <div className="hmpg-btn">
          <Link to="/signup">
            <button
              className="btn btn-large modal-trigger waves-effect waves-light getStarted"
              data-target="signupModal"
              type="submit"
              name="action"
            >
              GET STARTED
        </button>
          </Link>
        </div>
      </div>
    </div>
    <div className="bottom_margin" />
    <div className="eventHome">
      <div className="smaller-container">
        <div className="row">
          <EventsHomeCard event={event} />
          <EventsHomeCard event={event2} />
          <EventsHomeCard event={event5} />
          <EventsHomeCard event={event6} />
          <EventsHomeCard event={event3} />
          <EventsHomeCard event={event4} />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const mapStateToProps = state => ({
  success: state.auth.success,
  isLogged: state.auth.isLogged
});

export default connect(mapStateToProps,
  {})(App);
