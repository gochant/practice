<template>
  <el-menu theme="dark" default-active="1" mode="horizontal" :router="true">
    <nav-item v-for="item in items" :data="item"></nav-item>
  </el-menu>
</template>

<script>
  import NavItem from './NavItem'
  export default {
    name: 'hello',
    components: {
      NavItem
    },
    data () {
      return {
        items: [{
          text: 'test',
          index: '/',
          children: [{
            title: 'test group',
            children: [{
              text: 'test3',
              index: '/h'
            }, {
              text: 'test4',
              index: '/'
            }, {
              text: 'test4',
              index: '/user'
            }]
          }]
        }]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
