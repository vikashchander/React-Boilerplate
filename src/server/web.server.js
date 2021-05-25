const express = require("express");

const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')


const config = require('../../webpack.config')
const options = {
  contentBase: './dist/public',
  hot: true,
  host: 'localhost',
  inline: true
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
// const server = new webpackDevServer(compiler, options)

// server.listen(5000, 'localhost', () => {
//   console.log('dev server listening on port 5000')
// })


export default class WebServer {
  constructor() {
    this.app = new webpackDevServer(compiler, options)
    this.app.use(express.static("dist/public"));
  }

  start() {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(3000, function () {
          resolve();
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
  stop() {
    return new Promise((resolve, reject) => {
      try {
        this.server.close(() => {
          resolve();
        });
      } catch (e) {
        console.error(e.message);
        reject(e);
      }
    });
  }
}
