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
      default: []
    },
    value: {
      type: Array,
      default: []
    },
    type: {
      type:String,
      default:'bar'
    },
    barWidth: {
      type: String,
      default: "50%"
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
    },
    ifClick:{
      type:Boolean,
      default:false
    },
    id:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      chart: null,
      legend: [],
      click_info:{
        click_name:'',
        click_index:0,
      }
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
    dataBar:function(){
      //维度去重
      // console.log(typeof(this.value[0].list[0]))
      if(typeof(this.value[0].list[0])== "number"){
        this.legend=[]
        for(var i=0;i<this.xAxis.length;i++){
          var indicator=[]
          for(var j=0;j<this.xAxis[i].list.length;j++){
            if(indicator.indexOf(this.xAxis[i].list[j])== -1){
              indicator.push(this.xAxis[i].list[j]);
            }
          }
          this.xAxis[i].list=indicator
        }
        //数值求和
        var arr=[]
        for(let i=0;i<this.yAxis.length;i++){
          var arry=[]
          for(let j=0;j<this.xAxis[0].list.length;j++){
            var value=0
            for(let k=0;k<this.columnList.list.length;k++){
              if(this.columnList.list[k][this.xAxis[0].name]==this.xAxis[0].list[j]){
                value+=Number(this.columnList.list[k][this.yAxis[i].name])
              }
            }
            arry.push(value)
          }
          var obj = new Object
          obj.name = this.yAxis[i].name
          obj.type = this.type
          // obj.stack=this.xAxis[0].name
          obj.barWidth= 10
          obj.data = arry
          obj.color= new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: 'rgba(255,255,255,0)'},
                            {offset: 0.5, color: '#00FFFF'},
                            {offset: 1, color: '#00FFFF'}
                        ]
                    )
          // obj.barWidth = this.barWidth;
          arr.push(obj)
        }
        this.yAxis[0].list=arr
        //数值标签
        for(let i=0;i<this.yAxis.length;i++){
          this.legend.push(this.yAxis[i].name)
        }
      }
      else{
        
      }
    },
    
    initChart() {
      var _this=this
      console.log("this...........................................id")
      console.log(this.id)
      this.xAxis=JSON.parse(JSON.stringify(this.dim))
      this.yAxis=JSON.parse(JSON.stringify(this.value))
      this.dataBar()
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      this.chart.setOption ({
          // title: {
          //   text: this.title+"柱状图"
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            show:false,
            left: '5%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          // legend: {
          //   data:this.legend,
          //   textStyle:{
          //     color:'#FFF',
          //   }
          // },
          toolbox: {
            show:this.toolbox,
            feature: {
              saveAsImage: {}
            }
          },
          yAxis: {
            type: 'category',
            // boundaryGap: false,
            axisLabel: { interval: 0, rotate: 45 },
            data: this.xAxis[0].list,
            splitLine:{
            　　　　show:false
            　　}

          },
          xAxis: {
            type: 'value',
            
            splitLine:{
            　　　　show:false
            　　}

          },
          series:this.yAxis[0].list
        })
      this.chart.resize()
      this.chart.on('click',(function(params){
        var name =params.name;//x轴对应的标签 
        // var value = params.value;
        var index = params.dataIndex;//第几个柱子
        this.click_info.click_name = name;
        this.click_info.click_index = index;
        // var data = params.data;
        // console.log("看这里")
        // console.info(name +"\n"+value+"\n"+index+"\n"+data)
        if(_this.ifClick)
          _this.event()
      }).bind(this))
    },
    event(){
      // console.log('this.click_info');
      // console.log(this.click_info);
      this.$emit('change',this.click_info)
    },
    disposeChart(){
      this.chart.clear()
      this.chart.dispose()
    },
  }
}
</script>
