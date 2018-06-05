import { combineReducers } from 'redux';
import isSSR from './isSSR';

const rootReducer = combineReducers({
  isSSR,
});

export default rootReducer;
