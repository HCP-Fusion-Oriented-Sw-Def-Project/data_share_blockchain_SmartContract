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
      default:'radar'
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

              if (this.myOption.series[0].data.length === 0 || this.myOption.series[0].data[0].value.length === 0){
                  this.updateDim();
                  this.updateValue();
              }
              this.chart.setOption(this.myOption, true);
          },
          deep: true
      },
      dim: {
          handler(nval, oval) {
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
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));
          this.myOption.radar.indicator = [];
          for(let data of this.xAxis[0].list){
              let obj = {};
              obj.name = data;
              this.myOption.radar.indicator.push(obj);
          }
          this.$emit('change', this.myOption);
      },
      updateValue: function(){
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));
          let seriesSetting = JSON.parse(JSON.stringify(this.myOption.series[0].data[0]));

          this.myOption.legend.data = [];
          this.myOption.series[0].data = [];

          for (let data of this.yAxis){
              let copySeriesSetting = JSON.parse(JSON.stringify(seriesSetting));
              copySeriesSetting.name = data.name;
              copySeriesSetting.value = data.list;
              this.myOption.legend.data.push(data.name);
              this.myOption.series[0].data.push(copySeriesSetting);
          }
          this.$emit('change', this.myOption);
      },
    initChart() {

      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear();
      this.chart.setOption({
    title: {
        text: '基础雷达图'
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
           { name: '销售（sales）', max: 6500},
           { name: '管理（Administration）', max: 16000},
           { name: '信息技术（Information Techology）', max: 30000},
           { name: '客服（Customer Support）', max: 38000},
           { name: '研发（Development）', max: 52000},
           { name: '市场（Marketing）', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '预算分配（Allocated Budget）'
            },
             {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '实际开销（Actual Spending）'
            }
        ]
    }]
});
      this.updateDim();
      this.updateValue();
      // this.chart.setOption({
      //   // title: {
      //   //   text: this.title+"雷达图"
      //   // },
      //   tooltip: {},
      //   // legend: {
      //   // data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']},
      //   toolbox: {
      //     show:this.toolbox,
      //     feature: {
      //       saveAsImage: {}
      //     }
      //   },
      //   grid: {
      //       left: '5%',
      //       right: '5%',
      //       bottom: '3%',
      //       containLabel: true
      //     },
      //   radar: {
      //     shape: 'circle',
      //       name: {
      //         textStyle: {
      //           color: '#fff',
      //           backgroundColor: '#999',
      //           borderRadius: 3,
      //           padding: [3, 5]
      //         }
      //       },
      //       indicator:this.xAxis[0].list
      //   // indicator: [
      //   //    { name: '销售（sales）', max: 6500},
      //   //    { name: '管理（Administration）', max: 16000},
      //   //    { name: '信息技术（Information Techology）', max: 30000},
      //   //    { name: '客服（Customer Support）', max: 38000},
      //   //    { name: '研发（Development）', max: 52000},
      //   //    { name: '市场（Marketing）', max: 25000}
      //   // ]
      //     },
      //     series: [{
      //       name: this.dataset,
      //       type: 'radar',
      //   // areaStyle: {normal: {}},
      //       data:this.yAxis[0].list
      //   // data : [
      //   //     {
      //   //         value : [4300, 10000, 28000, 35000, 50000, 19000],
      //   //         name : '预算分配（Allocated Budget）'
      //   //     },
      //   //      {
      //   //         value : [5000, 14000, 28000, 31000, 42000, 21000],
      //   //         name : '实际开销（Actual Spending）'
      //   //     }
      //   // ]
      //      }]
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
