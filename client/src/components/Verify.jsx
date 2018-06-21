import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/common/Nav';

class Verify extends Component {
  render() {
    if(this.props.status === 'verified') {
      return <Redirect to="/dashboard"/>
    }
    return (
      <div>
        <NavBar />
        <div className="container center">
          <h4 className="center">
            Please check your email and verify your account to continue
          </h4>
          <div>
            Did not get an email?
          </div>
          <div>
            <a href="/resend">click here to resend</a>
          </div>
        </div>
      </div>
    );
  }
}

Verify.defaultProps = {
  status: '',
};

Verify.propTypes = {
  status: Proptypes.string
};

const mapStateToProps = state => ({
  status: state.auth.user.status,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Verify);