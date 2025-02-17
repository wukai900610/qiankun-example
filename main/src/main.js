import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'

import { fetch } from 'common'
import App from './App.vue'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import microApps from './micro-app'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)

const VM = new Vue({
  router,
  render: h => h(App)
})

// 公共请求注入需要的对象
fetch.init(router, VM)

VM.$mount('#app')

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
// function loader (loading) {
//   if (VM && VM.$children) {
//     // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
//     VM.$children[0].isLoading = loading
//   }
// }

// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item
    // loader
  }
})

registerMicroApps(apps, {
  // beforeLoad: app => {
  //   console.log('before load app.name====>>>>>', app.name)
  // },
  // beforeMount: [
  //   app => {
  //     console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
  //   }
  // ],
  // afterMount: [
  //   app => {
  //     console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
  //   }
  // ],
  // afterUnmount: [
  //   app => {
  //     console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
  //   }
  // ]
})
// setDefaultMountApp('/sub-vue')
start()
