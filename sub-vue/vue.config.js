const { name } = require('../package.json')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// console.log(process.env.NODE_ENV)
// console.log(process.env.NODE_ENV === 'production')
module.exports = {
  publicPath: '/subapp/sub-vue',
  transpileDependencies: ['common'],
  chainWebpack: (config) => {
    // config.resolve.alias
    // set第一个参数：设置的别名，第二个参数：设置的路径
    // .set('@', resolve('./src'))
    // .set('assets', resolve('.src/assets'))
    // .set('@@', resolve('./common/src/components'))
    // console.log(config.resolve.alias)
    return config.resolve.symlinks(false)
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    },
    resolve: {
      alias: {
        _components: resolve('./common/src/components')
      }
    }
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'http://119.3.107.118:31314', // dev
        secure: false
      }
    }
  }
}
