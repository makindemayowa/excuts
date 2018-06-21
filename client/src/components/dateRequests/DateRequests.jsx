/*eslint-env jquery*/
/*global M*/
import React, { Component } from 'react';
import { connect } from 'react-redux'
import toastr from 'toastr';
import PropTypes from 'prop-types';
import SubNav from '../common/SubNav';
import moment from 'moment';
import Loader from '../common/Loader';
import NotFound from '../common/NotFound';
import RequestCard from './RequestCard';
import MycreatedRequests from './MycreatedRequests';
import './dates.scss';
import { getDateRequest, updateDate, getMyDateRequest } from '../../actions/dates';

class DateRequests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      dateRequests: [],
      comment: '',
      selectedTab: '',
      myCreatedRequests: [],
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateDateStatus = this.updateDateStatus.bind(this);
  }

  componentDidMount() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    this.props.getDateRequest().then(() => {
      this.setState({
        dateRequests: this.props.dateRequests,
        loading: false
      }, () => {
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
      });
    }).catch(() => {
      this.setState({
        loading: false
      }, () => {
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const dateRequests = nextProps.dateRequests;
    const loading = nextProps.loading;
    this.setState({
      dateRequests,
      loading
    }, () => {
      const elems = document.querySelectorAll('.modal');
      M.Modal.init(elems);
    });
  }

  handleChange(e) {
    this.setState({
      loading: true,
      selectedTab: e.target.value,
      dateRequests: []
    });
    if (e.target.value === 'mine') {
      this.props.getMyDateRequest(e.target.value).then(() => {
        this.setState({
          myCreatedRequests: this.props.myCreatedRequests,
          loading: false
        })
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
      }).catch(() => {
        this.setState({
          loading: false
        })
      });;
    } else {
      this.props.getDateRequest(e.target.value).then(() => {
        this.setState({
          dateRequests: this.props.dateRequests,
          loading: false
        }, () => {
          const elems = document.querySelectorAll('.modal');
          M.Modal.init(elems);
        });
      }).catch(() => {
        this.setState({
          loading: false
        })
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  updateDateStatus(e, id, decision) {
    e.preventDefault()
    const details = {
      status: decision,
      comment: this.state.comment
    }
    this.props.updateDate(id, details).then((res) => {
      toastr.success('Success, the other party will be notifies')
      this.props.getDateRequest()
    });
    this.setState({
      comment: ''
    });
  }

  render() {
    const { loading } = this.state
    return (
      <div className="daterequests">
        <SubNav currentPage={'daterequests'} />
        <div className="form-fields">
          <select
            className="size1"
            onChange={this.handleChange}
          >
            <option value="">My requests</option>
            <option value="mine">Created by Me</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
        <div className="container">
          {loading ? <Loader /> :
            <div>
              {this.state.selectedTab !== 'mine' &&
                <div className="row">
                  {
                    this.state.dateRequests.length ? (this.state.dateRequests.map((daterequest) => (
                      <RequestCard
                        key={daterequest._id}
                        daterequest={daterequest}
                        updateDateStatus={this.updateDateStatus}
                        onChange={this.onChange}
                        comment={this.state.comment}
                      />
                    )
                    )) :
                      <NotFound
                        type={'request'}
                      />
                  }
                </div>
              }
              {this.state.selectedTab === 'mine' && (this.state.myCreatedRequests.length ?
                <div className="row">
                  {
                    this.state.myCreatedRequests.map((daterequest) => (
                      <MycreatedRequests
                        key={daterequest._id}
                        daterequest={daterequest}
                      />
                    )
                    )
                  }
                </div> :
                <NotFound
                  type={'request'}
                />)
              }
            </div>}
        </div>
      </div>
    );
  }
}

DateRequests.defaultProps = {
  events: [],
};

DateRequests.propTypes = {
  dateRequests: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = state => ({
  dateRequests: state.date.dateRequests,
  myCreatedRequests: state.date.myCreatedRequests,
  loading: state.auth.loading,
});

export default connect(mapStateToProps,
  { getDateRequest, updateDate, getMyDateRequest })(DateRequests);
