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
      default() {
        return [];
      }
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    type: {
      type: String,
      default: "bar"
    },
    barWidth: {
      type: String,
      default: "50%"
    },
    title: {
      type: String,
      default: ""
    },
    toolbox: {
      type: Boolean,
      default: false
    },
    ifClick: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      chart: null,
		  myOption: this.option,
		// type: "bar"
    };
  },
  created() {
    // this.myOption = this.option;
  },
  mounted() {
    this.initChart();
    this.init = true;
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
    parentWidth: "initChart",
    parentHeight: "initChart",
    option: {
      handler(nval, oval) {
        //this.myChart.clear();
        //因为option由子组件传递过来的，所以初始化时，dim和value在option之前，需要在option第一次到达时将dim和value装载到option中
        this.myOption = nval;
        if (this.myOption.series[0].data.length === 0) {
          this.updateDimandValue();
        }
        this.chart.setOption(this.myOption, true);
      },
      deep: true
    },
    dim: {
      handler(nval, oval) {
        //this.chart.resize();
		  this.updateDimandValue();
      },
      deep: true
    },
    value: {
		//为option.xAxis装载数据
      handler(nval, oval) {
        //为option.series，option.yAxis和option.legend装载数据
		  this.updateDimandValue();
      },
      deep: true
    }
  },
  methods: {
    updateDimandValue: function() {
      this.xAxis = JSON.parse(JSON.stringify(this.dim));
      this.yAxis = JSON.parse(JSON.stringify(this.value));
		let xAxisSetting = JSON.parse(JSON.stringify(options[this.type].xAxis[0]));
		xAxisSetting.name = [];
		xAxisSetting.data = [];
      this.myOption.xAxis = [];
      for (let data of this.xAxis) {
        let copyXAxisSetting = JSON.parse(JSON.stringify(xAxisSetting));
        copyXAxisSetting.name = data.name;
        copyXAxisSetting.data = data.list;
        this.myOption.xAxis.push(copyXAxisSetting);
      }

		let seriesSetting = JSON.parse(JSON.stringify(options[this.type].series[0]));
      seriesSetting.data = [];
      this.myOption.legend.data = [];
      this.myOption.series = [];
      for (let data of this.yAxis) {
        let copySeriesSetting = JSON.parse(JSON.stringify(seriesSetting));
        copySeriesSetting.name = data.name;
        copySeriesSetting.data = data.list;
        this.myOption.legend.data.push(data.name);
        this.myOption.series.push(copySeriesSetting);
      }
      // console.log(this.myOption);
      this.$emit("change", this.myOption);
    },
    initChart() {
      var _this = this;
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.clear();
      this.chart.setOption(this.myOption);
      //this.updateDimandValue();
      this.chart.resize();
      this.chart.on("click", function(params) {
        if (_this.ifClick) _this.event();
      });
    },

    resize() {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      this.__resizeHanlder();
    },
    event() {
      this.$emit("barEvent", name);
    },
    disposeChart() {
      this.chart.clear();
      this.chart.dispose();
    }
  }
};
</script>
