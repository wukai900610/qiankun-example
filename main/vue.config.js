const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  transpileDependencies: ['common'],
  chainWebpack: config => {
    config.resolve.alias.set('_components', resolve('./common/src/components'))
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'qiankun-example'
        return args
      })
  },
  devServer: {
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
