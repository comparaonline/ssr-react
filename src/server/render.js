import React from 'react';
import createHistory from 'history/createMemoryHistory';
import { getDataFromTree, ApolloProvider } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { flushChunkNames, clearChunks } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../views';
import apolloClientSSR from '../utils/ApolloClient';

export default async (clientStats, req, res) => {
  const history = createHistory({ initialEntries: [req.path] });

  const app = (
    <ApolloProvider client={apolloClientSSR}>
      <App history={history} />
    </ApolloProvider>
  );

  await getDataFromTree(app);
  const apolloInitialState = apolloClientSSR.cache.extract();
  console.log('>>> apolloInitialState', apolloInitialState);

  clearChunks();

  const content = renderToString(app);
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  res.send(
    `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>react-universal-component-boilerplate</title>
        ${styles}
      </head>
      <body>
        <div id="root">${content}</div>
        ${cssHash}
        ${js}
      </body>
    </html>`
  );
};
