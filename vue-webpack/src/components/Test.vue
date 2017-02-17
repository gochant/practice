<template>
  <el-row class="tac">
    <el-col :span="8">
      <div style="margin-bottom: 20px;">
        <el-button size="small" @click="addTab">
          add tab
        </el-button>
      </div>
      <el-tabs type="border-card" closable :active-name="activeTab">
        <el-tab-pane v-for="(item, index) in tabs" :label="item.title" :name="item.name">
          <component :is="item.content"></component>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
  import Vue from 'vue'
  Vue.component('hello', function (resolve) {
    // 这个特殊的 require 语法告诉 webpack
    // 自动将编译后的代码分割成不同的块，
    // 这些块将通过 Ajax 请求自动下载。
    require(['components/Hello'], resolve)
  })

  export default {
    name: 'test',
    data () {
      return {
        tabs: [{
          name: '1',
          title: 'HEHE',
          content: 'hello'
        }],
        activeTab: '1'
      }
    },
    components: {
//      'hello': resolve => require(['components/Hello2'], resolve)
//      Hello
//      Hello2
    },
    methods: {
      addTab () {
        this.tabs.push({
          name: '2',
          title: 'new Tab',
          content: 'hello2'
        })
        this.activeTab = (parseInt(this.activeTab) + 1).toString()
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
