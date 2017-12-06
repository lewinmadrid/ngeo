const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commons = require('./webpack.commons.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const resourcesRule = {
  test: /\.jpeg$/,
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

const jsUse = {
  loader: 'babel-loader',
  options: {
    presets: ['es2015'],
    plugins: ['angularjs-annotate'],
  }
}

const ngeoRule = {
  test: /ngeo\/src\/.*\.js$/,
  use: jsUse,
}

const examplesRule = {
  test: /ngeo\/examples\/.*\.js$/,
  use: jsUse,
}

module.exports = webpackMerge(commons.config, {
  output: {
    filename: '[name].[chunkhash:20].js'
  },
  module: {
    rules: [
      resourcesRule,
      fontRule,
      ngeoRule,
      examplesRule,
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
  ],
  resolve: {
    alias: {
      'goog/asserts': __dirname + '/../src/utils/goog.asserts.prod.js',
    }
  },
});
