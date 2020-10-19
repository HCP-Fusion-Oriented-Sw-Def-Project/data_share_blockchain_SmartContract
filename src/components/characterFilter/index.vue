<template>
  <el-dialog
  :visible.sync="filterDialogVisible"
  width="800px"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :before-close="cancel">
    <el-radio-group v-model="filterRadio">
      <el-radio :label="3" style="font-weight: bold">精确筛选</el-radio>
      <el-radio :label="6" style="font-weight: bold">条件筛选</el-radio>
      <el-radio :label="9" style="font-weight: bold">表达式</el-radio>
    </el-radio-group>
    <div style="margin-top:20px;margin-left: 10%;margin-right:10%;height:300px;border:1px solid #000">
      <div v-show="precisionFilter">
        <el-row style="width: 100%">
          <el-col style="width: 48%;">
            <span>{{filterColName}}(日期)</span>
            <el-row style="width:100%;height: 210px">
              <el-table
                :data="filterColumn"
                style="width: 100%"
                :show-header="false"
                size="mini"
                height="100px"
                :row-style="{height:'35px'}">
                <el-table-column
                  prop="value"
                  fixed="left">
                </el-table-column>
                <el-table-column
                  fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      @click.native.prevent="handleAddFilterColumn(scope.$index)"
                      >添加
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row style="margin-top:10px">
              <el-button type="text" size="mini" @click.native.prevent="handleAddFilterColumnAll">全部添加</el-button>
            </el-row>
          </el-col>
          <el-col style="margin-left:1%;width: 0;height:250px;margin-top:25px;border:1px solid gray"></el-col>
          <el-col style="margin-left:1%;width: 49%;">
            <el-select v-model="includeValue" size="mini" style="margin-top: 15px">
              <el-option
                v-for="item in includeOption"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-row style="width:100%;height: 210px">
              <el-table
                :data="addFilterColumn"
                style="width: 100%"
                :show-header="false"
                size="mini"
                :row-style="{height:'35px'}">
                <template slot="empty">
                  <span>请从左侧添加数据</span>
                </template>
                <el-table-column
                  prop="value"
                  fixed="left">
                </el-table-column>
                <el-table-column
                  fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      @click.native.prevent="handleDeleteFilterColumn(scope.$index)"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div v-show="conditionFilter">
        <span style="width:50px;">筛选条件</span>
        <el-row style="width: 100%">
          <el-col style="width: 100%;">
            <el-row style="margin-top: 20px;margin-left: 20px">
              <span style="margin-left:20px;float: left">{{filterColName}}</span>
              <el-col style="margin-left:20px;width: 120px">
                <el-select v-model="conditionValue" placeholder="请选择条件" size="mini" >
                  <el-option
                    v-for="item in conditionOption"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col style="margin-left:20px;width: 120px">
                <el-input
                  placeholder="请输入条件"
                  v-model="conditionInput"
                  size="mini"
                  clearable>
                </el-input>
              </el-col>
              <el-button style="margin-left: 20px" size="mini" type="primary" plain 
                @click="handleAddCondition">
                添加
              </el-button>
              <el-select 
                v-model="allConditionValue" 
                style="margin-left:20px;width: 120px" 
                size="mini" 
                v-show="allConditionView">
                <el-option
                  v-for="item in allConditionOption"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-row>
            <el-row style="height: 210px;margin-left: 20px" v-show="conditionTableView">
              <el-table
                :data="conditionFilterColumn"
                :show-header="false"
                size="mini"
                :row-style="{height:'35px'}">
                <el-table-column width="80px" prop="name"></el-table-column>
                <el-table-column width="140px" prop="conditionSelect"></el-table-column>
                <el-table-column width="140px" prop="conditionInput"></el-table-column>
                <el-table-column width="70px">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="mini"
                      @click.native.prevent="handleDeleteCondition(scope.$index)"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div v-show="expression">
        <el-row style="width:100%">  
          <span>筛选条件</span>
        </el-row>
        <el-input
          type="textarea"
          style="width:450px;"
          :rows="8"
          resize="none"
          v-model="expressionTextarea">
        </el-input>
        <div style="margin-left:70px;width: 450px">
          <span style="font-size:5px">
            示例: [字段名]='某某', 且名称需与筛选器名称相同
          </span>
          <el-button style="font-size:5px;margin-left: 60px" type="text" 
            @click="handleInsertField">
            插入字段
          </el-button>
          <el-button style="font-size:5px" type="text" font-size="5px" 
            @click="handleCheckGrammer">
            语法检测
          </el-button>
          <el-alert 
            :title="expressionAlertTitle"
            type="error" 
            center 
            show-icon 
            v-show="expressionError"
            @close="expressionAlertclose">
          </el-alert>
          <el-alert 
            :title="expressionAlertTitle" 
            type="success" 
            center 
            show-icon 
            v-show="expressionRight"
            @close="expressionAlertclose">
          </el-alert>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <el-button size="mini" @click="cancel">取 消</el-button>
      <el-button size="mini" type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script type="text/javascript">
export default {
  props: {
    // list: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    filterColName: {
      type:String,
      default:''
    },
  },
  data(){
     return{
      filterDialogVisible:false,
      // filterCount:0,
      // filterlist:[],
      filterRadio:3,
      precisionFilter:true,
      conditionFilter:false,
      expression:false,
      filterColumn:[{value:'1'},{value:'2'},{value:'3'},{value:'4'}],
      addFilterColumn:[],
      includeOption:['包含下列选项','不包含下列选项'],
      includeValue:'包含下列选项',
      conditionOption:['等于','不等于','包含','不包含','开头包含','结尾包含','为空','不为空'],
      conditionValue:'',
      conditionInput:'',
      conditionFilterColumn:[],
      conditionTableView:false,
      allConditionValue:'满足任一条件',
      allConditionOption:['满足任一条件','满足所有条件'],
      allConditionView:false,
      expressionTextarea:'',
      expressionAlertTitle:'',
      expressionError:false,
      expressionRight:false,
     }
  },
  watch: {
    'filterRadio':'fileterChange',
    'filterColName':'filter'
  },
  methods:{
    filter(){
      // this.filterDialogVisible=true
      this.filterCount=0
      this.filterlist=[]
      this.filterRadio=3
      this.precisionFilter=true
      this.conditionFilter=false
      this.expression=false
      this.addFilterColumn=[]
      this.conditionValue=''
      this.conditionInput=''
      this.conditionFilterColumn=[]
      this.conditionTableView=false
      this.allConditionValue='满足任一条件'
      this.allConditionView=false
      this.expressionTextarea=''
      this.expressionAlertTitle=''
      this.expressionError=false
      this.expressionRight=false
    },
    fileterChange(){
      if(this.filterRadio=='3'){
        this.precisionFilter=true
        this.conditionFilter=false
        this.expression=false 
      }
      else if(this.filterRadio=='6'){
        this.precisionFilter=false
        this.conditionFilter=true
        this.expression=false
      }
      else if(this.filterRadio=='9'){
        this.precisionFilter=false
        this.conditionFilter=false
        this.expression=true
      }
    },
    //精确筛选
    handleAddFilterColumn(index){
      console.log("this.filterColumn")
      console.log(this.filterColumn[index])
      //判断去重
      var flag=true
      for(var i=0;i<this.addFilterColumn.length;i++){
        if(this.filterColumn[index].value == this.addFilterColumn[i].value){
          flag = false;
        }
      } 
      if(flag){
        this.addFilterColumn.push(this.filterColumn[index]);
      }
    },
    handleAddFilterColumnAll(){
      this.addFilterColumn=JSON.parse(JSON.stringify(this.filterColumn))
    },
    handleDeleteFilterColumn(index){
      this.addFilterColumn.splice(index,1)
    },
    //条件筛选
    handleAddCondition(){
      if(this.conditionValue=='' || this.conditionInput=='')
        alert("请输入完整条件")
      else{
        if(this.conditionFilterColumn.length==0)
          this.conditionTableView=true
        if(this.conditionFilterColumn.length==1)
          this.allConditionView=true
        var obj = new Object
        obj.name = this.filterColName
        obj.conditionSelect = this.conditionValue
        obj.conditionInput = this.conditionInput
        this.conditionFilterColumn.push(obj)
        this.conditionValue=''
        this.conditionInput=''
      }
      
    },
    handleDeleteCondition(index){
      this.conditionFilterColumn.splice(index,1)
      if(this.conditionFilterColumn.length==0)
        this.conditionTableView=false
      if(this.conditionFilterColumn.length==1){
        console.log("删除了")
        this.allConditionView=false
      }
        
    },
    //表达式筛选
    handleInsertField(){
      var field='['+this.filterColName+']'
      this.expressionTextarea+=field
    },
    handleCheckGrammer(){
      this.expressionError=false
      this.expressionRight=false
      var leftfield='['+this.filterColName+']'
      var expression = this.expressionTextarea.split('=')
      if(expression.length==2){
        var rightfield = expression[1].split("'")
        console.log(rightfield)
        if(expression[0] != leftfield){
          this.expressionAlertTitle='表达式中需包含筛选器的字段名称'+leftfield
          this.expressionError=true
        }
        else if(rightfield.length != 3){
          this.expressionAlertTitle='语法有误，校验失败'
          this.expressionError=true
        }
        else if(rightfield[0] != '' || rightfield[2] !=''){
          this.expressionAlertTitle='语法有误，校验失败'
          this.expressionError=true
        }
        else{
          this.expressionAlertTitle='语法正确，校验通过'
          this.expressionRight=true
        }
      }
      else{
        this.expressionAlertTitle='语法有误，校验失败'
        this.expressionError=true
      }
      // setTimeout(this.expressionAlertclose(),360000)
      console.log(this.expressionTextarea)
    },
    expressionAlertclose(){
      this.expressionError=false
      this.expressionRight=false
    },
    cancel(){
      this.filterDialogVisible=false
    },
    sure(){
      this.$emit('saveFilter',false)
      this.filterDialogVisible=false
    }
  }
}
</script>