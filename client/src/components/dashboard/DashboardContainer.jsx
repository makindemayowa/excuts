/*eslint-env jquery*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../../actions/simpleAction';
import NavBar from '../common/Nav';
import Footer from '../common/Footer';


class App extends Component {
  constructor() {
    super()
    this.state = {
      status: ''
    };
  }
  componentDidMount() {
    navigator.permissions.query({
      name: 'geolocation'
    }).then((result) => {
      if (result.state === 'denied') {
        this.setState({
          status: 'denied'
        });
      }
    });
  }
  render() {
    const Comp = this.props.Comp
    return (
      <div className="App">
        {
          this.props.auth.isLogged ?
            <div>
              <NavBar {...this.props} isLogged={this.props.auth.isLogged} />
              <Comp {...this.props} />
              {/* <Footer /> */}
            </div> :
            <div>
              <NavBar />
              <div className="navigationError">
                {
                  this.state.status === 'denied' && <div>
                    Location access denied, please enable location access
                </div>
                }
              </div>
              <Comp {...this.props} />
              <Footer />
            </div>
        }
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
