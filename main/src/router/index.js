import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/about'
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      base:true
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {
      base:true
    },
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('beforeEach');
  // if(to.meta.base){
    NProgress.start()
  // }
  next()
})
router.afterEach((to, from) => {
  // console.log('afterEach');
  NProgress.done()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
