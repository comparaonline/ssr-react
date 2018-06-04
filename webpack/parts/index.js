const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

exports.output = (target = 'client', placeholder = '[hash]', folder = '') => {
  const isValidTarget = target === 'client' || target === 'server';

  if (!isValidTarget) {
    throw new Error('webpack output target is not valid, see webpack/parts --> output function');
  }

  let targetOutput = null;
  const baseOutput = {
    path: path.join(__dirname, '../../dist/', folder),
    filename: `[name].${placeholder}.js`,
  };

  if (target === 'client') {
    targetOutput = Object.assign({}, baseOutput, {
      publicPath: '/',
      chunkFilename: `[name].${placeholder}.js`,
    });
  }

  if (target === 'server') {
    targetOutput = Object.assign({}, baseOutput, {
      libraryTarget: 'commonjs2',
    });
  }

  return { output: targetOutput };
};

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

exports.limitChunksQtyPlugin = (qty = 1) => ({
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: qty,
    }),
  ],
});

exports.stats = (stats = 'normal') => ({
  stats,
});

exports.commonChunksPlugin = (placeholder = '[chunkhash]') => ({
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: `[name].${placeholder}.js`,
      minChunks: Infinity
    }),
  ],
});

exports.hotModuleReplacementPlugin = () => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

exports.writeFilePlugin = () => ({
  plugins: [
    new WriteFilePlugin(),
  ],
});
