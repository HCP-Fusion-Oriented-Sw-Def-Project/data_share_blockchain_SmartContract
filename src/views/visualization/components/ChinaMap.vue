<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import {options} from "../Options";
const animationDuration = 6000;

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "1000px"
    },
    height: {
      type: String,
      default: "1000px"
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
      default: "chinaMap"
    },
    title: {
      type: String,
      default: ""
    },
    toolbox: {
      type: Boolean,
      default: false
    },
    geoProperties: {
      type:Object,
      default:{
          adcode: 100000,
          acroutes:[],
          childrenNum: 34,
          type: 0
        },
    },
    option: {
      type: Object,
      default: () => {return new Object();}
    }
  },
  data() {
    return {
      chart: null,
      legend: [],
      myOption: {}
    };
  },
  created() {
    this.myOption = this.option;
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
    parentHeight: "initChart",
    geoProperties: {
      handler(val){
        this.initChart();
      },
      deep: true
    },
    dim: "initChart",
    value: "initChart",
    option: {
      handler(nval, oval) {
        this.myOption = nval;
        this.chart.setOption(this.myOption, true);
      },
      deep: true
    },
  },
  methods: {
    dataMap: function(geoJson) {
      // console.log("dataMap");
      // console.log(geoJson);
      // console.log(this.option);
      let xAxis = JSON.parse(JSON.stringify(this.dim));
      let yAxis = JSON.parse(JSON.stringify(this.value));
      let max = 200;
      let min = 0;
      for(let i=0; i<5; i++){
        this.myOption.series[i].data = [];
      }
      if(xAxis.length === 1){
        // this.option.series[0].symbolSize = [];
        for(let i=0; i<xAxis[0].list.length; i++){
          for(let geo of geoJson){
            if(geo.properties.name === xAxis[0].list[i]){
              // console.log("name === ");
              // console.log(geo.properties.name);
              this.myOption.series[this.geoProperties.type].data.push({
                name: xAxis[0].list[i],
                value: geo.properties.centroid.concat(yAxis[0].list[i])
              });
              if(max < yAxis[0].list[i]) max = yAxis[0].list[i];
              if(min > yAxis[0].list[i]) min = yAxis[0].list[i];
              // this.option.series[0].symbolSize.push(yAxis[0].list[i]);
            }
          }
        }
        this.myOption.visualMap.max = max;
        this.myOption.visualMap.min = min;
      }else{
        // this.option.series[0].symbolSize = [];
        let fromCoord = 0;
        let toCoord = 0;
        for(let i=0; i<xAxis[0].list.length; i++){
          for(let geo of geoJson){
            if(geo.properties.name === xAxis[0].list[i]){
              // console.log("fromName === ");
              // console.log(geo.properties.name);
              fromCoord = geo.properties.centroid;
            }else if(geo.properties.name === xAxis[1].list[i]){
              // console.log("toName === ");
              // console.log(geo.properties.name);
              toCoord = geo.properties.centroid;
              this.myOption.series[4].data.push({
                name: xAxis[1].list[i],
                value: geo.properties.centroid.concat(yAxis[0].list[i])
              });
            }
          }
          if(fromCoord !== toCoord){
            this.myOption.series[3].data.push({
              fromName: xAxis[0].list[i],
              toName: xAxis[1].list[i],
              coords:[fromCoord, toCoord],
              value: yAxis[0].list[i]
            });
          }
        }
      }
      this.$emit("change", this.myOption);
    },

    initChart(flag) {
      let _this = this;
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.clear();
      let index='../static/map/';
      // console.log("chinaMap:");
      // console.log("this.geoProperties:");
      // console.log(this.geoProperties);
      for(let acroutes of this.geoProperties.acroutes){
        index += acroutes.toString();
        index += '/';
      }
      if(this.geoProperties.childrenNum !== 0){
        index = index + this.geoProperties.adcode + ".geojson";
      }else{
        index = index.substr(0, index.length-1) + ".geojson";
      }

      // console.log("index:");
      // console.log(index);
      $.get(index, function (geoJson) {
        let temGeo = geoJson;
        if(_this.geoProperties.childrenNum === 0){
          for(let geo of geoJson.features){
            if(geo.properties.adcode === _this.geoProperties.adcode){
              temGeo = {
                'features':[geo]
              };
            }
          }
        }
        echarts.registerMap("LL", temGeo);
        _this.dataMap(geoJson.features);

        _this.chart.setOption(_this.myOption);
        _this.chart.on("click", function(params) {
          if(_this.geoProperties.childrenNum !== 0){
            for(let geo of geoJson.features){
              if(geo.properties.name === params.name){
                // _this.geoProperties = geo.properties;
                // console.log(geo.properties);
                _this.$emit("changeGeo", {
                  adcode: geo.properties.adcode,
                  acroutes: geo.properties.acroutes,
                  childrenNum: geo.properties.childrenNum,
                  type: _this.geoProperties.type
                });
              }
            }
          }
        });
      });
      this.chart.resize();
    },

    resize() {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      this.__resizeHanlder();
    },
  }
};
</script>
