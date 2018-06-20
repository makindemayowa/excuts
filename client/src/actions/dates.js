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
