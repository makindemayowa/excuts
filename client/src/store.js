import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import jwtDecode from 'jwt-decode';
import { setUser } from './actions/auth';

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
  );
  if (localStorage.tmo_token) {
    store.dispatch(setUser(jwtDecode(localStorage.tmo_token).userDetails));
  }
  return store;
}
