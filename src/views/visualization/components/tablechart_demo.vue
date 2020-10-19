<template>
  <div :class="className" id="id" :style="{height:height,width:width}">
    <div style="width:100%;height: 500px;background-color: transparent;">
      <el-table ref="table" :data="colList" :height="tHeight" align="center" style="background-color: transparent;">
        <el-table-column align="center" v-for="(item, index) in colTitle" :key="index"  :label="item" :prop="item" :height="10">
        </el-table-column>
        <el-table-column label="操作" align="center" :height="10">
          <template slot-scope="scope">
            <el-button v-show="button1_show" style="color:#001528" size="small" @click="handlejump(scope.row)" >追踪位置</el-button>
            <el-button v-show="button2_show" style="color:#001528" size="small" @click="anjian_handlejump(scope.row)" >追踪位置</el-button>
          </template>
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
    thiscomponet:{
      type:String,
      default:''
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
    columnList:{
      type:Object,
      default:{}
    },
    id:{
      type:Number,
      default:0
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
      company:'',
      isjinggai:false,
      button1_show:false,
      button2_show:false,
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
        if(this.thiscomponet == "bujian"){
          this.button1_show = true
          this.button2_show = false
        }else{
          this.button2_show = true
          this.button1_show = false
        }
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
      anjian_handlejump:function(row){
        // console.log('row2')
        // console.log(row)
         this.isjinggai = true
        this.$emit('companypoint',{company:row.位置信息,jiedao:row.所属街道,isjinggai:this.isjinggai})
        
      },
      handlejump:function(row){
        // console.log('row')
        // console.log(row)
         this.isjinggai = true
        // this.isjianggai = true
        // this.company = row.所属单位
        this.$emit('companypoint',{company:row.所属单位,jiedao:row.所属街道,isjinggai:this.isjinggai})
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
          this.colList = this.columnList.list;
          this.colTitle = title;
          if(this.id == 6){
            this.colTitle = ['部件名称','损坏情况','所属街道','所属单位']
          }
          else if(this.id == 7)
          {
            this.colTitle = ['所属类别','损坏情况','所属街道','位置信息']
          }
          // console.log('this.colTitle');
          // console.log(this.colTitle);
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
