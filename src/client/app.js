import React from 'react';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import i18n from 'i18next';
import createHistory from 'history/createBrowserHistory';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { createApolloClient } from 'Utils/ApolloClient';
import { configureStore } from 'Utils/ReduxSetup';
import { get } from 'Config';


const history = createHistory();
const apolloClient = createApolloClient(window.__APOLLO_STATE__);
const store = configureStore(window.__REDUX_STATE__);
const i18nConfig = get('i18n.config');

window.i18n = i18n.init(i18nConfig);

// Allow the passed state to be garbage-collected
delete window.__REDUX_STATE__;
delete window.__APOLLO_STATE__;

export default (App) => (
  <AppContainer>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <I18nextProvider
          i18n={window.i18n}
          initialI18nStore={window.__I18N_STATE__}
          initialLanguage={window.__I18N_LANGUAGE__}
        >
          <App history={history} />
        </I18nextProvider>
      </ApolloProvider>
    </Provider>
  </AppContainer>
);
