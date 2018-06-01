const merge = require('webpack-merge');
const parts = require('../parts');

const developmentConfig = merge([
  parts.output('client', '[hash]'),
  parts.babelLoader(),
  parts.htmlPlugin(),
]);

module.exports = developmentConfig;
