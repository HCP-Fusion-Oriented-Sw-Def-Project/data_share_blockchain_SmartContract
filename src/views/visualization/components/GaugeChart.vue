<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
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
      default:'gauge'
    },
    title: {
      type:String,
      default:''
    },
    columnList:{
      type:Object,
      default:null
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
        min: 0,
        max: 100,
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
    'columnList':'initChart',
    'parentWidth':'initChart',
    'parentHeight':'initChart',
      option: {
          handler(nval, oval) {
              //this.myChart.clear();
              //因为option由子组件传递过来的，所以初始化时，dim和value在option之前，需要在option第一次到达时将dim和value装载到option中
              this.myOption = nval;
              if (this.myOption.series[0].data.length === 0){
                  this.updateData();
              }
              this.chart.setOption(this.myOption, true);
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
    dataGauge:function(){
      var arr=this.yAxis[0].list;
      this.max = this.min = arr[0];
      for (let i=0; i<arr.length; ++i) {
          if (this.max<arr[i]){
              this.max = arr[i];
          }
          if (this.min>arr[i]){
              this.min = arr[i];
          }
      }
      this.myOption.series[0].min = this.min;
      this.myOption.series[0].max = this.max;
    },
    updateData: function(){
        this.yAxis=JSON.parse(JSON.stringify(this.value));
        this.dataGauge();
        this.myOption.series[0].data = [{ value: this.yAxis[0].list[Math.floor(Math.random() * this.yAxis[0].list.length)], name: this.yAxis[0].name}];
        setInterval(function () {
            this.myOption.series[0].data = [{ value: this.yAxis[0].list[Math.floor(Math.random() * this.yAxis[0].list.length)], name: this.yAxis[0].name}];
        }.bind(this),2000);
    },
    initChart() {


      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      this.chart.setOption(this.myOption);
      this.updateData();
      // this.chart.setOption({
      //   tooltip : {
      //     formatter: "{a} <br/>{b} : {c}%"
      //   },
      //   toolbox: {
      //     show:this.toolbox,
      //     feature: {
      //       saveAsImage: {}
      //     }
      //   },
      //   series: [
      //   {
      //     name: this.dataset+'仪表图',
      //     type: 'gauge',
      //     detail: {formatter:'{value}%'},
      //     data:[{value:this.yAxis[0].list[0],name:this.yAxis[0].name}]
      //   }
      //   ]
      // })
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
