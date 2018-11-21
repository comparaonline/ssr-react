const path = require('path');
const merge = require('webpack-merge');
const parts = require('../parts');

const productionConfig = merge([
  parts.output('client', '[chunkhash]'),
  parts.mode('production'),
  parts.babelLoader(),
  // parts.splitChunks(),
  parts.uglifyJsPlugin(),
  parts.htmlPlugin(),
  parts.copyFiles([{
    from: path.join(__dirname, '../../src/i18n/'),
    to: path.join(__dirname, '../../dist'),
    ignore: '.gitkeep',
  }]),
  parts.moduleConcatenationPlugin(),
  parts.occurenceOrderPlugin(),
  parts.hashedModuleIdsPlugin(),
  parts.stats({ warnings: false }),
  parts.extensions(),
]);

module.exports = productionConfig;
