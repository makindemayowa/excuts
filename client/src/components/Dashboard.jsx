/*eslint-env jquery*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/simpleAction';
import NavBar from './Nav.jsx';


class App extends Component {
  componentDidMount() {
    $('.sidenav').sidenav();
  }
  render() {
    const Comp = this.props.Comp
    return (
      <div className="App">
        <NavBar />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload
        </p>
        <button onClick={() => this.props.simpleAction()}>Test redux action</button>
        <pre>
          {
            JSON.stringify(this.props.simpleReducer)
          }
        </pre>
        <Comp />
        <div className="collection">
          <a href="#!" className="collection-item"><span className="badge">1</span>Alan</a>
          <a href="#!" className="collection-item"><span className="new badge">4</span>Alan</a>
          <a href="#!" className="collection-item">Alan</a>
          <a href="#!" className="collection-item"><span className="badge">14</span>Alan</a>
        </div>
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
