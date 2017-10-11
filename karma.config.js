const webpack = require('./webpack.config');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['test/**/*.js'],
    reporters: ['mocha', 'coverage'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    preprocessors: {
      'test/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack', 'coverage']
    },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    webpack: webpack
  })
}
