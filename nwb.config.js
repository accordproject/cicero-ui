const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  webpack: {
    config(config) {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      };
      config.plugins.push(new HtmlWebpackPlugin({
        template: 'demo/src/index.html',
        mountId: 'demo',
      }));
      return config;
    },
  },
};
