const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prodConfig = require('./webpack.prod.js');

const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerHost: '0.0.0.0',
  analyzerPort: 8180,
  openAnalyzer: false
});

module.exports = webpackMerge(prodConfig, {
  plugins: [
    bundleAnalyzerPlugin
  ]
});
