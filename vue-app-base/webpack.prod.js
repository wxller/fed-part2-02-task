const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require("./webpack.common");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
module.exports = merge(common, {
  mode: "production",
  output: {
    // filename: "js/main.js",
    filename: "js/[name]-[chunkhash:8].bundle.js",
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify("/"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[chunkhash:8].bundle.css",
    }),
  ],
  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: "all",
    },
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,
    // 压缩输出结果
    // minimize: true
  },
});
