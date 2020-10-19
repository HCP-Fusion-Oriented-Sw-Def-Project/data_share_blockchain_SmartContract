<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { dataArrayScale } from '@/utils'

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
    option:{
      type:Object,
      default:{}
    }
  },
  created() {
    this.myOption = this.option;
  },
  data() {
    return {
      chart: null,
      dataset: [],
      xAxis:[],
      yAxis:[],
      myOption:{}

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
    option:{
      handler(nval,oval){
        this.myOption = nval;
        if (this.myOption.series[0].data.length === 0){
          this.updateDim();
          this.updateValue();
        }
        this.chart.setOption(this.myOption, true);
      },
      deep:true
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
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));
          this.myOption.xAxis.data=this.xAxis[0].list;
          this.$emit('change', this.myOption);
      },
      updateValue: function(){
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));

          this.dataset = [];
          let symbolSize = [];
          if (this.yAxis.length>1) {
              symbolSize=dataArrayScale(this.yAxis[1].list, 20, 50);
          }else{
              symbolSize=dataArrayScale(this.yAxis[0].list, 20, 50);
          }
          for(let i=0; i<this.xAxis[0].list.length; i++){
              if(this.yAxis.length === 1){
                  this.dataset.push([this.xAxis[0].list[i], this.yAxis[0].list[i], symbolSize[i]]);
              }else{
                  this.dataset.push([this.xAxis[0].list[i], this.yAxis[0].list[i], symbolSize[i]]);
              }
          }

          this.myOption.series[0].data = this.dataset;

          this.myOption.series[0].symbolSize = function(data){
              return data[2];
          };
          this.$emit('change', this.myOption);
      },
    initChart() {

      // this.colToRow()
      //this.dataBubble()
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
