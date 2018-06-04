require("babel-polyfill");
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const c = require('colors');

const clientConfig = require('../../webpack/client')();
const serverConfig = require('../../webpack/server')();

const ENV = process.env.NODE_ENV || 'production';
const PROD_ENV = ENV === 'production';
const PORT = 3011;
let isBuilt = false;

const app = express();

const done = () => {
  !isBuilt &&
  app.listen(PORT, (err) => {
    isBuilt = true;
    console.log(c.yellow(`BUILD COMPLETE -- SERVER LISTEN AT PORT ${PORT}`));
  });
};

if (PROD_ENV) {
  webpack([clientConfig, serverConfig]).run((err, stats) => {
    if (err) {
      console.log(c.red('Error in build process:'));
      console.log(err);
    }

    // console.log(stats.toString());

    const clientStats = stats.toJson().children[0];
    const serverRender = require('../../dist/server.prod.js').default;

    const distPath = path.join(__dirname, '../../dist');
    app.use(express.static(distPath));

    app.use(serverRender({ clientStats }));
    done();
  });
} else {
  const compiler = webpack([clientConfig, serverConfig]);

  compiler.plugin('done', done);
}
