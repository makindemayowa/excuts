import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../common/Nav';
import Footer from '../common/Footer';
import EventsHomeCard from './EventsHomeCard';

const event = {
  name: 'Movie',
  time: '9.50p.m',
  date: '24th march, 2018.',
  venue: 'IMAX cinema, Lekki, Lagos',
  city: 'Lekki',
  state: 'Lagos',
  createdBy: 'Oriyomi O.O',
  preference: 'Only people staying on the mainland please',
  details: `Avengers will be showing and I'll rather not
   watch it alone, It'll also be a good opportunity to know people around me`,
  extra: `Please note that I won't be paying for your 
  transport. Just the movie is all`
};

const App = () => (
  <div className="App">
  <NavBar />
  <div id="homepage">
    <div className="background-wrap gradient">
      <div className="hmpg-text">
        Who knows? <br />
        Your date might turn <br />out to be
        <span className="d1">THE ONE</span>
      </div>
      <div className="hmpg-btn">
        <button
          className="btn btn-large modal-trigger waves-effect waves-light getStarted"
          data-target="signupModal"
          type="submit"
          name="action"
        >
          GET STARTED
        </button>
      </div>
    </div>
  </div>
  <div className="bottom_margin" />
  <div className="eventHome">
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

const mapStateToProps = state => ({
  success: state.auth.success,
  isLogged: state.auth.isLogged
});

export default connect(mapStateToProps,
  { })(App);
