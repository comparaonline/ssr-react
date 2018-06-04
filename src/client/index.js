import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import { ApolloProvider } from 'react-apollo';
import { createApolloClient } from '../utils/ApolloClient';
import App from '../views';

// console.log('NODE_ENV', process.env.NODE_ENV);

const history = createHistory();
const apolloClient = createApolloClient(window.__APOLLO_STATE___);

const getApp = (Main) => (
  <AppContainer>
    <ApolloProvider client={apolloClient}>
      <Main history={history} />
    </ApolloProvider>
  </AppContainer>
);

const render = (app) => {
  ReactDOM.hydrate(
    app,
    document.getElementById('root')
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../views/index.js', () => {
    const _AppComponent = require('../views/index').default;
    const app = getApp(_AppComponent);

    render(app);
  });
}

render(getApp(App));
