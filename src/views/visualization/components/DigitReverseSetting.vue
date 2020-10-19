<template>
  <div class="toolbar-wh-row">
    <el-row style="margin-top:20px;height:40px; ">
      <span style="line-height: 40px;">请输入翻牌器数值</span>
      <div style="float:right; width:150px;">
        <el-input v-model="digit" placeholder="翻牌器数值"></el-input>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DigitReverseSetting',
  computed: {
    activeRect() {
      return this.$store.getters['rect/getActive']
    },
    digit: {
      get() {
        return this.$store.state.rect.rects[this.activeRect].columnList.digit
      },
      set(v) {
        console.log('set', v)
        this.$store.state.rect.rects[this.activeRect].columnList.digit = v
      }
    }
  }
}
</script>

<style scoped>
.toolbar-wh-row {
  width: 100%;
  margin-top: 5px;
  float: left;
  font-weight: bold;
  font-size: 15px;
}
</style>


