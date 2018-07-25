const merge = require('webpack-merge');
const parts = require('../parts');

const developmentConfig = merge([
  parts.output('server', 'dev'),
  parts.mode('development'),
  parts.devTool('inline-source-map'),
  parts.limitChunksQtyPlugin(),
  parts.babelLoader(),
]);

module.exports = developmentConfig;
