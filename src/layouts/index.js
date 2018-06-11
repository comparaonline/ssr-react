export default (config, template = 'default') => {
  const layout = require(`./index.${template}.js`).default; // eslint-disable-line
  return layout(config);
};
