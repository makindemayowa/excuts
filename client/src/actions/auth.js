/* global localStorage */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionType';
import setAuthorisation from '../setAuthorisation'

/**
 * Create an action to set currently logged in user
 *
 * @export
 * @param {object} loggedInUser
 * @returns {object} type payload
 */
export function setUser(loggedInUser, isAuthenticated) {
  return {
    type: actionTypes.SET_CURRENT_USER,
    loggedInUser,
    isAuthenticated
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
  return dispatch => axios.post('/api/login', userData).then((res) => {
    const token = res.data.jsonToken;
    localStorage.setItem('tmo_token', token);
    const loggedInUser = jwtDecode(token).userDetails;
    setAuthorisation(token)
    dispatch(setUser(loggedInUser, true));
  });
}

/**
 * Request to the API to create a new user
 *
 * @export
 * @param {object} userData
 * @returns {object} dispatch object
 */
export function userSignUpRequest(userData) {
  return dispatch =>
    axios.post('/api/signup', userData).then((res) => {
      dispatch(success());
    });
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
  return dispatch =>
    axios.put('/api/user', userDetails).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('tmo_token', token);
      const updatedUser = jwtDecode(token).userDetails;
      setAuthorisation(token)
      dispatch(setUser(updatedUser));
    });
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
  return dispatch =>
    axios.get('/api/user').then((res) => {
      dispatch(setDetails(res.data.user));
    });
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
  return dispatch =>
    axios.get(`/api/signup/verify/${token}`).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('tmo_token', token);
      const loggedInUser = jwtDecode(token).userDetails;
      setAuthorisation(token)
      dispatch(setUser(loggedInUser, true));
    }).catch((err) => {})
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
