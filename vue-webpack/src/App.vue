<template>
  <div id="app">
    <navbar></navbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Navbar from 'components/frame/Navbar'
  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style>
  body{
    margin:0;
    padding:0;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
