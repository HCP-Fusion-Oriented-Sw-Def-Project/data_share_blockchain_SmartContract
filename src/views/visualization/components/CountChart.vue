<template>
  <div class="panel-group" :style="{width:width,height:height}"> 
  <div class="card-panel-col" > 
    <div class="card-panel"> 
      <div class="card-panel-icon-wrapper icon-people" @click="bujian_click(0)"> 
        <!-- <el-button size="small" class="iconfont icon-bar_chart card-panel-num" >
        </el-button> -->
        <div>
          <svg-icon icon-class="tianqiao" class-name="card-panel-icon" /> 
        </div>
        <div style="float:left;margin-top: 10px;margin-bottom: 10px">过街天桥</div>
        <div style="font-size: 20px;color:#de503e">
          <count-to :start-val="0" :end-val="tianqiao" :duration="2600" class="card-panel-num" /> 
        </div>
      </div> 
    </div> 
    <div class="card-panel"  @click="bujian_click(1)"> 
      <div class="card-panel-icon-wrapper icon-people"> 
        <div>
          <svg-icon icon-class="gongjiaoche" class-name="card-panel-icon" />
        </div>
        <div style="float:left;margin-top: 10px;margin-bottom: 10px">公交站亭</div>
        <div style="font-size: 20px;color:#fc5a15">
          <count-to :start-val="0" :end-val="gongjiaozhan" :duration="2600" class="card-panel-num" />
        </div>          
      </div> 
      <!-- <div class="card-panel-description"> 
        <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> 
      </div>  -->
    </div>
    <div class="card-panel" @click="bujian_click(2)"> 
      <div class="card-panel-icon-wrapper icon-people"> 
        <div>
          <svg-icon icon-class="lumingpai" class-name="card-panel-icon" />
        </div>
        <div style="float:left;margin-top: 10px;margin-bottom: 10px">&nbsp路名牌</div>
        <div style="font-size: 20px;color:#33CCCC">
          <count-to :start-val="0" :end-val="lupai" :duration="2600" class="card-panel-num" />
        </div>          
      </div> 
      <!-- <div class="card-panel-description"> 
        <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> 
      </div>  -->
    </div>
    <div class="card-panel" @click="bujian_click(3)"> 
      <div class="card-panel-icon-wrapper icon-people"> 
        <div>
          <svg-icon icon-class="tingche" class-name="card-panel-icon" />
        </div>
        <div style="float:left;margin-top: 10px;margin-bottom: 10px">&nbsp停车场</div>
        <div style="font-size: 20px;color:#fc0662">
          <count-to :start-val="0" :end-val="tingchechang" :duration="2600" class="card-panel-num" />
        </div>         
      </div> 
      <!-- <div class="card-panel-description"> 
        <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> 
      </div>  -->
    </div>
    <div class="card-panel" @click="bujian_click(4)"> 
      <div class="card-panel-icon-wrapper icon-people"> 
        <div>
          <svg-icon icon-class="hulan" class-name="card-panel-icon" />
        </div>
        <div style="float:left;margin-top: 10px;margin-bottom: 10px">交通护栏</div>
        <div style="font-size: 20px;color:#8cbb19">
          <count-to :start-val="0" :end-val="hulan" :duration="2600" class="card-panel-num" />
        </div>          
      </div> 
      <!-- <div class="card-panel-description"> 
        <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> 
      </div>  -->
    </div>
    <div class="card-panel" @click="bujian_click(5)"> 
      <div class="card-panel-icon-wrapper icon-people"> 
        <div>
          <svg-icon icon-class="jinggai" class-name="card-panel-icon" />
        </div>
        <div style="float:left;margin-top: 10px;margin-bottom: 10px">&nbsp&nbsp&nbsp井盖</div>
        <div style="font-size: 20px;color:#3ba4fb">
          <count-to :start-val="0" :end-val="jinggai" :duration="2600" class="card-panel-num" />
        </div>          
      </div> 
      <!-- <div class="card-panel-description"> 
        <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> 
      </div>  -->
    </div>
  </div>
  </div>
</template> 

 
<script> 
  import CountTo from 'vue-count-to'
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

   const animationDuration = 6000

export default {
  components: { 
    CountTo 
  }, 
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
    }
  },
  data() {
    return {
      chart: null,
      legend: [],
      dataset: [],
      xAxis:[],
      yAxis:[],
      jinggai:35074,
      hulan:2683,
      lupai:1164,
      tingchechang:3230,
      tianqiao:29,
      gongjiaozhan:608
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
    'value':'initChart'
  },
  methods: {
    dataLine:function(){
  
    },
    bujian_click:function(index){
      // console.log('index')
      // console.log(index)
    },
    initChart() {
      this.xAxis=JSON.parse(JSON.stringify(this.dim))
      this.yAxis=JSON.parse(JSON.stringify(this.value))
      // console.log("计数器呀")
      // console.log(this.value)
      
      if(this.yAxis[0].name != 'eventcnt'){
        this.jinggai=this.yAxis[0].list[0]+this.yAxis[0].list[1]
        this.hulan=this.yAxis[0].list[2]
        this.lupai=this.yAxis[0].list[3]
        this.tingchechang=this.yAxis[0].list[4]
        this.tianqiao=this.yAxis[0].list[5]
        this.gongjiaozhan=this.yAxis[0].list[6]
      }
      // this.colToRow()
      // this.dataLine()
      // this.chart.resize()
    },
    resize() {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      this.__resizeHanlder();
    },
    disposeChart(){

    },
  }
} 
</script> 

 
<style lang="scss" scoped> 
 .panel-group { 
  width: 100%;
  height: 100%;
   /*margin-top: 18px; */
   position: absolute;
   /*top:50%;*/
   /*left: 50%;*/
   /*transform: translate(-50%,-50%);*/
   .card-panel-col{
     /*width: 100%;*/
     /*height: 100%; */
     margin-bottom: 32px; 
   } 
   .card-panel { 
     /*height: 100%; */
     /*width: 100%;*/
     cursor: pointer; 
     font-size: 12px; 
     float:left;
     margin-left: 20px;
     position: relative; 
     overflow: hidden; 
     color: #666; 
     /*background: #fff; */
     /*box-shadow: 4px 4px 40px rgba(0, 0, 0, .05); */
     border-color: rgba(0, 0, 0, .05); 
     &:hover { 
       .card-panel-icon-wrapper { 
         color: #fff; 
       } 
       .icon-people { 
          background: #a4ccce; 
       } 
       .icon-message { 
         background: #36a3f7; 
       } 
       .icon-money { 
         background: #f4516c; 
       } 
       .icon-shopping { 
         background: #34bfa3 
       } 
     } 
     .icon-people {
       font-weight: bold; 
       /*color: #a4ccce; */
       color: #fff
     } 
     .icon-message { 
       color: #36a3f7; 
     } 
     .icon-money { 
       color: #f4516c; 
     } 
     .icon-shopping { 
       color: #34bfa3 
     } 
     .card-panel-icon-wrapper { 
       float: left; 
       margin: 14px 0 0 14px; 
       padding: 16px; 
       transition: all 0.38s ease-out; 
       border-radius: 6px; 
     } 
     .card-panel-icon {
       /*position: relative; */
       float: left; 
       font-size: 48px; 
     } 
     .card-panel-description { 
       float: left; 
       font-weight: bold; 
       margin: 26px; 
       margin-left: 20px; 
       .card-panel-text { 
         line-height: 18px; 
         color: rgba(0, 0, 0, 0.45); 
         font-size: 16px; 
         margin-bottom: 12px; 
       } 
       .card-panel-num { 
         font-size: 20px; 
       } 
     } 
   } 
 } 
</style> 