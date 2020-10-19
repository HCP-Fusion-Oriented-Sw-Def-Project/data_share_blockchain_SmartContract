<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import dataTool from 'echarts/extension/dataTool'
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
      default:'treemap'
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
      legend: [],
      myOption: {}
    }
  },
  mounted() {
    this.initChart();
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
      option: {
          handler(nval, oval) {
              //this.myChart.clear();
              //因为option由子组件传递过来的，所以初始化时，dim和value在option之前，需要在option第一次到达时将dim和value装载到option中
              this.myOption = nval;
              if (this.myOption.series[0].data.length === 0){

                  this.updateData();
              }
              this.chart.setOption(this.myOption, true);
          },
          deep: true
      },
      dim: {
          handler(nval, oval) {
              this.updateData();
          },
          deep: true
      },
      value: {
          //为option.xAxis装载数据
          handler(nval, oval) {
              //为option.series，option.yAxis和option.legend装载数据
              this.updateData();
          },
          deep: true
      }
    },
  methods: {
    dataTreemap:function(){
        let ylist = [];

        let leafNodes = [];
        //从叶子节点开始构造
        for (let rowIndex=0; rowIndex<this.yAxis[0].list.length; ++rowIndex) {
            leafNodes.push({
                name: this.xAxis[this.xAxis.length-1].list[rowIndex],
                value: this.yAxis[0].list[rowIndex]
            });
        }
        // console.log(leafNodes);

        //构造父节点
        let proNodes = leafNodes;
        for (let colIndex=this.xAxis.length-2; colIndex>=0; --colIndex) {
            let newNodes = [];
            for (let rowIndex=0; rowIndex<this.xAxis[colIndex].list.length; ++rowIndex) {
                // console.log(colIndex, rowIndex);
                let nodeIndex = 0;
                for(; nodeIndex<newNodes.length; nodeIndex++){
                    if(newNodes[nodeIndex].name === this.xAxis[colIndex].list[rowIndex]){
                        break;
                    }
                }
                // console.log(nodeIndex);
                if(nodeIndex === newNodes.length){
                    for(let proData of proNodes){
                        if(proData.name === this.xAxis[colIndex+1].list[rowIndex]){
                            // console.log("创建新节点", rowIndex);
                            // console.log(rowIndex);
                            newNodes.push({
                                name: this.xAxis[colIndex].list[rowIndex],
                                value: proData.value,
                                children: [proData]
                            });
                            // console.log(newNodes[newNodes.length-1].name);
                            // console.log(newNodes[newNodes.length-1].value);
                            break;
                        }
                    }
                }else{
                    let index = 0;
                    for(;index<newNodes[nodeIndex].children.length; index++){
                        if(newNodes[nodeIndex].children[index].name === this.xAxis[colIndex+1].list[rowIndex]){
                            break;
                        }
                    }
                    // console.log(index);
                    if(index === newNodes[nodeIndex].children.length){
                        // if(!newNodes[nodeIndex].children.some(({name})=>name === this.xAxis[colIndex+1].list[rowIndex])){
                        for(let proData of proNodes){
                            if(proData.name === this.xAxis[colIndex+1].list[rowIndex]){
                                // console.log("加入数据", rowIndex);
                                newNodes[nodeIndex].value += proData.value;
                                newNodes[nodeIndex].children.push(proData);
                                // console.log(newNodes[nodeIndex].name);
                                // console.log(newNodes[nodeIndex].value);
                                break;
                            }
                        }
                    }
                }
            }
            proNodes = newNodes;
            if(colIndex === 0){
                ylist = newNodes;
            }
        }
        // console.log(ylist);
        this.yAxis[0].list = ylist;

        //对x单个去重
        // for(var i=0;i<this.xAxis.length;i++){
        //   var indicator=[];
        //   for(var j=0;j<this.xAxis[i].list.length;j++){
        //     if(indicator.indexOf(this.xAxis[i].list[j])== -1){
        //         indicator.push(this.xAxis[i].list[j]);
        //     }
        //   }
        //   this.xAxis[i].list=indicator;
        // }

        //表示去重后的x[0]
        // let indicator= {};
        // indicator.list = [];
        // indicator.name = this.xAxis[0].name;
        // for(var j=0;j<this.xAxis[0].list.length;j++){
        //     if(indicator.list.indexOf(this.xAxis[0].list[j])== -1){
        //         indicator.list.push(this.xAxis[0].list[j]);
        //     }
        // }
        //
        // for(let i=0; i < indicator.list.length ; i++){
        //     let arr=[];
        //     let xlist = [];
        //     for(let j=0;j<this.xAxis[0].list.length; j++){
        //         if(this.xAxis[0].list[j]===indicator.list[i]){
        //             if(arr.indexOf(this.xAxis[1].list[j])=== -1){
        //                 arr.push(this.xAxis[1].list[j]);
        //                 let obj = {};
        //                 obj.name = this.xAxis[1].list[j];
        //                 obj.value = 0;
        //                 xlist.push(obj);
        //             }
        //         }
        //     }
        //     for(let j=0; j < xlist.length; j++){
        //         for(let k=0; k < this.xAxis[1].list.length; k++){
        //             if(this.xAxis[0].list[k]===indicator.list[i] && this.xAxis[1].list[k]===xlist[j].name)
        //                 xlist[j].value+=this.yAxis[0].list[k];
        //         }
        //     }
        //     let obj = new Object
        //     obj.name = this.xAxis[0].list[i];
        //     obj.children = xlist;
        //     ylist.push(obj);
        // }
        // this.xAxis[0].list = indicator;
        // this.yAxis[0].list = ylist;
    },
      updateData: function(){
          this.xAxis=JSON.parse(JSON.stringify(this.dim));
          this.yAxis=JSON.parse(JSON.stringify(this.value));
          this.dataTreemap();
          this.myOption.series[0].data = this.yAxis[0].list;
          this.$emit('change', this.myOption);
      },
    initChart() {

      // if(flag != "preInit"){
        //this.dataTreemap() //数据处理部分
      // }


      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.clear()
      // this.chart.setOption({
      //   toolbox: {
      //     show:this.toolbox,
      //      feature: {
      //       saveAsImage: {}
      //     }
      //   },
      //   series: [{
      //     type: 'treemap',
      //     // highlightPolicy: 'ancestor',
      //     data: this.yAxis[0].list,
      //   }]
      // })
      this.chart.setOption(this.myOption);
      this.updateData();
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
