import * as actionTypes from '../actions/actionType';

const initialState = {
  isLogged: false,
  success: false,
  isAuthenticated: false,
  user: {},
  userDetails: {},
};

/**
* Reducer for authentication-related actions.
* @param {Object} state The old state of the application
* @param {Object} action The dispatched action
* @returns {Object} The new application state
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        success: true,
        isAuthenticated: true,
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isLogged: true,
        success: true,
        isAuthenticated: action.isAuthenticated,
        user: action.loggedInUser,
      };
    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogged: false,
        isAuthenticated: false,
        success: false,
        user: {}
      };
    default:
      return state;
  }
};
