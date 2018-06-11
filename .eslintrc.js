const path = require('path');

module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb',
    env: {
      browser: true,
      node: true,
    },
    rules: {
      'import/no-unresolved': 'off',
      'import/extensions': 'never',
      'no-underscore-dangle': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    },
    settings: {
      'import/resolver': {
        webpack: {
          config: path.resolve('./webpack/server/webpack.server.prod.js'),
        },
      }
    },
};
