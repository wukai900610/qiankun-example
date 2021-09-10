<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Home 路由"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

const service = axios.create({
  timeout: 60000 * 2
})

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
      service.get('/api/examination/exam/findingSemester')

      service.post('/api/examination/exam/marking', {
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
    }
  }
}
</script>
