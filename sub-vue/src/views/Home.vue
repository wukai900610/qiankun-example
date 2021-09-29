<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Home 路由"/>
  </div>
</template>

<script>
import { api } from 'common'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      api.user.findingSemester().then((res) => {
        console.log(123)
      })
    }
  }
}
</script>
