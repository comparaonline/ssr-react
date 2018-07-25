const merge = require('webpack-merge');
const parts = require('../parts');

const productionConfig = merge([
  parts.output('server', 'prod'),
  parts.mode('production'),
  parts.devTool('inline-source-map'),
  parts.babelLoader(),
  parts.limitChunksQtyPlugin(),
  parts.uglifyJsPlugin(true),
  parts.stats({ warnings: false }),
]);

module.exports = productionConfig;
