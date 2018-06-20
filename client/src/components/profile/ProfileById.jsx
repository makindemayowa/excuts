/* eslint-env jquery */
/* global M */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { getUserById } from '../../actions/auth';
import { postReviewRequest } from '../../actions/events';
import { postDateRequest } from '../../actions/dates';
import moment from 'moment';
import SubNav from '../common/SubNav';
import ProfileForm from './ProfileForm';

class ProfileById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      startTime: moment(),
      endTime: moment(),
      currentImg: '',
      review: '',
      description: '',
      user: this.props.user || {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.createReview = this.createReview.bind(this);
    this.onChange = this.onChange.bind(this);
    this.requestDate = this.requestDate.bind(this);
  }

  componentDidMount() {
    this.profileId = this.props.match.params.id;
    const carousel = document.querySelectorAll('.carousel');
    const materialboxed = document.querySelectorAll('.materialboxed');
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
    M.Carousel.init(carousel, {
      duration: 100,
      indicators: true,
      onCycleTo: (data) => {
        const currentImg = data.getElementsByTagName('img')[0];
        this.setState({
          currentImg: currentImg.src
        });
      }
    });
    M.Materialbox.init(materialboxed);
    this.props.getUserById(this.profileId).then(() => {
      this.setState({
        user: this.props.user
      }, () => {
        const carousel = document.querySelectorAll('.carousel');
        const materialboxed = document.querySelectorAll('.materialboxed');
        const collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
        M.Carousel.init(carousel, {
          duration: 100,
          indicators: true,
          onCycleTo: (data) => {
            const currentImg = data.getElementsByTagName('img')[0];
            this.setState({
              currentImg: currentImg.src
            });
          }
        });
        M.Materialbox.init(materialboxed);
        $('input#input_text, textarea#textarea1').characterCounter();
      });
    })
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user;
    this.setState({
      user,
    });
  }

  handleChange(date, name) {
    this.setState({
      [name]: date
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  createReview() {
    const review = this.state.review
    this.props.postReviewRequest(this.profileId, review).then((res) => {
      this.props.getUserById(this.profileId).then(() => {
        const collapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(collapsible);
      });
      this.setState({
        review: ''
      });
    });
  }

  requestDate() {
    const dateBody = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      description: this.state.description
    }
    this.props.postDateRequest(this.profileId, dateBody).then(() => {
      this.setState({
        description: '',
      })
      toastr.success('Request successful')
    }).catch((err) => {
      toastr.error('An error occured')
    })
  }

  render() {
    const { user, startDate, endDate, startTime, endTime, description } = this.state
    return (
      <div>
        <SubNav currentPage={'profile'} />
        <ProfileForm
          user={user}
          currentImg={this.state.currentImg}
          currentUser={this.props.currentUser}
          createReview={this.createReview}
          review={this.state.review}
          onChange={this.onChange}
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
          handleChange={this.handleChange}
          description={description}
          requestDate={this.requestDate}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.userDetails,
  currentUser: state.auth.user
});

export default connect(mapStateToProps,
  { getUserById, postReviewRequest, postDateRequest })(ProfileById);
