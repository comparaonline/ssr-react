import React from 'react';
import i18n from 'i18next';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName, Theme } from '@material-ui/core/styles';
import { createApolloClient } from 'Utils/ApolloClient';
import { configureStore } from 'Utils/ReduxSetup';
import { RemoveStylesOnClient, createTheme } from 'Utils/MaterialUI';
import { get } from 'Config';
import AppClass from 'Views/index';


const apolloClient = createApolloClient(window.__APOLLO_STATE__);
const store = configureStore(window.__REDUX_STATE__);
const i18nConfig = get('i18n.config');

window.i18n = i18n.init(i18nConfig);

// Allow the passed state to be garbage-collected
delete window.__REDUX_STATE__;
delete window.__APOLLO_STATE__;

export default (App: typeof AppClass): JSX.Element => {
  const generateClassName = createGenerateClassName();
  const theme: Theme = createTheme();

  const AppComponent = (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <I18nextProvider
          i18n={window.i18n}
          initialI18nStore={window.__I18N_STATE__}
          initialLanguage={window.__I18N_LANGUAGE__}
        >
          <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <RemoveStylesOnClient>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </RemoveStylesOnClient>
            </MuiThemeProvider>
          </JssProvider>
        </I18nextProvider>
      </ApolloProvider>
    </Provider>
  );

  if (process.env.NODE_ENV === 'production') {
    return AppComponent;
  }

  return (
    <AppContainer>
      {AppComponent}
    </AppContainer>
  );
};
