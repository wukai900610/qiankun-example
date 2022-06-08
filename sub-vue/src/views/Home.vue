<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Gcommon />
    <HelloWorld msg="Home 路由"/>
  </div>
</template>

<script>
import { api } from 'common'
import Gcommon from '_components/common.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Gcommon
  },
  mounted () {
    // this.getData()
  },
  methods: {
    getData () {
      api.user.findingSemester().then((res) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>
