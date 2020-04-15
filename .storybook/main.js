const path = require("path");
const webpack = require("webpack");

module.exports = module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    });
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
