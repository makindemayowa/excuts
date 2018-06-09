/* global localStorage */
import axios from 'axios';
import * as actionTypes from './actionType';

/**
 * Create an action to set status of axios call
 *
 * @export
 * @param {object} event
 * @returns {object} type payload
 */
export function createSuccess(event) {
  return {
    type: actionTypes.CREATE_EVENT_SUCCESS,
    event,
  };
}

/**
 * Create an action to set all events
 *
 * @export
 * @param {object} event
 * @returns {object} type payload
 */
export function getAllSuccess(events, pagination) {
  return {
    type: actionTypes.GET_ALL_EVENT_SUCCESS,
    events: events,
    pagination: pagination,
  };
}

/**
 * Create an action to set all events
 *
 * @export
 * @param {object} event
 * @returns {object} type payload
 */
export function getOneSuccess(event) {
  return {
    type: actionTypes.GET_ONE_EVENT_SUCCESS,
    event
  };
}

/**
 * Create an action to show interested users in an event
 *
 * @export
 * @param {string} id
 * @returns {object} type payload
 */
export function interestedSuccess(event) {
  return {
    type: actionTypes.INTERESTED_SUCCESS,
    event
  };
}


/**
 * Request to the API to create an event
 *
 * @export
 * @param {any} eventData The details of the event to be created
 * @returns {object} dispatch object
 */
export function createEventRequest(eventData) {
  return dispatch => axios.post('/api/event', eventData).then((res) => {
    const newEvent = res.data;
    dispatch(createSuccess(newEvent));
  });
}

/**
 * Request to the API to get available events
 *
 * @export
 * @returns {object} dispatch object
 */
export function getAllEventRequest() {
  return dispatch => axios.get('/api/event').then((res) => {
    const events = res.data.events;
    const pagination = res.data.pagination;
    dispatch(getAllSuccess(events, pagination));
  });
}

/**
 * Request to the API to get available events
 *
 * @export
 * @returns {object} dispatch object
 */
export function getOneEventRequest(id) {
  return dispatch => axios.get(`/api/event/${id}`).then((res) => {
    const event = res.data.event;
    dispatch(getOneSuccess(event));
  });
}

/**
 * Request to the API to get post a review
 *
 * @export
 * @returns {object} dispatch object
 */
export function postReviewRequest(id, review) {
  return dispatch => axios.post(`/api/event/${id}/review`, {review}).then((res) => {
    const events = res.data.events;
    const pagination = res.data.pagination;
    dispatch(getAllSuccess(events, pagination));
  });
}

/**
 * Request to the API to get post a review
 *
 * @export
 * @returns {object} dispatch object
 */
export function postInterestedRequest(id) {
  return dispatch => axios.put(`/api/event/${id}/interested`).then((res) => {
    const event = res.data.event;
    dispatch(interestedSuccess(event));
  });
}
