<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import liquidfill from 'echarts-liquidfill'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { dataArrayScale } from '@/utils'
import { randomSampleFromArray } from '@/utils'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '800px'
    },
    height: {
      type: String,
      default: '800px'
    },
    parentHeight:{
      type: Number,
      default:0
    },
    parentWidth:{
      type: Number,
      default:0
    },
    dim: {
      type: Array,
      default:() => []
    },
    value: {
      type: Array,
      default:() => []
    },
    type: {
      type:String,
      default:'line'
    },
    title: {
      type:String,
      default:''
    },
    toolbox:{
      type:Boolean,
      default:false
    },
      option: {
          type: Object,
          default: {}
      }
  },
  created() {
    this.myOption = this.option;
  },
  data() {
    return {
      chart: null,
      legend: [],
      dataset: [],
      xAxis:[],
      yAxis:[],
      myOption: {}
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  watch:{
    'parentWidth':'initChart',
    'parentHeight':'initChart',
      option: {
          handler(nval, oval) {
              //this.myChart.clear();
              //因为option由子组件传递过来的，所以初始化时，dim和value在option之前，需要在option第一次到达时将dim和value装载到option中
              this.myOption = nval;
              // console.log(nval);
              if (this.myOption.series[0].data.length === 0){
                  this.updateData();
              }
              this.chart.setOption(this.myOption, true);
          },
          deep: true
      },
      dim: {
          handler(nval, oval) {
              this.updateData();
          },
          deep: true
      },
      value: {
          //为option.xAxis装载数据
          handler(nval, oval) {
              //为option.series，option.yAxis和option.legend装载数据
              this.updateData();
          },
          deep: true
      }
  },
  methods: {
    updateData: function(){
        this.xAxis=JSON.parse(JSON.stringify(this.dim));
        this.yAxis=JSON.parse(JSON.stringify(this.value));
        this.myOption.series[0].data = randomSampleFromArray(dataArrayScale(this.yAxis[0].list, 0, 1), 10);
        this.$emit('change', this.myOption);
    },
    initChart() {
      // this.colToRow()

      this.chart = echarts.init(this.$el, 'macarons');
      this.chart.clear();
      this.chart.setOption(this.myOption);
      this.updateData();
      // this.chart.setOption ({
      //
      //   series: [{
      //       type: 'liquidFill',
      //       data: this.dataset
      //   }]
      // });
      this.chart.resize()
    },
    disposeChart(){
      this.chart.clear()
      this.chart.dispose()
    },
  }
}
</script>
