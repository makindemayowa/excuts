/*eslint-env jquery*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../../actions/simpleAction';
import NavBar from '../common/Nav';
import Footer from '../common/Footer';
// import SubNav from '../subNav/SubNav';

class App extends Component {
  componentDidMount() {
    $('.sidenav').sidenav();
  }
  render() {
    const Comp = this.props.Comp
    return (
      <div className="App">
        <NavBar />
        <Comp />
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
