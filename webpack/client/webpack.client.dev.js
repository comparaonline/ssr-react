const merge = require('webpack-merge');
const parts = require('../parts');

const developmentConfig = merge([
  parts.output('client', '[hash]'),
  parts.mode('development'),
  parts.devTool('inline-source-map'),
  parts.babelLoader(),
  // parts.splitChunks('[hash]'),
  parts.writeFilePlugin(),
  parts.hotModuleReplacementPlugin(),
  parts.htmlPlugin(),
  parts.extensions(),
]);

module.exports = developmentConfig;
