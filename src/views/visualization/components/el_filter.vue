<template>
  <div>
    <el-row>
      <span>筛选器</span>
      <el-tooltip class="item" effect="dark" content="添加筛选项" placement="top">
        <el-button class="icon_add" plain icon="el-icon-plus" size="mini" @click="handleAdd()" circle>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="取消筛选" placement="top">
        <el-button class="icon_add" :disabled="filterList.length===0" plain icon="el-icon-close" size="mini" @click="cancellFilter()" circle>
        </el-button>
      </el-tooltip>
    </el-row>
    <el-row v-for="(item,index) in filterList">
      <el-card class="box-card" >
        <div slot="header">
          <span>{{item.fileName}}</span>
          <span>{{item.columnName}}</span>
          <el-dropdown trigger="click">
            <i class="el-icon-more">
            </i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleEdit(item)">编辑</el-dropdown-item>
              <el-dropdown-item @click.native="delTemp(item,index)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-row>
          <span>{{item.filterAll}}:</span>
        </el-row>
        <el-row v-for="filter in item.filterItem" class="text item">
          <el-tag size="small">{{item.columnName}}</el-tag>
          <el-tag size="small">{{filter.label}}</el-tag>
          <el-tag size="small" v-if="filter.text !== null">{{filter.text}}</el-tag>
        </el-row>
      </el-card>
    </el-row>
    <el-dialog title="添加筛选项" :visible.sync="dialogVisible" width="35%" height="60%" :before-close="handleClose">
      <el-row>
        <span>请选择文件</span>
        <el-select v-model="temp.fileId" :disabled="dialogType==='edit'" placeholder="请选择" size="small">
          <el-option
            v-for="item in getFilesIdAndName"
            :key="item.fileId"
            :label="item.fileName"
            :value="item.fileId">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <span>请选择列名</span>
        <el-select v-model="temp.columnId" :disabled="dialogType==='edit'" placeholder="请选择" size="small" >
          <el-option
            v-for="item in getSelectedFileColumnIdAndName"
            :key="item.columnId"
            :label="item.columnName"
            :value="item.columnId">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <h3 >筛选条件</h3>
      </el-row>
      <div class="selectArea" v-if="temp.columnType === 'value'">
        <el-row class="valueSelect" :gutter="10">
          <el-col :span="8">
            <el-select v-model="value1" size="small" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <div v-if="value1==='选项7'">
            <el-input-number v-model="num1" placeholder="请输入数值" size="small">
            </el-input-number>~
            <el-input-number  v-model="num2" placeholder="请输入数值" size="small">
            </el-input-number>
          </div>
          <el-input-number v-else-if="value1==='选项8' || value1==='选项9'"  :disabled="true" v-model="num3" placeholder="请输入数值" size="small">
          </el-input-number>
          <el-input-number v-else  v-model="num" placeholder="请输入数值" size="small" >
          </el-input-number>
        </el-row>
      </div>
      <div class="selectArea" v-else>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-select v-model="value2" placeholder="请选择条件" size="small">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-if="value2==='选项7' || value2==='选项8'" :disabled="true" placeholder="请选择条件" size="small">
            </el-input>
            <el-input v-else v-model="text" placeholder="请输入条件" size="small">
            </el-input>
          </el-col>
          <el-col :span="8">
            <i class="el-icon-circle-plus" @click="add(value2)">
            </i>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="this.temp.filterItem.length >= 2">
          <el-col :span="8">
            <el-select v-model="value3" placeholder="请选择条件" size="small">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <ul class="textItemList">
            <li v-for="(item, index) in temp.filterItem">
              <span>{{temp.columnName}}</span>
              <span>{{item.label}}</span>
              <span>{{item.text}}</span>
              <span>
                <i class="el-icon-remove-outline" @click="temp.filterItem.splice(index,1)">
                </i>
              </span>
            </li>
          </ul>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="filterCol">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  props:{
    files:{
      type: Object,
      default:{},
    },
    addFilterList:{
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogType: 'create',
      temp:{
        fileId: '',
        fileName: '',
        columnId:'',
        columnName:'',
        columnType: '',
        filterIndex: [],
        filterItem: [],
        filterAll: ''
      },
      filterList: this.addFilterList,

      num: 0,
      num1: 0,
      num2: 0,
      num3: 0,
      text: '',
      options1: [
        {
          value: '选项1',
          label: '等于'
        },
        {
          value: '选项2',
          label: '不等于'
        },
        {
          value: '选项3',
          label: '大于'
        },
        {
          value: '选项4',
          label: '小于'
        },
        {
          value: '选项5',
          label: '大于等于'
        },
        {
          value: '选项6',
          label: '小于等于'
        },
        {
          value: '选项7',
          label: '区间'
        },
        {
          value: '选项8',
          label: '不为空'
        },
        {
          value: '选项9',
          label: '为空'
        }
      ],
      value1: '选项7',
      options2: [
        {
          value: '选项1',
          label: '等于'
        },
        {
          value: '选项2',
          label: '不等于'
        },
        {
          value: '选项3',
          label: '包含'
        },
        {
          value: '选项4',
          label: '不包含'
        },
        {
          value: '选项5',
          label: '开头包含'
        },
        {
          value: '选项6',
          label: '结尾包含'
        },
        {
          value: '选项7',
          label: '不为空'
        },
        {
          value: '选项8',
          label: '为空'
        },
      ],
      value2: '',
      options3: [
        {
          value: '选项1',
          label: '满足任1条件'
        },
        {
          value: '选项2',
          label: '满足所有条件'
        }
      ],
      value3: ''
    }
  },
  created() {
    if(this.filterList.length !== 0){
      let filterIndexAll = []
      for(let index=0; index < this.filterList.length; index++){
        filterIndexAll = filterIndexAll.concat(this.filterList[index].filterIndex.filter(function (v) {
          return !(filterIndexAll.indexOf(v) > -1)
        }))
      }
      let newFiles = JSON.parse(JSON.stringify(this.files));
      newFiles = this.filterAllColumn(filterIndexAll, newFiles, this.filterList[0].fileId)
      this.changeFiles(newFiles);
    }else if(this.filterList.length === 0) {
      this.changeFiles(this.files);
    }
  },
  mounted() {
    // this.changeFiles(this.files);
  },
  computed: {
    getFilesIdAndName() {
      let filesIdAndName = [];
      for (let fileId in this.files) {
          filesIdAndName.push({
              fileId: fileId,
              fileName: this.files[fileId].fileInfo.fileName
          })
      }
      return filesIdAndName;
    },
    getSelectedFileColumnIdAndName() {
        let selectedFileColumnIdAndName = [];
        let file = this.files[this.temp.fileId];
        if (file!==undefined && file!==null) {
            for (let columnId in file.dataList) {
                selectedFileColumnIdAndName.push({
                    columnId: columnId,
                    columnName: file.dataList[columnId].name
                })
            }
        }
        return selectedFileColumnIdAndName;
    }
  },
  methods: {
    handleAdd(){
      this.dialogVisible = true
      this.dialogType = 'create'
      this.resetTemp()
      this.resetValue()
    },
    handleEdit(item) {
      this.dialogVisible = true;
      this.dialogType = 'edit';
      this.temp = JSON.parse(JSON.stringify(item))
      this.resetValue()
      if(this.temp.columnType === 'value'){
        if(this.temp.filterItem[0].value === '选项7'){
          this.num1 = this.temp.filterItem[0].text[0]
          this.num2 = this.temp.filterItem[0].text[1]
        }else if(this.temp.filterItem[0].value === '选项8' || this.temp.filterItem[0].value === '选项9'){
          this.num3 = 0
        }else{
          this.num = this.temp.filterItem[0].text
        }
        this.value1 = this.temp.filterItem[0].value
      }else{
        if(this.temp.filterItem.length >= 2){
          this.value3 = this.temp.filterAll
        }
      }
    },
    delTemp(item,index){
      this.dialogType = 'null'
      this.filterList.splice(index,1);
      this.resetTemp()
      this.temp.fileId = JSON.parse(JSON.stringify(item)).fileId
      this.filterIndexUnion()
      // console.log('delTemp')
      // console.log(this.filterList)
    },
    resetTemp() {
      this.temp = {
        fileId: '',
        fileName: '',
        columnId: '',
        columnName: '',
        columnType: '',
        filterIndex: [],
        filterItem: [],
        filterAll: ''
      }
    },
    resetValue(){
      this.num = 0
      this.num1 = 0
      this.num2 = 0
      this.num3 = 0
      this.text =''
      this.value1 = '选项7'
      this.value2 = ''
      this.value3 = ''
    },
    cancellFilter() {
      this.filterList = []
      this.changeFiles(JSON.parse(JSON.stringify(this.files, this.filterList)))
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getCurrentColumn() {
        return this.files[this.temp.fileId].dataList[this.temp.columnId];
    },
    getCurrentFile() {
        return this.files[this.temp.fileId];
    },
    getFilterRowIndex(column, filterMethod) {
        let filterIndex = [];
        for (let i=0; i<column.length; ++i) {
            if (!filterMethod(column[i])) {
              filterIndex.push(i);
            }
        }
        return filterIndex
    },
    filterAllColumn(filterIndex, newFiles, fileId) {
      //方法一：改变了传入的files
      // for (let key in this.getCurrentFile().dataList) {
      //     //PS：根据索引删除元素，使用了hadDeletedElementNum来适应删除后变化的数组
      //       let hadDeletedElementNum = 0;
      //       for (let index of filterRowIndex) {
      //           this.getCurrentFile().dataList[key].list.splice(index-hadDeletedElementNum, 1);
      //           ++hadDeletedElementNum;
      //       }
      // }
      //方法二： 建一个新的对象存放过滤后的files
      filterIndex.sort(function (a, b) {
        return a-b
      })
      // console.log(filterIndex)
      if (filterIndex.length > 0) {
          for (let key in newFiles[fileId].dataList) {
              //PS：根据索引删除元素，使用了hadDeletedElementNum来适应删除后变化的数组
              let hadDeletedElementNum = 0;
              for (let index of filterIndex) {
                  newFiles[fileId].dataList[key].list.splice(index-hadDeletedElementNum, 1);
                  ++hadDeletedElementNum;
              }
          }
      }
      return newFiles
    },
    filterIndexUnion(){
      // console.log('filterAllColumn')
      // console.log('this.temp')
      // console.log(this.temp)
      // console.log('this.filterList')
      // console.log(this.filterList)
      let floag = false //是否为同一列
      let filterIndexAll = this.temp.filterIndex
      let fileIdList = []
      for(let index=0; index < this.filterList.length; index++){
        if(this.filterList[index].fileId === this.temp.fileId){
          if(this.filterList[index].columnId === this.temp.columnId){
            floag = true
            this.filterList[index] = JSON.parse(JSON.stringify(this.temp))
          }else{
            filterIndexAll = filterIndexAll.concat(this.filterList[index].filterIndex.filter(function (v) {
              return !(filterIndexAll.indexOf(v) > -1)
            }))
          }
        }else{
          if(fileIdList.indexOf(this.filterList[index].fileId) === -1){
            fileIdList.push(this.filterList[index].fileId)
          }
        }
      }
      if(!floag && this.dialogType !=='null'){
        this.filterList.push(this.temp)
      }
      // console.log('filterIndexAll')
      // console.log(filterIndexAll)
      // console.log('fileIdList')
      // console.log(fileIdList)
      //根据filterIndexAll对文件进行过滤
      let newFiles = JSON.parse(JSON.stringify(this.files));
      if(this.temp.fileId !== ''){
        newFiles = this.filterAllColumn(filterIndexAll, newFiles, this.temp.fileId)
      }
      for(let fileId of fileIdList){
        let filterIndexAll = []
        for(let filter of this.filterList){
          if(filter.fileId === fileId){
            filterIndexAll = filterIndexAll.concat(filter.filterIndex.filter(function (v) {
              return !(filterIndexAll.indexOf(v) > -1)
            }))
          }
        }
        newFiles = this.filterAllColumn(filterIndexAll, newFiles, fileId)
      }
      this.changeFiles(newFiles);
    },
    filterCol() {
      if(this.temp.fileId === ''){
        this.sendMessage('请输入文件名')
      }else if(this.temp.columnId === ''){
        this.sendMessage('请输入列名')
      }else if(this.temp.columnType !== 'value' && this.temp.filterItem.length >= 2 && this.value3 === ''){
        this.sendMessage('请输入条件')
      }else if(this.temp.columnType !== 'value' && this.temp.filterItem.length === 0){
        this.sendMessage('请添加条件')
      }else{
        //针对现有条件得到对应temp
        if (this.temp.columnType === 'value') {
          this.filterValue();
        }else {
          this.filterText();
        }
        //将现有的filterIndex与同文件的filterIndex进行比较
        this.filterIndexUnion()

        this.dialogVisible = false;
      }
    },
    filterValue() {
        let filterMethod = undefined;
        let text = this.num
        if (this.value1 === '选项1') {// 等于
          filterMethod = this.valueEqual(this.num); // 生成1个函数（js闭包）
        }else if (this.value1 === '选项2') { // 不等于
          filterMethod = this.valueNotEqual(this.num); // 生成1个函数（js闭包）
        } else if (this.value1 === '选项3') { // 大于
          filterMethod = this.valueGreaterThan(this.num);
        } else if (this.value1 === '选项4') { // 小于
          filterMethod = this.valueSmallerThan(this.num);
        } else if (this.value1 === '选项5') { // 大于或等于
          filterMethod = this.valueGreaterOrEqualThan(this.num);
        } else if (this.value1 === '选项6') { // 小于或等于
          filterMethod =this.valueSmallerOrEqualThan(this.num);
        } else if ( this.value1 === '选项7') { // 区间（大于大的小于小的）
          filterMethod = this.valueSection(this.num1, this.num2);
          text = [this.num1, this.num2]
        } else if (this.value1 === '选项8') { //不为空
          const isNull = false;
          filterMethod = this.valueIsNull(isNull);
          text = null
        } else if (this.value1 === '选项9') { //为空
          const isNull = true;
          filterMethod = this.valueIsNull(isNull);
          text = null
        } else {
            this.$message.error('请输入条件');
        }
        let column = this.getCurrentColumn().list;
        this.temp.filterIndex = this.getFilterRowIndex(column, filterMethod);
        let label = ''
        this.options1.forEach(item => {
          if (item.value === this.value1) {
            label = item.label
          }
        })
        this.temp.filterItem = [{
          label: label,
          value: this.value1,
          text: text
        }]
        this.temp.filterAll = '满足条件'
    },
    filterText() {
      let column = this.getCurrentColumn().list;
      this.temp.filterItem.forEach((item, index) =>{
        let filterMethod;
        if (item.value === '选项1') {// 等于
          filterMethod = this.valueEqual(item.text); // 生成1个函数（js闭包）
        }else if (item.value === '选项2') { // 不等于
          filterMethod = this.valueNotEqual(item.text); // 生成1个函数（js闭包）
        } else if (item.value === '选项3') { // 包含
          const isNull = true;
          filterMethod = this.valueInclude(item.text, isNull);
        } else if (item.value === '选项4') { // 不包含
          const isNull = false;
          filterMethod = this.valueInclude(item.text, isNull);
        } else if (item.value === '选项5') { // 开头包含
          filterMethod = this.valueStartWith(item.text);
        } else if (item.value === '选项6') { // 结尾包含
          filterMethod =this.valueEndsWith(item.text);
        } else if (item.value === '选项7') { //不为空
          const isNull = false;
          filterMethod = this.valueIsNull(isNull);
        } else if (item.value === '选项8') { // 为空
          const isNull = true;
          filterMethod = this.valueIsNull(isNull);
        } else {
          this.$message.error('请输入条件');
        }
        let filterIndex  = this.getFilterRowIndex(column, filterMethod);
        if(index === 0){
          this.temp.filterIndex = filterIndex;
        }else{
          if (this.value3 === '选项1'){ //满足任1条件，要过滤的数组取交集
            this.temp.filterIndex = this.temp.filterIndex.filter(function (v) {
              return filterIndex.indexOf(v) > -1
            })
          }else if (this.value3 === '选项2'){ //满足所有条件，要过滤的数组取并集
            this.temp.filterIndex = filterIndex.concat(this.temp.filterIndex.filter(function (v) {
              return !(filterIndex.indexOf(v) > -1)
            }))
          }
        }
        let label = ''
        this.options3.forEach(item => {
          if (item.value === this.value3) {
            label = item.label
          }
        })
        if(this.value3 !== '' && this.temp.filterItem.length >= 2){
          this.temp.filterAll = label
        }else{
          this.temp.filterAll = '满足条件'
        }
      })
    },
    valueEqual(targetValue) {
      return (sourceValue) => {
          return sourceValue === targetValue;
      };
    },
    valueNotEqual(targetValue) {
        return (sourceValue) => {
            return sourceValue !== targetValue;
        };
    },
    valueGreaterThan(targetValue) {
        return (sourceValue) => {
            return sourceValue > targetValue;
        }
    },
    valueSmallerThan(targetValue) {
        return (sourceValue) => {
            return sourceValue < targetValue;
        }
    },
    valueGreaterOrEqualThan(targetValue) {
        return (sourceValue) => {
            return sourceValue >= targetValue;
        }
    },
    valueSmallerOrEqualThan(targetValue) {
        return (sourceValue) => {
            return sourceValue <= targetValue;
        }
    },
    valueSection(targetValue1, targetValue2) {
        return (sourceValue) => {
            return (sourceValue >= targetValue1) && (sourceValue <= targetValue2);
        }
    },
    valueIsNull(isNull) {
        if (isNull){
            return (sourceValue) => {
                return sourceValue == null;
            }
        } else {
            return (sourceValue) => {
                return !(sourceValue == null);
            }
        }
    },
    valueInclude(targetValue, isNull) {
        if (isNull) {
          return (sourceValue) => {
              return sourceValue.includes(targetValue);
          }
        } else {
            return (sourceValue) => {
                return !(sourceValue.includes(targetValue));
            }
        }
    },
    valueStartWith(targetValue) {
        return (sourceValue) => {
            return sourceValue.startsWith(targetValue);
        }
    },
    valueEndsWith(targetValue) {
        return (sourceValue) => {
            return sourceValue.endsWith(targetValue);
        }
    },
    changeFiles(newFiles) {
      // console.log('newFiles')
      // console.log(newFiles)
      this.$emit('change', newFiles, this.filterList);
    },
    sendMessage(message){
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    add(value) {
      if( this.temp.fileId === '') {
        this.sendMessage('请输入文件名')
      } else if( this.temp.columnId === '') {
        this.sendMessage('请输入列名')
      } else if (this.value2==='' || (this.value2!=='选项7' && this.value2!=='选项8' && this.text === '')) {
        this.sendMessage('请输入条件')
      } else{
        var label
        this.options2.forEach(item => {
          if (item.value === value) {
            label = item.label
          }
        })
        this.temp.filterItem.push({
          label: label,
          value: value,
          text: this.text
        })
        this.text = ''
        this.value2 = ''
      }
    }
  },
  watch: {
    files: {
      handler(nval, oval) {
        this.resetTemp()
        this.dialogType = 'null'
        this.filterIndexUnion();
      },
      deep: true
    },
    'temp.fileId': {
      handler(nval) {
        if(nval !== ''){
          if(this.dialogType === 'create') {
            this.temp.fileName = this.files[this.temp.fileId].fileInfo.fileName
            this.temp.columnId = ''
            this.temp.columnName = ''
            this.temp.columnType = ''
            this.temp.filterIndex = []
            this.temp.filterItem = []
            this.temp.filterAll = ''
            this.resetValue()
          }
        }
      }
    },
    'temp.columnId': {
      handler(nval) {
        if(nval !== ''){
          if(this.dialogType === 'create'){
            this.temp.columnName = this.files[this.temp.fileId].dataList[nval].name
            this.temp.columnType = this.files[this.temp.fileId].dataList[nval].type
            this.temp.filterIndex = []
            this.temp.filterItem = []
            this.temp.filterAll = ''
            this.resetValue()
          }
        }
      }
    },
    addFilterList: {
      handler(newVal){
        this.filterList = JSON.parse(JSON.stringify(newVal))
      },
      deep:true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row {
     width: 100%;
     margin-bottom: 4px;
     .icon_add {
       float: right;
       border: none;
       color: black;
     }
     .icon_add:hover
     {
       color: #71c2ef;
     }
   }
  .el-icon-circle-plus{
    cursor: pointer;
    float: right;
    margin-top: 8%;
  }
  .el-icon-remove-outline{
    cursor: pointer;
  }
  .selectArea {
    height: 200px;
    .valueSelect {
      padding-top: 10%;
    }
  }
  .textItemList {
    height: 130px;
    overflow: auto;
    li {
      margin-bottom: 4%;
      span {
        margin-right: 5%;
        float: left;
        &:last-child {
          float: right;
          margin-right: 5%;
        }
      }
    }
  }
  .el-dropdown{
    float: right;
    cursor: pointer;
    margin-top: 2%;
    .el-button{
      border: none;
    }
  }
  .el-card  .el-card__header{
    padding: 2% 2%;
    background-color: lightgrey;
  }
  .el-card  .el-card__body{
    padding: 2% 2%;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 2%;
    margin-left: 10%;
  }
</style>
