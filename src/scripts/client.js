const webpack = require('webpack');
const clientConfig = require('../../webpack/client')();
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');

const options = {
  contentBase: path.join(__dirname, '../../dist'),
  hot: true,
  historyApiFallback: true,
  host: 'localhost',
};

WebpackDevServer.addDevServerEntrypoints(clientConfig, options);
const compiler = webpack(clientConfig);
const devServer = new WebpackDevServer(compiler, options);

devServer.listen(3011, 'localhost', () => {
  console.log('starting development server...');
});
