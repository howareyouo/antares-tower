// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('atool-build/lib/webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = function (webpackConfig) {

  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
      libraryName: 'antd',
      style: true,
  }]);

  // Parse all less files as css module.
  // webpackConfig.module.loaders.forEach(function(loader, index) {
  //   if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
  //     loader.test = /\.dont\.exist\.file/;
  //   }
  //   if (loader.test.toString() === '/\\.module\\.less$/') {
  //     loader.test = /\.less$/;
  //   }
  // });

  // Load src/entries/*.js as entry automatically.
  const files = glob.sync('./src/entries/*.jsx');
  const newEntries = files.reduce(function(memo, file) {
    const name = path.basename(file, '.jsx');
    memo[name] = file;
    return memo;
  }, {});
  webpackConfig.entry = Object.assign({}, webpackConfig.entry, newEntries);

  return webpackConfig;
};
