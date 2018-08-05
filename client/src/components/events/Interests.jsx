/* eslint-env jquery */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import SubNav from '../common/SubNav';
import {
  getEventInterests
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
    this.props.getEventInterests(this.eventId).then((res) => {
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
    const { loading } = this.state
    const { interests } = this.props
    return (
      <div>
        <SubNav />
        <div className="bottom_margin" />
        <div className="container interests">
          {
            loading ? <Loader /> :
              <ul className="collection with-header">
                <li className="collection-header">
                  <h6>
                    {`${interests.length}${` `}`}interest(s) was shown for your event
                  </h6>
                </li>
                {
                  interests.map((interested) => {
                    const userId = interested.interestedUser._id
                    return <li className="collection-item row">
                      <span className="col s6 l8 m8">
                        <Link
                          to={`/publicProfile/${userId}`}
                          className="link"
                          key={userId}
                        >
                        {`${interested.interestedUser.firstName}${' '}${interested.interestedUser.lastName}`}
                        </Link>
                      </span>
                      <span className="col s6 l4 m4">
                        Reach on:&nbsp;
                        <a href={`tel:${interested.interestedUser.phone_no}`}>{interested.interestedUser.phone_no}</a>
                      </span>
                    </li>
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
  interests: state.event.interested
});

export default connect(mapStateToProps,
  { getEventInterests })(Interests);