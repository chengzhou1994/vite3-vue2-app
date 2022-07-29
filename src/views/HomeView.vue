<template>
  <div>111111111</div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data() {
    return {}
  },
  components: {},
  props: {},
  methods: {
    init() {
      console.log('HomeView init')
      axios.get('/api/getUser').then((res) => {
        console.log(res)
      })
    }
  },
  created() {
    this.init()
  },
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
