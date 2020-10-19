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
      dataset: [],
      xAxis:[],
      yAxis:[],
      columnList: {},
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
    computed: {
      getSmooth() {
          if (this.myOption.hasOwnProperty('series')) {
              return this.myOption.series[0].smooth;
          }else {
              return null;
          }
      },
        // getAxisLabelShow() {
        //
        //   return this.myOption.parallel.parallelAxisDefault.axisLabel.show;
        // }
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
      getSmooth: {
          //目前平行坐标对smooth的改变不敏感，clear是一种解决方法
          handler(nval, oval) {
              //this.myChart.clear();
              //因为option由子组件传递过来的，所以初始化时，dim和value在option之前，需要在option第一次到达时将dim和value装载到option中
              this.chart.clear();
              this.chart.setOption(this.myOption, true);
          },
          deep: true

      },
      // getAxisLabelShow: {
      //     //目前平行坐标对smooth的改变不敏感，clear是一种解决方法
      //     handler(nval, oval) {
      //         //this.myChart.clear();
      //         //因为option由子组件传递过来的，所以初始化时，dim和value在option之前，需要在option第一次到达时将dim和value装载到option中
      //         this.chart.clear();
      //         this.chart.setOption(this.myOption, true);
      //     },
      //     deep: true
      // },
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
    dataParallel:function(){
      this.colToRow();
      //parallelAxis
      this.legend=[];
      this.dataset=[];
      // for(var i=0;i<this.yAxis.length;i++){
      //   var obj={};
      //   obj.dim=i;
      //   obj.name=this.yAxis[i].name;
      //   this.legend.push(obj);
      // }
        for(var i=0;i<this.xAxis.length;i++){
          var obj={};
          obj.dim=i;
          obj.name=this.xAxis[i].name;
          obj.type = this.xAxis[i].type;
          this.legend.push(obj);
        }
      var indicator=[];
      for(var j=0;j<this.xAxis[0].list.length;j++){
        if(indicator.indexOf(this.xAxis[0].list[j])== -1){
          indicator.push(this.xAxis[0].list[j]);
        }
      }
      var xObj={};
      // xObj.dim = i+1;
      // xObj.name=this.xAxis[0].name;
      // xObj.type="category";
      // xObj.data=indicator;
      // this.legend.push(xObj);
      //series

        let firstFlag = true;
      for(var i=0;i<this.columnList.list.length;i++){
        var arr=[]
        for(var item in this.columnList.list[i]){
            let value = this.columnList.list[i][item];
            if (!isNaN(value)) {
                if (firstFlag) {
                    this.min = value;
                    this.max = value;
                    firstFlag = false;
                }else {
                    if (this.min > value) this.min = value;
                    if (this.max < value) this.max = value;
                }
            }

          arr.push(value);
        }
        // var temp=arr[0];
        // arr.shift();
        // arr.push(temp);
        this.dataset.push(arr);
      }
    },
    updateData: function(){
        this.xAxis=JSON.parse(JSON.stringify(this.dim));
        this.yAxis=JSON.parse(JSON.stringify(this.value));

        this.dataParallel();
        this.myOption.parallelAxis = this.legend;
        this.myOption.series[0].data = this.dataset;
        this.myOption.visualMap.min = this.min/10;
        this.myOption.visualMap.max = this.max/10;
        this.$emit('change', this.myOption);
    },
    initChart() {

      // console.log(this.xAxis)
      // console.log(this.yAxis)
      // this.colToRow()
      //this.dataParallel()
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      this.chart.setOption(this.myOption)
      this.updateData();
      // this.chart.setOption({
      //   parallelAxis: this.legend,
      //   series: {
      //     type: 'parallel',
      //     // lineStyle: {
      //     //   width: 4
      //     // },
      //     data: this.dataset
      //   }
      // });
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
