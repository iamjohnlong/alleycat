const path = require('path');

module.exports = {
  entry: './src/alleycat.js',
  devtool: 'source-map',
  output: {
    filename: 'alleycat.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}