<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import dataTool from 'echarts/extension/dataTool'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

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
      default: []
    },
    value: {
      type: Array,
      default: []
    },
    type: {
      type:String,
      default:'boxplot'
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
      seriesData: [],
      xAxisData: [],
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
              this.myOption = JSON.parse(JSON.stringify(nval));
              if (this.myOption.series[0].data.length === 0){
                  this.updateData();
              }
              // console.log(2);
              // console.log(this.myOption);
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

        this.xAxisData = [];
        this.seriesData = [];
        for (let i=0; i<this.yAxis.length; i++) {
            this.xAxisData.push(this.yAxis[i].name);
            this.seriesData.push(this.yAxis[i].list);
        }

        let data = echarts.dataTool.prepareBoxplotData(this.seriesData);
        this.myOption.series[0].data = data.boxData;
        this.myOption.series[1].data = data.outliers;
        this.myOption.xAxis[0].data = this.xAxisData;
        this.$emit('change', this.myOption);
    },
    initChart() {

      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear();
        this.chart.setOption(this.myOption);
      this.updateData();
      this.chart.resize()
    },
      resize() {
          this.__resizeHanlder = debounce(() => {
              if (this.chart) {
                  this.chart.resize()
              }
          }, 100);
          this.__resizeHanlder();
      },
    disposeChart(){
      this.chart.clear()
      this.chart.dispose()
    },
  }
}
</script>
