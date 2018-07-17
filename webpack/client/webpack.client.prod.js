const path = require('path');
const merge = require('webpack-merge');
const parts = require('../parts');

const productionConfig = merge([
  parts.output('client', '[chunkhash]'),
  parts.babelLoader(),
  parts.commonChunksPlugin(),
  parts.uglifyJsPlugin(),
  parts.htmlPlugin(),
  parts.copyFiles([{
    from: path.join(__dirname, '../../src/i18n/'),
    to: path.join(__dirname, '../../dist'),
    ignore: '.gitkeep',
  }]),
]);

module.exports = productionConfig;
