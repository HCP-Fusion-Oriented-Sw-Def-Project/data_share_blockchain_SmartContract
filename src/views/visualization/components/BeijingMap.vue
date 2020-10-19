<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
import dataTool from "echarts/extension/dataTool";
import china from "echarts/map/js/china.js"; //
import beijing from "echarts/map/js/province/beijing.js";
import hubei from "echarts/map/js/province/hubei.js";
import wordcloud from "echarts-wordcloud";
// import gl from 'echarts-gl'
require("echarts/theme/macarons"); // echarts theme
require("echarts/extension/bmap/bmap");
import { debounce } from "@/utils";

const animationDuration = 6000;

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "800px"
    },
    height: {
      type: String,
      default: "800px"
    },
    parentHeight: {
      type: Number,
      default: 0
    },
    parentWidth: {
      type: Number,
      default: 0
    },
    dim: {
      type: Array,
      default: []
    },
    value: {
      type: Array,
      default: []
    },
    lon:{
      type:Number,
      default:116.404
    },
    lat:{
      type:Number,
      default:39.915
    },
    name:{
      type:String,
      default:''
    },
    type: {
      type: String,
      default: "treemap"
    },
    title: {
      type: String,
      default: ""
    },
    columnList: {
      type: Object,
      default: null
    },
    toolbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null,
      legend: []
    };
  },
  mounted() {
    this.initChart();
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    columnList: "initChart",
    parentWidth: "initChart",
    parentHeight: "initChart"
  },
  methods: {
    dataTreemap: function() {
      var ylist = [];
      if (this.xAxis.length == 2) {
        for (var i = 0; i < this.xAxis.length; i++) {
          var indicator = [];
          for (var j = 0; j < this.xAxis[i].list.length; j++) {
            if (indicator.indexOf(this.xAxis[i].list[j]) == -1) {
              indicator.push(this.xAxis[i].list[j]);
            }
          }
          this.xAxis[i].list = indicator;
        }

        for (let i = 0; i < this.xAxis[0].list.length; i++) {
          var arr = [];
          var xlist = [];
          for (let j = 0; j < this.columnList.list.length; j++) {
            if (
              this.columnList.list[j][this.xAxis[0].name] ==
              this.xAxis[0].list[i]
            ) {
              if (
                arr.indexOf(this.columnList.list[j][this.xAxis[1].name]) == -1
              ) {
                arr.push(this.columnList.list[j][this.xAxis[1].name]);
              }
            }
          }
          // console.log(xlist)
          for (let k = 0; k < arr.length; k++) {
            var obj = new Object();
            obj.name = arr[k];
            obj.value = 0;
            xlist.push(obj);
          }
          for (let j = 0; j < xlist.length; j++) {
            for (let k = 0; k < this.columnList.list.length; k++) {
              if (
                this.columnList.list[k][this.xAxis[0].name] ==
                  this.xAxis[0].list[i] &&
                this.columnList.list[k][this.xAxis[1].name] == xlist[j].name
              )
                xlist[j].value += Number(
                  this.columnList.list[k][this.yAxis[0].name]
                );
            }
          }
          var obj = new Object();
          obj.name = this.xAxis[0].list[i];
          obj.children = xlist;
          ylist.push(obj);
        }
      }
      this.yAxis[0].list = ylist;
    },
    initChart(flag) {
      var _this = this;
      // this.chart.clear()
      // this.chart = echarts.init(this.$el, 'macarons')
      // this.chart.clear()
      var chart = echarts.init(this.$el, "macarons");
      chart.clear();
      // chart.showLoading();
      // console.log(this.chart)
      //$.get("http://152.136.214.48:81/static/sjs.geojson", function(geoJson) {
        $.get('http://localhost:9528/static/sjs.geojson', function (geoJson) {

        // chart.hideLoading();
        echarts.registerMap("LL", geoJson);
        chart.setOption({
          // title: {
          //   text: '北京市各区人均收入 ',
          //   // subtext: '纯属虚构',
          // },
          // tooltip: {
          //   trigger: 'item',
          //   formatter: '{b}<br/>{c} (yuan / year)'
          // },
          // toolbox: {
          //   show: true,
          //   orient: 'vertical',
          //   left: 'right',
          //   top: 'center',
          //   feature: {
          //       dataView: {readOnly: false},
          //       restore: {},
          //       saveAsImage: {}
          //   }
          // },
          visualMap: {
            min: 2000,
            max: 800,
            // text:['High','Low'],
            realtime: false,
            calculable: false,
            show: false,
            color: ["#66FFCC", "#33FFCC", "#33CCCC", "#00FFFF"]
          },

          series: [
            {
              name: "北京市各区人均收入",
              type: "map",
              mapType: "LL", // 自定义扩展图表类型
              selectedMode: "single",
              itemStyle: {
                normal: {
                  label: {
                    show: true
                    // formatter: '{b}人均收入：{c}'
                  }
                }
                // emphasis:{label:{show:true,
                //   formatter: '{b}人均收入：{c}'
                // }}
              },
              data: [
                { name: "五里坨", value: 1057.34 },
                { name: "广宁", value: 2057.34 },
                { name: "金顶街", value: 1057.34 },
                { name: "苹果园", value: 1557.34 },
                { name: "古城", value: 2207.34 },
                { name: "八角", value: 5788.34 },
                { name: "老山", value: 1588.34 },
                { name: "鲁谷", value: 1988.34 },
                { name: "八宝山", value: 688.34 }
              ]
              // 自定义名称映射
            }
          ]
        });
      });
      // });
      chart.on("click", function(params) {
        _this.test(params.name);
      });
      chart.resize();
    },
    test(name) {
      this.$emit("test", name);
    }
  }
};
</script>
