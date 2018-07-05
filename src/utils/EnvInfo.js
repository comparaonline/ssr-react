const env = process.env.NODE_ENV;
const analyze = process.env.ANALYZE;

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

export { env, isDevEnv, isProdEnv, isClient, isServer, analyze };
