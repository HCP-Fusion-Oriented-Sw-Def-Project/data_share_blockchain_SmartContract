<template>
  <div>
    <el-row>
      <span>添加字段</span>
      <el-button class="icon_add" plain icon="el-icon-plus" size="mini" @click="handleAdd()" circle>
      </el-button>
    </el-row>
    <el-row v-for="(item,index) in newColList">
      <el-tag size="small">{{item.fileName}}</el-tag>
      <el-tag size="small">{{item.columnName}}</el-tag>
      <el-dropdown trigger="click">
        <i class="el-icon-more">
        </i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleEdit(item)">编辑</el-dropdown-item>
          <el-dropdown-item @click.native="delTemp(item,index)">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

<!--      <el-col :span="6">-->
<!--        <el-button type="primary" @click="handleEdit(item)" size="mini">编辑</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="6">-->
<!--        <el-button type="danger" @click="delTemp(item,index)" size="mini">删除</el-button>-->
<!--      </el-col>-->
    </el-row>
<!--    <el-button type="button" @click="dialogVisible = true" size="small">添加新字段</el-button>-->
    <el-dialog title="添加新字段" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" >
      <el-select class="dialog_item" :disabled="dialogType==='edit'" placeholder="文件名" size="medium" v-model="temp.fileId">
        <el-option
          :key="item.id"
          :label="item.name"
          :value="item.id"
          v-for="item in fileIdTable">
        </el-option>
      </el-select>
      <el-input class="dialog_item" v-model="temp.columnName" placeholder="字段名称" size='medium'/>
      <el-select class="dialog_item" v-model="temp.columnType" placeholder="请选择字段类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input class="dialog_item" id='formulaId' type='textarea' v-model="temp.formula" placeholder="SUM([A])+SUM([B])" :rows=5
               ref='formulaRef'/>
      <div class="dialog_item">
        <el-tabs v-model="activeName1" style='width:45%;float:left;' >
          <el-tab-pane label="函数" name="functions" >
            <el-select v-model="analysis"  filterable  placeholder="全部"   style=' width:100%;' >
              <el-option
                v-for="item in functions_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div style="height:150px;width:100%;margin-top:2px;overflow-y:scroll;background: white">
              <ul>
                <div v-for="item in funs_api">
                  <el-tooltip v-if="item.type===analysis || analysis==='fun_all'"  placement="left" >
                    <div style='word-break: break-all;width:200px;' slot="content" popper-class="draw_share_atooltip">
                      用法：{{item.usage}}<br/><br/>
                      说明：{{item.introduction}}<br/><br/>
                      示例：{{item.example}}
                    </div>
                    <br/>
                    <p style="text-align: left; cursor:pointer" @click="func_in(item.name,$event)">
                      {{ item.name }}
                    </p>
                  </el-tooltip>
                </div>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName2" style='width:45%;float:left;margin-left: 5%;'>
          <el-tab-pane label="字段名" name="field-name">
            <el-input v-model="header_search" placeholder="请输入搜索字段"></el-input>
            <div style="height:150px;width:100%;margin-top:2px;overflow-y:scroll;background: white;">
              <ul >
                <div v-for="item in getHeaders">
                  <p style="text-align: left; cursor:pointer" @click="header_in(item,$event)">
                    {{ item }}
                  </p>
                </div>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="参数" name="params">暂无参数</el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { createRandomId } from '@/utils'
  export default {
    props:{
      files:{
        type: Object,
        default:{},
      },
      addColList:{
        type: Array,
        default: []
      }
    },
    computed: {
      getHeaders() {
        let headers = [];
        if(this.files[this.temp.fileId])
        {
          let file = this.files[this.temp.fileId];
          var reg = new RegExp(this.header_search);
          for(let key in file.dataList) {
            if(file.dataList[key].name.match(reg)) {
              headers.push(file.dataList[key].name);
            }
          }
        }
        return headers;
      },
      fileIdTable: function () {
        let table = [];
        for (let i in this.files) {
          let temp = {id: i, name: this.files[i].fileInfo.fileName};
          table.push(temp);
        }
        return table
      }
    },
    watch: {
      'temp.fileId':{
        handler(newVal, oldVal){
          if(oldVal !== ''){
            this.temp.formula = ''
          }
          if(newVal !== '') {
            this.temp.fileName = this.files[this.temp.fileId].fileInfo.fileName
          }
        }
      },
      addColList:{
        handler(newVal){
          this.newColList = JSON.parse(JSON.stringify(newVal))
        },
        deep:true
      }
    },
    data() {
      return {
        symbolList:[],//存放计算符号
        funList:[],//函数表达式
        formulaList:[],//逆波兰表达式
        wordList:[],//分词列表
        paramList:[],//调用计算函数时褚传参
        resultList:[],//存放运算过程使用的变量和结果

        temp:{
          fileId: '',
          fileName: '',
          columnId: '',
          columnName:'',
          columnType:'',
          formula:''
        },
        newColList: JSON.parse(JSON.stringify(this.addColList)),

        dialogVisible: false,
        dialogType: 'create',
        showHeaders:false,
        inputId:'',
        analysis:'fun_all',
        header_search:'',

        activeName1: 'functions',
        activeName2: 'field-name',
        options: [{
          value: 'category',
          label: '文本'
        },{
          value: 'value',
          label: '数值'
        },{
          value: 'time',
          label: '日期'
        }
        ],

        functions_options: [{
          value: 'fun_all',
          label: '全部'
        },{
          value: 'fun_data',
          label: '数值'
        }, {
          value: 'fun_logic',
          label: '逻辑'
        }, {
          value: 'fun_str',
          label: '字符串'
        }, {
          value: 'fun_date',
          label: '日期和时间'
        }, {
          value: 'fun_poly',
          label: '聚合统计'
        }, {
          value: 'fun_nonpoly',
          label: '非聚合统计'
        }
        ],
        funs_api: [{
            name:'AVG',
            usage:'AVG(表达式/数值字段)',
            introduction:'返回表达式或数值字段所有值的平均值,只适用于数值字段,空值不会计算',
            example:'AVG(销售额),返回"销售额"字段对应的所有非空值的平均值',
            type:'fun_poly'
        },{
          name:'YEAR',
          usage:'YEAR(日期字段)',
          introduction:'返回该日期对应的年份.只允许传入日期型字段',
          example:'YEAR([下单时间]),返回该行"下单时间"字段对应的年份',
          type:'fun_date'
        },{
          name:'CCOALESCE',
          usage:'CCOALESCE(字段1,字段2,"默认个")',
          introduction:'返回参数中的第一个非空值或非空串,如果所有值都为NULL或空串,那么返回空船,与COALESCE区别COALESCE会返回空串,CCOALESCE会跳过空串',
          example:'CCOALESCE([名字1].[名字2],"佚名"),返回参数中的一个个非空名字',
          type:'fun_logic'
        },{
          name:'CEIL',
          usage:'CEIL(数值)',
          introduction:'返回不小于数值a的最小整数',
          example:'CEIL(4.12)返回5',
          type:'fun_data'
        },{
          name:'COALESCE',
          usage:'COALESCE(字段1,字段2,"默认")',
          introduction:'返回参数中的第一个非空值；如果所有的值都为NUll,那么返回NULL',
          example:'COALESCE([名字1],[名字2],"佚名")返回参数中的第一个非空名字',
          type:'fun_logic'
        },{
          name:'CONCAT',
          usage:'CONCAT(字段1,字段2,...)',
          introduction:'返回顺序链接各参数的字符串',
          example:'CONCAT([货品编号],[类型编号])返回货品编号和类型编号联结后的字符串',
          type:'fun_str'
        },{
          name:'COUNT',
          usage:'COUNT(表达式/字段)',
          introduction:'返回表达式所有有效字段的数据条目数量,空值不会计算',
          example:'COUNT(销量额),返回"销售额"字段对应的所有非空值的数据条目数',
          type:'fun_poly'
        },{
          name:'COUNT_DISTINCT',
          usage:'COUNT(DISTINCT(表达式/字段))',
          introduction:'去重计数,返回表达式所有有效字段的不同数据条目数,空值不会计算',
          example:'COUNT(DISTINCT(销售额)),返回"销售额"字段对应的所有非空值的不同数据条目',
          type:'fun_poly'
        },{
          name:'DATE_ADD',
          usage:'DATE_ADD(起始日期,数值字段)',
          introduction:'返回从起始日期算起,数值字段对应天数之后的日期',
          example:'DATE_ADD([入库日期],1)返回货品入库第二天的日期',
          type:'fun_date'
        },{
          name:'DATE_AFTER_MONTHS',
          usage:'DATE_AFTER_MONTHS(日期字段,数值)',
          introduction:'返回某个日期在一个或多个自然月后/前的对应日期',
          example:'DATE_AFTER_MONTHS("2016-01-20",1),返回"2016-02-20"',
          type:'fun_date'
        },{
          name:'DATE_SUB',
          usage:'DATE_SUB(起始日期,数值字段)',
          introduction:'返回从起始日期算起,数值字段对应天数之前的日期',
          example:'DATE_SUB([出库日期],1)返回货品出库前一天的日期',
          type:'fun_date'
        },{
          name:'DAY',
          usage:'DAY(日期字段)',
          introduction:'返回该日期对应的日的值,只允许传入日期型字段',
          example:'DAY([下单时间]),返回该行"下单时间"字段对应的日的日期',
          type:'fun_date'
        },{
          name:'DAY_DIFF',
          usage:'DAY_DIFF(日期字段1,日期字段2)',
          introduction:'返回两个日期相差的天数,只允许传入日期型字段',
          example:'DAY_DIFF([离职日期],[入职日期]),返回同一行上"离职日期"至"入职日期"间隔天数',
          type:'fun_date'
        },{
          name:'DAY_OF_WEEK',
          usage:'DAY_OF_WEEK(日期字段[,类型])',
          introduction:'返回该日期在一周中的第几天,如果需要返回"星期一"的格式,第二个参数传入0',
          example:'DAY_OF_WEEK([下单时间])；DAY_OF_WEEK("2016-05-13"),返回5；DAY_OF_WEEK([下单时间],0)；DAY_OF_WEEK("2016-05-13",0),返回星期五',
          type:'fun_date'
        },{
          name:'FBC',
          usage:'FBC(字符串)',
          introduction:'将该字符串的全角字符转换成半角字符',
          example:'FBC("a b c d ， 。").返回"abcd,.',
          type:'fun_str'
        },{
          name:'FIRST_DAY_OF_MONTH',
          usage:'FIRST_DAY_OF_MONTH(表达式1/字段1,表达式2/字段2',
          introduction:'返回某月第一天,函数参数为数值型字段,依次代表年.月',
          example:'FIRST_DAY_OF_MONTH(2015,1),返回"2015年1月1日 00：00:00',
          type:'fun_date'
        },{
          name:'FLOOR',
          usage:'FLOOR(数值)',
          introduction:'返回不大于数值a的最大整数',
          example:'FLOOR(4.12)返回4',
          type:'fun_data'
        },{
          name:'INSTRING',
          usage:'INSTRING(字符串1,字符串2)',
          introduction:'返回字符串2在字符串1的起始位置后第一次出现的位置.',
          example:'INSTRING([名字],"尔"),返回"尔"在名字字段中第一次出现时的位置',
          type:'fun_str'
        },{
          name:'LENGTH',
          usage:'LENGTH(字符串)',
          introduction:'返回字符串的长度',
          example:'LENGTH([货品名]),返回货品名的长度',
          type:'fun_str'
        },{
          name:'LN',
          usage:'LN(数值)',
          introduction:'求数值对数,ln(数值)',
          example:'LN(10),返回2.3025',
          type:'fun_data'
        },{
          name:'LOG',
          usage:'LOG(数值A,数值B)',
          introduction:'以A为底,求B的对数',
          example:'LOG(2,4),返回2.0',
          type:'fun_data'
        },{
          name:'LOWER',
          usage:'LOWER(表达式/字段)',
          introduction:'返回表达式或字段值全部小写形式的字符串',
          example:'LOWER("ABC"),返回"abc"',
          type:'fun_str'
        },{
          name:'MAX',
          usage:'MAX(表达式/数值字段)',
          introduction:'返回表达式或数值字段中的最大值,只适用于数值字段',
          example:'MAX(销售额),返回"销售额"字段对应值的最大值',
          type:'fun_poly'
        },{
          name:'MAX_DATE',
          usage:'MAX_DATE(日期字段)',
          introduction:'返回该字段所有日期数据中的最大值',
          example:'MAX_DATE([登录时间]),返回该字段中最大的日期',
          type:'fun_poly'
        },{
          name:'MIN',
          usage:'MIN(表达式/数值字段)',
          introduction:'返回表达式或数值字段中的最小值,只适用于数值字段',
          example:'MIN(销售额),返回"销售额"字段对应值的最小值',
          type:'fun_poly'
        },{
          name:'MIN_DATE',
          usage:'MIN_DATE(日期字段)',
          introduction:'返回该字段所有日期数据中最小值',
          example:'MIN_DATE([登陆时间]),返回该字段中离当前时间最小的日期',
          type:'fun_poly'
        },{
          name:'MONTH',
          usage:'MONTH(日期字段)',
          introduction:'返回该日期对应的月份.只允许传入日期型字段',
          example:'MONTH([下单时间]),返回该行"下单时间"字段对应的月份',
          type:'fun_date'
        },{
          name:'MONTH_DIFF',
          usage:'MONTH_DIFF(日期字段1,日期字段2)',
          introduction:'返回两个日期相差的月数,只允许传入日期型字段',
          example:'MONTH_DIFF([离职日期]),[入职日期]),返回同一行上"离职日期",至"入职日期"间隔月数',
          type:'fun_date'
        },{
          name:'NOW',
          usage:'NOW()',
          introduction:'返回当前系统时间,无需参数',
          example:'输入NOW()返回当前时间',
          type:'fun_date'
        },{
          name:'PERCENT',
          usage:'PERFECT([数值字段],百分位)',
          introduction:'求数值类型字段的中位数以及百分位数,传入参数为数值字段,第二个参数范围是0<怕<1,例如0.1,0.25,0.75,0.95',
          example:'PERFECT([数学考试分数],0.5),返回考试分数的中位数',
          type:'fun_poly'
        },{
          name:'POW',
          usage:'POW(数值A,数值B)',
          introduction:'求数值A的数值B次方',
          example:'POW(4,2),返回16.0',
          type:'fun_data'
        },{
          name:'RAND',
          usage:'RAND()',
          introduction:'返回大于0小于1的随机小数',
          example:'RAND(),返回随机数',
          type:'fun_data'
        },{
          name:'REGEXP_EXTRACT',
          usage:'REGEXP_EXTRACT(字符串,正则表达式)',
          introduction:'返回字符串正则表达式解析结果,需要注意的式正则表达式的/需要使用/进行转义,几//d)',
          example:'REGEXP_EXTRACT([货品ID],"[\d+\-]+")返回货品ID中的数字部分',
          type:'fun_str'
        },{
          name:'REGEXP_REPLACE',
          usage:'REGEXP_REPLACE(字符串A,正则表达式,字符串B)',
          introduction:'返回将字符串A中符合正则表达式的部分替换成字符串B后的结果',
          example:'REGEXP_REPLACE([货品名],"[//d+]+",""),返回讲货品名中数字部分替换成空字符串后的结果',
          type:'fun_str'
        },{
          name:'REPEAT',
          usage:'REPEAT(字符串,数值)',
          introduction:'返回字符串重复对应数值次数后的新字符串结果',
          example:'REPEAT([货品名],2),返回货品名重复2次得到的字符串',
          type:'fun_str'
        },{
          name:'REVERSE',
          usage:'REVERSE(字符串)',
          introduction:'返回字符串倒转后的新字符串结果',
          example:'REVERSE([类型编号]),返回类型编号倒转后的字符串',
          type:'fun_str'
        },{
          name:'ROUND',
          usage:'ROUND(数值A[,整数D])',
          introduction:'返回数值A四舍五入到小数点后D位.不填时位0',
          example:'ROUND(4.12,1)返回4.1',
          type:'fun_data'
        },{
          name:'ROW_MAX',
          usage:'ROW_MAX(表达式1/字段1,表达式2/字段2......)',
          introduction:'对比同行中各列的值,返回值最大的,可传入2~8个数值型参数',
          example:'ROW_MAX([部门1销售额],[部门2销售额]),返回该行中部门1销售额与部门2销售额两个字段中农的最大值',
          type:'fun_nonpoly'
        },{
          name:'ROW_MIN',
          usage:'ROW_MIN(表达式1/字段1,表达式2/字段2....)',
          introduction:'对比同行中各列的值,返回值最小的,可传入2~8个数值型参数',
          example:'ROW_MIN([部门1销售额,[部门2销售额],345),返回该行这种部门1销售额,部门2销售额两个字段以及值345中的最小值',
          type:'fun_nonpoly'
        },{
          name:'SQRT',
          usage:'SQRT(数值)',
          introduction:'求数值的根号,需要大于等于0',
          example:'SQRT(4),返回2.0',
          type:'fun_data'
        },{
          name:'STRING_SPLIT',
          usage:'STRING_SPLIT(表达式/字段,分隔符,序列值)',
          introduction:'根据预设分隔符分隔字符串后,返回拆分数组中指定序列的字符串',
          example:'STRING_SPLIT("柱图,线图,雷达图",",",0),返回"柱图"；STRING_SPLIT("柱图,线图,雷达图",",",1),返回"线图"',
          type:'fun_str'
        },{
          name:'SUBSTR',
          usage:'SUBSTR(字符串,起始位置[,长度])',
          introduction:'返回从起始位置起对应长度的字符串的子字符串长度,长度为可选项',
          example:'SUBSTR([商品类型],4),返回商品类型的索引为4起至末尾的子字符串',
          type:'fun_str'
        },{
          name:'SUM',
          usage:'SUM(表达式/数值/数值字段)',
          introduction:'返回表达式或数值字段所有值的和,只适用于数值字段,空值不会计算',
          example:'SUM(销售额),返回"销售额"字段对应的所有非空值的总和',
          type:'fun_poly'
        },{
          name:'TRIM',
          usage:'TRIM(表达式/字段)',
          introduction:'去除表达式或字段中数据两边的空格',
          example:'TRIM("ABC"),返回"abc"',
          type:'fun_str'
        },{
          name:'UPPER',
          usage:'UPPER(表达式/字段)',
          introduction:'返回表达式或字段值全部大写形式的字符串',
          example:'LOWER("abc"),返回"ABC"',
          type:'fun_str'
        },{
          name:'YEAR_DIFF',
          usage:'YEAR_DIFF(日期字段1,日期字段2)',
          introduction:'返回两个日期相差的年数,只允许传入日期型字段',
          example:'YEAR_DIFF([离职日期],[入职日期]),返回同一行上"离职日期"至"入职日期"间隔年数',
          type:'fun_date'
        }
        ],
        cols: [ { "label": "source", "values": "0", "type": "category" }, { "label": "target", "values": "1", "type": "category" }, { "label": "value", "values": "2", "type": "value" }, { "label": "del_flag", "values": "3", "type": "value" }, { "label": "id", "values": "4", "type": "value" } ],

      };
    },
    created() {
      if(this.newColList.length !== 0){
        let filterIndexAll = []
        for(let index=0; index < this.newColList.length; index++){
          this.temp = JSON.parse(JSON.stringify(this.newColList[index]))
          this.dialogType = 'edit';
          this.submit()
        }
      }
    },
    methods: {
      sendFiles: function(){
        console.log('this.newColList')
        console.log(this.newColList)
        this.$emit('change',this.files, this.newColList);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      submit:function(){
        if (this.temp.columnName==''){
          alert("字段名不能为空");
          return 0;
        }
        if (this.temp.columnType==''){
          alert('字段类型不能为空');
          return 0;
        }
        if(this.$options.methods.formulaCheck(this)==0){alert("公式有误！");}
        else{
          if(typeof(this.resultList[0][0])=='object'){
            var temp =[];
            var date =this.result.pop();
            for(var i =0;i<date.length;i++)
            {
              var newDate = date[i]
              var year =newDate.getFullYear();
              var month = newDate.getMonth()+1;
              var day = newDate.getDate();
              var tempDate ='';
              if(month<10){
                tempDate=tempDate+year+'-0'+month;
              }else{
                tempDate=tempDate+year+'-'+month;
              }
              if(day<10){
                tempDate=tempDate+'-0'+day;
              }else{
                tempDate=tempDate+'-'+day;
              }
              temp.push(tempDate);
            }
            this.resultList.push(temp);
          }
          if(this.dialogType === 'create'){
            this.temp.columnId = createRandomId();
            this.newColList.push(this.temp);
          }else{
            for(let index=0; index<this.newColList.length; index++){
              if(this.newColList[index].columnId === this.temp.columnId){
                this.newColList[index] = JSON.parse(JSON.stringify(this.temp));
              }
            }
          }
          Vue.set(this.files[this.temp.fileId].dataList, this.temp.columnId, {'name':this.temp.columnName,"list":this.resultList[0],'type':this.temp.columnType,'columnId':this.temp.columnId});
          //data类型数据
          this.sendFiles();
        }
        // console.log(this.newColList);
        this.dialogVisible = false;
        this.resetTemp();
      },

      handleAdd(){
        this.dialogVisible = true;
        this.dialogType = 'create';
        this.analysis = 'fun_all';
        this.header_search = '';
        this.resetTemp();
      },

      handleEdit(item){
        this.dialogVisible = true;
        this.dialogType = 'edit';
        this.analysis = 'fun_all';
        this.header_search = '';
        console.log('edit item')
        console.log(item)
        this.temp = JSON.parse(JSON.stringify(item));
      },

      delTemp(item,index){
        Vue.delete(this.files[item.fileId].dataList,item.columnId);
        this.newColList.splice(index,1);
        // console.log(this.newColList);
      },

      resetTemp(){
        this.temp = {
          fileId: '',
          fileName: '',
          columnId: '',
          columnName:'',
          columnType:'',
          formula:''
        };
        this.formulaList =[];
        this.resultList=[];
        this.wordList=[];
        this.paramList=[];
      },

      formulaCheck:function(that){
        if(that.temp.formula == '')return 0;
        that.$options.methods.pushStack(that,that.temp.formula);
        that.$options.methods.popStack(that);
      },
      pushStack:function(that,formula){
        var subStr = formula.substring(0);
        that.$options.methods.wordExtract(that,subStr);
        for(var i= 0 ;i<that.wordList.length;i++)
        {
          // console.log(that.wordList[i]);
          // console.log("formula"+JSON.stringify(that.formulaList));
          // console.log("symbol:"+JSON.stringify(that.symbolList));
          // console.log("fun:"+JSON.stringify(that.funList));
          if(typeof(that.wordList[i])=='number')
          {
            that.formulaList.push({'id':that.wordList[i],'type':'number','extra':0});
          }
          else if(that.wordList[i][0]=='+'|that.wordList[i][0]=='-')
          {
            if(that.symbolList.length==0)
            {
              that.symbolList.push({'id':that.wordList[i][0],'type':'symbol','extra':0});

            }
            else
            {
              while(that.symbolList.length!=0)
              {
                var temp = that.symbolList.pop();
                if(temp.id!='(')
                {
                  that.formulaList.push(temp);
                }
                else{
                  that.symbolList.push(temp);
                  break;
                }
              }
              that.symbolList.push({'id':that.wordList[i][0],'type':'symbol','extra':0});
            }
          }
          else if(that.wordList[i][0]=='*'|that.wordList[i][0]=='/')
          {

            // console.log("*/");
            if(that.symbolList.length==0)
            {
              that.symbolList.push({'id':that.wordList[i][0],'type':'symbol','extra':0});
            }
            else
            {
              while(that.symbolList.length!=0)
              {
                var temp = that.symbolList.pop();
                if(temp.id=='*'|temp.id=='/')
                {
                  that.formulaList.push(temp);
                }
                else
                {
                  that.symbolList.push(temp);
                  break;

                }
              }
              that.symbolList.push({'id':that.wordList[i][0],'type':'symbol','extra':0});
            }
          }
          else if(that.wordList[i][0]=='(')
          {
            that.symbolList.push({'id':that.wordList[i][0],'type':'symbol','extra':0});
          }
          else if(that.wordList[i][0]==')')
          {


            if(that.symbolList.length == 0)
            {
              alert("圆括号没有对齐");
              return 0;
            }
            var temp = that.symbolList.pop();
            while(temp.id!='(')
            {
              that.formulaList.push(temp);
              if(that.symbolList.length == 0)
              {
                alert("圆括号没有对齐");
                return 0;
              }
              temp = that.symbolList.pop();
            }
            if(temp.extra !=0)
            {
              var tempFun = that.funList.pop();
              tempFun.extra+=1;
              that.formulaList.push(tempFun);

            }
          }
          else if(that.wordList[i][0]==',')
          {
            if(that.symbolList.length==0)
            {
              alert("逗号位置有误");
              return 0
            }
            else
            {
              var temp = that.symbolList.pop();
              while(temp.id!='(')
              {
                that.formulaList.push(temp);
                if(that.symbolList.length==0)
                {
                  alert("逗号位置有误");
                  return 0
                }
                temp = that.symbolList.pop();
              }
              that.symbolList.push(temp);
              temp = that.funList.pop();
              temp.extra +=1;
              that.funList.push(temp);
            }
          }
          else if(that.wordList[i][0]=='"')
          {
            that.formulaList.push({'id':that.wordList[i],'type':'string','extra':-1});
          }
          else if(that.wordList[i][0]=='[')
          {
            var paramName = that.wordList[i].slice(1,-1);
            var dataList = that.files[that.temp.fileId].dataList
            for(var tag in dataList)
            {
              if(paramName == dataList[tag].name)
              {
                that.formulaList.push({'id':tag,'type':dataList[tag].type,'extra':-1})
              }
            }
          }
          else//以上都不是则判断是否函数
          {
            var funName = that.wordList[i];
            var isFun = 0;
            for(var tag =0 ;tag<that.funs_api.length;tag++)
            {
              if (funName == that.funs_api[tag].name)
              {
                isFun =1;
                that.funList.push({'id':tag,'type':"method",'extra':0});
                break;
              }

            }
            if(isFun ==0)
            {
              alert("字段"+funName+"是无法识别的指令");
              return 0
            }
            else
            {
              isFun =0;
              var j = i+1;
              if(j == that.wordList.length)
              {
                alert("格式错误");
                return 0;
              }
              if(that.wordList[j][0]!='(')
              {
                alert(funName+"函数缺少括号");
                return 0;
              }
              else
              {   //console.log(0)
                that.symbolList.push({'id':that.wordList[j][0],'type':'symbol','extra':1});
                i = j;
                //console.log(1)
              }

            }
          }
        }
        while(that.symbolList.length!=0)
        {
          that.formulaList.push(that.symbolList.pop());
        }
        // console.log("formulaList"+JSON.stringify(that.formulaList));


      },
      wordExtract:function(that,formula)
      {
        var subStr = formula.substring(0);
        for(var j =0 ;j<subStr.length;j++)
        {
          if(subStr[j]<='9' & subStr[j]>='0')//判断数值
          {
            var decimal = 0;
            var i =j+1
            for(;i<subStr.length;i++)
            {
              if((subStr[i]!='.')&(subStr[i]>'9'|subStr[i]<'0'))
              {
                break;
              }
              else
              {
                if(subStr[i]=='.')
                {
                  if(decimal>0){
                    alert("多余小数点");
                    break;
                  }
                  else{
                    decimal ++;
                  }
                }
              }
            }
            var tempWord =eval(subStr.slice(j,i));
            that.wordList.push(tempWord);
            j = i-1;//break后i指向第一个无效字符
          }
          else if(subStr[j]=='('|subStr[j]=='+'|subStr[j]=='-'|subStr[j]=='*'|subStr[j]=='/'|subStr[j]==')'|subStr[j]==',')
          {
            that.wordList.push(subStr[j])
          }
          else if(subStr[j]=='"')//判断字符串
          {
            var i =j;
            i++;
            if(i==subStr.length)
            {
              alert("双引号没有对齐");
              break;
            }
            while(subStr[i]!='"')
            {
              i++;
              if(i==subStr.length)
              {
                alert("双引号没有对齐");
                break;
              }
            }
            that.wordList.push(subStr.slice(j,i+1));
            j=i;
          }
          else if(subStr[j]<='Z'&subStr[j]>='A')//判断函数名
          {
            var i =j+1;
            for(;i<subStr.length;i++)
            {
              if((subStr[i]>'Z'|subStr[i]<'A')&&subStr[i]!='_')break;
            }
            that.wordList.push(subStr.slice(j,i));
            j=i-1;
          }
          else if(subStr[j]=='[')
          {
            var i =j+1;
            if(i == subStr.length)
            {
              alert("方括号没有对齐");
              break;
            }
            while(subStr[i]!=']')
            {
              i++;
              if(i == subStr.length)
              {
                alert("方括号没有对齐");
                break;
              }
            }
            that.wordList.push(subStr.slice(j,i+1));
            j=i;
          }
        }
        // console.log("word"+JSON.stringify(that.wordList));
      },
      popStack:function(that){
        var len = 0;
        for (var jname in that.files[that.temp.fileId].dataList)
        {
          len = that.files[that.temp.fileId].dataList[jname].list.length;
          break;
        }

        for(var i =0; i<that.formulaList.length;i++)
        {
          var tempJs =that.formulaList[i]
          if(tempJs.type=='time')
          {
            var temp =[];
            for(var j=0;j<that.files[that.temp.fileId].dataList[tempJs.id].list.length;j++)
            {
              temp.push(new Date(that.files[that.temp.fileId].dataList[tempJs.id].list[j]));

            }
            that.resultList.push(temp);
          }
          if (tempJs.type == 'value'||tempJs.type=='category')
          {
            that.resultList.push(that.files[that.temp.fileId].dataList[tempJs.id].list)
          }
          if(tempJs.type =='number'||tempJs.type =='string')
          {
            var temp = []
            if(tempJs.type =='number'){
              for(var j = 0; j<len;j++)
              {
                temp.push(tempJs.id);
              }
              that.resultList.push(temp);
            }
            else{
              for(var j = 0; j<len;j++)
              {
                temp.push(tempJs.id.slice(1,-1));
              }
              that.resultList.push(temp);
            }

          }
          if(tempJs.type =="symbol")
          {

            var temp2 = that.resultList.pop();
            var temp1 = that.resultList.pop();
            var temp = [];
            if(typeof(temp1[0])=='number' && typeof(temp2[0])=='number')
            {

              if(tempJs.id == '+')
              {
                for(var j = 0;j<temp1.length;j++)
                {
                  temp.push(temp1[j]+temp2[j])
                }
              }
              if(tempJs.id == '*')
              {
                for(var j = 0;j<temp1.length;j++)
                {
                  temp.push(temp1[j]*temp2[j])
                }
              }
              if(tempJs.id == '-')
              {
                for(var j = 0;j<temp1.length;j++)
                {
                  temp.push(temp1[j]-temp2[j])
                }
              }
              if(tempJs.id == '/')
              {
                for(var j = 0;j<temp1.length;j++)
                {
                  temp.push(temp1[j]/temp2[j]);
                }
              }
            }
            else
            {
              for(var j = 0;j<temp1.length;j++)
              {
                temp.push(temp1[j]+temp2[j])
              }
            }
            that.resultList.push(temp);
          }
          if(tempJs.type =='method')
          {
            var paramNum = tempJs.extra;
            var temp = []
            for(var j = 0;j<paramNum;j++)
            {
              temp.push(that.resultList.pop())
            }
            for(var j = 0;j<paramNum;j++)
            {
              that.paramList.push(temp.pop())
            }
            // console.log("params"+JSON.stringify(that.paramList));
            switch(tempJs.id)
            {
              case 0:
                that.$options.methods.AVG(that);
                break;
              case 1:
                that.$options.methods.YEAR(that);
                break;
              case 2:
                that.$options.methods.CCOALESCE(that);
                break;
              case 3:
                that.$options.methods.CEIL(that);
                break;
              case 4:
                that.$options.methods.COALESCE(that);
                break;
              case 5:
                that.$options.methods.CONCAT(that);
                break;
              case 6:
                that.$options.methods.COUNT(that);
                break;
              case 7:
                that.$options.methods.COUNT_DISTINCT(that);
                break;
              case 8:
                that.$options.methods.DATE_ADD(that);
                break;
              case 9:
                that.$options.methods.DATE_AFTER_MONTHS(that);
                break;
              case 10:
                that.$options.methods.DATE_SUB(that);
                break;
              case 11:
                that.$options.methods.DAY(that);
                break;
              case 12:
                that.$options.methods.DAY_DIFF(that);
                break;
              case 13:
                that.$options.methods.DAY_OF_WEEK(that);
                break;
              case 14:
                that.$options.methods.FBC(that);
                break;
              case 15:
                that.$options.methods.FIRST_DAY_OF_MONTH(that);
                break;
              case 16:
                that.$options.methods.FLOOR(that);
                break;
              case 17:
                that.$options.methods.INSTRING(that);
                break;
              case 18:
                that.$options.methods.LENGTH(that);
                break;
              case 19:
                that.$options.methods.LN(that);
                break;
              case 20:
                that.$options.methods.LOG(that);
                break;
              case 21:
                that.$options.methods.LOWER(that);
                break;
              case 22:
                that.$options.methods.MAX(that);
                break;
              case 23:
                that.$options.methods.MAX_DATE(that);
                break;
              case 24:
                that.$options.methods.MIN(that);
                break;
              case 25:
                that.$options.methods.MIN_DATE(that);
                break;
              case 26:
                that.$options.methods.MONTH(that);
                break;
              case 27:
                that.$options.methods.MONTH_DIFF(that);
                break;
              case 28:
                that.$options.methods.NOW(that);
                break;
              case 29:
                that.$options.methods.PERCENT(that);
                break;
              case 30:
                that.$options.methods.POW(that);
                break;
              case 31:
                that.$options.methods.RAND(that);
                break;
              case 32:
                that.$options.methods.REGEXP_EXTRACT(that);
                break;
              case 33:
                that.$options.methods.REGEXP_REPLACE(that);
                break;
              case 34:
                that.$options.methods.REPEAT(that);
                break;
              case 35:
                that.$options.methods.REVERSE(that);
                break;
              case 36:
                that.$options.methods.ROUND(that);
                break;
              case 37:
                that.$options.methods.ROW_MAX(that);
                break;
              case 38:
                that.$options.methods.ROW_MIN(that);
                break;
              case 39:
                that.$options.methods.SQRT(that);
                break;
              case 40:
                that.$options.methods.STRING_SPLIT(that);
                break;
              case 41:
                that.$options.methods.SUBSTR(that);
                break;
              case 42:
                that.$options.methods.SUM(that);
                break;
              case 43:
                that.$options.methods.TRIM(that);
                break;
              case 44:
                that.$options.methods.UPPER(that);
                break;
              case 45:
                that.$options.methods.YEAR_DIFF(that);
                break;
              case 46:
                break;
              case 47:

                break;
            }
          }
          that.paramList=[];
        }
        // console.log("result"+JSON.stringify(that.resultList));
      }
      ,
      YEAR_DIFF:function(that)
      {
        if(that.paramList.length!=2)
        {
          alert("YEAR_DIFF函数参数格式有误！");
          return 0;
        }
        var temp =[];

        for(var i=0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("YEAR_DIFF函数数据格式有误！");
            return 0;
          }
          if(typeof(that.paramList[1][i])!='object')
          {
            alert("YEAR_DIFF函数数据格式有误！");
            return 0;
          }
          var year = that.paramList[0][i].getFullYear()-that.paramList[1][i].getFullYear()
          temp.push(Math.abs(year));
        }
        that.resultList.push(temp);
      }
      ,
      NOW:function(that)
      {
        if(that.paramList[0]!=null)
        {
          alert("NOW函数无需参数！");
          return 0;
        }
        var len =0;
        let file = that.files[that.temp.fileId];
        for(let key in file.dataList) {
          len = file.dataList[key].list.length;
          break;
        }
        var temp =[];
        var now = new Date()
        for(var i =0;i<len;i++)
        {
          temp.push(now);
        }
        that.resultList.push(temp);
      }
      ,
      MONTH_DIFF:function(that)
      {
        if(that.paramList.length!=2)
        {
          alert("MONTH_DIFF函数参数格式有误！");
          return 0;
        }
        var temp =[];
        for(var i=0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("MONTH_DIFF函数数据格式有误！");
            return 0;
          }
          if(typeof(that.paramList[1][i])!='object')
          {
            alert("MONTH_DIFF函数数据格式有误！");
            return 0;
          }
          var year = that.paramList[0][i].getFullYear()-that.paramList[1][i].getFullYear()
          var month = that.paramList[0][i].getMonth()-that.paramList[1][i].getMonth();
          temp.push(Math.abs(year*12+month));
        }
        that.resultList.push(temp);
      }
      ,
      MONTH:function(that)
      {
        if(that.paramList.length!=1)
        {
          alert("MONTH函数参数格式有误");
          return 0;
        }
        var temp =[];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("MONTH函数数据格式有误！");
            return 0;
          }
          temp.push(that.paramList[0][i].getMonth()+1)
        }
        that.resultList.push(temp);
      }
      ,
      MIN_DATE:function(that)
      {
        if(that.paramList.length!=1)
        {
          alert("MIN_DATE函数参数有误！");
          return 0;
        }
        var temp =[];
        var minYear = 9999;
        var minMonth =12;
        var minDate = 31;
        for(var i=0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("MIN_DATE函数数据格式有误！");
            return 0;
          }
          if(that.paramList[0][i].getFullYear()<minYear)
          {
            minYear = that.paramList[0][i].getFullYear();
            minMonth = that.paramList[0][i].getMonth()+1;
            minDate = that.paramList[0][i].getDate();
          }
          if(that.paramList[0][i].getFullYear()==minYear && (that.paramList[0][i].getMonth()+1)<minMonth)
          {

            minMonth = that.paramList[0][i].getMonth()+1;
            minDate = that.paramList[0][i].getDate();
          }
          if(that.paramList[0][i].getFullYear()==minYear && (that.paramList[0][i].getMonth()+1)==minMonth&&that.paramList[0][i].getDate()<minDate)
          {
            minDate = that.paramList[0][i].getDate();
          }
        }
        if(minMonth<10)
        {
          var min = minYear+'-0'+minMonth;
        }
        else
        {
          var min = minYear+'-'+minMonth;
        }
        if(minDate<10)
        {
          var min = min+'-0'+minDate;
        }
        else
        {
          var min = min+'-'+minDate;
        }
        for(var i =0;i<that.paramList[0].length;i++)
        {
          temp.push(new Date(min));
        }
        that.resultList.push(temp);
      }
      ,
      MAX_DATE:function(that)
      {
        if(that.paramList.length!=1)
        {
          alert("MAX_DATE函数参数有误！");
          return 0;
        }
        var temp =[];
        var maxYear = 0;
        var maxMonth =0;
        var maxDate = 0;
        for(var i=0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("MAX_DATE函数数据格式有误！");
            return 0;
          }
          if(that.paramList[0][i].getFullYear()>maxYear)
          {
            maxYear = that.paramList[0][i].getFullYear();
            maxMonth = that.paramList[0][i].getMonth()+1;
            maxDate = that.paramList[0][i].getDate();
          }
          if(that.paramList[0][i].getFullYear()==maxYear && (that.paramList[0][i].getMonth()+1)>maxMonth)
          {

            maxMonth = that.paramList[0][i].getMonth()+1;
            maxDate = that.paramList[0][i].getDate();
          }
          if(that.paramList[0][i].getFullYear()==maxYear && (that.paramList[0][i].getMonth()+1)==maxMonth&&that.paramList[0][i].getDate()>maxDate)
          {
            maxDate = that.paramList[0][i].getDate();
          }
        }
        if(maxMonth<10)
        {
          var max = maxYear+'-0'+maxMonth;
        }
        else
        {
          var max = maxYear+'-'+maxMonth;
        }
        if(maxDate<10)
        {
          var max = max+'-0'+maxDate;
        }
        else
        {
          var max = max+'-'+maxDate;
        }
        for(var i =0;i<that.paramList[0].length;i++)
        {
          temp.push(new Date(max));
        }
        that.resultList.push(temp);
      }
      ,
      FIRST_DAY_OF_MONTH:function(that)
      {
        if(that.paramList.length!=2)
        {
          alert("FIRST_DAY_OF_MONTH函数参数有误！")
          return 0;
        }
        var temp =[];
        for(var i=0;i<that.paramList[0].length;i++)
        {
          if(that.paramList[1][i]>12||that.paramList[1][i]<0)
          {
            alert("FIRST_DAY_OF_MONTH函数月份参数超出范围");
            return 0;
          }
          if(that.paramList[1][i]<10)
          {
            var date = that.paramList[0][i]+'-0'+(that.paramList[1][i])+'-01';
            temp.push(new Date(date));
          }
          else{
            var date = that.paramList[0][i]+'-'+(that.paramList[1][i])+'-01';
            temp.push(new Date(date));

          }
        }
        that.resultList.push(temp);
      }
      ,
      DAY_OF_WEEK:function(that)
      {

        if(that.paramList.length==1)
        {
          var temp =[];
          for(var i =0;i<that.paramList[0].length;i++)
          {
            if(typeof(that.paramList[0][i])!='object')
            {
              alert("DAY_OF_WEEK函数数据格式有误！");
              return 0;
            }
            var day = that.paramList[0][i].getDay()
            if(day==0)temp.push(7);
            else temp.push(day);
          }
          that.resultList.push(temp);
        }
        else
        {
          alert("DAY_OF_WEEK函数参数格式有误");
          return 0;
        }
      }
      ,
      DAY_DIFF:function(that)
      {
        if(that.paramList.length!=2)
        {
          alert("DAY_DIFF函数参数格式有误");
          return 0;
        }
        var temp =[];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("DAY_DIFF函数数据格式有误！");
            return 0;
          }
          if(typeof(that.paramList[1][i])!='object')
          {
            alert("DAY_DIFF函数数据格式有误！");
            return 0;
          }
          var time1 = Math.abs(that.paramList[0][i]);
          var time2 = Math.abs(that.paramList[1][i]);
          var diff = Math.abs(time1-time2)/(24*60*60*1000);
          temp.push(diff);
        }
        that.resultList.push(temp);
      }
      ,
      DAY:function(that)
      {
        if(that.paramList.length!=1)
        {
          alert("DAY函数参数格式有误");
          return 0;
        }
        var temp =[];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("DAY函数数据格式有误！");
            return 0;
          }
          temp.push(that.paramList[0][i].getDate())
        }
        that.resultList.push(temp);
      }
      ,
      DATE_SUB:function(that)
      {
        if(that.paramList.length!=2)
        {
          alert("DATE_SUB函数参数格式有误");
          return 0;
        }
        var temp =[];
        for(var i=0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("DATE_SUB函数数据格式有误！");
            return 0;
          }
          var tempStr = that.paramList[0][i].toLocaleDateString().split('/');
          var oldDate= new Date(tempStr[1]+'-'+tempStr[2]+'-'+tempStr[0]);
          var millSeconds =Math.abs(oldDate)-(24*60*60*1000)*that.paramList[1][i];
          var newDate = new Date(millSeconds);
          var year =newDate.getFullYear();
          var month = newDate.getMonth()+1;
          if(month<10){
            month= '0'+month;
          }
          var day = newDate.getDate();
          var tempDate ='';
          if(month<10)
          {
            tempDate=tempDate+year+'-0'+month;
          }
          else
          {
            tempDate=tempDate+year+'-'+month;
          }
          if(day<10)
          {
            tempDate=tempDate+'-0'+day;
          }
          else
          {
            tempDate=tempDate+'-'+day;
          }
          temp.push(new Date(tempDate));
        }
        that.resultList.push(temp);
      }
      ,
      DATE_AFTER_MONTHS:function(that)
      {
        if(that.paramList.length!=2)
        {
          alert("DATE_AFTER_MONTHS函数参数格式有误");
          return 0;
        }
        var temp =[];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("DATE_AFTER_MONTHS函数数据格式有误！");
            return 0;
          }
          if(typeof(that.paramList[1][i])!='object')
          {
            alert("DATE_AFTER_MONTHS函数数据格式有误！");
            return 0;
          }
          var year = that.paramList[0][i].getFullYear();
          var month = that.paramList[0][i].getMonth();
          var day = that.paramList[0][i].getDate();
          var addYear = Math.floor((that.paramList[1][i]+month+1)/12) ;
          var newMonth = (that.paramList[1][i]+month+1)%12;
          if(newMonth == 0)
          {
            month =12;
            year =year+addYear-1
          }
          else{
            month = newMonth;
            year += addYear
          }
          var tempDate ='';
          if(month<10)
          {
            tempDate=tempDate+year+'-0'+month;
          }
          else
          {
            tempDate=tempDate+year+'-'+month;
          }
          if(day<10)
          {
            tempDate=tempDate+'-0'+day;
          }
          else
          {
            tempDate=tempDate+'-'+day;
          }
          temp.push(new Date(tempDate));
        }
        that.resultList.push(temp);
      }
      ,
      DATE_ADD:function(that)
      {
        if(that.paramList.length!=2)
        {
          alert("DATE_ADD函数参数格式有误");
          return 0;
        }
        var temp =[];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("DATE_ADD函数数据格式有误！");
            return 0;
          }
          var tempStr = that.paramList[0][i].toLocaleDateString().split('/');
          var oldDate= new Date(tempStr[1]+'-'+tempStr[2]+'-'+tempStr[0]);
          var millSeconds =Math.abs(oldDate)+(24*60*60*1000)*that.paramList[1][i];
          var newDate = new Date(millSeconds);
          var year =newDate.getFullYear();
          var month = newDate.getMonth()+1;
          if(month<10){
            month= '0'+month;
          }
          var day = newDate.getDate();
          var tempDate ='';
          if(month<10)
          {
            tempDate=tempDate+year+'-0'+month;
          }
          else
          {
            tempDate=tempDate+year+'-'+month;
          }
          if(day<10)
          {
            tempDate=tempDate+'-0'+day;
          }
          else
          {
            tempDate=tempDate+'-'+day;
          }
          temp.push(new Date(tempDate));

        }
        that.resultList.push(temp);

      }

      ,
      YEAR:function(that)
      {
        if(that.paramList.length!=1)
        {
          alert("YEAR函数参数格式有误");
          return 0;
        }
        var temp =[];

        for(var i=0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='object')
          {
            alert("YEAR函数数据格式有误！");
            return 0;
          }
          temp.push(that.paramList[0][i].getFullYear())

        }
        that.resultList.push(temp);
      }
      ,
      UPPER:function(that)
      {
        if(!that.paramList.length)
        {
          alert("UPPER函数参数不存在");
          return 0;
        }
        var temp =[];
        for(var i = 0 ;i<that.paramList[0].length;i++)
        {
          temp.push(that.paramList[0][i].toUpperCase());
        }
        that.resultList.push(temp);
      }
      ,
      TRIM:function(that)
      {
        if(that.paramList.length!=1){
          alert("TRIM函数参数格式有误");
          return 0;
        }
        var temp =[];
        for(var i =0;i<that.paramList[0].length;i++)
        {
          temp.push(that.paramList[0][i].trim());
        }
        that.resultList.push(temp);
      }
      ,
      SUM:function(that)
      {
        if(typeof(that.paramList[0][0])!='number')
        {
          alert("SUM参数只能为数值格式");
          return 0;
        }
        var temp =[];
        var sum=0;
        for(var i =0;i<that.paramList[0].length;i++)
        {
          sum+=that.paramList[0][i];
        }
        for(var i =0;i<that.paramList[0].length;i++)
        {
          temp.push(sum);
        }
        that.resultList.push(temp);
      }
      ,
      SUBSTR:function(that)
      {
        if(typeof(that.paramList[1][0])!='number'||typeof(that.paramList[2][0])!='number')
        {
          alert("SUBSTR函数参数格式有误");
          return 0;
        }
        var temp = [];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          if(that.paramList[1][i]+that.paramList[2][i]>=that.paramList[0][i].length)
          {
            alert("SUBSTR函数截取字段下标越界");
            return 0;
          }
          temp.push(that.paramList[0][i].substr(that.paramList[1][i],that.paramList[2][i]));
        }
        that.resultList.push(temp);
      }
      ,
      STRING_SPLIT:function(that)
      {
        if(that.paramList.length!=3||(that.paramList[1][0].length!=1||typeof(that.paramList[2][0])!='number'))
        {
          alert("STRING_SPLIT函数参数格式有误");
          return 0;
        }
        var temp =[];
        for(var i =0;i<that.paramList[0].length;i++)
        {
          var tempStr= that.paramList[0][i].split(that.paramList[1][i]);
          if(that.paramList[2][i]>tempStr.length)temp.push("null");
          else{
            temp.push(tempStr[that.paramList[2][i]-1]);
          }
        }
        that.resultList.push(temp);
      }
      ,
      SQRT:function(that)
      {
        if(typeof(that.paramList[0][0])!='number')
        {
          alert("SQRT函数参数必须是数值字段或表达式")
          return 0;
        }
        var temp =[];
        for(var i =0;i<that.paramList[0].length;i++)
        {
          if(that.paramList[0][i]<0)
          {
            alert("SQRT函数参数第"+(i+1)+"行元素小于零");
            return 0;
          }
          temp.push(Math.sqrt(that.paramList[0][i]));
        }
        that.resultList.push(temp);

      }
      ,
      ROW_MIN:function(that)
      {
        if(that.paramList.length<2)
        {
          alert("ROW_MAX函数参数至少为2个！")
          return 0;
        }
        var len = that.paramList.length;
        var temp =[]
        for(var i=0;i<that.paramList[0].length;i++ )
        {
          var tempArr = []
          for(var j =0;j<len;j++)
          {
            tempArr.push(that.paramList[j][i])
          }
          temp.push(Math.min.apply(null,tempArr));
        }
        that.resultList.push(temp);
      }
      ,
      ROW_MAX:function(that)
      {
        if(that.paramList.length<2)
        {
          alert("ROW_MAX函数参数至少为2个！")
          return 0;
        }
        var len = that.paramList.length;
        var temp =[]
        for(var i=0;i<that.paramList[0].length;i++ )
        {
          var tempArr = []
          for(var j =0;j<len;j++)
          {
            tempArr.push(that.paramList[j][i])
          }
          temp.push(Math.max.apply(null,tempArr));
        }
        that.resultList.push(temp);
      }
      ,
      ROUND:function(that)
      {
        if(typeof(that.paramList[0][0])!='number'|| typeof(that.paramList[1][0])!='number')
        {
          alert("ROUND函数参数有误");
          return 0;
        }
        var temp =[];
        var tempNum =0;
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          if(that.paramList[1][i]<0)
          {
            alert("保留小数位数不能小于0");
            return 0;
          }
          temp.push(that.paramList[0][i].toFixed(that.paramList[1][i]));
        }
        that.resultList.push(temp);
      }
      ,
      REVERSE:function(that)
      {
        if(typeof(that.paramList[0][0])!='string'){
          alert("REVERSE函数参数必须是字符串");
          return 0;
        }
        var temp =[];
        for(var i =0;i<that.paramList[0].length;i++)
        {
          var arr = that.paramList[0][i].split("");
          arr = arr.reverse();
          var str = arr.join("");
          temp.push(str);
        }
        that.resultList.push(temp);

      }
      ,
      REPEAT:function(that)
      {

        if(typeof(that.paramList[0][0])!='string'|| typeof(that.paramList[1][0])!='number')
        {
          alert("REPEAT函数参数有误");
          return 0;
        }
        var temp =[];
        for(var i =0 ;i<that.paramList[0].length;i++)
        {
          var tempStr = "";
          for(var j =0;j<that.paramList[1][i];j++)
          {
            tempStr+=that.paramList[0][i];
          }
          temp.push(tempStr);
        }
        that.resultList.push(temp);
      }
      ,
      REGEXP_REPLACE:function(that)
      {
        if(that.paramList.length != 3)
        {
          alert("REGEX_REPLACE函数参数有误!")
          return 0;
        }
        var temp=[];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          var str=that.paramList[0][i];
          var reg = new RegExp(that.paramList[1][i],'g');
          temp.push(str.replace(reg,that.paramList[2][i]));
        }
        that.resultList.push(temp);
      }
      ,
      REGEXP_EXTRACT:function(that)
      {
        if(that.paramList.length != 2)
        {
          alert("REGEX_EXTRACT函数参数有误!")
          return 0;
        }
        var temp=[];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          var str=that.paramList[0][i];
          var reg = new RegExp(that.paramList[1][i]);
          temp.push(str.match(reg));
        }
        that.resultList.push(temp);
      }
      ,
      RAND:function(that)
      {
        if(that.paramList[0]!=null)
        {
          alert("RAND函数不能放入参数!")
          return 0;
        }
        var len =0;
        let file = that.files[that.temp.fileId];
        for(let key in file.dataList) {
          len = file.dataList[key].list.length;
        }
        var temp =[];
        for (var i =0;i<len;i++)
        {
          temp.push(Math.random())
        }

        that.resultList.push(temp);


      }
      ,
      POW:function(that)
      {
        if(typeof(that.paramList[0][0])!='number'||typeof(that.paramList[1][0])!='number')
        {
          alert('POW函数只能处理两个数值字段或表达式');
          return 0;
        }
        var temp=[];
        for (var i =0;i<that.paramList[0].length;i++)
        {
          temp.push(Math.pow(that.paramList[0][i],that.paramList[1][i]));
        }
        that.resultList.push(temp);

      }
      ,
      PERCENT:function(that)
      {
        if(typeof(that.paramList[0][0])!='number'||typeof(that.paramList[1][0])!='number')
        {
          alert('PERCENT函数只能处理两个数值字段或表达式');
          return 0;
        }
        if(that.paramList[1][0]<0||that.paramList[1][0]>1)
        {
          alert("PERCENT函数百分位参数越界");
          return 0;
        }
        var sorted = that.paramList[0].sort(function(a, b){return a - b});
        var tag = Math.floor((that.paramList[0].length-1)*that.paramList[1][0]);
        var temp =[];
        for(var i = 0 ;i<that.paramList[0].length;i++)
        {
          temp.push(sorted[tag]);
        }
        that.resultList.push(temp);
      },
      MIN:function(that)
      {
        if(!that.paramList.length)
        {
          alert("MIN参数不存在");
          return 0;
        }
        var temp =[];
        var min=Math.min.apply(null,that.paramList[0]);
        for(var i = 0 ;i<that.paramList[0].length;i++)
        {
          temp.push(min);
        }
        that.resultList.push(temp);

      }
      ,
      MAX:function(that)
      {
        if(!that.paramList.length)
        {
          alert("MAX参数不存在");
          return 0;
        }
        var temp =[];
        var max=Math.max.apply(null,that.paramList[0]);
        for(var i = 0 ;i<that.paramList[0].length;i++)
        {
          temp.push(max);
        }
        that.resultList.push(temp);

      }
      ,
      LOWER:function(that)
      {
        if(!that.paramList.length)
        {
          alert("LOWER函数参数不存在");
          return 0;
        }
        var temp =[];
        for(var i = 0 ;i<that.paramList[0].length;i++)
        {
          temp.push(that.paramList[0][i].toLowerCase());
        }
        that.resultList.push(temp);
      }
      ,
      LOG:function(that)
      {
        if(that.paramList.length!=2)
        {
          alert("LOG函数需要输入两个数值参数");
          return 0;
        }
        var temp =[];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='number' ||typeof(that.paramList[1][i])!='number')
          {
            alert("LOG函数只能处理数值参数");
            return 0;
          }
          temp.push(Math.log(that.paramList[1][i])/Math.log(that.paramList[0][i]));


        }
        that.resultList.push(temp);
      }
      ,
      LN:function(that)
      {
        var temp =[];
        for(var i = 0;i<that.paramList[0].length;i++)
        {
          if(typeof(that.paramList[0][i])!='number')
          {
            alert("LN函数只能处理数值参数");
            return 0;
          }
          temp.push(Math.log(that.paramList[0][i]));


        }
        that.resultList.push(temp);
      }
      ,
      LENGTH:function(that)
      {
        if(typeof(that.paramList[0][0])!='string')
        {
          alert("LENGTH函数参数只能是字符串");
          return 0;
        }
        var temp = [];
        for(var i =0;i<that.paramList[0].length;i++)
        {
          temp.push(that.paramList[0][i].length);
        }
        that.resultList.push(temp);

      },
      INSTRING:function(that)
      {
        if(typeof(that.paramList[0][0])!='string'||typeof(paramList[1][0])!='string')
        {
          alert("INSTRING函数参数只能是字符串");
          return 0;
        }
        var temp =[];
        for(var i =0;i<that.paramList[0].length;i++)
        {
          temp.push(that.paramList[0][i].indexOf(that.paramList[1][i]));
        }
        that.resultList.push(temp);
      },
      FLOOR:function(that)
      {
        if(that.paramList.length == 0){
          alert("FLOOR函数参数字段为空")
          return 0;
        }
        if(that.paramList.length != 1){
          alert("FLOOR函数只能传入一个字段名")
          return 0;
        }

        if(typeof(that.paramList[0][0])!='number'){
          alert("FLOOR函数只能处理数字字段或表达式")
        }
        var temp=[];
        for(var k = 0 ;k<that.paramList[0].length;k++)
        {
          temp.push(Math.floor(that.paramList[0][k]));
        }
        that.resultList.push(temp);

      },
      FBC:function(that)
      {
        if(that.paramList.length == 0){
          alert("FBC函数参数为空")
          return 0;
        }
        // console.log(that.paramList.length);
        if(that.paramList.length != 1){
          alert("FBC函数只能传入一个字段名")
          return 0;
        }
        var temp =[];
        for(var k = 0;k<that.paramList[0].length;k++)
        {
          var result="";
          var str = that.paramList[0][k]
          for (var i = 0; i < str.length; i++)
          {
            if (str.charCodeAt(i)>=12288)
            {
              result+= String.fromCharCode(str.charCodeAt(i)-12256);
              continue;
            }
            if (str.charCodeAt(i)>65280 && str.charCodeAt(i)<65375) result+= String.fromCharCode(str.charCodeAt(i)-65248);
            else result+= String.fromCharCode(str.charCodeAt(i));
            // console.log(str.charCodeAt(i)+" "+String.fromCharCode(str.charCodeAt(i)-65248));
          }
          temp.push(result);

          // console.log(temp);
        }
        that.resultList.push(temp);


      },
      COUNT_DISTINCT:function(that)
      {
        if(that.paramList.length == 0){
          alert("COUNT_DISTINCT函数参数为空")
          return 0;
        }
        if(that.paramList.length != 1){
          alert("COUNT_DISTINCT函数只能传入一个字段名")
          return 0;
        }
        var result = []; //结果数组
        for(var i = 0; i < that.paramList[0].length; i++)
        {
          if (result.indexOf(that.paramList[0][i]) == -1&&(that.paramList[0][i]!=0||that.paramList[0][i]!='')) result.push(that.paramList[0][i]);
        }
        var temp =[];
        for(var k = 0 ;k<that.paramList[0].length;k++)
        {

          temp.push(result.length);
        }
        that.resultList.push(temp);
      },
      COUNT:function(that)
      {
        if(that.paramList.length == 0){
          alert("COUNT函数参数为空")
          return 0;
        }
        if(that.paramList.length != 1){
          alert("COUNT函数只能传入一个字段名")
          return 0;
        }

        var temp=[];
        var num = 0
        for(var k = 0 ;k<that.paramList[0].length;k++)
        {
          if(that.paramList[0][k]!=0||that.paramList[0][k]!='')num+=1;

        }
        for(var k = 0 ;k<that.paramList[0].length;k++)
        {

          temp.push(num);
        }
        that.resultList.push(temp);


      },
      CONCAT:function(that)
      {
        var len = that.paramList.length;

        var temp=[]
        for(var k = 0 ;k<that.paramList[0].length;k++)
        {
          var tempStr = "";
          for(var i = 0;i<len;i++)
          {
            tempStr += that.paramList[i][k];
          }
          temp.push(tempStr);
        }
        that.resultList.push(temp);

      },
      COALESCE:function(that)
      {
        var len = that.paramList.length;
        var notNull =0;
        for(var i = 0;i<len;i++)
        {
          for(var j = 0;j<that.paramList[i].length;j++)
          {
            if(that.paramList[i][j]!=0 ||that.paramList[i][j]!="")
            {
              notNull = that.paramList[i][j];
              break;
            }
          }
          if(notNull != 0)break;
        }
        var temp=[]
        for(var k = 0 ;k<that.paramList[0].length;k++)
        {
          temp.push(notNull);
        }
        that.resultList.push(temp);
      },
      CEIL:function(that){
        if(that.paramList.length == 0){
          alert("CEIL函数参数字段为空")
          return 0;
        }
        if(that.paramList.length != 1){
          alert("CEIL函数只能传入一个字段名")
          return 0;
        }

        if(typeof(that.paramList[0][0])!='number'){
          alert("CEIL函数只能处理数字字段或表达式")
        }
        var temp=[];
        for(var k = 0 ;k<that.paramList[0].length;k++)
        {
          temp.push(Math.ceil(that.paramList[0][k]));
        }
        that.resultList.push(temp);
      }
      ,
      AVG:function(that)
      {
        if(that.paramList.length == 0){
          alert("AVG函数参数字段为空")
          return 0;
        }
        if(that.paramList.length != 1){
          alert("AVG函数只能传入一个字段名")
          return 0;
        }
        if(typeof(that.paramList[0][0])!='number'){
          alert("AVG函数只能处理数字字段或表达式")
        }
        else{
          var len = that.paramList[0].length;
          var sum = 0;
          for(var i = 0;i<len;i++)
          {
            sum+= that.paramList[0][i];
          }
          var temp = [];
          var average = sum / len;
          for (var i = 0 ;i<len; i++)
          {
            temp.push(average);
          }
          that.resultList.push(temp);
        }

      },
      CCOALESCE:function(that)
      {
        var len = that.paramList.length;
        var notNull =0;
        for(var i = 0;i<len;i++)
        {
          for(var j = 0;j<that.paramList[i].length;j++)
          {
            if(that.paramList[i][j]!=0 ||that.paramList[i][j]!="")
            {
              notNull = that.paramList[i][j];
              break;
            }
          }
          if(notNull != 0)break;
        }
        var temp=[]
        for(var k = 0 ;k<that.paramList[0].length;k++)
        {
          temp.push(notNull);
        }
        that.resultList.push(temp);
      },
      executeMethod:function(methodId,that)
      {
        //函数参数数据在成员变量的tempSData里面
        //switch(methodId)执行对应函数
        //以下是合并函数体
        var tempResult = [];
        var dims = that.tempSData.length ;
        var resultLength = that.resultData.length;
        var temp = '';

        for(var i =0;i<that.tempSData[0].length;i++)
        {
          if(dims == 1)
          {
            temp = temp.concat(that.tempSData[0][i])
          }
          for(var i1 = 1;i1<dims;i1++)
          {
            temp = temp.concat(that.tempSData[i1-1][i].concat(that.tempSData[i1][i]));

          }
          tempResult.push(temp);
        }


        that.resultData.push(tempResult);
        that.dataStock.push({'id':resultLength,'type':'value','extra':resultLength});
        // console.log('tempResult:'+JSON.stringify(tempResult));
        while(that.tempSData.length!=0)
        {
          that.tempSData.pop();
        }


      },

      func_in:function(f_name){
        this.inputId = document.getElementById("formulaId");
        var strStart = this.inputId.selectionStart
        if (strStart === undefined ) return
        var txt = this.inputId.value;
        var result = txt.substring(0, strStart) + f_name+"()" + txt.substring(strStart)
        this.temp.formula = result;

        strStart += f_name.length;
        Vue.nextTick(()=>{
          var test = document.getElementById("formulaId");
          test.setSelectionRange(strStart+1, strStart+1);
          this.$refs.formulaRef.focus();
        })

      },
      header_in:function(f_name){
        this.inputId = document.getElementById("formulaId");
        var strStart = this.inputId.selectionStart
        if (strStart === undefined ) return
        var txt = this.inputId.value;
        var result = txt.substring(0, strStart) +"["+ f_name+"]" + txt.substring(strStart)
        this.temp.formula = result;
        strStart += f_name.length;
        Vue.nextTick(()=>{
          var test = document.getElementById("formulaId");
          test.setSelectionRange(strStart+2, strStart+2);
          this.$refs.formulaRef.focus();
        })
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
  .dialog_item{
    width: 100%;
    margin-bottom: 4px;
  }
  .el-dropdown{
    float: right;
    cursor: pointer;
    margin-top: 4%;
    .el-button{
      border: none;
    }
  }
</style>


