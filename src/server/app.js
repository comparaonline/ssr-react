import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import { createApolloClientSSR } from 'Utils/ApolloClient';
import { getInitialState, configureStore } from 'Utils/ReduxSetup';

import App from 'Views';

export default (req = {}) => {
  const apolloClientSSR = createApolloClientSSR();
  const history = createHistory({ initialEntries: [req.path] });
  const initialState = getInitialState({ req });
  const store = configureStore(initialState);

  const app = (
    <Provider store={store}>
      <ApolloProvider client={apolloClientSSR}>
        <App history={history} />
      </ApolloProvider>
    </Provider>
  );

  return {
    app,
    store,
    history,
    apolloClientSSR,
  };
};
