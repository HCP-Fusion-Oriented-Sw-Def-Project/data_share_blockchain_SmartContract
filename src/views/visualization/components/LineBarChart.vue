<template>
	<div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
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
			default:'lineBar'
		},
		title: {
			type:String,
			default:''
		},
		toolbox:{
			type:Boolean,
			default:false
		},
		option:{
			type:Object,
			default:{}
		}
	},
	data() {
		return {
			chart: null,
			dataset: [],
			xAxis:[],
			yAxis:[],
			myOption:{}

		}
	},
	created() {
    		this.myOption = this.option;
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
		//'option':'initChart'
		option:{
			handler(nval,oval){

			 this.myOption=nval;
			 if(this.myOption.series[0].data.length === 0)
			 {
				this.updateDim();
				this.updateValue();
			 }
			 this.chart.setOption(this.myOption,true);
			},
			deep:true
		},
		dim:{
			//为option.xAxis装载数据
				handler(nval, oval) {
						this.updateDim();
				},
					deep: true
			},
			value: {
				handler(nval, oval) {
						//为option.series，option.yAxis和option.legend装载数据
						this.updateValue();
				},
					deep: true
			}
	},
	methods: {
		 updateDim: function(){
		    this.yAxis=JSON.parse(JSON.stringify(this.value));
        this.xAxis=JSON.parse(JSON.stringify(this.dim));

		    this.myOption.xAxis.data=this.xAxis[0].list;
		    this.myOption.xAxis.type = this.xAxis[0].type;
		  // console.log(123)
		//   console.log(this.xAxis[0])
		//   console.log(this.xAxis[0].list)
		//   console.log(this.myOption.xAxis)
          this.$emit('change', this.myOption);
      },
      updateValue: function(){//现在是让所有的列叠到一起
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));

          // let lineseriesSetting =JSON.parse(JSON.stringify(this.myOption.series[0]));//柱状
          // let seriesSetting = JSON.parse(JSON.stringify(this.myOption.series[1]));//取出series[0]中的格式,折线
          let lineseriesSetting = {
					name:'',
					type:'bar',
					barWidth:10,
					itemStyle:{
						color:''
					},
					yAxisIndex: 0,
					barGap:20,
					data:[]
				};//柱状
          let seriesSetting = {
					name:'',
					type:'line',
					lineStyle:{
						width:1,
						type:'solid',
					},
					smooth:false,
					yAxisIndex: 1,
					data:[]
				};//取出series[0]中的格式,折线
          lineseriesSetting.data=[];
          seriesSetting.data = [];//清空data
          this.myOption.legend.data = [];//清空图例的data
          this.myOption.series = [];//清空myOption的series[0]
          //第一个为柱状，剩下的为折线图
          let copylineseriesSetting = JSON.parse(JSON.stringify(lineseriesSetting));
          copylineseriesSetting.name = this.yAxis[0].name;
          copylineseriesSetting.data = this.yAxis[0].list;
          this.myOption.legend.data.push(this.yAxis[0].name);
          this.myOption.series.push(copylineseriesSetting);
          for(let i=1;i<this.yAxis.length;i++)
          {
          	let copySeriesSetting = JSON.parse(JSON.stringify(seriesSetting));
              copySeriesSetting.name = this.yAxis[i].name;
              copySeriesSetting.data = this.yAxis[i].list;
              this.myOption.legend.data.push(this.yAxis[i].name);
              this.myOption.series.push(copySeriesSetting);
          }

          this.$emit('change', this.myOption);
      },
		initChart() {
			// this.xAxis=JSON.parse(JSON.stringify(this.dim))
			// this.yAxis=JSON.parse(JSON.stringify(this.value))
			//this.dataLineBar()
			//console.log("折线柱状图呀")
			// console.log(this.option)
			this.chart = echarts.init(this.$el, 'macarons')
			this.chart.clear()
        	this.chart.setOption(this.myOption)
        	this.updateDim();
      		this.updateValue();
			this.chart.resize()

		},
		resize(){
			this.__resizeHanlder = debounce(() => {
			if (this.chart) {
					this.chart.resize()
					}
				}, 100)
				this.__resizeHanlder()
		},
		disposeChart(){
			this.chart.clear()
			this.chart.dispose()
		},
	}
}
</script>
