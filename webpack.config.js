const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
      options: {
        plugins: ['lodash'],
        presets: [['env', { modules: false, targets: { node: 4 } }]]
      }
    }]
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true
    }),
    new webpack.optimize.UglifyJsPlugin(),  
    new LodashWebpackPlugin({
        caching: true
      })
  ]
};
