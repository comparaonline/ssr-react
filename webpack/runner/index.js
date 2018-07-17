const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const webpackNodeExternals = require('webpack-node-externals');

const parts = require('../parts');

const externals = fs
  .readdirSync(path.join(__dirname, '../../node_modules'))
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {});

externals['react-dom/server'] = 'commonjs react-dom/server';
externals.serverRender = `commonjs ${path.join(__dirname, '../../dist/main.prod.js')}`;
externals.clientStats = `commonjs ${path.join(__dirname, '../../dist/clientStats.json')}`;

// console.log(externals);

const runnerBaseConfig = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    runner: path.join(__dirname, '../../src/server/server.js'),
  },
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'index.js',
    publicPath: path.join(__dirname, '../../dist')
  },
  externals,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
    ],
  },
};

const config = merge([
  runnerBaseConfig,
  // parts.output('server', 'prod'),
  // parts.devTool('inline-source-map'),
  parts.uglifyJsPlugin(true),
  parts.limitChunksQtyPlugin(),
]);

module.exports = config;
