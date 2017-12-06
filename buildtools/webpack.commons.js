const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoprefix = require('less-plugin-autoprefix');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// Make sure that Angular finds jQuery and does not fall back to jqLite
// See https://github.com/webpack/webpack/issues/582
const providePlugin = new webpack.ProvidePlugin({
  'window.jQuery': 'jquery'
});

const angularRule = {
  test: require.resolve('angular'),
  use: {
    loader: 'expose-loader',
    options: 'angular'
  }
};

// Expose proj4 as window.proj4 (required for ol3 as long as ol3 is not loaded through webpack)
const proj4Rule = {
  test: require.resolve('proj4'),
  use: {
    loader: 'expose-loader',
    options: 'proj4'
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
  context: __dirname + '/../',
  devtool: 'source-map',
  entry: {
    app: './examples/search.js',
  },
  output: {
    path: __dirname + '/../dist/'
  },
  module: {
    rules: [
      angularRule,
      proj4Rule,
      typeaheadRule,
      cssRule,
      lessRule,
      htmlRule,
      iconRule
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    providePlugin,
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
      'jquery-ui/datepicker' : 'jquery-ui/ui/widgets/datepicker',
      'goog/asserts': __dirname + '/../src/utils/goog.asserts.js',
      'ngeo': __dirname + '/../src',
      'gmf': __dirname + '/../contribs/gmf/src',
    }
  }
};

module.exports = {
  config: config,
};
