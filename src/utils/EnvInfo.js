const env = process.env.NODE_ENV;
const isDevEnv = env === 'development';
const isProdEnv = env !== 'development';

export { env, isDevEnv, isProdEnv };
