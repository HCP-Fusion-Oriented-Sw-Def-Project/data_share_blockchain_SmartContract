<template>
  <div ref="lineTest" style="height:100%;width: 100%; ">
    {{textLocation}}{{bgcWidth}}{{bgcHeight}}{{textContentArrow}}{{textFontSize}}{{textFontColor}}{{textFontWeight}}
  </div>
</template>

<script>
	import echarts from "echarts";
	export default {
		name: "DrawArrow",
		data(){
			return{
				// init:false,
				// textContentArrow:''
			}
		},
		props: {
			id: {
				type: Number,
				default: null
			}
		},
		// created(){
		// this.bgcWidth = this.$store.state.rect.rects[this.id].width
		// this.bgcHeight = this.$store.state.rect.rects[this.id].height
		// },
		mounted() {
			this.initChart()
			// this.init = true;
		},
		computed: {
			bgcWidth() {
				this.$nextTick(function(){
					this.initChart()
				})
				return  this.$store.state.rect.rects[this.id].width
			},
			bgcHeight() {
				// console.log('高度改变')
				this.$nextTick(function(){
					this.initChart()
				})
				return this.$store.state.rect.rects[this.id].height
			},
			textContentArrow(){
				this.$nextTick(function(){
					this.initChart()
				})
				return this.$store.state.rect.rects[this.id].columnList.textContentArrow
			},
			textLocation(){
			console.log(this.$store.state.rect.rects[this.id].columnList.textLocation,"位置")
				this.$nextTick(function(){
					this.initChart()
				})
				return this.$store.state.rect.rects[this.id].columnList.textLocation
			},
			textFontSize(){
				this.$nextTick(function(){
					this.initChart()
				})
				return this.$store.state.rect.rects[this.id].columnList.textFontSize
			},
			textFontColor(){
				this.$nextTick(function(){
					this.initChart()
				})
				return this.$store.state.rect.rects[this.id].columnList.textFontColor
			},
		textFontWeight(){
			this.$nextTick(function(){
				this.initChart()
			})
			return this.$store.state.rect.rects[this.id].columnList.textFontWeight
		}
		},
		methods:{
			initChart(){
				let lineTest1 = this.$echarts.init(this.$refs.lineTest)
				lineTest1.resize();
				let easingFuncs = {
					quarticInOut: function (k) {
						if ((k *= 2) < 1) { return 0.5 * k * k * k * k; }
						return -0.5 * ((k -= 2) * k * k * k - 2);
					}
				};
				var N_POINT = 30;

				var grids = [];
				var xAxes = [];
				var yAxes = [];
				var series = [];
				var titles = [];
				var count = 0;
				echarts.util.each(easingFuncs, function (easingFunc, name) {
					var data = [];
					for (var i = 0; i <= N_POINT; i++) {
						var x = i / N_POINT;
						var y = easingFunc(x);
						data.push([x, y]);
					}
					grids.push({
						show: true,
						borderWidth: 0,
						backgroundColor: '',
						opacity: 0.1,
						shadowColor: 'rgba(0, 0, 0, 0.3)',
						shadowBlur: 2
					});
					xAxes.push({
						type: 'value',
						show: false,
						min: 0,
						max: 1,
						gridIndex: count
					});
					yAxes.push({
						type: 'value',
						show: false,
						min: -0.4,
						max: 1.4,
						gridIndex: count
					});
					series.push({
						name: name,
						type: 'line',
						xAxisIndex: count,
						yAxisIndex: count,
						data: data,
						showSymbol: false,
						animationEasing: name,
						animationDuration: 1000
					});
					titles.push({
						// top:'50%',
						// textAlign: 'center',
						// text: "lalal",
						// textStyle: {
						// 	fontSize: 12,
						// 	fontWeight: 'normal'
						// }
					});
					count++;
				});

				var rowNumber = Math.ceil(Math.sqrt(count));
				echarts.util.each(grids, function (grid, idx) {
					grid.left = ((idx % rowNumber) / rowNumber * 100 + 0.5) + '%';
					grid.top = (Math.floor(idx / rowNumber) / rowNumber * 100 + 0.5) + '%';
					grid.width = (1 / rowNumber * 100 - 1) + '%';
					grid.height = (1 / rowNumber * 100 - 1) + '%';

					titles[idx].left = parseFloat(grid.left) + parseFloat(grid.width) / 2 + '%';
					titles[idx].top = parseFloat(grid.top) + '%';
				});

				let optionTest = {
					title: titles.concat([{
						text: this.textContentArrow,
						top: this.textLocation,
						left: 'center',
						textStyle: {
							fontSize: this.textFontSize,
							color:this.textFontColor,
							fontWeight: this.textFontWeight
						}
					}]),
					grid: grids,
					xAxis: xAxes,
					yAxis: yAxes,
					series: series
				}
				lineTest1.setOption(optionTest)
			}
		}
	};

</script>

<style scoped>

</style>
