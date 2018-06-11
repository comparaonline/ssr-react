require('babel-polyfill');
const express = require('express');
const webpack = require('webpack'); // eslint-disable-line
const path = require('path');
const c = require('colors'); // eslint-disable-line
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line
const webpackHotServerMiddleware = require('webpack-hot-server-middleware'); // eslint-disable-line

const config = require('../../config').default;
const applyMiddlewares = require('./middlewares/index').default;

const clientConfig = require('../../webpack/client')();
const serverConfig = require('../../webpack/server')();

const ENV = process.env.NODE_ENV || 'production';
const PROD_ENV = ENV === 'production';
const PORT = config.get('port', 3011);
let isBuilt = false;

const app = express();

/* eslint-disable */
const done = () => {
  !isBuilt &&
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    }

    isBuilt = true;
    console.log(c.yellow(`BUILD COMPLETE -- SERVER LISTEN AT PORT ${PORT}`));
  });
};
/* eslint-enable */


const init = async () => {
  await applyMiddlewares(app);

  if (PROD_ENV) {
    webpack([clientConfig, serverConfig]).run((err, stats) => {
      if (err) {
        console.log(c.red('Error in build process:')); // eslint-disable-line
        console.log(err); // eslint-disable-line
      }

      console.log(stats.toString()); // eslint-disable-line

      const clientStats = stats.toJson().children[0];
      const serverRender = require('../../dist/main.prod.js').default; // eslint-disable-line

      const distPath = path.join(__dirname, '../../dist');
      app.use(express.static(distPath));

      app.use(serverRender({ clientStats }));
      done();
    });
  } else {
    const compiler = webpack([clientConfig, serverConfig]);
    const clientCompiler = compiler.compilers[0];
    const options = { publicPath: clientConfig.output.publicPath, stats: { colors: true } };

    app.use(webpackDevMiddleware(compiler, options));
    app.use(webpackHotMiddleware(clientCompiler));
    app.use(webpackHotServerMiddleware(compiler));

    compiler.plugin('done', done);
  }
};

init();
