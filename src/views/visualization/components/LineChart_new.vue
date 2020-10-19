<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
require('echarts/theme/dark')
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
      default:'line'
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
    option: {
      type: Object,
      default:() => []
    },
  },
  data() {
    return {
      chart: null,
      legend: [],
      dataset: [],
      xAxis:[],
      yAxis:[],

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
    'parentHeight':'initChart',
    'option':'initChart'
  },
  methods: {
    // colToRow:function(){
    //   var list = []
    //   var title = []
    //   for(var i=0;i<this.xAxis.length;i++){
    //     title.push(this.xAxis[i].name)
    //   }
    //   for(var i=0;i<this.yAxis.length;i++){
    //     title.push(this.yAxis[i].name)
    //   }
    //   // for(var i=0;i<this.listY.length;i++){
    //   //   title.push(this.listY[i].colName)
    //   // }
    //   if(this.xAxis.length!==0){
    //     if(this.xAxis[0].list instanceof Array)
    //       var length = this.xAxis[0].list.length
    //     else
    //       var length = this.xAxis[0].list.split(',').length
    //     for(var i =0;i<length;i++){
    //       var obj=new Object;
    //       for(var j=0;j<title.length;j++){
    //         obj[title[i]]=''
    //       }
    //       list.push(obj)
    //     }
    //   }
    //   else if(this.yAxis.length!=0){
    //       if(this.yAxis[0].list instanceof Array)
    //         var length = this.yAxis[0].list.length
    //       else
    //         var length = this.yAxis[0].list.split(',').length
    //       for(var i =0;i<length;i++){
    //         var obj=new Object;
    //         for(var j=0;j<title.length;j++){
    //           obj[title[i]]=''
    //         }
    //         list.push(obj)
    //       }
    //   }
    //   // else if(this.listY.length!=0){
    //   //     if(this.listY[0].colData instanceof Array)
    //   //       var length = this.listY[0].colData.length
    //   //     else
    //   //       var length = this.listY[0].colData.split(',').length
    //   //     for(var i =0;i<length;i++){
    //   //       var obj=new Object;
    //   //       for(var j=0;j<title.length;j++){
    //   //         obj[title[i]]=''
    //   //       }
    //   //       list.push(obj)
    //   //     }
    //   //   }    
      
    //   for(let i = 0;i<this.xAxis.length;i++){
    //     var colName = this.xAxis[i].name
    //     if(this.xAxis[i].list instanceof Array)
    //       var colData = this.xAxis[i].list
    //     else
    //       var colData = this.xAxis[i].list.split(',')
    //     for(let j=0;j<colData.length;j++){
    //       list[j][colName] = colData[j]
    //     }
    //   } 
    //   for(let i = 0;i<this.yAxis.length;i++){
    //     var colName = this.yAxis[i].name
    //     if(this.yAxis[i].list instanceof Array)
    //       var colData = this.yAxis[i].list
    //     else
    //       var colData = this.yAxis[i].list.split(',')
    //     for(let j=0;j<colData.length;j++){
    //       list[j][colName] = colData[j]
    //     }    
    //   }
    //   // for(let i = 0;i<this.listY.length;i++){
    //   //   var colName = this.listY[i].colName
    //   //   if(this.listY[i].colData instanceof Array)
    //   //     var colData = this.listY[i].colData
    //   //   else
    //   //     var colData = this.listY[i].colData.split(',')
    //   //   for(let j=0;j<colData.length;j++){
    //   //     list[j][colName] = colData[j]
    //   //   }    
    //   // }
    //   var objList = new Object
    //   objList.title = title
    //   objList.list = list
    //   this.columnList = objList
    //   console.log("横向表格")
    //   console.log(this.columnList.list)
    // },
    dataLine:function(){
      console.log(this.columnList)
      this.legend=[]
      if(this.xAxis.length==1){
        //维度去重
        for(var i=0;i<this.xAxis.length;i++){
          var indicator=[]
          for(var j=0;j<this.xAxis[i].list.length;j++){
            console.log(this.xAxis[0].list[4] == this.xAxis[0].list[5])
            console.log(encodeURIComponent(this.xAxis[0].list[4]))
            console.log(encodeURIComponent(this.xAxis[0].list[5]))
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
          obj.data = arry
          arr.push(obj) 
        }
        this.dataset=arr
        //数值标签
        for(let i=0;i<this.yAxis.length;i++){
          this.legend.push(this.yAxis[i].name)
        }
      }
      if(this.xAxis.length==2){
        //维度聚合
        var indicator1=[]
        var indicator2=[]
        for(let i=0;i<indicator1.length;i++){
          var dimArr=[]
          for(let k=0;k<this.columnList.list.length;k++){
            if(this.columnList.list[k][this.dims[0].name] == indicator1[i]){
              if(dimArr.indexOf(this.dims[1].list[k])== -1)
                dimArr.push(this.dims[1].list[k]);
            }
          }
          for(let k=0;k<dimArr.length;k++){
            var arr=[]
            arr.push(indicator1[i])
            arr.push(dimArr[k])
            indicator2.push(arr)
          } 
        }
        for(let i=0;i<this.yAxis.length;i++){
          for(let j=0;j<indicator2.length;j++){
            for(let k=0;k<this.columnList.list.length;k++){
              var value = 0
              if(this.columnList.list[k][this.dims[0].name] == indicator2[j][0] && 
                 this.columnList.list[k][this.dims[1].name] == indicator2[j][1])
                value+=Number(this.columnList.list[k][this.yAxis[i].name])
            }
            arr.push(value)       
          }
          var obj = new Object
          obj.name = this.xAxis[0].name+""
          obj.type = this.type
          obj.data = arry
          arr.push(obj) 
        }
      }

      // }
    },
    initChart() {
      this.xAxis=JSON.parse(JSON.stringify(this.dim))
      this.yAxis=JSON.parse(JSON.stringify(this.value))
      // this.colToRow()
      // this.dataLine()
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      console.log("test----------------info------测试")
      console.log(this.option)
      this.chart.setOption({
        textStyle:{
          fontFamily: this.option.styleForm.font
        },
        title: {
          text: this.option.titleForm.name,
          textStyle:{
            color:this.option.titleForm.color,
            fontWeight:this.option.titleForm.fontWeight,
            fontSize:this.option.titleForm.fontSize,
          }
        },
        tooltip: {
          trigger:this.option.tooltipForm.trigger,
          triggerOn:this.option.tooltipForm.triggerOn,
          hideDelay:this.option.tooltipForm.hideDelay,
          backgroundColor:this.option.tooltipForm.background.color,
            // width:,
            // height:, 
          padding:this.option.tooltipForm.background.padding,
          borderColor:this.option.tooltipForm.background.borderColor,
          borderWidth:this.option.tooltipForm.background.borderWidth,
          textStyle: {
            fontFamily:this.option.tooltipForm.text.font,
            fontSize:this.option.tooltipForm.text.fontSize,
            color:this.option.tooltipForm.text.color,
            fontWeight:this.option.tooltipForm.text.fontWeight
          }
        },
        grid: {
          left: this.option.styleForm.margin_left+'%',
          right: this.option.styleForm.margin_right+'%',
          bottom: this.option.styleForm.margin_bottom+'%',
          top: this.option.styleForm.margin_top+'%',
          containLabel: true
        },
        legend: {
          // data:this.legend,
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
          textStyle:{
            color:this.option.legendForm.text.color,
            fontSize:this.option.legendForm.text.fontSize,
            fontWeight:this.option.legendForm.text.fontWeight,
            padding:[this.option.legendForm.layout.margin_tb,this.option.legendForm.layout.margin_lr]
          },
          top:this.option.legendForm.layout.location,
          // left:'middle'
          // bottom:,
          // left:,
          // right:
        },
        toolbox: {
          show:this.toolbox,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          // name:'123',
          type: 'category',
          data: ['周一','周二','周三','周四','周五','周六','周日'],
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel:{
            show:true,
            color:this.option.xAxisForm.color,
            fontWeight:this.option.xAxisForm.fontWeight,
            fontSize:this.option.xAxisForm.fontSize,
            rotate:this.option.xAxisForm.rotate,           
          },
          axisLine:{
            lineStyle:{
              color:this.option.xAxisForm.axisColor
            }
          },
          splitLine:{
            show:true,
            linechart:{
              color: this.option.xAxisForm.gridColor
            }
          },
          boundaryGap:this.option.xAxisForm.boundaryGapCheck,
          min:this.option.xAxisForm.min,
          max:this.option.xAxisForm.max,
          offset:this.option.xAxisForm.offset,
        },
        yAxis: {
          type: 'value',
          axisLabel:{
            show:true,
            color:this.option.yAxisForm.color,
            fontWeight:this.option.yAxisForm.fontWeight,
            fontSize:this.option.yAxisForm.fontSize,
            rotate:this.option.yAxisForm.rotate,           
          },
          axisLine:{
            lineStyle:{
              color:this.option.yAxisForm.axisColor
            }
          },
          splitLine:{
            show:true,
            linechart:{
              color: this.option.yAxisForm.gridColor
            }
          },
          boundaryGap:this.option.yAxisForm.boundaryGapCheck,
          min:this.option.yAxisForm.min,
          max:this.option.yAxisForm.max,
          offset:this.option.yAxisForm.offset,
        },
        series: [ {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }]
      })
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
      //       data:this.legend
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
      //       data: this.xAxis[0].list
      //     },
      //     yAxis: {
      //       type: 'value'
      //     },
      //     series:this.dataset
      //   }),5000)
      this.chart.resize()
    },
    disposeChart(){
      this.chart.clear()
      this.chart.dispose()
    },
  }
}
</script>
