<template>
  <!-- <section class="section"> -->
  <div :style="background">
    <div class="title" style="margin-top: 50px;font-size: 50px">
      交 互 式 聚 类 可 视 化 系 统
    </div>
    <div style="margin-top: 400px">
      <el-button type="primary" plain @click="base">
        基础数据模块
      </el-button>
      <el-button type="success" plain>
        流式数据模块
      </el-button>
      <el-button type="warning" plain>
        大规模数据模块
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      background: {
        backgroundImage: 'url(' + require('@/assets/welcome.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        // backgroundPosition: "center",
        position: 'fixed',
        height: '100%',
        width: '100%',
        textAlign: 'center'
      }
    }
  },
  methods: {
    base() {
      this.$router.push({ path: '/dashboard' })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../../../assets/css/bulma.min.css">
  /*.title{
    margin-top: 50px,
    margin-left: auto,
    margin-right: auto
  }*/
</style>
