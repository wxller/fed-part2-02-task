const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "none",
  entry: "./src/main.js",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            exclude: /node_modules/,
          },
        },
      },
      {
        test: /\.js$/,
        use: "eslint-loader",
        enforce: "pre",
      },
      {
        test: /\.css$/,
        oneOf: [
          // 这里匹配 `<style module>`
          {
            resourceQuery: /module/,
            use: [
              // "style-loader",

              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[local]_[hash:base64:5]",
                },
              },
            ],
          },
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          {
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development",
            },
          },
          // "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              appendData: `@env: ${process.env.NODE_ENV};`,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            outputPath: "assets",
            name: "[name].[ext]",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].bundle.css",
    }),
    new htmlWebpackPlugin({
      title: "webpack vue",
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify("/"),
      TITLE: JSON.stringify("11"),
    }),
  ],
};
