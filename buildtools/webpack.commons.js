const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoprefix = require('less-plugin-autoprefix');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// Make sure that Angular finds jQuery and does not fall back to jqLite
// See https://github.com/webpack/webpack/issues/582
const provideJQueryPlugin = new webpack.ProvidePlugin({
  'window.jQuery': 'jquery'
});

const angularRule = {
  test: require.resolve('angular'),
  use: {
    loader: 'expose-loader',
    options: 'angular'
  }
};

// Expose corejs-typeahead as window.Bloodhound
const typeaheadRule = {
  test: require.resolve('corejs-typeahead'),
  use: {
    loader: 'expose-loader',
    options: 'Bloodhound'
  }
};

const cssRule = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: 'css-loader'
  })
};

const cssLessLoaderConfigs = [
  {
    loader: 'css-loader',
    options: {importLoaders: 1}
  },
  {
    loader: 'less-loader',
    options: {
      lessPlugins: [
        new LessPluginCleanCSS(),
        new LessPluginAutoprefix()
      ]
    }
  }
];

const lessRule = {
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
    use: cssLessLoaderConfigs
  })
};

const htmlRule = {
  test: /\.html$/,
  use: [{
    loader: 'html-loader',
    options: {
      minimize: true
    }
  }]
};

const iconRule = {
  test: /\.(png|svg)$/,
  use: {
    loader: 'url-loader'
  }
};

const config = {
  context: path.resolve(__dirname, '../'),
  devtool: 'source-map',
  entry: {
    app: './examples/search.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist/')
  },
  module: {
    rules: [
      angularRule,
      typeaheadRule,
      cssRule,
      lessRule,
      htmlRule,
      iconRule
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    provideJQueryPlugin,
    new ExtractTextPlugin('[name].css'),
    new ExtractTextPlugin('[name].less'),
    new HtmlWebpackPlugin({
      template: 'examples/search.html',
      chunksSortMode: 'manual',
      filename: 'search.html',
      chunks: ['app'],
    }),
  ],
  resolve: {
    modules: [
      '../node_modules'
    ],
    alias: {
      'ngeo': path.resolve(__dirname, '../src'),
      'gmf': path.resolve(__dirname, '../contribs/gmf/src'),
      'goog/asserts': path.resolve(__dirname, '../src/goog.asserts.js'),
      'jquery-ui/datepicker' : 'jquery-ui/ui/widgets/datepicker',
      'proj4': 'proj4/lib',
    }
  }
};

module.exports = {
  config: config,
};
