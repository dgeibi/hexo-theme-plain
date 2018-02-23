const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const resolve = {}
const rules = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [path.resolve(__dirname, 'src')]
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
const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false,
    'screw-ie8': true,
    sourceMap: true
  }),
  new ExtractTextPlugin('../css/style.css')
]

module.exports = (env = {}) => {
  const dir = env.dir || path.resolve(__dirname, 'source/js')
  return {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
      path: dir,
      filename: 'main.js',
      publicPath: 'js'
    },
    module: { rules },
    resolve,
    plugins
  }
}
