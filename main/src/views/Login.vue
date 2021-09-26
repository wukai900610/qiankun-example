<template>
  <div class="login">
    <button @click="login">login</button>
  </div>
</template>

<script>
import store from '@/store'

export default {
  data () {
    return {}
  },
  methods: {
    login () {
      // console.log(store.setGlobalState)
      store.setGlobalState({
        user: { name: '李四' + Math.round(Math.random() * 100), auth: true }
      })

      // store.commit('global/setGlobalState', { user: { name: '李四' + Math.round(Math.random() * 100), auth: true } })

      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>
