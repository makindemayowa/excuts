/* eslint-env jquery */
/* global M */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavBar from '../common/Nav';
import Footer from '../common/Footer';
import EventsHomeCard from './EventsHomeCard';
import { userSignUpRequest, userLoginRequest } from '../../actions/auth';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      success: false,
      isLogged: false,
    };
    this.onChange = this.onChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.long = parseFloat(pos.coords.longitude);
      this.lat = parseFloat(pos.coords.latitude);
    });
    const elems = document.querySelectorAll('.authModal');
    M.Modal.init(elems, {
      onCloseEnd: () => {
        this.setState({
          email: '',
          password: '',
          confirmPassword: '',
          error: '',
        });
      }
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  submitSignup(e) {
    const elem = document.querySelector('#signupModal');
    const instance = M.Modal.getInstance(elem);
    this.setState({ error: '' });
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return this.setState({
        error: 'passwords do not match'
      });
    }
    const userdata = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      loc: {
        type: "Point",
        coordinates: [this.long, this.lat]
      }
    };
    this.props
      .userSignUpRequest(userdata)
      .then(() => {
        instance.close()
        this.setState({ success: this.props.success })
      })
      .catch((errorData) => {
        this.setState({
          error: errorData.response.data.message
        });
      });
  }

  submitLogin(e) {
    const elem = document.querySelector('#loginModal');
    const instance = M.Modal.getInstance(elem);
    this.setState({ error: '' });
    e.preventDefault();
    const userdata = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props
      .userLoginRequest(userdata)
      .then(() => {
        instance.close();
        this.setState({ isLogged: this.props.isLogged });
      })
      .catch((errorData) => {
        this.setState({
          error: errorData.response.data.message
        });
      });
  }

  render() {
    const { isLogged, success } = this.state;
    if (isLogged) {
      return <Redirect to="/dashboard" />;
    }
    if (success) {
      return <Redirect to="/verify" />;
    }
    return (
      <div className="App">
        <NavBar
          onChange={this.onChange}
          submitSignup={this.submitSignup}
          submitLogin={this.submitLogin}
          state={this.state}
        />
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
  success: state.auth.success,
  isLogged: state.auth.isLogged
});

export default connect(mapStateToProps,
  { userSignUpRequest, userLoginRequest })(App);
