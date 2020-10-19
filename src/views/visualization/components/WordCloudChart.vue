<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import wordcloud from 'echarts-wordcloud'
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
      default:'wordCloud'
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
    }
  },
  data() {
    return {
      chart: null,
      legend: [],
      list: []

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
    'parentHeight':'initChart'
  },
  methods: {
    dataWordCloud:function(){
      this.list=[]
          var indicator=[]
          for(var j=0;j<this.xAxis[0].list.length;j++){
            if(indicator.indexOf(this.xAxis[0].list[j])== -1){
              indicator.push(this.xAxis[0].list[j]);
            }
          }
        //数值求和
        var arr=[]
        for(let j=0;j<indicator.length;j++){
            var value=0
            for(let k=0;k<this.columnList.list.length;k++){
              if(this.columnList.list[k][this.xAxis[0].name]==indicator[j]){
                value+=Number(this.columnList.list[k][this.yAxis[0].name])
              }
            }
            var obj = new Object
            obj.name = indicator[j]
            obj.value = value
            this.list.push(obj)
        }
        // console.log("词云图测试")
        // console.log(this.list)
    },
    createRandomItemStyle() {
        return {
          normal: {
            color: 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')'
          }
        };
      },
    initChart() {
      this.xAxis=[]
      this.yAxis=[]
      this.list=[]
      this.xAxis=JSON.parse(JSON.stringify(this.dim))
      this.yAxis=JSON.parse(JSON.stringify(this.value))
      this.dataWordCloud()
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      this.chart.setOption({
        // title: {
        //   text: 'Google Trends',
        //    // link: 'http://www.google.com/trends/hottrends'
        // },
        tooltip: {
          show: true
        },
        toolbox: {
          show:this.toolbox,
           feature: {
            saveAsImage: {}
          }
        },
        series: [{
          // name: 'Google Trends',
          type: 'wordCloud',
          size: ['80%', '80%'],
          textRotation : [0, 0, 0, 0],
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 14
          },
          data:this.list,
      //     data: [
      //     {
      //       name: "Sam S Club",
      //       value: 10000,
      //       itemStyle: {
      //         normal: {
      //           color: 'black'
      //         }
      //       }
      //     },
      //     {
      //       name: "Macys",
      //       value: 6181,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Amy Schumer",
      //       value: 4386,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Jurassic World",
      //       value: 4055,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Charter Communications",
      //       value: 2467,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Chick Fil A",
      //       value: 2244,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Planet Fitness",
      //       value: 1898,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Pitch Perfect",
      //       value: 1484,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Express",
      //       value: 1112,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Home",
      //       value: 965,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Johnny Depp",
      //       value: 847,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Lena Dunham",
      //       value: 582,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Lewis Hamilton",
      //       value: 555,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "KXAN",
      //       value: 550,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Mary Ellen Mark",
      //       value: 462,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Farrah Abraham",
      //       value: 366,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Rita Ora",
      //       value: 360,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Serena Williams",
      //       value: 282,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "NCAA baseball tournament",
      //       value: 273,
      //       itemStyle: createRandomItemStyle()
      //     },
      //     {
      //       name: "Point Break",
      //       value: 265,
      //       itemStyle: createRandomItemStyle()
      //     }
      //     ]
        }]
      })
      this.chart.resize()
    },
    disposeChart(){
      this.chart.clear()
      this.chart.dispose()
    },
  }
}
</script>