import './public-path'
import Vue from 'vue'

import App from './App.vue'
import routes from './router'
import { store as commonStore, fetch } from 'common'
import store from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
let VM = null

function render (props = {}) {
  const { container, routerBase } = props
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })

  function isLogin (user) {
    return Boolean(user && user.auth)
  }

  router.beforeEach((to, from, next) => {
    // console.log('------------------child------------------')
    // console.log(to);

    // if (isLogin(store.state.global.user)) {
    //   next()
    // } else {
    //   history.pushState(null, '/', '/login')
    // }

    if (to.meta.auth) {
      if (isLogin(store.state.global.user)) {
        next()
      } else {
        history.pushState(null, '/', '/login')
      }
    } else {
      next()
    }

    // next()
  })

  // router.afterEach((to, from) => {
  //   // console.log('afterEach');
  //   // NProgress.done()
  // })

  VM = new Vue({
    router,
    store,
    render: (h) => h(App)
  })
  fetch.init(router, VM)
  VM.$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  commonStore.globalRegister(store)
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  store.commit('global/setGlobalState', { user: userInfo })

  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  console.log('[vue] props from main framework', props)

  commonStore.globalRegister(store, props)

  render(props)
}

export async function unmount () {
  VM.$destroy()
  VM.$el.innerHTML = ''
  VM = null
}
