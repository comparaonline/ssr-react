const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const parts = require('../parts');

const serverCommon = {
  name: 'server',
  target: 'node',
  entry: {
    server: path.join(__dirname, '../../src/server/render.js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}

module.exports = merge([
  serverCommon,
  parts.writeWebpackStats('stats.server.json'),
]);