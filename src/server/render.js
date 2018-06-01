import React from 'react';
import createHistory from 'history/createMemoryHistory';
import { renderToString } from 'react-dom/server';
import { flushChunkNames, clearChunks } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../views';

export default (clientStats, req, res) => {
  clearChunks();
  const history = createHistory({ initialEntries: [req.path] });
  const app = renderToString(<App history={history} />);
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
        <div id="root">${app}</div>
        ${cssHash}
        ${js}
      </body>
    </html>`
  );
}
