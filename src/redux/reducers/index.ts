import { combineReducers, Store as IStore } from 'redux';
import isSSR, { ISSR } from './isSSR';

export interface State extends ISSR {};
export type Store = IStore<State>;

const rootReducer = combineReducers({
  isSSR,
});

export default rootReducer;
