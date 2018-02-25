const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = (env = {}) => {
  const outputDir =
    (env.dir && path.resolve(env.dir)) || path.join(__dirname, 'source/assets')
  const dev = env.dev === true
  return {
    devtool: 'source-map',
    entry: {
      main: path.join(__dirname, 'src/main.js')
    },
    output: {
      path: outputDir,
      publicPath: '/assets/',
      filename: dev ? '[name].js' : '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: [path.join(__dirname, 'src')]
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        comments: false,
        'screw-ie8': true,
        sourceMap: true
      }),
      new ExtractTextPlugin(dev ? 'main.css' : 'main.[contenthash:8].css'),
      new ManifestPlugin({
        publicPath: '/assets/'
      })
    ]
  }
}
