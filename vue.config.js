const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://ttapi.research.itcast.cn',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/api'
  //       }
  //     }
  //   }
  // }
})
