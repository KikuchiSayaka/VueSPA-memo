module.exports = {
  configureWebpack: {
    devServer: {
      port: 8001,
        disableHostCheck: true,
      },
      watchOptions: {
        poll: true
      },
    }
  }
