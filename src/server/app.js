import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { HelmetProvider, createHelmetStore } from 'react-safety-helmet';
import createHistory from 'history/createMemoryHistory';
import { createApolloClientSSR } from 'Utils/ApolloClient';
import { getInitialState, configureStore } from 'Utils/ReduxSetup';

import App from 'Views';

export default (req = {}) => {
  const apolloClientSSR = createApolloClientSSR();
  const history = createHistory({ initialEntries: [req.path] });
  const initialState = getInitialState({ req });
  const store = configureStore(initialState);
  const helmetStore = createHelmetStore();

  const app = (
    <Provider store={store}>
      <ApolloProvider client={apolloClientSSR}>
        <I18nextProvider i18n={req.i18n}>
          <HelmetProvider store={helmetStore}>
            <App history={history} />
          </HelmetProvider>
        </I18nextProvider>
      </ApolloProvider>
    </Provider>
  );

  return {
    app,
    store,
    history,
    helmetStore,
    apolloClientSSR,
  };
};
