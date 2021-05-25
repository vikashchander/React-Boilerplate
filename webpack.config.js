let path = require("path");
let nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const moduleObj = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
    {
      test: /\.css$/,
      use: [ // [style-loader](/loaders/style-loader)
      { loader: 'style-loader' },
      // [css-loader](/loaders/css-loader)
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
    ],
    },
    {
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"],
    }
  ],
};

const client = {
  mode: "production",
  entry: { "@babel/polyfill": "./src/client/index.js" },
  target: "web",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist/public"),
    clean: true,
  },
  devServer: {
    inline: false,
    contentBase: "./dist",
},
  devtool: false,
  module: moduleObj,
  plugins: [new CleanWebpackPlugin(),new HtmlWebPackPlugin({ template: "src/client/index.html" })],
};
const server = {
  mode: "production",
  entry: { "@babel/polyfill": "./src/server/server.js" },
  target: "node",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    inline: true,
    contentBase: "./dist/public/",
},
  devtool: 'eval-source-map',
  module: moduleObj,
  plugins: [new CleanWebpackPlugin()],
  externals: [nodeExternals()],
};
module.exports = [client, server];
