const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = {};
const rules = [
  {
    test: /\.js[x]?$/,
    use: [{ loader: 'babel-loader' }],
    include: [path.resolve('src')],
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
        },
      ],
    }),
  },
];

module.exports = (env = {}) => {
  const plugins = env.production ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
      'screw-ie8': true,
    }),
  ]
    : [];
  plugins.push(new ExtractTextPlugin('../css/style.css'));
  return {
    devtool: 'cheap-module-source-map',
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'source/js'),
      filename: 'main.js',
      publicPath: 'js',
    },
    module: { rules },
    resolve,
    plugins,
  };
};
