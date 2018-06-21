import axios from 'axios';
import * as actionTypes from './actionType';

/**
 * Create an action to set status of axios call
 *
 * @export
 * @param {object} date
 * @returns {object} type payload
 */
export function createDateSuccess() {
  return {
    type: actionTypes.CREATE_DATE_SUCCESS,
  };
}

/**
 * Create an action to set status of axios call
 *
 * @export
 * @param {object} date
 * @returns {object} type payload
 */
export function getDateSuccess(dateRequests) {
  return {
    type: actionTypes.GET_ALL_DATE_SUCCESS,
    dateRequests
  };
}

/**
 * Create an action to set status of axios call
 *
 * @export
 * @param {object} date
 * @returns {object} type payload
 */
export function getMyCreatedDateSuccess(dateRequests) {
  return {
    type: actionTypes.GET_ALL_DATE_I_CREATED_SUCCESS,
    dateRequests
  };
}

/**
 * Request to the API to get post a date
 *
 * @export
 * @returns {object} dispatch object
 */
export function postDateRequest(id, dateBody) {
  return dispatch => axios.post(`/api/user/${id}/requestdate`, dateBody).then(() => {
    dispatch(createDateSuccess());
  });
}

/**
 * Request to the API to get all dates
 *
 * @export
 * @returns {object} dispatch object
 */
export function getDateRequest(query) {
  let url;
  if (query) {
    url = `/api/daterequests/?q=${query}`
  } else {
    url = `/api/daterequests`
  }
  return dispatch => axios.get(url).then((res) => {
    dispatch(getDateSuccess(res.data.dateRequests));
  });
}

/**
 * Request to the API to get all dates I requested
 *
 * @export
 * @returns {object} dispatch object
 */
export function getMyDateRequest() {
  return dispatch => axios.get(`/api/mydaterequests`).then((res) => {
    dispatch(getMyCreatedDateSuccess(res.data.dateRequests));
  });
}

/**
 * Request to the API to update an existing date
 *
 * @export
 * @param {number} id
 * @param {object} userDetails
 * @returns {object} dispatch object
 */
export function updateDate(id, details) {
  return dispatch =>
    axios.put(`/api/daterequests/${id}`, details).then((res) => {
      // dispatch((res.data.updatedUser));
    });
}
