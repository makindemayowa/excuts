import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import auth from './authReducer';
import event from './eventReducer';
import date from './dateReducer';

export default combineReducers({
  simpleReducer,
  auth,
  event,
  date
});
