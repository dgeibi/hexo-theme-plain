const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = {};
const rules = [
  {
    test: /\.js[x]?$/,
    use: [{ loader: 'babel-loader' }],
    include: [path.resolve(__dirname, 'src')],
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
const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    comments: false,
    'screw-ie8': true,
  }),
  new ExtractTextPlugin('../css/style.css'),
];

module.exports = (env = {}) => {
  const dir = env.dir || path.resolve(__dirname, 'source/js');
  return {
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
      path: dir,
      filename: 'main.js',
      publicPath: 'js',
    },
    module: { rules },
    resolve,
    plugins,
  };
};
