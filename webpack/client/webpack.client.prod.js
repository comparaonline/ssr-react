const merge = require('webpack-merge');
const parts = require('../parts');

const productionConfig = merge([
  parts.output('[chunkhash]'),
  parts.babelLoader(),
  parts.uglifyJsPlugin(true),
  parts.htmlPlugin(),
]);

module.exports = productionConfig;