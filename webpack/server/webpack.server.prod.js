const merge = require('webpack-merge');
const parts = require('../parts');

const productionConfig = merge([
  parts.output('server', 'prod'),
  parts.devTool('inline-source-map'),
  parts.babelLoader(),
  parts.limitChunksQtyPlugin(),
  parts.uglifyJsPlugin(true),
]);

module.exports = productionConfig;
