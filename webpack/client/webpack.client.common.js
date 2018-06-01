const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const parts = require('../parts');

const clientCommon = {
  name: 'client',
  target: 'web',
  entry: {
    bundle: path.join(__dirname, '../../src/client/index.js')
  },
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
