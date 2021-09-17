<template>
  <div class="login">
    <button @click="login">login</button>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data(){
    return {}
  },
  // computed: {
  //   // 通过global获取user的信息
  //   ...mapState('global', {
  //     user: state => state.user
  //   })
  // },
  methods: {
    login() {
      // console.log(store);
      store.setGlobalState({
        user: { name: '李四' + Math.round(Math.random() * 100),auth:true }
      })
    }
  },
}
</script>