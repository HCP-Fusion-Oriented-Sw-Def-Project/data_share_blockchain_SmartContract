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
      default:'heatmap'
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
      legend: [],
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
    dataHeatmap:function(){
      var xlist = [];
      for(var i=0;i<this.xAxis.length;i++){
        var indicator=[];
        for(var j=0;j<this.xAxis[i].list.length;j++){
          if(indicator.indexOf(this.xAxis[i].list[j])== -1){
              indicator.push(this.xAxis[i].list[j]);
          }
        }
        this.xAxis[i].list=indicator;
      }
      for(let i=0;i<this.xAxis[0].list.length;i++){
        for(let j=0;j<this.xAxis[1].list.length;j++){
          var value = 0;
          for(let k=0;k<this.dim[0].list.length;k++){
            if(this.dim[0].list[k]==this.xAxis[0].list[i]&&this.dim[1].list[k]==this.xAxis[1].list[j]){
              value+=this.value[0].list[k];
            }
          }
          xlist.push([i, j, value]);
        }
      }
      this.yAxis[0].list = xlist;
    },
    updateDim: function(){
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));
          this.dataHeatmap();

          this.myOption.xAxis.name = this.xAxis[0].name;
          this.myOption.xAxis.data = this.xAxis[0].list;

          this.myOption.yAxis.name = this.xAxis[1].name;
          this.myOption.yAxis.data = this.xAxis[1].list;
          this.$emit('change', this.myOption);
      },
      updateValue: function(){
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));

          let min = this.yAxis[0].list[0];
          let max = this.yAxis[0].list[0];
          for (let data of this.yAxis[0].list) {
              max = Math.max(max, data);
              min = Math.min(min, data);
          }

          this.dataHeatmap();//如需数据叠加，就叠加，指的是 同一列中的数据

          let data = this.yAxis[0].list.map(function (item) {
              return [item[0], item[1], item[2] || '-'];
          });

          let seriesSetting = JSON.parse(JSON.stringify(this.myOption.series[0]));
          this.myOption.series[0].data = [];
          for (let i=0; i<this.xAxis[0].list.length; i++){
              for (let j=0; j<this.xAxis[1].list.length; j++){
                  let obj = {};
                  obj.value = data[i*this.xAxis[1].list.length+j];
                  obj.name = this.xAxis[0].list[i] +","+ this.xAxis[1].list[j];
                  this.myOption.series[0].data.push(obj);
              }
          }

          // this.myOption.series[0].data = dataset;
          console.log(this.myOption);
          this.myOption.visualMap.max = Math.ceil(max);
          this.myOption.visualMap.min = Math.floor(min);
          this.$emit('change', this.myOption);
      },

    initChart() {
     // this.xAxis=JSON.parse(JSON.stringify(this.dim))
      //this.yAxis=JSON.parse(JSON.stringify(this.value))
      // if(flag != "preInit"){
             ///////this.dataHeatmap() 注释掉的是这句  lc
      // }
      this.chart = echarts.init(this.$el, 'macarons');
      this.chart.clear();
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
