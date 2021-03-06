import { getDataFromTree } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { flushChunkNames, clearChunks } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { getInitialLanguage, getInitialState } from 'Utils/I18nSSR';
import layout, { Layout } from 'Layouts/index';
import { IConfigLayout } from 'Types/layout';
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
      sheetsRegistry,
    } = buildApp(req);

    await getDataFromTree(app);
    const apolloInitialState = apolloClientSSR.cache.extract();

    clearChunks();

    const content: string = renderToString(app);

    const chunkNames: string[] = flushChunkNames();
    const chunks = flushChunks(clientStats, { chunkNames });
    const materialCSS: string = sheetsRegistry.toString();

    const layoutConfig: IConfigLayout = Object.assign({}, chunks, {
      content,
      apolloInitialState,
      materialCSS,
      helmet: helmetStore.renderStatic(),
      reduxInitialState: store.getState(),
      i18nInitialState: getInitialState(req),
      i18nInitialLanguage: getInitialLanguage(req),
    });

    const html: string = layout(layoutConfig, Layout.default);
    return html;
  } catch (err) {
    console.log(err); // eslint-disable-line
  }
};
