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
      default: []
    },
    value: {
      type: Array,
      default: []
    },
    type: {
      type:String,
      default:'radar'
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
      dataset: [],
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
    dataFunnel(){
      var temp = [];
      if(this.xAxis.length != 0){
        let ndata = dataArrayScale(this.yAxis[0].list, 10, 100);
        for (let i=0; i<this.xAxis[0].list.length; ++i) {
            temp.push({
                name: this.xAxis[0].list[i],
                value: ndata[i],
                svalue: this.yAxis[0].list[i]
            })
        }
        this.legend=this.xAxis[0].list;
        this.dataset=temp;
        // console.log("数据集");
        // console.log(this.dataset);
      }
      else{
        var indicator = [];
        console.log("标签啊");
        var temp = [];
        var arr = [];
        for(var i=0;i<this.yAxis.length;i++){
          indicator.push(this.yAxis[i].name);
          var sum = 0;
          for(var j=0;j<this.yAxis[i].list.length;j++){
            sum += Number(this.yAxis[i].list[j]);
          }
          arr.push(sum);
          var obj = new Object;
          obj.name = this.yAxis[i].name;
          obj.value = sum;
          temp.push(obj);
        }

        this.legend=indicator
        this.dataset=temp
        // console.log("数据集")
        // console.log(this.dataset)
      }
    },
      updateData: function(){
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));
          this.dataFunnel();
          this.myOption.series[0].data = this.dataset;
          this.myOption.tooltip.formatter = (params) => {
              return params.data.name + ':' +params.data.svalue;
          }
          this.myOption.legend.data = this.legend;
          // console.log(this.legend);
          this.$emit('change', this.myOption);
      },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      this.chart.setOption(this.myOption);
      this.updateData();
      // this.chart.setOption({
      //     // title: {
      //     //   text: this.title+'漏斗图',
      //     //   // subtext: '纯属虚构'
      //     // },
      //     tooltip: {
      //       trigger: 'item',
      //       formatter: "{a} <br/>{b} : {c}%"
      //     },
      //     toolbox: {
      //       show:this.toolbox,
      //       feature: {
      //         saveAsImage: {}
      //       }
      //     },
      //     // legend: {
      //     //   type: 'plain',
      //     //   orient: 'vertical',
      //     //   right: 10,
      //     //   top: 20,
      //     //   bottom: 20,
      //     //   data: this.legend,
      //     // },
      //     calculable: true,
      //     series: [
      //     {
      //       name:'漏斗图',
      //       type:'funnel',
      //       left: '10%',
      //       top: 60,
      //       //x2: 80,
      //       bottom: 60,
      //       width: '80%',
      //       // height: {totalHeight} - y - y2,
      //       min: 0,
      //       max: 100,
      //       minSize: '0%',
      //       maxSize: '80%',
      //       sort: 'none',
      //       gap: 2,
      //       label: {
      //           normal: {
      //               show: true,
      //               formatter: '转换率：{c}%',
      //               position: 'left',
      //               align:'left'
      //           },
      //           emphasis: {
      //               textStyle: {
      //                   fontSize: 20
      //               }
      //           },
      //           // align:'left'
      //       },
      //       labelLine: {
      //           normal: {
      //               length: 10,
      //               lineStyle: {
      //                   width: 1,
      //                   type: 'solid'
      //               }
      //           }
      //       },
      //       itemStyle: {
      //           normal: {
      //               borderColor: '#fff',
      //               borderWidth: 1
      //           }
      //       },
      //       data:this.dataset
      //       // data: [
      //       //     {value: 60, name: '访问'},
      //       //     {value: 40, name: '咨询'},
      //       //     {value: 20, name: '订单'},
      //       //     {value: 80, name: '点击'},
      //       //     {value: 100, name: '展现'}
      //       // ]
      //     }]
      //   })
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
  }
}
</script>
