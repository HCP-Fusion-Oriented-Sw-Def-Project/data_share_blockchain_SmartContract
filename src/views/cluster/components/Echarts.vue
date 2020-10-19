<template>
  <!-- built files will be auto injected -->
  <div :id="id" class="echart">
  </div>
</template>

<script>
  import echarts from 'echarts' // 引入echarts
  // import '@/assets/js/mytheme'

  export default {
  name: 'Echarts',
    props: ['id', 'options'],
    data() {
    return {
      myChart: {}
    }
  },
    watch: {
      options: {
        handler(nval, oval) {
          // this.myChart.clear();
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
      this.myChart = echarts.init(document.getElementById(this.id), 'westeros')
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
