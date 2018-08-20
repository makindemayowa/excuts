import * as actionTypes from '../actions/actionType';

const initialState = {
  isLogged: false,
  success: false,
  isAuthenticated: false,
  user: {},
  pagination: {},
  users: [],
  userDetails: { photos: [] },
  reviews: [],
  loc: {},
  loading: false,
  photos: [],
};

/**
* Reducer for authentication-related actions.
* @param {Object} state The old state of the application
* @param {Object} action The dispatched action
* @returns {Object} The new application state
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.API_CALL_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.END_API_CALL:
      return {
        ...state,
        loading: false,
      };
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
        loc: action.loc
      };
    case actionTypes.GET_ALL_FAILURE:
      return {
        ...state,
        users: [],
        pagination: {}
      };
    case actionTypes.SET_CURRENT_USER_LOC:
      return {
        ...state,
        loc: action.loc
      };
    case actionTypes.CLEAR_USERS:
      return {
        ...state,
        users: [],
        pagination: {}
      };
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: [...state.users, ...action.users ],
        pagination: action.pagination
      };
    case actionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        pagination: action.pagination
      };
    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    // case actionTypes.CREATE_REVIEW_SUCCESS:
    //   return {
    //     ...state,
    //     userDetails: [...state.userDetails.reviews, ...action.reviews ],
    //   };
    case actionTypes.SET_UPLOADED_PHOTO:
      return {
        ...state,
        photos: [...state.photos, action.imgUrl]
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogged: false,
        isAuthenticated: false,
        success: false,
        user: {},
        userDetails: {}
      };
    default:
      return state;
  }
};
