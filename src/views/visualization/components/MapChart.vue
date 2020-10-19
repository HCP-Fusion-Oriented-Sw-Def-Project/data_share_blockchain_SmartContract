<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import dataTool from 'echarts/extension/dataTool'
import china from 'echarts/map/js/china.js' //
import beijing from 'echarts/map/js/province/beijing.js'
import hubei from 'echarts/map/js/province/hubei.js'
import wordcloud from 'echarts-wordcloud'
// import gl from 'echarts-gl'
require('echarts/theme/macarons') // echarts theme
require('echarts/extension/bmap/bmap');
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
      default:'treemap'
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
    dataTreemap:function(){
      var ylist = []
      if(this.xAxis.length==2){     
        for(var i=0;i<this.xAxis.length;i++){
          var indicator=[]
          for(var j=0;j<this.xAxis[i].list.length;j++){
            if(indicator.indexOf(this.xAxis[i].list[j])== -1){
              indicator.push(this.xAxis[i].list[j]);
            }
          }
          this.xAxis[i].list=indicator
        }
      
        for(let i=0;i<this.xAxis[0].list.length;i++){
          var arr=[]
          var xlist = []
          for(let j=0;j<this.columnList.list.length;j++){         
            if(this.columnList.list[j][this.xAxis[0].name]==this.xAxis[0].list[i]){
              if(arr.indexOf(this.columnList.list[j][this.xAxis[1].name])== -1){
                arr.push(this.columnList.list[j][this.xAxis[1].name]);
              }
            }
          }
          // console.log(xlist)
          for(let k=0;k<arr.length;k++){
            var obj = new Object
            obj.name = arr[k]
            obj.value = 0
            xlist.push(obj)
          }
          for(let j=0;j<xlist.length;j++){
            for(let k=0;k<this.columnList.list.length;k++){
              if(this.columnList.list[k][this.xAxis[0].name]==this.xAxis[0].list[i]&&this.columnList.list[k][this.xAxis[1].name]==xlist[j].name)
                xlist[j].value+=Number(this.columnList.list[k][this.yAxis[0].name])
            }
          }
          var obj = new Object
          obj.name = this.xAxis[0].list[i]
          obj.children = xlist
          ylist.push(obj)
        }
      }
      this.yAxis[0].list=ylist
    },
    initChart(flag) {
      this.xAxis=JSON.parse(JSON.stringify(this.dim))
      this.yAxis=JSON.parse(JSON.stringify(this.value))
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      var data = []
        var geoCoordMap = []
        for(let i =0 ;i<this.xAxis[0].list.length;i++){
          for(let j=0;j<this.columnList.list.length;j++){
            if(this.columnList.list[j][this.xAxis[0].name]==this.xAxis[0].list[i]){
              var obj = new Object
              obj.name=this.columnList.list[j][this.xAxis[0].name]
              data.push(obj)
              var arr=[]
              arr.push(Number(this.columnList.list[j][this.yAxis[0].name]))
              arr.push(Number(this.columnList.list[j][this.yAxis[1].name]))
              var coordObj = new Object
              coordObj[this.xAxis[0].list[i]] = arr
              geoCoordMap.push(coordObj)
            }
          }
        }
        var convertData = function (data) {
          var res = [];
          for (let i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[i][data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(2008)
              });
            }
          }
          return res;
        }
        this.chart.setOption({
          // title:{
          //   text: this.dataset,
          //   left: 'center',
          //   textStyle: {
          //     color: '#fff'
          //   }
          // },
          tooltip:{trigger: 'item'},
          toolbox: {
            show:this.toolbox,
            feature: {
              saveAsImage: {}
            }
          },
          bmap: {
            center: [116.37,39.92],
            zoom: 11,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  "featureType": "water",
                  "elementType": "all",
                  "stylers": {
                    "color": "#044161"
                  }
                },
                {
                  "featureType": "land",
                  "elementType": "all",
                  "stylers": {
                    "color": "#004981"
                  }
                },
                {
                  "featureType": "boundary",
                  "elementType": "geometry",
                  "stylers": {
                    "color": "#064f85"
                  }
                },
                {
                  "featureType": "railway",
                  "elementType": "all",
                  "stylers": {
                    "visibility": "off"
                  }
                },
                {
                  "featureType": "highway",
                  "elementType": "geometry",
                  "stylers": {
                    "color": "#004981"
                  }
                },
                {
                  "featureType": "highway",
                  "elementType": "geometry.fill",
                  "stylers": {
                    "color": "#005b96",
                    "lightness": 3
                  }
                },
                {
                  "featureType": "highway",
                  "elementType": "labels",
                  "stylers": {
                    "visibility": "off"
                  }
                },
                {
                  "featureType": "arterial",
                  "elementType": "geometry",
                  "stylers": {
                    "color": "#004981"
                  }
                },
                {
                  "featureType": "arterial",
                  "elementType": "geometry.fill",
                  "stylers": {
                    "color": "#00508b"
                  }
                },
                {
                  "featureType": "poi",
                  "elementType": "all",
                  "stylers": {
                    "visibility": "off"
                  }
                },
                {
                  "featureType": "green",
                  "elementType": "all",
                  "stylers": {
                    "color": "#056197",
                    "visibility": "off"
                  }
                },
                {
                  "featureType": "subway",
                  "elementType": "all",
                  "stylers": {
                    "visibility": "off"
                  }
                },
                {
                  "featureType": "manmade",
                  "elementType": "all",
                  "stylers": {
                    "visibility": "off"
                  }
                },
                {
                  "featureType": "local",
                  "elementType": "all",
                  "stylers": {
                    "visibility": "off"
                  }
                },
                {
                  "featureType": "arterial",
                  "elementType": "labels",
                  "stylers": {
                    "visibility": "off"
                  }
                },
                {
                  "featureType": "boundary",
                  "elementType": "geometry.fill",
                  "stylers": {
                    "color": "#029fd4"
                  }
                },
                {
                  "featureType": "building",
                  "elementType": "all",
                  "stylers": {
                    "color": "#1a5787"
                  }
                },
                {
                  "featureType": "label",
                  "elementType": "all",
                  "stylers": {
                    "visibility": "off"
                  }
                }
              ]
            }
          },
          series : [{
              name: this.xAxis[0].name,
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: convertData(data),
              symbolSize:5,
              label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
              },
              itemStyle: {
                normal: {
                    color: '#7CFC00'
                }
              }

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