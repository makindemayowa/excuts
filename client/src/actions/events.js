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