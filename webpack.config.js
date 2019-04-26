const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './demo/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [
          path.join(__dirname, 'src'),
          /node_modules/,
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/src/index.html',
      mountId: 'demo',
      title: 'YES',
    }),
    new CleanWebpackPlugin(),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
