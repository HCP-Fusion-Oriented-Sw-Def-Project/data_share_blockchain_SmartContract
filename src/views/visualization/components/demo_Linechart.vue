<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
// import yucedata from './yucedata.vue'
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
const animationDuration = 6000;

export default {
  // components:{
  //   yucedata
  // },
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
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: "line"
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
      legend: [],
      dataset: [],
      xAxis: [],
      yAxis: []
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
    colToRow: function() {
      var list = [];
      var title = [];
      for (var i = 0; i < this.xAxis.length; i++) {
        title.push(this.xAxis[i].name);
      }
      for (var i = 0; i < this.yAxis.length; i++) {
        title.push(this.yAxis[i].name);
      }
      // for(var i=0;i<this.listY.length;i++){
      //   title.push(this.listY[i].colName)
      // }
      if (this.xAxis.length !== 0) {
        if (this.xAxis[0].list instanceof Array)
          var length = this.xAxis[0].list.length;
        else var length = this.xAxis[0].list.split(",").length;
        for (var i = 0; i < length; i++) {
          var obj = new Object();
          for (var j = 0; j < title.length; j++) {
            obj[title[i]] = "";
          }
          list.push(obj);
        }
      } else if (this.yAxis.length != 0) {
        if (this.yAxis[0].list instanceof Array)
          var length = this.yAxis[0].list.length;
        else var length = this.yAxis[0].list.split(",").length;
        for (var i = 0; i < length; i++) {
          var obj = new Object();
          for (var j = 0; j < title.length; j++) {
            obj[title[i]] = "";
          }
          list.push(obj);
        }
      }
      // else if(this.listY.length!=0){
      //     if(this.listY[0].colData instanceof Array)
      //       var length = this.listY[0].colData.length
      //     else
      //       var length = this.listY[0].colData.split(',').length
      //     for(var i =0;i<length;i++){
      //       var obj=new Object;
      //       for(var j=0;j<title.length;j++){
      //         obj[title[i]]=''
      //       }
      //       list.push(obj)
      //     }
      //   }

      for (let i = 0; i < this.xAxis.length; i++) {
        var colName = this.xAxis[i].name;
        if (this.xAxis[i].list instanceof Array)
          var colData = this.xAxis[i].list;
        else var colData = this.xAxis[i].list.split(",");
        for (let j = 0; j < colData.length; j++) {
          list[j][colName] = colData[j];
        }
      }
      for (let i = 0; i < this.yAxis.length; i++) {
        var colName = this.yAxis[i].name;
        if (this.yAxis[i].list instanceof Array)
          var colData = this.yAxis[i].list;
        else var colData = this.yAxis[i].list.split(",");
        for (let j = 0; j < colData.length; j++) {
          list[j][colName] = colData[j];
        }
      }
      // for(let i = 0;i<this.listY.length;i++){
      //   var colName = this.listY[i].colName
      //   if(this.listY[i].colData instanceof Array)
      //     var colData = this.listY[i].colData
      //   else
      //     var colData = this.listY[i].colData.split(',')
      //   for(let j=0;j<colData.length;j++){
      //     list[j][colName] = colData[j]
      //   }
      // }
      var objList = new Object();
      objList.title = title;
      objList.list = list;
      this.columnList = objList;
      console.log("妯ª鍚戣〃鏍¼");
      console.log(this.columnList.list);
    },
    dataLine: function() {
      // console.log(this.columnList)
      this.legend = [];
      if (this.xAxis.length == 1) {
        //缁村害鍘婚噸
        for (var i = 0; i < this.xAxis.length; i++) {
          var indicator = [];
          for (var j = 0; j < this.xAxis[i].list.length; j++) {
            console.log(this.xAxis[0].list[4] == this.xAxis[0].list[5]);
            console.log(encodeURIComponent(this.xAxis[0].list[4]));
            console.log(encodeURIComponent(this.xAxis[0].list[5]));
            if (indicator.indexOf(this.xAxis[i].list[j]) == -1) {
              indicator.push(this.xAxis[i].list[j]);
            }
          }
          this.xAxis[i].list = indicator;
        }
        //鏁板€兼眰鍜
        var arr = [];
        for (let i = 0; i < this.yAxis.length; i++) {
          var arry = [];
          for (let j = 0; j < this.xAxis[0].list.length; j++) {
            var value = 0;
            for (let k = 0; k < this.columnList.list.length; k++) {
              if (
                this.columnList.list[k][this.xAxis[0].name] ==
                this.xAxis[0].list[j]
              ) {
                value += Number(this.columnList.list[k][this.yAxis[i].name]);
              }
            }
            arry.push(value);
          }
          var obj = new Object();
          obj.name = this.yAxis[i].name;
          obj.type = this.type;
          obj.data = arry;
          arr.push(obj);
        }
        this.dataset = arr;
        //鏁板€兼爣绛
        for (let i = 0; i < this.yAxis.length; i++) {
          this.legend.push(this.yAxis[i].name);
        }
      }
    },

    initChart() {
      this.xAxis = JSON.parse(JSON.stringify(this.dim));
      this.yAxis = JSON.parse(JSON.stringify(this.value));
      // console.log(this.xAxis)
      // console.log(this.yAxis)
      // this.colToRow()
      this.dataLine();
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.clear();
      setTimeout(
        this.chart.setOption({
          // title: {
          //   text: this.title+"折线图"
          // },
          tooltip: {
            trigger: "axis"
          },
          grid: {
            left: "5%",
            right: "5%",
            bottom: "3%",
            containLabel: true
          },
          legend: {
            data: this.legend,
            textStyle: {
              color: "#FFF"
            }
          },
          toolbox: {
            show: this.toolbox,
            feature: {
              saveAsImage: {}
            }
          },

          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.xAxis[0].list,
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false
            }
          },
          series: this.dataset
        }),
        5000
      );
      this.chart.resize();
    },
    // event(){
    //   this.$emit('heatmapEvent',this.point)
    // },
    disposeChart() {
      this.chart.clear();
      this.chart.dispose();
    }
  }
};
</script>
