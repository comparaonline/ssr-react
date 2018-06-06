import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { I18nextProvider } from 'react-i18next';
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
        <I18nextProvider i18n={req.i18n}>
          <App history={history} />
        </I18nextProvider>
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
