import ReactDOM from 'react-dom';
import App from 'Views/index';

import buildApp from './app';

const render = (app) => {
  ReactDOM.hydrate(
    app,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../views/index.tsx', () => {
    const _AppComponent = require('../views/index.tsx').default; // eslint-disable-line
    const app = buildApp(_AppComponent);

    render(app);
  });
}

render(buildApp(App));
