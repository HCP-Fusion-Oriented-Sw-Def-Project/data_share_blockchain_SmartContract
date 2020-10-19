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
      default:() => []
    },
    value: {
      type: Array,
      default:() => []
    },
    type: {
      type:String,
      default:'bar'
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
  created() {
    this.myOption = this.option;
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
    option:{
      handler(nval,oval){
        this.myOption = nval;
        if (this.myOption.series[0].data.length === 0){
          this.updateDim();
          this.updateValue();
        }
        this.chart.setOption(this.myOption, true);
      },
      deep:true
    },
    dim: {
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
    dataGantt:function(){
        this.pStartTime=[];
        this.planTime=[];
        this.aStartTime=[];
        this.actualTime=[];
        for(var i=0;i<this.xAxis[0].list.length;i++){
           this.pStartTime.push(new Date(this.xAxis[0].list[i]));
           this.planTime.push(new Date(this.xAxis[1].list[i]));
           this.aStartTime.push(new Date(this.xAxis[2].list[i]));
           this.actualTime.push(new Date(this.xAxis[3].list[i]));
        }
      },
      updateDim:function(){
        this.xAxis = JSON.parse(JSON.stringify(this.dim));
        this.yAxis = JSON.parse(JSON.stringify(this.value));
        this.dataGantt();
        let ser=[];
        for(let i=0;i<this.myOption.series.length;i++)
        {
          let item = JSON.parse(JSON.stringify(this.myOption.series[i]));
          item.data=[];
          ser.push(item);
        }

        this.myOption.series = [];
        for(let i=0;i<ser.length;i++)
        {
          ser[i].type="bar";
          switch(i){
            case 0:
              ser[i].data = this.pStartTime;
              ser[i].name = this.xAxis[i].name;

              break;
            case 1:
              ser[i].data = this.planTime;
              ser[i].name = this.xAxis[i].name;
              break;
            case 2:
              ser[i].data = this.aStartTime;
              ser[i].name = this.xAxis[i].name;
              break;
            case 3:
              ser[i].data = this.actualTime;
              ser[i].name = this.xAxis[i].name;
              break;
          }
        }
        this.myOption.series = ser;
        this.myOption.legend.data =[this.myOption.series[1].name,this.myOption.series[3].name] ;
        this.$emit('change',this.myOption);
      },
      updateValue:function(){
         this.yAxis =JSON.parse(JSON.stringify(this.value));
         this.myOption.yAxis.data = this.yAxis[0].list;
         this.$emit('change',this.myOption)
     },
    initChart() {
      // this.xAxis=JSON.parse(JSON.stringify(this.dim))
      // this.yAxis=JSON.parse(JSON.stringify(this.value))
      // console.log(this.xAxis)
      // console.log(this.yAxis)
      // // this.colToRow()
      // console.log("甘特图呀")
      //this.dataGantt()
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      this.chart.setOption(this.myOption);
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
