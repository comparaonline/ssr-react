import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ApolloProvider } from 'react-apollo';
import { createApolloClient } from '../utils/ApolloClient';
import App from '../views';

// console.log('NODE_ENV', process.env.NODE_ENV);

const history = createHistory();
const apolloClient = createApolloClient(window.__APOLLO_STATE___);

const app = (
  <ApolloProvider client={apolloClient}>
    <App history={history} />
  </ApolloProvider>
);

const render = (AppComponent) => {
  ReactDOM.hydrate(
    app,
    document.getElementById('root')
  );
};

render(app);
