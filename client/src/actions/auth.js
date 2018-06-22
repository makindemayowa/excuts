/* global localStorage */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionType';
import setAuthorisation from '../setAuthorisation'

function ajaxInProcess() {
  return {
    type: actionTypes.API_CALL_IN_PROGRESS,
  };
}

function endAjax() {
  return {
    type: actionTypes.END_API_CALL,
  };
}

function getAllSucess(users, pagination) {
  return {
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    users,
    pagination
  };
}

export function setUser(loggedInUser, isAuthenticated) {
  return {
    type: actionTypes.SET_CURRENT_USER,
    loggedInUser,
    isAuthenticated,
  };
}

export function setLoc(loc) {
  return {
    type: actionTypes.SET_CURRENT_USER_LOC,
    loc,
  };
}

/**
 * Create an action to set currently logged in users photo
 *
 * @export
 * @param {object} imgUrl
 * @returns {object} type payload
 */
export function setPhoto(imgUrl) {
  return {
    type: actionTypes.SET_UPLOADED_PHOTO,
    imgUrl,
  };
}

/**
 * Create an action to set currently logged in user
 *
 * @export
 * @param {object} loggedInUser
 * @returns {object} type payload
 */
export function setDetails(userDetails) {
  return {
    type: actionTypes.SET_USER_DETAILS,
    userDetails,
  };
}

export function success() {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
  };
}

/**
 * Request to the API to login a user
 *
 * @export
 * @param {any} userData The details of the user to be logged in
 * @returns {object} dispatch object
 */
export function userLoginRequest(userData) {
  // const loc = {}
  // const geoOptions = {
  //   timeout: 10 * 1000
  // }
  // const geoError = function(error) {
  //   console.log('Error occurred. Error code: ' + error.code);
  // };
  // window.navigator.geolocation.getCurrentPosition((pos) => {
  //   loc.long = pos.coords.longitude;
  //   loc.lat = pos.coords.latitude;

  // }, geoError, geoOptions);
  return dispatch => {
    dispatch(ajaxInProcess());
    return axios.post('/api/login', userData).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('tmo_token', token);
      const loggedInUser = jwtDecode(token).userDetails;
      setAuthorisation(token)
      dispatch(endAjax());
      dispatch(setUser(loggedInUser, true));
    });
  }
}

/**
 * Request to the API to create a new user
 *
 * @export
 * @param {object} userData
 * @returns {object} dispatch object
 */
export function userSignUpRequest(userData) {
  return dispatch => {
    dispatch(ajaxInProcess());
    return axios.post('/api/signup', userData).then((res) => {
      dispatch(endAjax());
      dispatch(success());
    });
  }
}

/**
 * Request to the API to update an existing user
 *
 * @export
 * @param {number} id
 * @param {object} userDetails
 * @returns {object} dispatch object
 */
export function updateUserDetails(userDetails) {
  return dispatch => {
    dispatch(ajaxInProcess());
    return axios.put('/api/user', userDetails).then((res) => {
      dispatch(endAjax());
      dispatch(setDetails(res.data.updatedUser));
    });
  }
}

/**
 * Request to the API to update an existing user
 *
 * @export
 * @param {number} id
 * @param {object} userDetails
 * @returns {object} dispatch object
 */
export function getAllUsers(long, lat, page) {
  let url;
  if (page) {
    url = `/api/user/?long=${long}&lat=${lat}&page=${page}`
  } else {
    url = `/api/user/?long=${long}&lat=${lat}` 
  }
  return dispatch => {
    dispatch(ajaxInProcess());
    return axios.get(url).then((res) => {
      dispatch(endAjax());
      const pagination = res.data.pagination;
      const users = res.data.users;
      dispatch(getAllSucess(users, pagination));
    });
  }
}

/**
 * Request to the API to update an existing user
 *
 * @export
 * @param {number} id
 * @param {object} userDetails
 * @returns {object} dispatch object
 */
export function getUserDetails() {
  return dispatch => {
    dispatch(ajaxInProcess());
    return axios.get('/api/user/me').then((res) => {
      dispatch(endAjax());
      dispatch(setDetails(res.data.user));
    });
  }
}

/**
 * Request to the API to update an existing user
 *
 * @export
 * @param {number} id
 * @param {object} userDetails
 * @returns {object} dispatch object
 */
export function getUserById(userId) {
  return dispatch => {
    dispatch(ajaxInProcess());
    return axios.get(`/api/user/${userId}`).then((res) => {
      dispatch(endAjax());
      dispatch(setDetails(res.data.user));
    });
  }
}

/**
 * Request to the API to update an existing user
 *
 * @export
 * @param {number} id
 * @param {object} userDetails
 * @returns {object} dispatch object
 */
export function verifyUserRequest(token) {
  // const loc = {}
  // const geoOptions = {
  //   timeout: 10 * 1000
  // }
  // const geoError = function(error) {
  //   console.log('Error occurred. Error code: ' + error.code);
  // };
  // window.navigator.geolocation.getCurrentPosition((pos) => {
  //   loc.long = pos.coords.longitude;
  //   loc.lat = pos.coords.latitude;

  // }, geoError, geoOptions);
  return dispatch => {
    dispatch(ajaxInProcess());
    return axios.get(`/api/signup/verify/${token}`).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('tmo_token', token);
      const loggedInUser = jwtDecode(token).userDetails;
      setAuthorisation(token)
      dispatch(endAjax());
      dispatch(setUser(loggedInUser, true));
    }).catch((err) => { })
  }
}

/**
 * Request to the API to update an existing user picture
 *
 * @export
 * @param {number} id
 * @param {object} formData
 * @returns {object} dispatch object
 */
export function uploadPictureRequest(formData) {
  const cloudName = 'mayowa'
  delete axios.defaults.headers.common['x-access-token'];
  return dispatch => {
    dispatch(ajaxInProcess());
    return axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData).then((response) => {
      const data = response.data;
      const fileURL = {
        fileUrl: data.secure_url
      }
      axios.put('/api/user/photo', fileURL).then((res) => {
        dispatch(endAjax());
        dispatch(setDetails(res.data.updatedUser));
      });
    }).catch((err) => { })
  }
}

/**
 * Request to the API to update an existing user picture
 *
 * @export
 * @param {number} id
 * @param {object} formData
 * @returns {object} dispatch object
 */
export function deletePictureRequest(imgUrl) {
  return dispatch => {
    dispatch(ajaxInProcess());
    return axios.delete(`/api/user/photo`, imgUrl).then((response) => {
      dispatch(endAjax());
      dispatch(setDetails(response.data.updatedUser));
    }).catch((err) => { })
  }
}

/**
 * Request to delete user token from localStorage
 *
 * @export
 * @returns {object} - remove token
 */
export function logout() {
  return (dispatch) =>
    Promise.resolve(localStorage.removeItem('tmo_token')).then(() => {
      dispatch({ type: actionTypes.LOGOUT });
    })
    ;
}
