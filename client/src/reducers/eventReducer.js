import * as actionTypes from '../actions/actionType';

const initialState = {
  events: {},
  event: {},
  pagination: {},
  success: false,
};

/**
* Reducer for event actions.
* @param {Object} state The old state of the application
* @param {Object} action The dispatched action
* @returns {Object} The new application state
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case actionTypes.GET_ONE_EVENT_SUCCESS:
      return {
        ...state,
        event: action.event,
      };
    case actionTypes.GET_ALL_EVENT_SUCCESS:
      return {
        ...state,
        events: action.events,
        pagination: action.pagination,
      };
    case actionTypes.INTERESTED_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
