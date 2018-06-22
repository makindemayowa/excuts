/* eslint-env jquery */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import SubNav from '../common/SubNav';
import {
  getOneEventRequest
} from '../../actions/events';
import Loader from '../common/Loader';

class Interests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {
        created_by: {},
        interested: [],
        loading: true
      },
    };
    this.eventId = '';
  }

  componentDidMount() {
    this.eventId = this.props.match.params.id
    this.props.getOneEventRequest(this.eventId).then((res) => {
      this.setState({
        event: this.props.event,
        loading: false
      })
    }).catch((err) => {
      this.setState({
        error: err.response.data,
        loading: false
      });
    })
  }

  render() {
    const { event, loading } = this.state
    return (
      <div>
        <SubNav />
        <div className="bottom_margin" />
        <div className="container interests">
        {
          loading ? <Loader />:
          <ul className="collection with-header">
            <li className="collection-header">
              <h4>
                {`${event.interested.length}${` `}`}interest(s) was shown for your event
              </h4>
            </li>
            {
              event.interested.map((interested) => {
                const userId = interested._id
                return <Link
                  className="collection-item"
                  to={`/publicProfile/${userId}`}
                  key={userId}
                  >
                  {interested.firstName}
                </Link>
              })
            }
          </ul>
        }
        </div>
        <div className="bottom_margin" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.event,
  loading: state.auth.loading,
});

export default connect(mapStateToProps,
  { getOneEventRequest })(Interests);