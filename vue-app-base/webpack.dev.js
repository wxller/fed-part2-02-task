const common = require("./webpack.common.js");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-eval-module-source-map",
  devServer: {
    hot: true,
    contentBase: "public",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify("/"),
    }),
  ],
});
