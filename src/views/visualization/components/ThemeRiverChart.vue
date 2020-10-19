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
      default:() => []
    },
    value: {
      type: Array,
      default:() => []
    },
    type: {
      type:String,
      default:'themeRiver'
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
      dataset: [],
      columnList:{},
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
          this.updateDimAndValue();

        }
        this.chart.setOption(this.myOption, true);
      },
      deep:true
    },
    dim:{
      handler(nval,oval){
        this.updateDimAndValue();
      },
      deep:true
    },
    value:{
      handler(nval,oval){
        this.updateDimAndValue();
      },
      deep:true
    }
  },
  methods: {
      colToRow: function () {
          let list = [];
          let title = [];
          for (let i = 0; i < this.dim.length; i++) {
              title.push(this.dim[i].name);
          }
          for (let i = 0; i < this.value.length; i++) {
              title.push(this.value[i].name);
          }
          let length = 0;
          if (this.dim.length !== 0) {
              length = this.dim[0].list.length;
          } else if(this.value.length !== 0){
              length = this.value[0].list.length;
          }
          for (let i = 0; i < length; i++) {
              let obj = new Object;
              for (let j = 0; j < this.dim.length; j++) {
                  this.$set(obj, title[j], this.dim[j].list[i]);
              }
              for (let j = 0; j < this.value.length; j++) {
                  this.$set(obj, title[j + this.dim.length], this.value[j].list[i]);
              }
              list.push(obj);
          }
          this.columnList.list = list;
          this.columnList.title = title;
      },
    dataThemeRiver:function(){//集成数据集
      this.dataset=[];
        // this.legend=this.xAxis[0];
      this.legend=[];
      for(var j=0;j<this.xAxis[1].list.length;j++){
        if(this.legend.indexOf(this.xAxis[1].list[j])== -1){
          this.legend.push(this.xAxis[1].list[j]);
        }
      }//集成legend的数据集

      for(var i =0;i<this.xAxis[0].list.length;i++){
        var arr=[this.xAxis[0].list[i], this.yAxis[0].list[i], this.xAxis[1].list[i]]
        this.dataset.push(arr)
      }
      //   for(var i =0;i<this.xAxis[0].list.length;i++){
      //       var arr=[this.xAxis[1].list[i], this.yAxis[0].list[i], this.xAxis[0].list[i]]
      //       this.dataset.push(arr)
      //   }
      // console.log(this.dataset)
    },
    updateDimAndValue:function(){
      this.xAxis=JSON.parse(JSON.stringify(this.dim));
      this.yAxis=JSON.parse(JSON.stringify(this.value));
      this.dataThemeRiver();
      this.myOption.series[0].data = this.dataset;
      this.myOption.legend.data = this.legend;
      this.$emit('change',this.myOption)
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      this.chart.setOption(this.myOption);
      this.updateDimAndValue();
      this.chart.resize()
    },
      //console.log(this.dataset)
      // this.chart.setOption ({
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'line',
      //       lineStyle: {
      //           color: 'rgba(0,0,0,0.2)',
      //           width: 1,
      //           type: 'solid'
      //       }
      //     }
      //   },
      //   legend: {
      //     data: this.legend
      //   },

      //   singleAxis: {
      //     top: 50,
      //     bottom: 50,
      //     axisTick: {},
      //     axisLabel: {},
      //     type: 'time',
      //     axisPointer: {
      //       animation: true,
      //       label: {
      //           show: true
      //       }
      //     },
      //     splitLine: {
      //       show: true,
      //       lineStyle: {
      //           type: 'dashed',
      //           opacity: 0.2
      //       }
      //     }
      //   },
      //   series: [
      //     {
      //       type: 'themeRiver',
      //       itemStyle: {
      //           emphasis: {
      //               shadowBlur: 20,
      //               shadowColor: 'rgba(0, 0, 0, 0.8)'
      //           }
      //       },
      //       data:this.dataset
      //     }
      //   ]
      // })

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
