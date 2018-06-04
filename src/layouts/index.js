export default (config, template = 'default') => {
  const layout = require(`./index.${template}.js`).default;
  return layout(config);
}
