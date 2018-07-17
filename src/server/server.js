require('babel-polyfill');
const c = require('colors');
const express = require('express');

const config = require('../../config').default;
const applyMiddlewares = require('./middlewares/index').default;
const serverRender = require('serverRender').default;
const clientStats = require('clientStats');

const { ROOT_PATH } = require('../utils/EnvInfo');
// const clientStats = {};

const PORT = process.env.PORT || config.get('port', 3011);

const app = express();

// const serverRender = () => {};

// console.log(clientStats);

c

const init = async () => {
  await applyMiddlewares(app);
  app.use(express.static(`${ROOT_PATH}/dist`));
  app.use(serverRender({ clientStats }));

  app.listen(PORT, (err) => {
    if (err) {
      console.error(err);
    }

    console.log(c.yellow(`BUILD COMPLETE -- SERVER LISTEN AT PORT ${PORT}`));
  });
};

init();
