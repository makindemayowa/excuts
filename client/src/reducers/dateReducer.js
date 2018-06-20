import * as actionTypes from '../actions/actionType';

const initialState = {
  dateRequests: [],
  myCreatedRequests: [],
  date: {},
  pagination: {},
  success: false,
};

/**
* Reducer for date actions.
* @param {Object} state The old state of the application
* @param {Object} action The dispatched action
* @returns {Object} The new application state
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_DATE_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case actionTypes.GET_ALL_DATE_SUCCESS:
      return {
        ...state,
        dateRequests: action.dateRequests,
      };
    case actionTypes.GET_ALL_DATE_I_CREATED_SUCCESS:
      return {
        ...state,
        myCreatedRequests: action.dateRequests,
      };
    default:
      return state;
  }
};
