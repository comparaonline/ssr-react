import { getDataFromTree } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { flushChunkNames, clearChunks } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { getInitialLanguage, getInitialState } from 'Utils/I18nSSR';
import layout from 'Layouts';
import { Request, Response } from 'Types/express';
import { ClientStats } from 'Types/clientStats';

import buildApp from './app';

export interface IData {
  req: Request;
  res: Response;
  clientStats: ClientStats;
};

export default async (data: IData): Promise<string> => {
  try {
    const { clientStats, req } = data;

    const {
      app,
      store,
      helmetStore,
      apolloClientSSR,
    } = buildApp(req);

    await getDataFromTree(app);
    const apolloInitialState = apolloClientSSR.cache.extract();

    clearChunks();

    const sheet = new ServerStyleSheet();
    const content = renderToString(sheet.collectStyles(app));

    const chunkNames = flushChunkNames();
    const chunks = flushChunks(clientStats, { chunkNames });

    const layoutConfig = Object.assign({}, chunks, {
      content,
      apolloInitialState,
      helmet: helmetStore.renderStatic(),
      styleTags: sheet.getStyleTags(),
      reduxInitialState: store.getState(),
      i18nInitialState: getInitialState(req),
      i18nInitialLanguage: getInitialLanguage(req),
    });

    const html = layout(layoutConfig, 'default');
    return html;
  } catch (err) {
    console.log(err); // eslint-disable-line
  }
};
