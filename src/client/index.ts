import { render, hydrate, Renderer } from 'react-dom';
import App from 'Views/index';
import buildApp from './app';

const renderApp: Renderer = !!process.env.SPA_MODE ? render : hydrate;

const renderClient = (app) => {
  renderApp(
    app,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../views/index.tsx', () => {
    const _AppComponent = require('../views/index.tsx').default; // eslint-disable-line
    const app = buildApp(_AppComponent);

    renderClient(app);
  });
}

renderClient(buildApp(App));
