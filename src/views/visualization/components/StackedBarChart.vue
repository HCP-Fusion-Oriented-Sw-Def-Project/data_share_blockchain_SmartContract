<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000
//柱状堆叠图
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
      default:'bar'
    },
    barWidth: {
      type: String,
      default: "50%"
    },
    title: {
      type:String,
      default:''
    },
    toolbox:{
      type:Boolean,
      default:false
    },
    option:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      chart: null,
      myOption:{}
    }
  },
  created() {
    this.myOption = this.option;
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
              if (this.myOption.series[0].data.length === 0){

                  this.updateDim();
                  this.updateValue();
              }
              this.chart.setOption(this.myOption, true);
          },
          deep: true
      },
      dim: {
      //为option.xAxis装载数据
        handler(nval, oval) {
            this.updateDim();
        },
          deep: true
      },
      value: {
        handler(nval, oval) {
            //为option.series，option.yAxis和option.legend装载数据
            this.updateValue();
        },
          deep: true
      }
  },
  methods: {
      updateDim: function(){

          this.yAxis=JSON.parse(JSON.stringify(this.value));
          this.xAxis=JSON.parse(JSON.stringify(this.dim));

          this.myOption.xAxis.data=this.xAxis[0].list;
          this.$emit('change', this.myOption);
      },
      updateValue: function(){//现在是让所有的列叠到一起
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));

          let seriesSetting = JSON.parse(JSON.stringify(this.myOption.series[0]));
          seriesSetting.data = [];
          this.myOption.legend.data = [];
          this.myOption.series = [];
          for (let data of this.yAxis){
              let copySeriesSetting = JSON.parse(JSON.stringify(seriesSetting));
              copySeriesSetting.name = data.name;
              copySeriesSetting.data = data.list;
              this.myOption.legend.data.push(data.name);
              this.myOption.series.push(copySeriesSetting);
          }
          this.$emit('change', this.myOption);
      },
    initChart() {//初始化只需要把图表清空，监听传进来的dim和value，然后在更新维度/数据的函数中做数据处理，
      // console.log(this.dim)
      // console.log(this.value)
      //
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      this.chart.setOption(this.myOption);
      this.updateDim();
      this.updateValue();
      this.chart.resize()
    },
    resize(){
      this.__resizeHanlder = debounce(() => {
      if (this.chart) {
          this.chart.resize()
          }
        }, 100)
        this.__resizeHanlder()
    },
    disposeChart(){
      this.chart.clear()
      this.chart.dispose()
    },
  }
}
</script>
