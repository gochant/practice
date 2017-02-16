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
  import Hello from 'components/Hello'
  import Hello2 from 'components/Hello2'

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
      Hello,
      Hello2
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
