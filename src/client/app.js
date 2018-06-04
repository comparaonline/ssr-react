import React from 'react';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import { ApolloProvider } from 'react-apollo';
import createHistory from 'history/createBrowserHistory';
import { createApolloClient } from 'Utils/ApolloClient';

const history = createHistory();
const apolloClient = createApolloClient(window.__APOLLO_STATE___);

export default (App) => (
  <AppContainer>
    <ApolloProvider client={apolloClient}>
      <App history={history} />
    </ApolloProvider>
  </AppContainer>
);
