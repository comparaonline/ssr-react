import { createStore, compose } from 'redux';
import { isDevEnv } from 'Utils/EnvInfo';
import rootReducer from 'Redux/reducers';

export const configureStore = (initialState = {}) => {
  const composeEnhancers = isDevEnv
    ? (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose
    : compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(),
  );

  return store;
};

export const getInitialState = (opts = {}) => {
  const { req } = opts; // eslint-disable-line

  return {
    isSSR: true,
  };
};
