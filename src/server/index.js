const express = require('express');
const webpack = require('webpack');
const c = require('colors');

const clientConfig = require('../../webpack/client')();
const serverConfig = require('../../webpack/server')();

const ENV = process.env.NODE_ENV || 'production';
const PROD_ENV = ENV === 'production';
const PORT = 3011;
let isBuilt = false;

const app = express();

const done = () => {
  console.log('build done!');
};

console.log(ENV)
if (PROD_ENV) {
  webpack([clientConfig, serverConfig]).run((err, stats) => {
    if (err) {
      console.log(c.red('Error in build process:'));
      console.log(err);
    }

    console.log(stats)
  });
} else {
  const compiler = webpack([clientConfig, serverConfig]);

  compiler.plugin('done', done);
}
