let path = require("path");
let nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");

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
      test: /\.css$/i,
      use: ["to-string-loader", "css-loader"],
    },
  ],
};

const client = {
  mode: "none",
  entry: { "@babel/polyfill": "./src/client/index.js" },
  target: "web",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist/public"),
    clean: true,
  },
  module: moduleObj,
  plugins: [new HtmlWebPackPlugin({ template: "src/client/index.html" })],
};
const server = {
  mode: "none",
  entry: { "@babel/polyfill": "./src/server/server.js" },
  target: "node",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: moduleObj,
  externals: [nodeExternals()],
};
module.exports = [client, server];
