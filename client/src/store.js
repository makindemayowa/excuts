import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import jwtDecode from 'jwt-decode';
import { setUser } from './actions/auth';
import setAuthorisation from './setAuthorisation'

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
  );
  if (localStorage.tmo_token) {
    const decoded = jwtDecode(localStorage.tmo_token)
    const user = decoded.userDetails
    const isAuthenticated = decoded.exp > Date.now() / 1000;
    setAuthorisation(localStorage.tmo_token)
    store.dispatch(setUser(user, isAuthenticated));
  }
  return store;
}
