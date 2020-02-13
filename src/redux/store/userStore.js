import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import login from '../reducers/userReducer';

const store = createStore(login, {}, applyMiddleware(thunk, logger));
export default store;