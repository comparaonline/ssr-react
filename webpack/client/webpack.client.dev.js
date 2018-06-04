const merge = require('webpack-merge');
const parts = require('../parts');

const developmentConfig = merge([
  parts.output('client', '[hash]'),
  parts.babelLoader(),
  parts.commonChunksPlugin('[hash]'),
  parts.writeFilePlugin(),
  parts.hotModuleReplacementPlugin(),
  parts.htmlPlugin(),
]);

module.exports = developmentConfig;
