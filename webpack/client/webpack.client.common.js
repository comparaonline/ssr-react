const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const {
  env,
  isProdEnv,
  isDevEnv,
  analyze,
} = require('../../src/utils/EnvInfo');
const vendor = require('./vendor.config');
const parts = require('../parts');

const baseEntry = [path.join(__dirname, '../../src/client/index.js')];
const devEntry = [
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
  'react-hot-loader/patch',
];

// const entry = {
//   main: isDevEnv ? devEntry.concat(baseEntry) : baseEntry,
//   vendor,
// };

const entry = isDevEnv ? devEntry.concat(baseEntry) : baseEntry;

const clientCommon = {
  name: 'client',
  target: 'web',
  entry,
  stats: 'errors-only',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};


module.exports = merge([
  clientCommon,
  parts.writeWebpackStats('stats.client.json'),
  parts.alias(),
  parts.loadImages({
    options: { limit: 40000, name: 'img/[name].[hash].[ext]' },
  }),
  parts.chunksCssLoader('client', isProdEnv),
  parts.loadFonts({
    options: { name: './fonts/[name].[ext]' },
  }),
  analyze ? parts.bundleAnalyzer() : {},
]);
