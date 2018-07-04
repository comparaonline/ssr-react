const merge = require('webpack-merge');
const parts = require('../parts');

const productionConfig = merge([
  parts.output('client', '[chunkhash]'),
  parts.babelLoader(),
  parts.commonChunksPlugin(),
  parts.uglifyJsPlugin(),
  parts.htmlPlugin(),
]);

module.exports = productionConfig;
