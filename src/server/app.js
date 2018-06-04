import React from 'react';
import { ApolloProvider } from 'react-apollo';
import createHistory from 'history/createMemoryHistory';
import { createApolloClientSSR } from 'Utils/ApolloClient';

import App from 'Views';

export default (req) => {
  const apolloClientSSR = createApolloClientSSR();
  const history = createHistory({ initialEntries: [req.path] });

  const app = (
    <ApolloProvider client={apolloClientSSR}>
      <App history={history} />
    </ApolloProvider>
  );

  return {
    app,
    history,
    apolloClientSSR,
  };
};
