module.exports = {
  transpileDependencies: ['common'],
  chainWebpack: config => {
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
        target: 'https://zh.dev.p.gfox.ltd',
        secure: false
      }
    }
  }
}
