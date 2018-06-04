const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const parts = require('../parts');

const DEV_ENV = process.env.NODE_ENV === 'development';
const baseEntry = [path.join(__dirname, '../../src/client/index.js')];
const devEntry = [
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
  'react-hot-loader/patch',
];

const entry = DEV_ENV ? devEntry.concat(baseEntry) : baseEntry;

const clientCommon = {
  name: 'client',
  target: 'web',
  entry,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

module.exports = merge([
  clientCommon,
  parts.writeWebpackStats('stats.client.json'),
]);
