const merge = require('lodash.merge');
const _get = require('lodash.get');
const _has = require('lodash.has');

const extendObject = require('./extend').default;

const defaultConfig = require('./default.json');

const buildConfig = (env = process.env.NODE_ENV || 'development') => {
  const envConfig = require(`./${env}.json`);
  const config = merge({}, defaultConfig, envConfig);

  const baseConfigObject = {
    get: (path, defaultValue) => _get(config, path, defaultValue),
    has: path => _has(config, path),
    getFullConfig: () => config,
  };

  const finalConfig = merge({}, baseConfigObject, {
    extended: extendObject(config),
  });

  return finalConfig;
};

const configObject = buildConfig();
const { get, has, getFullConfig, extended } = configObject;

export { get, has, getFullConfig, extended };
export default configObject;
