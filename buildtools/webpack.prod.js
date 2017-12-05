const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');


const resourcesRule = {
  test: /\.(jpeg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'build/[name].[hash:20].[ext]'
    }
  }
};

const fontRule = {
  test: /\.(eot|ttf|woff|woff2)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: 'build/[name].[hash:20].[ext]'
    }
  }
};


module.exports = webpackMerge(common.config, {
  output: {
    filename: 'build/[name].[chunkhash:20].js'
  },
  module: {
    rules: [
      resourcesRule,
      fontRule
    ]
  },
  plugins: [
    common.createHtmlPlugin(['dependencies', 'app', 'loadApp']),
    definePlugin
  ]
});
