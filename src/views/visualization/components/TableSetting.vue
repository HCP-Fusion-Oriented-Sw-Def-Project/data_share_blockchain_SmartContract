<template>
  <div>
    <div class="title">
      <label >更改数据类型</label>
    </div>
    <div class="info_div" >
        <label class="infor">列名</label>
        <el-cascader
          v-model="thisfile"
          :options="getOptions"
          :props="props"
          placeholder="请选择"
          :show-all-levels="false"
          filterable size="small"
          @change="changeSelected"
        ></el-cascader>
    </div>
    <div class="info_div">
      <label class="infor">类型</label>
      <el-select v-model="thistype" placeholder="请选择" size="small">
        <el-option
          v-for="item in type"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="info_div">
      <el-button  size="mini" type="primary" @click="changetype">确定</el-button>
    </div>
  </div>
</template>
<script  type="text/javascript">
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
//import func from '../../../../vue-temp/vue-editor-bridge';
//import func from "../../../../vue-temp/vue-editor-bridge";
export default {
  props: {
    files: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      props: {
        multiple: false,
        expandTrigger: "hover"
       },
      thisfile: [], //选中文件的value路径
      thistype: "", //选中文件的类型
      thisNodePath:[],
      options:[],
      type: [
          { value: "category", label: "文本" },
          { value: "value", label: "数值" },
          { value: "time", label: "时间" }
        ]
    };
  },
  mounted() {
    this.setfileList();
  },
  computed:{
    getOptions() {
        this.options = [];
        for(let fileId in this.files){
          let children = [];
          for(let columnId in this.files[fileId].dataList) {
            let dataList = this.files[fileId].dataList
            let column =  dataList[columnId];
            children.push({
              label: column.name,
              value: columnId,
              type:column.type
            });
          }
          this.options.push({
            label: this.files[fileId].fileName,
            value: fileId,
            children: children
          });
        }
        return this.options
      }
  },
  methods: {
    setfileList: function() {
      this.$emit("changeFile", this.files);
    },
    //点击确定按钮，更新选中列的type, 把option传出去
    changetype: function() {
      if(this.thisfile.length ===2)
      { let i= this.thisfile[0];
        let j = this.thisfile[1];
        // this.files[i].dataList[j].type = this.thistype;

        let regex = /\d{4}-\d{1,2}-\d{1,2}/;
        let regex1 = /\d+\.?\d+|\d+/
        if(this.thistype === "value"){
            if(regex1.exec(this.files[i].dataList[j].list[0])!=null && regex1.exec(this.files[i].dataList[j].list[0])[0] === this.files[i].dataList[j].list[0]) {
                this.files[i].dataList[j].list = this.files[i].dataList[j].list.map(Number)
                this.files[i].dataList[j].type = this.thistype;
            }else{
                this.$notify.error({
                    title: '错误',
                    message: '非数值类型'
                });
                return
            }
        }else if(this.thistype === "category"){
            this.files[i].dataList[j].list = this.files[i].dataList[j].list.map(String)
            this.files[i].dataList[j].type = this.thistype;
        }else if(this.thistype === "time"){
            if(regex.exec(this.files[i].dataList[j].list[0]) != null) {
                this.files[i].dataList[j].type = this.thistype;
            }else{
                this.$notify.error({
                    title: '错误',
                    message: '非时间类型'
                });
                return
            }
        }
        // console.log("changetype")
        // console.log(this.files[i])
        this.setfileList();
        this.$notify({
            title: '成功',
            message: '数据类型修改成功！',
            type: 'success'
          });
        }
        else{
          this.$notify.error({
          title: '错误',
          message: '请输入数据'
        });
        }
    },
    //列数据发生变化，自动改变选择器2的绑定内容
    changeSelected: function() {
      for(let i=0;i<this.options.length;i++){
        if(this.options[i].value == this.thisfile[0]){//找到第一层
          for(let j=0;j<this.options[i].children.length;j++){
            if(this.options[i].children[j].value == this.thisfile[1]){//找到当前节点
              this.thistype = this.options[i].children[j].type;
            }
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.title{
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight:bold;
  color:#409eff;
}
.infor{
  font-size: 14px;
  font-weight: normal;
  margin-right: 10px;
}
.info_div{
  width: 100%;
  margin: 20px auto 10px auto;
  text-align: center;
}
.info_div button{
  width: 30%;
}
</style>
