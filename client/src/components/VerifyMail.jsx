import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { verifyUserRequest } from '../actions/auth';


class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    }
  }

  componentDidMount() {
    const verifyingToken = this.props.match.params.token
    this.props
      .verifyUserRequest(verifyingToken)
      .then(() => this.setState({ isLogged: this.props.isLogged }))
      .catch((errorData) => {
        this.setState({
          error: errorData.response.data
        });
      });
  }

  render() {
    const { isLogged } = this.state;
    if (isLogged) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container center">
        Please Wait
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
});

export default connect(mapStateToProps, { verifyUserRequest })(Verify);
