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
      default:'sankey'
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
      myOption: {},
      nodes: [],
      links: []
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
                  this.updateDimAndValue();
              }
              this.chart.setOption(this.myOption, true);
          },
          deep: true
      },
      dim: {
          handler(nval, oval) {
              this.updateDimAndValue();
          },
          deep: true
      },
      value: {
          //为option.xAxis装载数据
          handler(nval, oval) {
              //为option.series，option.yAxis和option.legend装载数据
              this.updateDimAndValue();
          },
          deep: true
      }
  },
  methods: {
    dataSankey:function(){
        //this.xAxis this.yAxis this.columnList
        let nodesSet = new Set();
        this.links = [];
        this.nodes = [];
        for(let i=0; i<this.xAxis[0].list.length; i++){
            let source = this.xAxis[0].list[i], target = this.xAxis[1].list[i], value = this.yAxis[0].list[i];
            // console.log(typeof(value));
            if (!nodesSet.has(source)) nodesSet.add(source);
            if (!nodesSet.has(target)) nodesSet.add(target);
            this.links.push({ source: source, target: target, value: value });
        }
        this.nodes = Array.from(nodesSet).map(v=>{ return { name: v } });
    },
    updateDimAndValue: function(){
        this.xAxis=JSON.parse(JSON.stringify(this.dim));
        this.yAxis=JSON.parse(JSON.stringify(this.value));
        this.dataSankey();
        this.myOption.series[0].data = this.nodes;
        this.myOption.series[0].links = this.links;
        this.$emit('change', this.myOption);
    },
    initChart() {
      // if(flag !="preInit")
        //this.dataSankey()
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear();
      this.chart.setOption(this.myOption);
      this.updateDimAndValue();
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
