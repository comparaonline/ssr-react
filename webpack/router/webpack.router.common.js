const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const { env, isProdEnv, isDevEnv } = require('../../src/utils/EnvInfo');
const parts = require('../parts');

const baseEntry = [path.join(__dirname, '../../src/server/router.ts')];
const devEntry = ['regenerator-runtime/runtime.js'];
const entry = isDevEnv ? devEntry.concat(baseEntry) : baseEntry;

const externals = fs
  .readdirSync(path.join(__dirname, '../../node_modules'))
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

externals['react-dom/server'] = 'commonjs react-dom/server';



const serverCommon = {
  name: 'server',
  target: 'node',
  entry,
  externals,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

module.exports = merge([
  serverCommon,
  // parts.writeWebpackStats('stats.server.json'),
  parts.alias(),
  parts.loadImages({
    options: { limit: 40000, name: 'img/[name].[hash].[ext]' },
  }),
  parts.chunksCssLoader('server', isProdEnv),
  parts.loadFonts({
    options: { name: './fonts/[name].[ext]' },
  }),
]);
