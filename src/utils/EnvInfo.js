const ROOT_PATH = require('app-root-path').path;

const env = process.env.NODE_ENV;
const analyze = process.env.ANALYZE;
const spaMode = !!process.env.SPA_MODE;

const devEnvs = [
  'development',
];

const prodEnvs = [
  'production',
  'staging',
  'qc',
];

const isDevEnv = devEnvs.includes(env);
const isProdEnv = prodEnvs.includes(env);

const isServer = typeof window === 'undefined';
const isClient = !isServer;

export { env, isDevEnv, isProdEnv, isClient, isServer, analyze, spaMode, ROOT_PATH };
