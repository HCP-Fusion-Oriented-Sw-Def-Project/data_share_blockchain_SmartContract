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
    valueY: {
      type: Array,
      default: []
    },
    type: {
      type:String,
      default:'scatter'
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
      xAxis:[],
      yAxis:[],
      dims:[],
      dataset:[],
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
              this.myOption = JSON.parse(JSON.stringify(nval));
              if (this.myOption.series[0].data.length === 0){
                  this.updateValue();
              }
              this.myOption.tooltip.formatter=function(params)
                {
                  var str ='<div style="font: 14px/21px sans-serif;color: rgb(59, 174, 254);"> ';
                  str+=params.marker+params.seriesName+':';
                  str+= '&nbsp('+params.data+')</div>';
                  return str
                  }
                
              this.chart.setOption(this.myOption, true);
              
          },
          deep: true
      },
      dim: {
          handler(nval, oval) {
              this.updateValue();
          },
          deep: true
      },
      value: {
          handler(nval, oval) {
              this.updateValue();
          },
          deep: true
      },
      valueY:{
          handler(nval, oval) {
              this.updateValue();
          },
          deep: true
      }
  },
  methods: {
      updateValue: function(){
          // console.log("updateValue");

          this.dims=JSON.parse(JSON.stringify(this.dim));
          this.xAxis=JSON.parse(JSON.stringify(this.value));
          this.yAxis=JSON.parse(JSON.stringify(this.valueY));
          this.dataset = [];
          for(let i=0; i<this.xAxis[0].list.length; i++){
              let obj = {};
              obj.data = [this.xAxis[0].list[i], this.yAxis[0].list[i]];
              obj.name = this.dim[0].list[i];
              this.dataset.push(obj);
          }

          let seriesSetting = JSON.parse(JSON.stringify(this.myOption.series[0]));
          seriesSetting.data = [];
          this.myOption.legend.data = [];
          this.myOption.series = [];
          for (let data of this.dataset){
              let copySeriesSetting = JSON.parse(JSON.stringify(seriesSetting));
              copySeriesSetting.name = data.name;
              copySeriesSetting.data = [data.data];
              this.myOption.legend.data.push(data.name);
              this.myOption.series.push(copySeriesSetting);
          }
          
          this.$emit('change', this.myOption);
      },
    initChart() {
        // console.log("scatterChart");
        // console.log(this.dim);
        // console.log(this.value);
        // console.log(this.valueY);
        this.dims=JSON.parse(JSON.stringify(this.dim));
        this.xAxis=JSON.parse(JSON.stringify(this.value));
        this.yAxis=JSON.parse(JSON.stringify(this.valueY));

        // console.log(this.myOption);
        this.chart = echarts.init(this.$el, 'macarons');
        this.chart.clear();
        this.chart.setOption(this.myOption);
        this.updateValue();
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
