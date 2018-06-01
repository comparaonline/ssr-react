const merge = require('webpack-merge');
const parts = require('../parts');

const developmentConfig = merge([
  parts.output('server', 'dev'),
  parts.devTool('inline-source-map'),
  parts.babelLoader(),
]);

module.exports = developmentConfig;
