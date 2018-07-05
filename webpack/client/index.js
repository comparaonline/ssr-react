const merge = require('webpack-merge');
const c = require('colors/safe');

const { analyze } = require('../../src/utils/EnvInfo');
const commonConfig = require('./webpack.client.common');
const devConfig = require('./webpack.client.dev');
const prodConfig = require('./webpack.client.prod');

module.exports = (env = process.env.NODE_ENV) => {
  console.log(c.bold(`ANALYZE: ${analyze || false}`));
  console.log(c.yellow(`CLIENT_BUILD_ENV: ${env}`));

  const envConfig = env === 'production' ? prodConfig : devConfig;
  const webpackConfig = merge(commonConfig, envConfig);

  // console.log(webpackConfig);

  return webpackConfig;
};
