/*eslint-env jquery*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/simpleAction';
import NavBar from './Nav.jsx';
import Footer from './Footer.jsx';


class App extends Component {
  componentDidMount() {
    $('.sidenav').sidenav();
    $('.authModal').modal({
      // onCloseEnd: () => alert('closed')
    });
    $('.parallax').parallax({
      responsiveThreshold: 30
    });
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <div id="homepage">
          <div className="background-wrap gradient">
            <div className="hmpg-text">
              Who knows? <br />
              Your date might turn <br />out to be <strong>THE ONE</strong>
            </div>
            <div className="hmpg-btn">
              <button className="btn modal-trigger waves-effect waves-light getStarted" data-target="signupModal" type="submit" name="action">
                GET STARTED
              </button>
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
