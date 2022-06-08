<template>
  <div class="layout-wrapper">
      <Gcommon/>
    <div class="layout-header">
      <div class="logo">QIANKUN-EXAMPLE</div>
      <ul class="sub-apps">
        <li @click="push('/home')">home</li>
        <li @click="push('/about')">about</li>
        <!-- <li v-for="item in microApps" :key="item.name" @click="goto(item)">{{ item.name }}</li> -->
      </ul>
      <div class="userinfo">
        <span style="padding-right:20px;">
          主应用的state：{{ JSON.stringify(state) }}
        </span>

        <el-dropdown @command="handleCommand" v-if="state.user.auth">
          <span class="el-dropdown-link">
            {{state.user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">用户信息</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-link href="/login" v-else>请登录</el-link>
      </div>
    </div>
    <div id="subapp-viewport"></div>
    <router-view></router-view>
  </div>
</template>

<script>
// import NProgress from 'nprogress'
import { utils, api } from 'common'
import microApps from './micro-app'
import store from '@/store'

import Gcommon from '_components/common.vue'
export default {
  name: 'App',
  components: {
    Gcommon
  },
  data () {
    return {
      isLoading: true,
      microApps
      // current: '/sub-vue/'
    }
  },
  created () {
    // this.bindCurrent()
    // this.getData()

    store.setGlobalState({
      info: { name: 'asdfsdf', aa: 123 }
    })
  },
  mounted () {
    this.listenRouterChange()
  },
  computed: {
    state () {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')

      // 返回所有的state则不需添加参数
      return store.getGlobalState()
    }
  },
  methods: {
    getData () {
      api.user.findingSemester()
      api.user.findingSemester({}, {
        interceptors: false
      })

      api.user.marking({
        course: '',
        courseId: '',
        isMarking: '',
        isPublish: '',
        pageNum: 1,
        pageSize: 10,
        semester: '1176082368113421312',
        testName: '',
        title: '',
        total: 0
      })
    },
    handleCommand (type) {
      if (type == 'logout') {
        this.logout()
      }
    },
    logout () {
      store.setGlobalState({
        user: { name: null, auth: false }
      })
      this.$router.push({
        name: 'Login'
      })
    },
    goto (item) {
      // console.log(item)
      history.pushState(null, item.activeRule, item.activeRule)
      // this.current = item.name
    },
    push (url) {
      this.$router.push({
        path: url
      })
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
        this.current = path
      }
    },
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    }
  }
}
</script>

<style lang="scss">
#webpack-dev-server-client-overlay{
  display: none;
}
html, body{
  margin: 0 !important;
  padding: 0;
}
.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
  .layout-wrapper{
    .layout-header{
      height: 50px;
      width: 100%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      line-height: 50px;
      position: relative;
     .logo {
        float: left;
        margin: 0 50px;
      }
      .sub-apps {
        list-style: none;
        margin: 0;
        li{
          list-style: none;
          display: inline-block;
          padding: 0 20px;
          cursor: pointer;
          &.active{
            color: #42b983;
            text-decoration: underline;
          }
        }
      }
      .userinfo{
        position: absolute;
        right: 20px;
        top: 0;
      }
    }
  }
</style>
