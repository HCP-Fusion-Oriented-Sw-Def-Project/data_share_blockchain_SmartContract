<template>
  <div id="echart" class="echart">
  </div>
</template>

<script>
  import echarts from 'echarts' // 引入echarts
  export default {
  name: 'Echarts',
    props: {
      options: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
        return {
            myChart: {}
        }
    },
    watch: {
        options: {
            handler(nval, oval) {
              this.myChart.setOption(nval, true)
            },
            deep: true
        }
    },
    mounted() {
        this.draw()
    },
    beforeDestroy() {
      this.myChart.clear()
    },
    methods: {
        draw: function() {
          // 基于准备好的dom，初始化echarts实例
          this.myChart = echarts.init(document.getElementById('echart'), 'westeros')
          // 绘制图表
          this.myChart.setOption(this.options, true)
          window.addEventListener('resize', () => {
              this.myChart.resize()
          })
        }
    }
}
</script>

<style scoped>
  .echart {
    height: 100%;
    width: 90%;
  }

</style>
