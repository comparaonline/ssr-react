const env = process.env.NODE_ENV;

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

export { env, isDevEnv, isProdEnv };
