import axios from 'axios';

/**
 * set Authorization Token
 * It sets token to the header of every axios request
 * @export
 * @param {string} token
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}