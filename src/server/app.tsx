import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { HelmetProvider, createHelmetStore } from 'react-safety-helmet';
import createHistory from 'history/createMemoryHistory';
import { createApolloClientSSR } from 'Utils/ApolloClient';
import { getInitialState, configureStore } from 'Utils/ReduxSetup';
import { Store, State } from 'Redux/reducers';
import { Request } from '../types/express';
import { ApolloClient } from 'apollo-client';

import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import App from '../views';

export interface IApp {
  app: JSX.Element;
  store: Store;
  history: any;
  helmetStore: any;
  apolloClientSSR: ApolloClient<any>;
  sheetsRegistry: SheetsRegistry;
};

export default (req: Request): IApp => {
  const apolloClientSSR: ApolloClient<any> = createApolloClientSSR();
  const history = createHistory({ initialEntries: [req.path] });
  const initialState: State = getInitialState({ req });
  const store: Store = configureStore(initialState);
  const helmetStore = createHelmetStore();

  // MUI Setup
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      type: 'light'
    }
  });

  const generateClassName = createGenerateClassName();

  const app = (
    <Provider store={store}>
      <ApolloProvider client={apolloClientSSR}>
        <I18nextProvider i18n={req.i18n}>
          <HelmetProvider store={helmetStore}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
              <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                <App history={history} />
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
    history,
    helmetStore,
    apolloClientSSR,
    sheetsRegistry,
  };
};
