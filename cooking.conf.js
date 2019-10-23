var path = require('path');
var cooking = require('cooking');
var build = require('./build');
var isProd = process.env.NODE_ENV === 'production';
var _port = 8080;

cooking.set({
  entry: build.entries(),
  dist: './dist',
  template: build.templates(),
  devServer: {
  	disableHostCheck:true,
    port: _port,
    publicPath: '/',
    historyApiFallback: true,
    hot: false,
    inline: true,
    grogress: true,
    proxy: {
      '/api': {
        target: 'http://games.q9x9.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  clean: true,
  hash: true,
  // sourceMap: true,
  sourceMap: isProd ? false : true,
  chunk: true,
  postcss: [],
  publicPath: '/dist/',
  extractCSS: isProd ? 'static/[name].[contenthash:7].css' : true,
  alias: {
    'src': path.join(__dirname, 'src')
  },
  // extends: ['vue2', 'buble', 'less', 'autoprefixer'],
           extends: ['vue2', 'buble', 'less', 'saladcss', 'autoprefixer'],
//extends: ['vue2', 'buble', 'eslint', 'less', 'saladcss', 'autoprefixer'],
  // extends: ['vue2', 'buble', 'eslint', 'less', 'autoprefixer'],
  externals: isProd ? build.externals() : {}
  // externals: build.externals()
  // externals: {}
});

// 增加chunkFilename配置，路由状态下命名规则
isProd && cooking.add('output.filename', 'static/[name].[hash:7].js') && cooking.add('output.chunkFilename', 'static/route[id].[chunkhash:7].js');


module.exports = cooking.resolve();
