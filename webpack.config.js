let path = require("path");
let nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const moduleObj = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
};

const client = {
  mode: 'none',
  entry: { client: "./src/client/index.js" },
  target: "web",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/public"),
  },
  module: moduleObj,
  plugins: [new HtmlWebPackPlugin({ template: "src/client/index.html" })],
};
const server = {
  mode: 'none',
  entry: { server: "./src/server/server.js" },
  target: "node",
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") },
  module: moduleObj,
  externals: [nodeExternals()],
};
module.exports = [client, server];
