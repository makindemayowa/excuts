import * as actionTypes from '../actions/actionType';

const initialState = {
  dates: {},
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
    default:
      return state;
  }
};
