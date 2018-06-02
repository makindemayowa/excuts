import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import auth from './authReducer';

export default combineReducers({
  simpleReducer,
  auth
});
