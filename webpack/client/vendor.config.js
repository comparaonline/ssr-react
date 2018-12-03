
const keys = require('lodash.keys');
const without = require('lodash.without');
const pkg = require('../../package.json');

const EXCLUDE_LIBS = [
  'express',
  'i18next-node-fs-backend',
  'webpack-dev-middleware',
  'webpack-flush-chunks',
];

const VENDOR_LIBS = without(keys(pkg.dependencies), ...EXCLUDE_LIBS);

module.exports = VENDOR_LIBS;
