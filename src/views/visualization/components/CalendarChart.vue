<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import Vue from 'vue'

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
      legend: [],
      dataset: {},
      xAxis:[],
      yAxis:[],
        range: [],
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
    dataCalender:function(){
      this.dataset = {};
      for(var i=0;i<this.xAxis[0].list.length;i++){
          let date = new Date(this.xAxis[0].list[i]);
          let key = date.getFullYear().toString();
          if (!this.dataset.hasOwnProperty(key)){
              Vue.set(this.dataset, key, { data: [], range: [],dateMin: {}, dateMax: {} });
          }
          if (this.dataset[key].data.length === 0){
              this.dataset[key].dateMin = date;
              this.dataset[key].dateMax = date;
          }
          if (this.dataset[key].dateMin > date) {
              this.dataset[key].dateMin = date;
          }
          if (this.dataset[key].dateMax < date) {
              this.dataset[key].dateMax = date;
          }
          let ndate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
          this.dataset[key].data.push([ndate, Number(this.yAxis[0].list[i])]);

      }
      this.legend = [];
      let Data = this.dataset;
      for (let key in Data) {
          if (Data.hasOwnProperty(key)) {
              let value = Data[key];
              value.dateMin = value.dateMin.getFullYear() + '-' + (value.dateMin.getMonth()+1) +'-' + value.dateMin.getDate();
              value.dateMax = value.dateMax.getFullYear() + '-' + (value.dateMax.getMonth()+1) +'-' + value.dateMax.getDate();
              value.range = [ value.dateMin, value.dateMax ];
              this.legend.push(key);
          }
      }
    },

    updateData: function(){
        this.xAxis=JSON.parse(JSON.stringify(this.dim));
        this.yAxis=JSON.parse(JSON.stringify(this.value));

        let min = this.yAxis[0].list[0];
        let max = this.yAxis[0].list[0];
        for (let data of this.yAxis[0].list) {
            max = Math.max(max, data);
            min = Math.min(min, data);
        }

        this.dataCalender();
        let seriesSetting = this.myOption.series[0];
        let calendarSetting = this.myOption.calendar[0];
        let top = this.myOption.calendar[0].top ? this.myOption.calendar[0].top : 0;
        this.myOption.series = [];
        this.myOption.calendar = [];
        this.myOption.legend.data = [];
        for (let key in this.dataset) {
            if (this.dataset.hasOwnProperty(key)){
                let copySeriesSetting = JSON.parse(JSON.stringify(seriesSetting));
                let copyCalendarSetting = JSON.parse(JSON.stringify(calendarSetting));

                copySeriesSetting.name = String(key);
                copySeriesSetting.data = this.dataset[key].data;
                copySeriesSetting.calendarIndex = this.myOption.calendar.length;
                copyCalendarSetting.range = this.dataset[key].range;
                //设置位置
                copyCalendarSetting.top = top;
                top+=190;
                this.myOption.calendar.push(copyCalendarSetting);
                this.myOption.series.push(copySeriesSetting);
                this.myOption.legend.data.push(key);
            }
        }
        this.myOption.visualMap.max = Math.ceil(max);
        this.myOption.visualMap.min = Math.floor(min);

        this.$emit('change', this.myOption);
    },
    initChart() {

      this.chart = echarts.init(this.$el, 'macarons');
      this.chart.clear();
      this.chart.setOption(this.myOption);
      this.updateData();
      // this.chart.setOption(this.option);

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
