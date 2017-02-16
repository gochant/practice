<template>
  <el-menu-item-group v-if="data.title != null">
    <template slot="title">
      <span v-html="data.title"></span>
    </template>
    <nav-item v-for="item in data.children" :data="item"></nav-item>
  </el-menu-item-group>
  <el-submenu v-else-if="data.children != null" :index="data.index">
    <template slot="title">
      <span v-html="data.text"></span>
    </template>
    <nav-item v-for="item in data.children" :data="item"></nav-item>
  </el-submenu>
  <el-menu-item v-else v-html="data.text" :index="data.index"></el-menu-item>
</template>

<script>
export default {
  name: 'nav-item',
  props: ['data']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
