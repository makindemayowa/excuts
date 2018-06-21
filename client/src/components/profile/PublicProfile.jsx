/* eslint-env jquery */
/* global M */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDetails } from '../../actions/auth';
import SubNav from '../common/SubNav';
import ProfileForm from './ProfileForm';
import Loader from '../common/Loader'

class PublicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: '',
      user: this.props.user || {},
      loading: true
    };
  }

  componentDidMount() {
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
    this.props.getUserDetails().then(() => {
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

  render() {
    const { user, currentImg, loading } = this.state
    return (
      <div>
        <SubNav currentPage={'profile'} />
        <div className="publicProfileContainer">
          {
            loading ? <Loader /> :
              <ProfileForm
                user={user}
                currentImg={currentImg}
                currentUser={this.props.currentUser}
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
  { getUserDetails })(PublicProfile);
