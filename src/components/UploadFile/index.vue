<template>
  <div>
    <el-button size="medium" type="primary" @click="handleUpload">连接到</el-button>
    <el-dialog title="上传文件" :visible.sync="dialogView" width="800px">
      <el-steps
        :active="active"
        finish-status="success"
        align-center
        style="margin-top: 12px;margin-bottom: 20px"
        simple
      >
        <el-step title="上传文件" icon="el-icon-upload"></el-step>
        <el-step title="预览数据" icon="el-icon-upload"></el-step>
        <el-step title="表格设置" icon="el-icon-upload"></el-step>
      </el-steps>

      <div style="height: 570px;width:600px;margin-left: 80px;margin-right: 50px">
        <div v-if="active==0">
          <el-row style="width: 100%">
            <el-col :span="6">
              <upload-excel-component
                @on-selected-file="selectedExcel"
                v-on:ListenUploadExcel="showdata"
              ></upload-excel-component>
            </el-col>
            <el-col :span="6">
              <upload-txt-component @on-selected-file="selectedTxt"></upload-txt-component>
            </el-col>
            <el-col :span="6">
              <el-button
                style="width: 120px;font-size:15px;"
                size="mini"
                type="primary"
                @click="handleLinkMysql"
              >连接数据库
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button
                style="width: 120px;font-size:15px;"
                size="mini"
                type="primary"
                @click="handleLinkCsv"
              >连接hdfs
              </el-button>

            </el-col>
          </el-row>
          <el-dialog
            :visible.sync="csvLinkDialogView"
            title="连接hdfs"
            width="800px"
            append-to-body
            :beforeclose="handleClear"
          >
            <CsvConnector @change="selectedExcel"/>
          </el-dialog>
          <el-dialog
            :visible.sync="mysqlLinkDialogView"
            title="连接数据库"
            width="800px"
            append-to-body
            :beforeclose="handleClear"
          >
            <el-table
              :data="mysqlLinkList"
              v-loading="mysqlLinkListLoading"
              element-loading-text="给我一点时间"
              border
              fit
              highlight-current-row
              max-height="600"
            >
              <el-table-column align="center" label width="70px" type="index" :index="indexMethod"></el-table-column>
              <el-table-column align="center" width="110px" label="数据源类别">
                <template slot-scope="scope">
                  <span>{{scope.row.type }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150px" label="链接名称">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="110px" label="创建人">
                <template slot-scope="scope">
                  <span>{{scope.row.createBy}}</span>
                </template>
              </el-table-column>
              <el-table-column label="更新时间" width="200px" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.updateDate | formatTimes }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作"
                width="118px"
                class-name="small-padding fixed-width"
              >
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleMysqlLinkDetail(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <!-- 分页 -->
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="mysqlLinkListQuery.pages"
                :page-sizes="[5,10,20,30, 50]"
                :page-size="mysqlLinkListQuery.rows"
                layout="total, sizes, prev, pager, next, jumper"
                :total="mysqlLinkTotal"
              ></el-pagination>
            </div>
            <!-- <el-col :span="14"> -->
            <el-dialog
              style="width: 100%"
              :modal="true"
              title="数据库中的表"
              :visible.sync="mysqlTableListView"
              :append-to-body="true"
              :beforeclose="handleClear"
            >
              <el-table
                :data="mysqlTableList"
                border
                fit
                highlight-current-row
                style="width:750px;"
                max-height="600"
              >
                <!-- <el-table-column type="selection" width="35px"></el-table-column> -->
                <el-table-column
                  align="center"
                  label
                  width="100px"
                  type="index"
                  :index="indexMethod2"
                ></el-table-column>
                <el-table-column align="center" width="220px" label="数据表名">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="230px" label="数据描述">
                  <template slot-scope="scope">
                    <span>{{scope.row.remarks}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="操作"
                  width="180px"
                  class-name="small-padding fixed-width"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="handleMysqlTableLink(scope.row)"
                    >连接
                    </el-button>
                    <!-- <el-button type="primary" size="mini" @click="handletodata(scope.row)" >
                      数据
                    </el-button>-->
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
            <!-- </el-col> -->
          </el-dialog>
          <p style="margin-top:50px;font-weight: bold; font-size: 16px">表格示例</p>
          <p style="font-size: 14px">请上传有标准行列的一维数据表格。（有合并单元格的数据请处理过后再上传，否则可能出现表头识别有误）</p>
          <p style="font-size: 14px">日期字段需包含年月日（如2019/1/1），或年月日时分秒。（如2019/1/1 00:00:00）</p>
          <el-table
            :data="exampleData"
            border
            fit
            highlight-current-row
            style="width: 100%; height: 100%"
          >
            <el-table-column align="center" label="序号" prop="number"></el-table-column>
            <el-table-column align="center" label="拜访人" prop="name"></el-table-column>
            <el-table-column align="center" label="员工编号" prop="uid"></el-table-column>
            <el-table-column align="center" label="职位" prop="position"></el-table-column>
            <el-table-column align="center" label="拜访日期" prop="date"></el-table-column>
            <el-table-column align="center" label="拜访时间" prop="time"></el-table-column>
            <el-table-column align="center" label="客户类型" prop="type"></el-table-column>
          </el-table>
          <!--<div style="text-align: center; margin: 5px">-->
          <!--<p style="margin-top:20px;font-weight: bold; font-size: 16px">导入文件设置</p>-->
          <!--<p style="font-size: 14px"> 请选择文件中用于分列的分隔符</p>-->
          <!--<el-radio v-model="radio" label="1">制表符</el-radio>-->
          <!--<el-radio v-model="radio" label="2">分号</el-radio>-->
          <!--<el-radio v-model="radio" label="3">逗号</el-radio>-->
          <!--<el-radio v-model="radio" label="4">空格</el-radio>-->
          <!--</div>-->
          <div slot="footer" class="dialog-footer" style="float:right;">
            <!--<div slot="footer" style="text-align: center; margin: 5px">-->
            <!--<el-button size="mini" type="text" @click="dialogVisible = false">取消</el-button>-->
            <!--<el-button type="primary" size="mini" @click="next">确定</el-button>-->
            <!--</div>-->
            <el-button style="margin-top: 12px;" v-show="nextVisible" @click="dataFilter">下一步</el-button>
          </div>
        </div>

        <div v-if="active==1">
          <el-table
            v-if="this.resultData.length!=0"
            :data="resultData"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            height="500"
          >
            <!--<el-table-column align="center"  type="index" :index="indexMethod"></el-table-column>-->
            <el-table-column
              align="center"
              width="170px"
              v-for="col in cols"
              :label="col.label"
              :key="col.values"
              :type="col.type"
              :render-header="renderHeader"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row[col.values]}}</span>
              </template>
            </el-table-column>
          </el-table>

          <div slot="footer" class="dialog-footer" style="float:right;">
            <!--<el-dialog title="提示" :visible.sync="dialogVisible" width="40%">-->
            <!--<div style="text-align: center; margin: 5px">-->
            <!--<p>返回上一步，上传成功的文件将被取消，是否继续？</p>-->
            <!--</div>-->
            <!--<div slot="footer" style="text-align: center; margin: 5px">-->
            <!--<el-button size="mini" type="text" @click="dialogVisible = false">取消</el-button>-->
            <!--<el-button type="primary" size="mini" @click="prev">确定</el-button>-->
            <!--</div>-->
            <!--</el-dialog>-->
            <el-button style="margin-top: 12px;" @click="prev">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
          </div>
        </div>

        <div v-if="active==2">
          <el-form
            :model="temp"
            label-position="right"
            label-width="150px"
            style=" margin-left:50px;margin-right:50px; width:400px; "
          >
            <el-form-item label="数据表名称 :">
              <el-input :disabled="true" v-model="temp.name" style="width:250px"></el-input>
            </el-form-item>
            <!-- <el-form-item label="备注 :">
              <el-input v-model="temp.remark" type="textarea" autosize style ='width:400px'></el-input>
            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer" style="float:right;">
            <el-button style="margin-top: 12px;" @click="prev">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="uploadSuccess">完成</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {fetchFileInfo} from "@/api/file";
    import waves from "@/directive/waves"; // 水波纹指令
    import {getUserInfo} from "@/api/login";
    import UploadExcelComponent from "@/components/UploadExcel/index.vue";
    import UploadTxtComponent from "@/components/UploadTxt/index.vue";
    import {
        fetchDatabaseList,
        fetchMyDatasetList,
        fetchDatafromServer
    } from "@/api/warehouse";
    import CsvConnector from "./CsvConnector";

    export default {
        name: "upload-demo",
        components: {CsvConnector, UploadExcelComponent, UploadTxtComponent},
        props: {
            headerText: {
                type: String,
                default: "Header"
            },
            options: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        directives: {
            waves
        },
        data() {
            return {
                responseData: "",

                tableData: [],
                //上传文件对话框
                dialogView: false,
                //连接csv
                csvLinkDialogView: false,
                //连接mysql
                mysqlFlag: false,
                mysqlLink: false,
                mysqlLinkListLoading: true,
                mysqlLinkList: null,
                mysqlLinkTotal: null,
                mysqlLinkDialogView: false,
                mysqlLinkListQuery: {
                    name: "",
                    type: "",
                    createBy: "",
                    pages: 1,
                    rows: 10
                    // category: ''
                },
                listqueryforfecthdata: {
                    tableName: null,
                    databaseId: null
                },
                mysqlTableList: null,
                mysqlTableListView: false,
                mysqlTable: [],
                mysqlTableName: null,

                radio: "3",
                dialogVisible: false,
                nextVisible: false,
                active: 0,
                scope: 0,
                temp: {
                    name: "",
                    remark: ""
                },

                //表格展示
                resultData: [
                    //   {
                    //   number: '1',
                    //   name: '李志文',
                    //   uid: '600001',
                    //   position: '销售总监',
                    //   date: '2019/01/01',
                    //   time: '11:23',
                    //   type: '互联网'
                    // }, {
                    //   number: '2',
                    //   name: '王志文',
                    //   uid: '600002',
                    //   position: '销售总监',
                    //   date: '2019/01/01',
                    //   time: '11:23',
                    //   type: '互联网'
                    // }, {
                    //   number: '3',
                    //   name: '郭志文',
                    //   uid: '600003',
                    //   position: '销售总监',
                    //   date: '2019/01/01',
                    //   time: '11:23',
                    //   type: '互联网'
                    // }
                ],
                cols: [
                    // {values: 'number', label: '序号', type: '数值'},
                    // {values: 'name', label: '拜访人', type: '文本'},
                    // {values: 'uid', label: '员工编号', type: '数值'},
                    // {values: 'position', label: '职位', type: '文本'},
                    // {values: 'date', label: '拜访日期', type: '日期'},
                    // {values: 'time', label: '拜访时间', type: '文本'},
                    // {values: 'type', label: '客户类型', type: '文本'},
                ],
                dataType: [],
                // typeNum: [{ "1": "文本" }, { "2": "数值" }, { "3": "日期" }],

                //上传文件列表
                filesCsv: [],
                filesTxt: [],
                numTxt: 0,
                numCsv: 0,
                txt: false,
                csv: false,
                mysql: false,
                tableHeaderCsv: [],
                tableHeaderTxt: [],
                tableHeader: [[]],
                tableHeader2: [[]],
                datasetCsv: [],
                datasetTxt: [],
                filepathCsv: [],
                filepathTxt: [],
                listCsv: [],
                listTxt: [],
                dataObj: [],

                // 表格示例
                exampleData: [
                    {
                        number: "1",
                        name: "李志文",
                        uid: "600001",
                        position: "销售总监",
                        date: "2019/01/01",
                        time: "11:23",
                        type: "互联网"
                    },
                    {
                        number: "2",
                        name: "王志文",
                        uid: "600002",
                        position: "销售总监",
                        date: "2019/01/01",
                        time: "11:23",
                        type: "互联网"
                    },
                    {
                        number: "3",
                        name: "郭志文",
                        uid: "600003",
                        position: "销售总监",
                        date: "2019/01/01",
                        time: "11:23",
                        type: "互联网"
                    }
                ]
            };
        },
        filters: {
            formatTimes(updateDate) {
                const y = new Date(updateDate).getFullYear();
                const m = new Date(updateDate).getMonth() + 1;
                const d = new Date(updateDate).getDate();
                const h = new Date(updateDate).getHours();
                const i = new Date(updateDate).getMinutes();
                const s = new Date(updateDate).getSeconds();

                var t = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
                // var t = Y + '-' + m + '-' + d;
                return t;
            }
        },
        mounted() {
        },
        created() {
            getUserInfo().then(response => {
                this.createBy = response.data.data.uacUser.id;
            });
        },
        updated() {
            if (this.mysqlFlag) {
                this.dataFilter();
            }
        },
        methods: {
            handleUpload() {
                this.dialogView = true;
            },
            // 向父組件传值
            showdata(data) {
                console.log("results:");
                console.log(data);
                this.responseData = data;
                this.$emit("ListenUploadFile", this.responseData);
                console.log("没毛病");
            },
            //连接Mysql数据库
            indexMethod(index) {
                if (this.mysqlLinkListQuery.pages == 1) {
                    return index + 1;
                } else {
                    return (
                        index +
                        (this.mysqlLinkListQuery.pages - 1) * this.mysqlLinkListQuery.rows +
                        1
                    );
                }
            },
            indexMethod2(index) {
                return index + 1;
            },
            getMysqlLinkList() {
                fetchDatabaseList(this.mysqlLinkListQuery).then(response => {
                    this.mysqlLinkList = response.data.data.list;
                  
                    for (let i = 0; i < this.mysqlLinkList.length; i++) {
                        this.mysqlLinkList[i] = Object.assign(
                            {},
                            this.mysqlLinkList[i],
                            this.mysqlLinkList[i].database
                        );
                    }
                    this.mysqlLinkTotal = response.data.total;
                    this.mysqlLinkListLoading = false;
                });
            },
            handleLinkMysql() {
                this.mysqlLinkDialogView = true;
                this.getMysqlLinkList();
            },
            handleLinkCsv() {
                this.csvLinkDialogView = true;
            },
            handleMysqlLinkDetail(row) {
                // this.isseen = false
                // this.isseendata = false
                this.mysqlLinkDialogView = false;
                this.mysqlTableListView = true;
                this.listqueryforfecthdata.databaseId = row.database.id;
                const dataforSource = {
                    databaseId: row.database.id,
                    name: ""
                };
                fetchMyDatasetList(dataforSource).then(response => {
                    this.mysqlTableList = response.data.list;
                    for (var i = 0; i < this.mysqlTableList.length; i++) {
                        this.mysqlTableList[i] = Object.assign({}, this.mysqlTableList[i]);
                    }
                    this.mysqlLinkListLoading = false;
                });
            },
            handleSizeChange(val) {
                this.mysqlLinkListQuery.rows = val;
                this.getMysqlLinkList();
            },
            handleCurrentChange(val) {
                this.mysqlLinkListQuery.pages = val;
                this.getMysqlLinkList();
            },
            handleMysqlTableLink(row) {
                this.listqueryforfecthdata.tableName = row.name;
                for (let i = 0; i < row.tableColumn.length; i++) {
                    var obj = new Object();
                    obj.colName = row.tableColumn[i].name;
                    obj.colData = [];
                    this.mysqlTable.push(obj);
                    this.cols.push({
                        label: row.tableColumn[i].name,
                        values: i.toString()
                    });
                }
                fetchDatafromServer(this.listqueryforfecthdata).then(response => {
                    this.handleDataConversion(response.data.list);
                });
            },
            handleDataConversion(dataList) {
                this.mysqlTableName = dataList[0].name;
                for (let i = 0; i < dataList.length; i++) {
                    for (let j = 0; j < this.mysqlTable.length; j++)
                        this.mysqlTable[j].colData.push(
                            dataList[i].tableData[this.mysqlTable[j].colName]
                        );
                }
                for (let i = 0; i < dataList.length; i++) {
                    var arr = [];
                    for (let j = 0; j < this.mysqlTable.length; j++)
                        arr.push(dataList[i].tableData[this.mysqlTable[j].colName]);
                    this.resultData.push(arr);
                }
                this.mysqlLink = true;
                this.mysql = true;
                (this.mysqlLinkDialogView = false),
                    (this.mysqlTableListView = false),
                    (this.mysqlFlag = true);
                this.$notify({
                    title: "成功",
                    message: "上传成功",
                    type: "success",
                    duration: 2000
                });
                // this.dataFilter()
                // this.nextVisible = true
            },
            // indexMethod(index) {
            //     return index + 1
            // },

            renderHeader(createElement, {column}) {
                var self = this;
                return createElement("div", {style: {fontSize: "80%"}}, [
                    // return createElement('el-select', this.cols.map(function (item) {
                    //   return createElement('el-option', item.label)
                    // }))
                    createElement("div", column.label),
                    createElement("br"),
                    createElement(
                        "el-select",
                        {
                            style: {
                                width: "120px"
                            },
                            on: {
                                input: value => {
                                    for (let i = 0; i < this.cols.length; i++) {
                                        if (this.cols[i].label === column.label) {
                                            this.cols[i].type = value
                                        }
                                    }
                                    column.type = value;
                                }
                            },
                            props: {
                                value: column.type
                            }
                        },
                        [
                            createElement("el-option", {
                                props: {
                                    value: "category",
                                    label: "文本"
                                }
                            }),
                            createElement("el-option", {
                                props: {
                                    value: "value",
                                    label: "数值"
                                }
                            }),
                            createElement("el-option", {
                                props: {
                                    value: "time",
                                    label: "日期"
                                }
                            })
                        ]
                    )
                ]);
            },

            dataFilter() {
                this.mysqlFlag = false;
                if (this.active++ > 3) {
                    this.active = 0;
                }
                // console.log("dataFilter:")
                var data = this.resultData;
                var title = this.cols;
                var regex = /\d{4}-\d{1,2}-\d{1,2}/;
                var regex1 = /\d+\.?\d+|\d+/;
                // console.log(title)
                for (var k = 0; k < title.length; k++) {
                    var dataname = title[k].values;
                    var datatype = "time";
                    for (var j = 0; j < data.length; j++) {
                        var data1 = data[j];
                        var data2 = data1[dataname];
                        if (regex.exec(data2) == null) {
                            datatype = "value";
                            if (regex1.exec(data2) == null) {
                                datatype = "category";
                                break;
                            } else if (regex1.exec(data2)[0] != regex1.exec(data2).input) {
                                datatype = "category";
                                break;
                            }
                        }
                    }
                    // console.log(datatype)
                    this.cols[k].type = datatype;
                }
                if (this.csv) this.temp.name = this.filesCsv[0].visFileInfo.fileName;
                else if (this.txt) this.temp.name = this.filesTxt[0].visFileInfo.fileName;
                else if (this.mysql) this.temp.name = this.mysqlTableName;
            },

            uploadSuccess() {
                var type = "";
                if (this.csv) {
                    type = "csv";
                    var file = this.filesCsv;
                    var fileinfo = file[0].visFileInfo;
                    var columns = file[0].visFileColumnList;
                    this.temp.name = fileinfo.tableName;
                    this.temp.remark = fileinfo.tableRemark;
                    for (var i = 0; i < columns.length; i++) {
                        columns[i].type = this.cols[i].type;
                    }
                    var obj = new Object();
                    obj.visFileColumnList = fileinfo;
                    obj.visFileInfo = columns;
                    this.$emit(
                        "uploadFile",
                        type,
                        this.filesCsv,
                        this.listqueryforfecthdata
                    );
                } else if (this.txt) {
                    type = "txt";
                    var file = this.filesTxt;
                    var fileinfo = file[0].visFileInfo;
                    var columns = file[0].visFileColumnList;
                    this.temp.name = fileinfo.tableName;
                    this.temp.remark = fileinfo.tableRemark;
                    for (var i = 0; i < columns.length; i++) {
                        columns[i].type = this.cols[i].type;
                    }
                    var obj = new Object();
                    obj.visFileColumnList = fileinfo;
                    obj.visFileInfo = columns;
                    this.$emit(
                        "uploadFile",
                        type,
                        this.filesTxt,
                        this.listqueryforfecthdata
                    );
                } else if (this.mysql) {
                    type = "sql";
                    for (var i = 0; i < this.mysqlTable.length; i++) {
                        this.mysqlTable[i].type = this.cols[i].type;
                    }
                    this.$emit(
                        "uploadFile",
                        type,
                        this.mysqlTable,
                        this.listqueryforfecthdata
                    );
                }
                this.handleClear();
                this.dialogView = false;
            },

            handleClear() {
                // this.dialogView=false
                this.mysqlLink = false;
                this.mysqlLinkListLoading = true;
                this.mysqlLinkList = null;
                this.mysqlLinkTotal = null;
                this.mysqlLinkDialogView = false;
                this.csvLinkDialogView = false;
                this.mysqlTableList = null;
                this.mysqlTableListView = false;
                this.mysqlTable = [];
                this.mysqlTableName = null;
                this.radio = "3";
                this.dialogVisible = false;
                this.nextVisible = false;
                this.active = 0;
                this.scope = 0;
                this.resultData = [];
                this.cols = [];
                this.dataType = [];
                // this.typeNum = [{ "1": "文本" }, { "2": "数值" }, { "3": "日期" }];
                this.filesCsv = [];
                this.filesTxt = [];
                this.numTxt = 0;
                this.numCsv = 0;
                this.txt = false;
                this.csv = false;
                this.mysql = false;
                this.tableHeaderCsv = [];
                this.tableHeaderTxt = [];
                this.tableHeader = [[]];
                this.tableHeader2 = [[]];
                this.datasetCsv = [];
                this.datasetTxt = [];
                this.filepathCsv = [];
                this.filepathTxt = [];
                this.listCsv = [];
                this.listTxt = [];
                this.dataObj = [];
            },

            next() {
                // console.log("next:")
                // console.log(this.resultData)
                let nextVal = true
                for (let i = 0; i < this.cols.length; i++) {
                    let data = this.resultData[0][i]
                    // console.log(data)
                    let regex = /\d{4}-\d{1,2}-\d{1,2}/;
                    let regex1 = /\d+\.?\d+|\d+/
                    if (this.cols[i].type === "value") {
                      if(isNaN(data)) {
                        if (regex1.exec(data) == null || regex1.exec(data)[0] !== data) {
                            nextVal = false
                            this.$notify.error({
                                title: '错误',
                                message: this.cols[i].label + '非数值类型'
                            });
                        }
                      }  
                    } else if (this.cols[i].type === "time") {
                        if (regex.exec(data) === null) {
                            nextVal = false
                            this.$notify.error({
                                title: '错误',
                                message: this.cols[i].label + '非时间类型'
                            });
                        }
                    }
                }
                if (nextVal && this.active++ > 3) {
                    this.active = 0;
                }
            },
            prev() {
                this.active--;
                if (this.active == 0) this.handleClear();
            },

            selectedExcel(data) {
                this.cols = [];
                this.resultData = [];
                this.colNumber = 0;
                this.filetype = "csv";
                this.dialogVisible = false;
                var temp = data.results;
                this.tableData = temp;
                var header = data.header;
                // this.tableHeaderCsv=this.tableHeaderCsv.concat(data.header)
                this.tableHeader2[this.numCsv] = data.header;
                this.datasetCsv.push(data.filename);
                this.dataset = data.filename;
                this.filepathCsv.push(data.filepath);
                this.filepath = data.filepath;
                this.sourceDataTreeCsv = [];
                var ancestor = new Object(),
                    parent = new Object();
                // parent.id = this.numCsv
                parent.fileName = this.datasetCsv[this.numCsv];
                parent.filePath = this.filepathCsv[this.numCsv];
                parent.fileColumn = this.tableHeader2[this.numCsv]//.toString();
                parent.fileType = "csv";
                // fetchFileInfo(this.filepathCsv[this.numCsv]).then(response => {
                //     const data = response.data;
                //     const results = data.split("\n");
                //     for (var i = 0; i < results.length; i++) {
                //         this.tableData[i] = results[i].split(",");
                //         for (var j = 0; j < tableData[0].length; j++) {
                //             var obj = new Object();
                //             obj[tableData[0][j]] = tableData[i][j];
                //             this.dataObj.push(obj);
                //         }
                //     }
                // });
                var index = 0;
                for (const k of this.tableHeader2[this.numCsv]) {
                    //列名
                    var column = [];
                    for (var j = 0; j < this.tableData.length; j++) {
                        column.push(this.tableData[j][k]);
                    }
                    var child = new Object();
                    child.colName = k;
                    child.colData = column;//column.toString();
                    // child.datapath= parent.filePath
                    // child.id = this.colNumber
                    this.colNumber++;
                    this.sourceDataTreeCsv.push(child);
                    this.cols.push({label: k, values: index.toString()});
                    index++;
                }
                for (var i = 0; i < this.tableData.length; i++) {
                    var j = 0;
                    var obj = {};
                    for (const k of this.tableHeader2[this.numCsv]) {
                        var key = j.toString();
                        var val = this.tableData[i][k];
                        obj[key] = val;
                        j++;
                    }
                    this.resultData.push(obj);
                }
                ancestor.visFileColumnList = this.sourceDataTreeCsv;
                ancestor.visFileInfo = parent;
                this.filesCsv.push(ancestor);
                // console.log("data2")
                console.log("test-------info---filesCsv");
                console.log(this.filesCsv);
                this.numCsv++;
                this.csv = true;
                // console.log(this.tableData)
                this.$notify({
                    title: "成功",
                    message: "上传成功",
                    type: "success",
                    duration: 2000
                });
                this.dataFilter();
                // this.nextVisible = true
            },

            selectedTxt(data) {
                this.colNumber = 0;
                this.filetype = "txt";
                this.dialogVisible = false;
                var temp = data.results;
                // console.log("test----------info------temp");
                // console.log(temp);
                for (var i = 0; i < temp.length; i++) {
                    this.tableData[i] = [];
                    for (var j = 0; j < data.header.length; j++) {
                        var key = data.header[j];
                        this.tableData[i][key] = temp[i][j];
                    }
                }
                // this.tableHeaderTxt=this.tableHeaderTxt.concat(data.header)
                this.tableHeader[this.numTxt] = data.header;
                this.datasetTxt.push(data.filename);
                this.filepathTxt.push(data.filepath);

                //对象数组：文件名、文件名对应的列名、列名对应的数据
                this.sourceDataTreeTxt = [];
                var ancestor = new Object();
                parent = new Object();
                // parent.id = this.numTxt
                // parent.parent_id = 0
                parent.fileName = this.datasetTxt[this.numTxt];
                parent.filePath = this.filepathTxt[this.numTxt];
                parent.fileColumn = this.tableHeader[this.numTxt]//.toString();
                parent.fileType = "txt";
                // parent.dataset = this.tableData
                //console.log('v')
                //console.log(this.sourceDataTreeTxt)
                fetchFileInfo(this.filepathTxt[this.numTxt]).then(response => {
                    const data = response.data;
                    const results = data.split("\n");
                    for (var i = 0; i < results.length; i++) {
                        this.tableData[i] = results[i].split(",");
                    }
                });
                var index = 0;
                for (const k of this.tableHeader[this.numTxt]) {
                    //列名
                    var column = [];
                    for (var j = 0; j < this.tableData.length; j++) {
                        column.push(this.tableData[j][k]);
                    }
                    // console.log("data")
                    // console.log(this.tableData)
                    var child = new Object();
                    child.colName = k;
                    // child.id = this.colNumber
                    child.colData = column//.toString();
                    this.cols.push({label: k, values: index.toString()});
                    index++;
                    this.colNumber++;
                    this.sourceDataTreeTxt.push(child);
                }
                for (var i = 0; i < this.tableData.length; i++) {
                    var j = 0;
                    var obj = {};
                    for (const k of this.tableHeader[this.numTxt]) {
                        var key = j.toString();
                        var val = this.tableData[i][k];
                        obj[key] = val;
                        j++;
                    }
                    this.resultData.push(obj);
                }
                ancestor.visFileColumnList = this.sourceDataTreeTxt;
                ancestor.visFileInfo = parent;
                this.filesTxt.push(ancestor);
                this.numTxt++;
                // this.sourceDataTreeTxt = arrayToTree(this.sourceDataTreeTxt)
                this.txt = true;
                console.log("test-------info---filesTxt");
                console.log(this.filesTxt);
                // console.log(this.tableData);
                this.$notify({
                    title: "成功",
                    message: "上传成功",
                    type: "success",
                    duration: 2000
                });
                this.dataFilter();
                // this.nextVisible = true
            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v =>
                    filterVal.map(j => {
                        if (j === "timestamp") {
                            return parseTime(v[j]);
                        } else {
                            return v[j];
                        }
                    })
                );
            }
        }
    };
</script>
<style scoped>
  .el-dialog {
    background: radial-gradient(#000, #000)
  }
</style>
