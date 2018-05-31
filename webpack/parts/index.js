const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

exports.output = (placeholder = '[hash]', folder = '') => ({
  output: {
    path: path.join(__dirname, '../../dist/', folder),
    filename: `[name].${placeholder}.js`,
    publicPath: '/',
  },
});

exports.babelLoader = () => ({
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      }
    ],
  },
});

exports.htmlPlugin = (layout = 'index.html') => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../../src/layouts/', layout),
    }),
  ],
});

exports.uglifyJsPlugin = (enableSourceMap = false) => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: enableSourceMap,
    }),
  ],
});

exports.devTool = (devtool = 'cheap-eval-source-map') => ({
  devtool,
});

exports.writeWebpackStats = (filename = 'stats.json') => ({
  plugins: [
    new StatsWriterPlugin({
      filename,
    }),
  ],
});