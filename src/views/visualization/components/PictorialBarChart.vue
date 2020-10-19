<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import liquidfill from 'echarts-liquidfill'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import {options} from "../Options";

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
		default: "pictorialBar"
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
		myOption: {},

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
    'columnList':'initChart',
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
		  handler(nval, oval) {
			  //this.chart.resize();
			  this.updateDim();
		  },
		  deep: true
	  },
	  value: {
		  //为option.xAxis装载数据
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

          this.myOption.yAxis.data=this.xAxis[0].list; //赋值给yAxis

          this.$emit('change', this.myOption);
      },
      updateValue: function(){
          this.xAxis=JSON.parse(JSON.stringify(this.dim));

          this.yAxis=JSON.parse(JSON.stringify(this.value));

		  let seriesSetting = JSON.parse(JSON.stringify(options[this.type].series[0]));
		  console.log(this.type);
		  let backseriesSetting = JSON.parse(JSON.stringify(options[this.type].series[1]));

          seriesSetting.data = [];
          backseriesSetting.data = [];
          //this.myOption.legend.data = [];
          this.myOption.series = [];
          for (let data of this.yAxis){
              let copySeriesSetting = JSON.parse(JSON.stringify(seriesSetting));
              let copybackSeriesSetting = JSON.parse(JSON.stringify(backseriesSetting));
              copySeriesSetting.name = data.name;
              copySeriesSetting.data = data.list;
              copybackSeriesSetting.name = data.name;
              copybackSeriesSetting.data = data.list;
              //this.myOption.legend.data.push(data.name);
              this.myOption.series.push(copySeriesSetting);
              this.myOption.series.push(copybackSeriesSetting);

          }
          this.$emit('change', this.myOption);
      },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.chart.clear();
      this.chart.setOption(this.myOption);
      this.updateDim();
          this.updateValue();
      this.chart.resize();
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
