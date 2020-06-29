<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <span>用户名:</span> <input type="text" value=""><br />
    <span>密 码:</span> <input type="text" value="">
  </div>
</template>

<script>
  export default {
    async mounted() {
    let result =await this.$service.log_error_info()
      console.log(result.data)
    },
    beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被confirm 前调用
      // 不！能！获取组件实例‘this'
      // 因为当守卫执行前，组件实例还没被创建
      console.log('--beforeRounteEneter')
      next()
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
