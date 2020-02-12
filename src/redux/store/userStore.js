import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import userReducer from '../reducers/userReducer';

const store = createStore(userReducer, {}, applyMiddleware(thunk, logger));
export default store;