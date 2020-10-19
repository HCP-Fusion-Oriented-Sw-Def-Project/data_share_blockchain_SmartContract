<template>
  <el-dialog
  :visible.sync="filterDialogVisible"
  width="800px"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :before-close="cancel">
    <el-radio-group v-model="filterRadio" @change="fileterChange">
      <el-radio :label="6">条件筛选</el-radio>
      <el-radio :label="9">表达式</el-radio>
    </el-radio-group>
    <div style="margin-top:20px;margin-left: 10%;margin-right:10%;height:300px;border:1px solid #000">
      <div v-show="conditionFilter">
        <span style="width:50px;">筛选条件</span>
        <el-row style="width: 100%; margin-top: 80px">
          <el-col style="width: 100%;">
            <el-row style="margin-top: 20px;margin-left: 20px">
              <span style="margin-left:100px;float: left">{{filterColName}}</span>
              <el-col style="margin-left:20px;width: 120px">
                <el-select v-model="conditionValue" size="mini" @change="handleSelectCondition">
                  <el-option
                    v-for="item in conditionOption"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col style="margin-left:20px;width: 120px" v-show="conditionValueView">
                <el-input-number 
                  v-model="conditionInput" 
                  controls-position="right"
                  size="mini" 
                  :disabled="conditionValueDisabled"
                  placeholder="请输入数值">
                </el-input-number>
              </el-col>
              <div v-show="conditionRangeView">
                <el-input-number 
                  v-model="conditionInputLeft" 
                  controls-position="right"
                  size="mini" 
                  placeholder="请输入数值"
                  style="width: 100px">
                </el-input-number>
                <span>~</span>
                <el-input-number 
                  v-model="conditionInputRight" 
                  controls-position="right"
                  size="mini" 
                  placeholder="请输入数值"
                  style="width: 100px">
                </el-input-number>
              </div>
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
    filterColumn: {
      type: Array,
      default() {
        return []
      }
    },
    filterColName: {
      type:String,
      default:''
    },
  },
  data(){
     return{
      filterDialogVisible:false,
      filterRadio:6,
      precisionFilter:true,
      conditionFilter:false,
      expression:false,
      // filterColumn:[{value:'1'},{value:'2'},{value:'3'},{value:'4'}],
      addFilterColumn:[],
      conditionOption:['等于','不等于','大于','小于','大于等于','小于等于','区间','为空','不为空'],
      conditionValue:'区间',
      conditionInput:null,
      conditionInputLeft:null,
      conditionInputRight:null,
      conditionRangeView:true,
      conditionValueView:false,
      conditionValueDisabled:false,
      expressionTextarea:'',
      expressionAlertTitle:'',
      expressionError:false,
      expressionRight:false,
     }
  },
  watch: {
    'filterColName':'filter',
  },
  methods:{
    filter(){
      this.filterDialogVisible=true
      this.filterCount=0
      this.filterlist=[]
      this.filterRadio=6
      this.conditionFilter=true
      this.expression=false
      this.addFilterColumn=[]
      this.conditionValue='区间'
      this.conditionInput=null
      this.conditionInputLeft=null
      this.conditionInputRight=null
      this.conditionRangeView=true
      this.conditionValueView=false
      this.conditionValueDisabled=false
      this.allConditionValue='满足任一条件'
      this.allConditionView=false
      this.expressionTextarea=''
      this.expressionAlertTitle=''
      this.expressionError=false
      this.expressionRight=false
    },
    fileterChange(){
      if(this.filterRadio=='6'){
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
    //条件筛选
    handleSelectCondition(){
      console.log("切换")
      console.log(this.conditionValue)
      if(this.conditionValue=='区间'){
        this.conditionRangeView=true
        this.conditionValueView=false
      }
      else if(this.conditionValue=='为空' || this.conditionValue=='不为空'){
        this.conditionRangeView=false
        this.conditionValueView=true
        this.conditionValueDisabled=true
      }
      else{
        this.conditionRangeView=false
        this.conditionValueView=true
        this.conditionValueDisabled=false
      } 
    },

    //表达式筛选
    handleInsertField(){
      var field='['+this.filterColName+']'
      this.expressionTextarea+=field
    },
    handleCheckGrammer(){
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
      this.filterDialogVisible=true
      this.filterCount=0
      this.filterlist=[]
      this.filterRadio=6
      this.conditionFilter=true
      this.expression=false
      this.addFilterColumn=[]
      this.conditionValue='区间'
      this.conditionInput=null
      this.conditionInputLeft=null
      this.conditionInputRight=null
      this.conditionRangeView=true
      this.conditionValueView=false
      this.conditionValueDisabled=false
      this.allConditionValue='满足任一条件'
      this.allConditionView=false
      this.expressionTextarea=''
      this.expressionAlertTitle=''
      this.expressionError=false
      this.expressionRight=false
      this.$emit('cancelFilter')
      this.filterDialogVisible=false
    },
    sure(){
      var obj = new Object
      obj.filterRadio=this.filterRadio
      obj.conditionValue=this.conditionValue
      obj.conditionInput=this.conditionInput
      obj.conditionInputLeft=this.conditionInputLeft
      obj.conditionInputRight=this.conditionInputRight
      this.$emit('saveFilter',obj)
      this.filterDialogVisible=false
    }
  }
}
</script>