<template>
  <div class="board-column" style="margin-left:16px;">
    <div class="board-column-header">
      MySQL
    </div>
    <!-- <div v-for="f in files" style="margin-top:20px"> -->
      <el-row>
      <i class="el-icon-plus" style="float: left;" @click="showif"></i>
      <span style="float:left;font-size: 14px">MySQL</span>
      </el-row>
      <el-row>
        <draggable
          class="board-column-content"
          :list="files"
          :options="options" v-show="vshow">
          <div v-for="element in files" :key="element.id" style="width:120px">
            <li  v-if="element.type=='数值'" class="el-icon-xy-shuzhi" style="float:left; font-size: 1px"></li>
            <li  v-if="element.type=='文本'" class="el-icon-xy-wenben" style="float:left; font-size: 1px"></li>
            <li  v-if="element.type=='日期'" class="el-icon-xy-riqi" style="float:left; font-size: 1px"></li>
            <div class="board-item" style="width: 120px">
              {{element.colName}} 
            </div>
          </div>
        </draggable>
      </el-row>
<!--     </div> -->
  </div>
</template>
<script>
import draggable from 'vuedraggable'

// const dataComponent = Vue.extend({
//   props: ['text'],
//   template: '<span v-show="show">{{filename}}</span>\
//       <draggable\
//         class="board-column-content"\
//         :list="list"\
//         :options="options" v-show="show">\
//         <div class="board-item" v-for="element in list" :key="element.id" >\
//         {{element.lable}} \
//         </div>\
//       </draggable>'
// })
export default {
  name: 'dragKanban-demo',
  components: {
    draggable
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    // list: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    // show: {
    //   type:String,
    //   default:false
    // },
    files:{
      type:Array,
      default() {
        return []
      }
    },
    // filename:{
    //   type:String,
    //   default:''
    // }
  },
  data(){
     return{
      vshow:true
     }
  },
  methods:{
    showif(){
      this.vshow = !this.vshow 
    }
  }
}
</script>
<style lang="scss">
.board-column {
  min-width: 100px;
  min-height: 10px;
  height: auto;
  overflow: hidden;
/*  background: #FAEBD7;*/
  border-radius: 3px;


  .board-column-header {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    padding: 0 0px;
    text-align: center;
    background:#EBEEF5;
    color: #000;
    border-width: 2px;
    border-color: #C0C0C0;
    border-radius: 5px 5px 5px 5px;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 30px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
/*    color:#E6A23C;*/

    .board-item {
      cursor: pointer;
      width: 80px;
      height: 20px;
      margin: 2px 0;
      background-color: #fff;
      font-size: 10px;
      text-align: center;
      line-height: 20px;
      padding: 2px 6px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
      border-radius: 3px 3px 3px 3px
    }
  }
}
</style>



