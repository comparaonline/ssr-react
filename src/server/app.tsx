import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { HelmetProvider, createHelmetStore } from 'react-safety-helmet';
import { createApolloClientSSR } from 'Utils/ApolloClient';
import { getInitialState, configureStore } from 'Utils/ReduxSetup';
import { Store, State } from 'Redux/reducers';
import { Request } from '../types/express';
import { ApolloClient } from 'apollo-client';
import { StaticRouter } from 'react-router-dom';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, Theme, createGenerateClassName } from '@material-ui/core/styles';
import { createTheme } from 'Utils/MaterialUI';

import App from '../views';

export interface IApp {
  app: JSX.Element;
  store: Store;
  helmetStore: any;
  apolloClientSSR: ApolloClient<any>;
  sheetsRegistry: SheetsRegistry;
};

export default (req: Request): IApp => {
  const apolloClientSSR: ApolloClient<any> = createApolloClientSSR();
  const initialState: State = getInitialState({ req });
  const store: Store = configureStore(initialState);
  const helmetStore = createHelmetStore();

  const context: object = {};

  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const theme: Theme = createTheme();

  const generateClassName = createGenerateClassName();

  const app = (
    <Provider store={store}>
      <ApolloProvider client={apolloClientSSR}>
        <I18nextProvider i18n={req.i18n}>
          <HelmetProvider store={helmetStore}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
              <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <StaticRouter location={req.url} context={context}>
                  <App />
                </StaticRouter>
              </MuiThemeProvider>
            </JssProvider>
          </HelmetProvider>
        </I18nextProvider>
      </ApolloProvider>
    </Provider>
  );

  return {
    app,
    store,
    helmetStore,
    apolloClientSSR,
    sheetsRegistry,
  };
};
