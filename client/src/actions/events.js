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
 * Create an action to set status of axios call
 *
 * @export
 * @param {object} event
 * @returns {object} type payload
 */
export function createReviewSuccess(reviews) {
  return {
    type: actionTypes.CREATE_REVIEW_SUCCESS,
    reviews,
  };
}

/**
 * Create an action to set all events
 *
 * @export
 * @param {object} event
 * @returns {object} type payload
 */
export function getAllEventSuccess(events, pagination) {
  return {
    type: actionTypes.GET_ALL_EVENT_SUCCESS,
    events: events,
    pagination: pagination,
  };
}

function searchAllEventSuccess(events, pagination) {
  return {
    type: actionTypes.SEARCH_ALL_EVENT_SUCCESS,
    events: events,
    pagination: pagination,
  };
}

function clearEvent() {
  return {
    type: actionTypes.CLEAR_EVENT,
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
 * Create an action to set all interests
 *
 * @export
 * @param {object} event
 * @returns {object} type payload
 */
export function getInterestSuccess(interests) {
  return {
    type: actionTypes.GET_ALL_INTERESTS_SUCCESS,
    interests
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
export function getAllEventRequest(query) {
  let url;
  if (query === 'mine') {
    url = `/api/event/?q=${query}`
  } else {
    if (query) {
      url = `/api/event/?page=${query}`
    } else {
      url = '/api/event'
    }
  }
  return (dispatch) => {
    if(!query) {
      dispatch(clearEvent())
    }
   return axios.get(url).then((res) => {
      const events = res.data.events;
      const pagination = res.data.pagination;
      dispatch(getAllEventSuccess(events, pagination));
    });
  }
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
 * Request to the API to get available events
 *
 * @export
 * @returns {object} dispatch object
 */
export function getEventInterests(id) {
  return dispatch => axios.get(`/api/event/${id}/interested`).then((res) => {
    const interests = res.data.interestedUsers;
    dispatch(getInterestSuccess(interests));
  });
}

/**
 * Request to the API to get post a review
 *
 * @export
 * @returns {object} dispatch object
 */
export function postReviewRequest(id, review) {
  return dispatch => axios.post(`/api/user/${id}/review`, { review }).then((res) => {
    // const reviews = res.data.updatedUser.reviews;
    // console.log('response from API', reviews)
    // dispatch(createReviewSuccess(reviews));
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

/**
 * Request to the API to get post a review
 *
 * @export
 * @returns {object} dispatch object
 */
export function searchEventRequest(queryParam) {
  const queryParams = Object.keys(queryParam);
  const firstIndex = queryParams[0]
  let url = `/api/event?${firstIndex}=${queryParam[firstIndex]}`
  for (let index = 1; index < queryParams.length; index += 1) {
    const otherIndex = queryParams[index]
    url += `&${otherIndex}=${`${queryParam[otherIndex]}`}`;
  }
  return dispatch => axios.get(url).then((res) => {
    const events = res.data.events;
    const pagination = res.data.pagination;
    dispatch(searchAllEventSuccess(events, pagination));
  });
}
