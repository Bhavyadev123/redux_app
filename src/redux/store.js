import { legacy_createStore } from 'redux';
import contactReducer from '../redux/reducers';

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = legacy_createStore(contactReducer, reduxDevTools);

export default store;
