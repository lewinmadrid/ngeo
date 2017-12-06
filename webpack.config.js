switch (process.env.NODE_ENV) {
  case 'dev':
    module.exports = require('./buildtools/webpack.dev');
    break;
  case 'prod':
    module.exports = require('./buildtools/webpack.prod');
    break;
  case 'analyze':
    module.exports = require('./buildtools/webpack.bundle-analyzer');
    break;
}
