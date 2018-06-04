import React from 'react';
import { getDataFromTree } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { flushChunkNames, clearChunks } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import layout from 'Layouts';

import buildApp from './app';

export default async (clientStats, req, res) => {
  const { app, apolloClientSSR } = buildApp(req);

  await getDataFromTree(app);
  const apolloInitialState = apolloClientSSR.cache.extract();
  // console.log('>>> apolloInitialState', apolloInitialState);

  clearChunks();

  const sheet = new ServerStyleSheet();
  const content = renderToString(sheet.collectStyles(app));

  const chunkNames = flushChunkNames();
  const chunks = flushChunks(clientStats, { chunkNames });

  const layoutConfig = Object.assign({}, chunks, {
    content,
    styleTags: sheet.getStyleTags(),
  });

  const html = layout(layoutConfig, 'default');

  res.send(html);
};
