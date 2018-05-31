const merge = require('webpack-merge');
const parts = require('../parts');

const productionConfig = merge([
  parts.output('prod'),
  parts.devTool('inline-source-map'),
  parts.babelLoader(),
]);

module.exports = productionConfig;