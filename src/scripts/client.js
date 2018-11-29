const webpack = require('webpack');
const clientConfig = require('../../webpack/client')();
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');

const compiler = webpack(clientConfig);

const devServer = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, '../../dist'),
  hot: true,
});

devServer.listen(3011, '0.0.0.0', () => {
  console.log('starting development server...');
});
