var App = require('./app.json');
var path = require('path');
var isProd = process.env.NODE_ENV === 'production';

var merge = function(a, b) {
  return {
    css: (a.css || []).concat(b.css || []),
    js: isProd ? (a.js || []).concat(b.js || []) : [].concat(b.js || [])
    // js: (a.js || []).concat(b.js || [])
  };
};

exports.entries = function() {
  var result = {};
  App.pages.forEach(p => {
    result[p.entry] = path.resolve(App.basePath, p.entry);
  });
  return result;
};

exports.templates = function() {
  return App.pages.map(p => {
    return {
      title: p.title,
      filename: p.entry + '.html',
      template: path.resolve(__dirname, 'index.tpl'),
      cdn: merge(App.cdn, p.cdn),
      chunks: ['vendor', 'manifest', p.entry],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true
      }
    };
  });
};

exports.externals = function() {
  return App.externals;
};
