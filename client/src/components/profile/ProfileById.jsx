/* eslint-env jquery */
/* global M */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { getUserById } from '../../actions/auth';
import { postReviewRequest } from '../../actions/events';
import { postDateRequest } from '../../actions/dates';
import moment from 'moment';
import Loader from '../common/Loader'
import SubNav from '../common/SubNav';
import ProfileForm from './ProfileForm';

class ProfileById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      currentImg: '',
      review: '',
      description: '',
      venue: '',
      loading: true,
      user: this.props.user || {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.createReview = this.createReview.bind(this);
    this.onChange = this.onChange.bind(this);
    this.requestDate = this.requestDate.bind(this);
    // this.addAutocomplete = this.addAutocomplete.bind(this);
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
        user: this.props.user,
        loading: false
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

  // addAutocomplete() {
  //   const address = (document.getElementById('entry'));
  //   const autocomplete = new google.maps.places.Autocomplete(address);
  //   autocomplete.setTypes();
  //   google.maps.event.addListener(autocomplete, 'place_changed', function() {
  //     const place = autocomplete.getPlace();
  //     if (!place.geometry) {
  //       return;
  //     }
  //     let newAddress = '';
  //     if (place.address_components) {
  //       newAddress = [
  //         (place.address_components[0] && place.address_components[0].short_name || ''),
  //         (place.address_components[1] && place.address_components[1].short_name || ''),
  //         (place.address_components[2] && place.address_components[2].short_name || '')
  //       ].join(' ');
  //     }
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user;
    const loading = nextProps.loading
    this.setState({
      user,
      loading
    });
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
  }

  handleChange(date, name) {
    this.setState({
      [name]: date
    });
  }

  onChange(e) {
    // if (e.target.name === "venue") {
    //   this.addAutocomplete()
    // }
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  createReview() {
    const review = this.state.review
    this.props.postReviewRequest(this.profileId, review).then((res) => {
      toastr.success('success')
      this.props.getUserById(this.profileId);
      this.setState({
        review: ''
      });
    });
  }

  requestDate() {
    if (!this.props.currentUser.here_to && !this.props.currentUser.profilePhoto) {
      return toastr.error('please complete your profile')
    }
    const dateBody = {
      date: this.state.date,
      description: this.state.description,
      venue: this.state.venue
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
    const { user, date, venue, description, loading } = this.state
    return (
      <div>
        <SubNav currentPage={'profile'} />
        <div className="profileById">
          {
            loading ? <Loader /> :
              <ProfileForm
                user={user}
                currentImg={this.state.currentImg}
                currentUser={this.props.currentUser}
                createReview={this.createReview}
                review={this.state.review}
                onChange={this.onChange}
                date={date}
                venue={venue}
                handleChange={this.handleChange}
                description={description}
                requestDate={this.requestDate}
              />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.userDetails,
  currentUser: state.auth.user,
  loading: state.auth.loading
});

export default connect(mapStateToProps,
  { getUserById, postReviewRequest, postDateRequest })(ProfileById);
