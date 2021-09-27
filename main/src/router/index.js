import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      auth: true
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
    },
    component: () => import('../views/Login.vue')
  // },
  // {
  //   path: '/*',
  //   name: 'NotFound',
  //   meta: {
  //   },
  //   component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function isLogin (user) {
  return Boolean(user && user.auth)
}
router.beforeEach((to, from, next) => {
  // console.log('beforeEach')
  // console.log(to)
  // console.log(from)
  const state = store.getGlobalState()
  NProgress.start()

  if (to.meta.auth) {
    if (isLogin(state.user)) {
      if (to.name == 'Login' || to.name == 'Register') {
        next({
          path: '/'
        })
      } else {
        next()
      }
    } else {
      next({
        name: 'Login'
      })
      if (from.path == '/login') {
        NProgress.done()
        next(false)
      } else {
        next({
          name: 'Login'
        })
      }
    }
  } else {
    if (isLogin(state.user)) {
      if (to.name == 'Login' || to.name == 'Register') {
        next({
          path: '/'
        })
      } else {
        next()
      }
    } else {
      next()
    }
  }

  // next()
})

router.afterEach((to, from) => {
  // console.log('afterEach')
  NProgress.done()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
