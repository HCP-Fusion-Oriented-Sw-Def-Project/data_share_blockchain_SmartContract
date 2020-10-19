<template>
  <div :class="className" id="id" :style="{height:height,width:width}">
    <div style="width:100%;height: 100%;background-color: transparent;">
      <el-table ref="table" :data="colList" :height="tHeight" align="center" style="background-color: transparent;">
        <el-table-column align="center" v-for="(item, index) in colTitle" :key="index"  :label="item" :prop="item" :height="10">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'

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
      default: '820px'
    },
    tableHeight:{
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
    valueY: {
      type: Array,
      default:() => []
    },
    type: {
      type:String,
      default:'table'
    },
    from:{
      type:String,
      default:null
    }
  },
  data() {
    return {
      colList: [],
      colTitle: [],
      tHeight:"100%",
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHanlder)
  },
  watch:{
    // 'columnList':'initChart',
    'tableHeight':'init',
      dim: {
        handler(nval){
            this.init();
        },
          deep: true
      },
      value: {
          handler(nval){
              this.init();
          },
          deep: true
      },
      valueY: {
          handler(nval){
              this.init();
          },
          deep: true
      }
  },
  methods: {
      init() {
          this.colToRow();
          if (this.from != null) {
              if (this.from == "multi")
                  this.tHeight = this.tableHeight * 60
              else if (this.from == "multiDemo") {
                  this.tHeight = this.tableHeight
              }
          }

          // this.tableHeight=document.getElementById("id").offsetHeight
      },
      //列转换为对象数组（由列数据转换成行数据）
      colToRow: function () {
          this.colTitle = [];
          this.colList = [];
          let list = [];
          let title = [];
          for (let i = 0; i < this.dim.length; i++) {
              title.push(this.dim[i].name);
          }
          for (let i = 0; i < this.value.length; i++) {
              title.push(this.value[i].name);
          }
          for (let i = 0; i < this.valueY.length; i++) {
              title.push(this.valueY[i].name);
          }
          let length = 0;
          if (this.dim.length !== 0) {
              length = this.dim[0].list.length;
          } else if(this.value.length !== 0){
              length = this.value[0].list.length;
          }
          for (let i = 0; i < length; i++) {
              let obj = new Object;
              for (let j = 0; j < this.dim.length; j++) {
                  this.$set(obj, title[j], this.dim[j].list[i]);
              }
              for (let j = 0; j < this.value.length; j++) {
                  this.$set(obj, title[j + this.dim.length], this.value[j].list[i]);
              }
              for (let j = 0; j < this.valueY.length; j++) {
                  this.$set(obj, title[j + this.dim.length + this.value.length], this.valueY[j].list[i]);
              }
              list.push(obj);
          }
          this.colList = list;
          this.colTitle = title;
          // console.log(this.colList);
      },
      resize(){
      }
  }
}
</script>

<style type="text/css">

  .el-table th, .el-table tr,.el-table td{
    border: 0.5;
 }
 .el-dialog__title {color: white}
</style>
