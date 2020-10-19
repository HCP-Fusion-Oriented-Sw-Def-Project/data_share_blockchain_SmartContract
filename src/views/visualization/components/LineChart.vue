<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from "echarts";

	require("echarts/theme/macarons"); // echarts theme
	import {debounce} from "@/utils";

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
			toolbox: {
				type: Boolean,
				default: false
			},
			option: {
				type: Object,
				default: function () {
					return {};
				}
			}
		},
		created() {
			this.myOption = this.option;
		},
		data() {
			return {
				chart: null,
				dataset: [],
				xAxis: [],
				yAxis: [],
				myOption: {}

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
		computed: {
			getMyOption() {
				return this.option;
			}
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
			"parentWidth": "initChart",
			"parentHeight": "initChart",
			option: {
				handler(nval, oval) {
					//this.myChart.clear();
					//因为option由子组件传递过来的，所以初始化时，dim和value在option之前，需要在option第一次到达时将dim和value装载到option中
					this.myOption = JSON.parse(JSON.stringify(nval));
					if (this.myOption.series[0].data.length === 0) {
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
			updateDim: function () {
				this.xAxis = JSON.parse(JSON.stringify(this.dim));
				let xAxisSetting = JSON.parse(JSON.stringify(this.myOption.xAxis[0]));
				if (this.xAxis.length > 0) {
					this.myOption.xAxis = [];
					for (let data of this.xAxis) {
						let copyXAxisSetting = JSON.parse(JSON.stringify(xAxisSetting));
						copyXAxisSetting.name = data.name;
						copyXAxisSetting.data = data.list;
						this.myOption.xAxis.push(copyXAxisSetting);
					}
					this.$emit("change", this.myOption);
				}

			},
			updateValue: function () {
				this.yAxis = JSON.parse(JSON.stringify(this.value));
				let seriesSetting = JSON.parse(JSON.stringify(this.myOption.series[0]));
				seriesSetting.data = [];
				if (this.yAxis.length > 0) {
					this.myOption.legend.data = [];
					this.myOption.series = [];
					for (let data of this.yAxis) {
						let copySeriesSetting = JSON.parse(JSON.stringify(seriesSetting));
						copySeriesSetting.name = data.name;
						copySeriesSetting.data = data.list;
						this.myOption.legend.data.push(data.name);
						this.myOption.series.push(copySeriesSetting);
					}
					this.$emit("change", this.myOption);
				}

			},
			initChart() {
				// this.xAxis=JSON.parse(JSON.stringify(this.dim))
				// this.yAxis=JSON.parse(JSON.stringify(this.value))
				// // this.colToRow()
				// this.dataLine();

				// console.log(this.dataset);
				this.chart = echarts.init(this.$el, "macarons");
				this.chart.clear();
				this.chart.setOption(this.myOption);
				this.updateDim();
				this.updateValue();
				// setTimeout(this.chart.setOption ({
				//     // title: {
				//     //   text: this.title+"折线图"
				//     // },
				//     tooltip: {
				//       trigger: 'axis'
				//     },
				//     grid: {
				//       left: '5%',
				//       right: '5%',
				//       bottom: '3%',
				//       containLabel: true
				//     },
				//     legend: {
				//       data:this.legend,
				//       textStyle:{
				//         color:'#FFF'
				//       }
				//     },
				//     toolbox: {
				//       show:this.toolbox,
				//       feature: {
				//         saveAsImage: {}
				//       }
				//     },
				//     xAxis: {
				//       type: 'category',
				//       boundaryGap: false,
				//       data: this.xAxis[0].list,
				//       splitLine:{
				//       　　　　show:false
				//       　　}
				//     },
				//     yAxis: {
				//       type: 'value',
				//       splitLine:{
				//       　　　　show:false
				//       　　}
				//     },
				//     series:this.dataset
				//   }),5000)
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
			disposeChart() {
				this.chart.clear();
				this.chart.dispose();
			},
		}
	};
</script>
