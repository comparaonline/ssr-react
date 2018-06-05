import React from 'react';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { createApolloClient } from 'Utils/ApolloClient';
import { configureStore } from 'Utils/ReduxSetup';

const history = createHistory();
const apolloClient = createApolloClient(window.__APOLLO_STATE__);
const store = configureStore(window.__REDUX_STATE__);

// Allow the passed state to be garbage-collected
delete window.__REDUX_STATE__;
delete window.__APOLLO_STATE__;

export default (App) => (
  <AppContainer>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App history={history} />
      </ApolloProvider>
    </Provider>
  </AppContainer>
);
