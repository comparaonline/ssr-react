require('babel-polyfill');
const express = require('express');
const webpack = require('webpack'); // eslint-disable-line
const path = require('path');
const fs = require('fs');
const c = require('colors'); // eslint-disable-line
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line
const webpackHotServerMiddleware = require('webpack-hot-server-middleware'); // eslint-disable-line

const config = require('../../config').default;
const applyMiddlewares = require('./middlewares/index').default;

const clientConfig = require('../../webpack/client')();
const serverConfig = require('../../webpack/server')();
const runnerConfig = require('../../webpack/runner');

const ENV = process.env.NODE_ENV || 'production';
const PROD_ENV = ENV === 'production';
const PORT = process.env.PORT || config.get('port', 3011);
const ONLY_BUILD = process.env.ONLY_BUILD === 'true';

let isBuilt = false;

const app = express();




/* eslint-disable */
/**
 * Run express Server
 */
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




/**
 * Build an Array of apps and return the stats.
 *
 * @param {Array} webpackConfig - Array of webpack configs
 */
const buildApp = webpackConfig => new Promise((resolve, reject) => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      reject(err);
    }

    console.log(stats.toString());  // eslint-disable-line

    const clientStats = stats.toJson().children[0];
    resolve(clientStats);
  });
});




/**
 * Write a Webpack stats object to the dist path as .json
 *
 * @param {Object} stats - Webpack stats object
 */
const writeFileStats = stats => new Promise((resolve, reject) => {
  const distPath = path.join(__dirname, '../../dist');

  fs.writeFile(`${distPath}/clientStats.json`, JSON.stringify(stats, null, 2), (err) => {
    if (err) {
      console.error('Error to write clientStats file:', err); // eslint-disable-line
      reject(err);
    }

    console.log('clientStats.json saved'); // eslint-disable-line
    resolve();
  });
});




/**
 * Run build process
 */
const init = async () => {
  await applyMiddlewares(app);

  if (PROD_ENV) {
    const distPath = path.join(__dirname, '../../dist');
    app.use(express.static(distPath));

    const clientStats = await buildApp([clientConfig, serverConfig]);

    if (ONLY_BUILD) {
      await writeFileStats(clientStats);
      await buildApp([runnerConfig]);
    } else {
      const serverRender = require('../../dist/main.prod.js').default; // eslint-disable-line
      app.use(serverRender({ clientStats }));
      done();
    }
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
