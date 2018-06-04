const merge = require('lodash/merge');
const _get = require('lodash/get');
const _has = require('lodash/has');

const defaultConfig = require('./default.json');

const buildConfig = (env = process.env.NODE_ENV || 'development') => {
  const envConfig = require(`./${env}.json`);
  const config = merge({}, defaultConfig, envConfig);

  return {
    get: (path, defaultValue) => _get(config, path, defaultValue),
    has: (path) => _has(config, path),
    getFullConfig: () => config,
  };
};

const configObject = buildConfig();
const { get, has, getFullConfig } = configObject;

export { get, has, getFullConfig };
export default configObject;
