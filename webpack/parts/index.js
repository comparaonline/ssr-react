const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      publicPath: '/',
    });
  }

  return { output: targetOutput };
};

exports.simpleOutput = (filename = 'index.js', publicPath = '/') => ({
  output: {
    path: path.join(__dirname, '../../dist'),
    filename,
    publicPath,
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
    new UglifyJsPlugin({
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
      names: ['bootstrap', 'vendor'], // needed to put webpack bootstrap code before chunks
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

exports.alias = () => ({
  resolve: {
    alias: {
      Config: path.join(__dirname, '../../config'),
      Views: path.join(__dirname, '../../src/views'),
      Utils: path.join(__dirname, '../../src/utils'),
      Layouts: path.join(__dirname, '../../src/layouts'),
      Assets: path.join(__dirname, '../../assets'),
      Redux: path.join(__dirname, '../../src/redux'),
    },
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options,
          },
          'image-webpack-loader',
        ],
      },
    ],
  },
});

exports.cssLoader = () => ({
  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
    ],
  },
});

exports.chunksCssLoader = (target, minimize = true) => {
  if (target !== 'client' && target !== 'server') {
    throw new Error('target specified for chunksCssLoader is not valid');
  }

  const clientConfig = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractCssChunks.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                  minimize,
                },
              }
            ],
          }),
        }
      ],
    },
    plugins: [
      new ExtractCssChunks(),
    ],
  };

  const serverConfig = {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                minimize,
              },
            },
          ],
        }
      ],
    },
  };

  const targetConfig = target === 'client' ? clientConfig : serverConfig;

  return targetConfig;
};

exports.loadFonts = ({ include, exclude, options }) => ({
  module: {
    rules:[
      {
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.extensions = () => ({
  extensions: ['.js', '.jsx', '.json'],
});

exports.bundleAnalyzer = () => ({
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});

exports.copyFiles = (files = []) => ({
  plugins: [
    new CopyWebpackPlugin(files),
  ],
});
