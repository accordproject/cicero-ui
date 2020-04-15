const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    });
    config.plugins.push(new MiniCssExtractPlugin({ filename: "[name].css" }));
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: "demo/src/index.html",
        mountId: "demo",
        title: "Cicero UI Components Demo"
      })
    );
    config.plugins.push(new CleanWebpackPlugin());
    config.plugins.push(new webpack.IgnorePlugin(/jsdom$/));
    config = { ...config, node: { fs: "empty", net: "empty", tls: "empty" } };
    // Return the altered config
    return config;
  },
  stories: ["../src/**/*.stories.[tj]s"],
  addons: [
    // '@storybook/addon-actions',
    "@storybook/addon-knobs/register",
    "@storybook/addon-notes/register",
    "@storybook/addon-a11y/register"
    // '@storybook/addon-storyshots'
  ]
};
