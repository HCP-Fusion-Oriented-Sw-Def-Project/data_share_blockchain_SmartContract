<template>
  <div class="app-container">
    <h1>聚类结果的可视化分析</h1>
    <div style="display:inline ;margin-left:60px">
      <el-button slot="trigger" size="small" type="primary" @click="contraShowDialog=true">
        对比分析
      </el-button>
    </div>
    <div style="width:100px;float:left">
      <el-upload
        class="upload-demo"
        action="http://10.4.20.151:8101/govern-spark/hdfs/createWriteFileByFile"
        :on-error="uploadError"
        :before-remove="beforeRemove"
        multiple
        :limit="2"
        :on-exceed="uploadExceed"
        :on-change="previewData"
        :file-list="fileList"
        accept=".csv, .txt"
      >
        <el-button slot="trigger" size="small" type="primary">
          上传数据集
        </el-button>
      </el-upload>
    </div>
    <!-- <el-button>聚类结果对比分析</el-button> -->

    <el-form>
      <el-form-item v-show="show2" label="源数据样例:">
        <el-table
          v-if="this.resultData.length!=0"
          v-loading="listLoading"
          :data="resultData"
          element-loading-text="给我一点时间"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          height="300px"
        >
          <!-- height=500 -->
          <el-table-column
            v-for="col in cols"
            :key="col"
            align="center"
            width="170px"
            :label="col"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row[col] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <span v-else>暂未上传数据</span>
      </el-form-item>
    </el-form>

    <div style="display:block;width: 1600px;height:700px">
      <div style="display:inline;float:left; width:600px;height:700px">
        <div
          id="yibiaoneichart"
          style="width:600px;height: 400px;display:inline; margin-top: -40px;"
        ></div>
        <div
          id="yibiaowaichart"
          style="width:600px;height: 400px; display:inline;margin-top: -60px;"
        ></div>
      </div>
      <div
        style="display:inline;float:left; width: 600px;height: 700px;margin-top:20px;margin-left:120px"
      >
        <div id="treechart" style="width: 300px;height: 400px;float:left;display:inline; "></div>
        <div
          style="width: 300px;height: 400px;float:right; display: flex; justify-content: center; align-items: center; "
        >
          <el-table
            v-if="this.decisionData.length!=0"
            v-loading="listLoading"
            :data="decisionData"
            element-loading-text="给我一点时间"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column
              v-for="col in dcols"
              :key="col"
              align="center"
              width="120px"
              :label="col"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row[col] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <span v-else>暂未上传数据</span> -->
        </div>
        <div id="barchart" style="width: 600px;height: 300px;"></div>
      </div>
    </div>

    <div style="display:block;overflow:hidden;width: 1600px;height:600px">
      <div style="width: 600px;height: 450px;float:left;display:inline; ">
        <!-- <el-select v-model="useFeature" multiple placeholder="请选择">
          <el-option v-for="item in cols" :key="item" :label="item" :value="item"></el-option>
        </el-select>-->
        <div id="pointchart" style="width: 600px;height: 400px; "></div>
      </div>
      <div style="width:650px;float:left;display:inline; margin-left:60px;margin-top:30px">
        <div id="parallelchart" style="width: 600px;height: 400px; "></div>
      </div>
    </div>

    <div style="display:block;overflow:hidden;width: 1600px;height:600px">
      <div style="width: 600px;height: 450px;float:left;display:inline; ">
        <div id="heatmapchart" style="width: 600px;height: 400px; "></div>
      </div>
      <div style="width:650px;float:left;display:inline; margin-left:30px">
        <!-- <div id="themeRiverchart" style="width: 600px;height: 400px; "></div> -->
        <div id="heatmapchart2" style="width: 600px;height: 400px; "></div>
      </div>
    </div>

    <el-dialog title="聚类结果对比分析" :visible.sync="contraShowDialog" width="1600px" fullscreen>
      <el-upload
        class="upload-demo"
        action="http://10.4.20.151:8101/govern-spark/hdfs/createWriteFileByFile"
        :on-error="uploadError"
        :before-remove="beforeRemove"
        multiple
        :limit="4"
        :on-exceed="uploadExceed"
        :on-change="preContraData"
        :file-list="fileList"
        accept=".csv, .txt"
      >
        <el-button slot="trigger" size="small" type="primary">
          上传数据集
        </el-button>
      </el-upload>

      <div style="display:block;overflow:hidden;width: 1600px;height:600px">
        <div style="width: 600px; height:450px; float:left; display:inline; ">
          <div id="pointmatrixchart" style="width: 550px;height: 500px; "></div>
        </div>
        <div style="width:600px;height: 450px;float:left;display:inline; margin-left:30px">
          <div id="profilechart" style="width: 600px;height: 500px;"></div>
        </div>
      </div>
      <div style="display:block;width: 1600px;height:700px">
        <div style="display:inline;float:left; width:600px;height:700px">
          <div
            id="Contrayibiaoneichart"
            style="width:600px;height: 400px;display:inline; margin-top: -40px;"
          ></div>
          <div
            id="Contrayibiaowaichart"
            style="width:600px;height: 400px; display:inline;margin-top: -60px;"
          ></div>
        </div>
        <div
          style="display:inline;float:left; width: 450px;height: 700px;margin-top:20px;margin-left:120px"
        >
          <el-table
            v-if="this.decisionData2.length!=0"
            v-loading="listLoading"
            :data="decisionData2"
            element-loading-text="给我一点时间"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column
              v-for="col in dcols2"
              :key="col"
              align="center"
              width="120px"
              :label="col"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row[col] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <span v-else>暂未上传数据</span> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import XLSX from 'xlsx'

import echarts from 'echarts' // 引入echarts

export default {
  name: 'Profile',
  data() {
    return {
      resultData: [],
      cols: [],
      // 上传
      fileList: [],
      filename: '',
      show2: true,
      listLoading: true,
      // 选择参加聚类的特征值
      useFeature: [],
      // 画图
      charts: '',
      // 散点图
      label: [],
      soption: {
        title: 'yuanweihua',
        series: []
      },
      // 全数据集决策树
      allTree: '',
      // 柱状图
      feature: [],
      boption: {
        series: []
      },
      labelOption: {
        show: false,
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff'
          }
        }
      },
      // 簇间特征对比表格
      decisionData: [],
      dcols: [],

      // 聚类结果对比分析
      contraShowDialog: false,
      resultContraData: [],
      decisionData2: [],
      dcols2: [],

      resultDatas: []
    }
  },
  computed: {},
  created() {},
  methods: {
    // 上传文件
    uploadSuccess(response, file, fileList) {
      this.temp.position = this.upLoadData.filePath
      this.$message.success('上传成功！')
    },
    uploadError(err, file, fileList) {
      // this.$message.error("上传出错，请重新上传！");
      // this.$message.success("上传成功！");
    },
    beforeAvatarUpload(file) {
      this.upLoadData.filePath += file.name
    },
    beforeRemove(file) {
      this.$confirm(`确定移除 ${file.name}？`)
      // this.cols = [];
      // this.resultData = [];
    },
    uploadExceed() {
      this.$message.error('当前仅限上传一个文件，请核对后上传！')
    },
    // 数据展示
    previewData(file, fileList) {
      var files = file
        var fileList
      if (!files || files.length == 0) {
        this.cols = []
        this.resultData = []
        return
      }
      if (!file) return
      this.soption.title = file.name.split('.')[0]
      if (file.name.split('.')[1] == 'txt') {
        this.listLoading = false
        this.selectedTxt(file)
      } else if (file.name.split('.')[1] == 'csv') {
        // ||file.name.split(".")[1]=='xlsx'||file.name.split(".")[1]=='xls'
        this.listLoading = false
        this.selectedExcel(file)
      } else {
        this.$message.warning(
          '您上传的格式暂不支持，请转换为系统支持文件上传！'
        )
      }
    },
    // 读取数据
    selectedExcel(data) {
      this.resultData = []
      const reader = new FileReader() // 首先需要实例化FileReader对象：
      reader.readAsArrayBuffer(data.raw)
      reader.onload = e => {
        const data2 = e.target.result
        let o = ''
        const l = 0
        const w = 102400 // 10240
        // for (; l < e.target.result.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(e.target.result.slice(l * w, l * w + w))
        )
        const workbook = XLSX.read(btoa(o), { type: 'base64' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        this.cols = []
        this.label = [] // 统计聚类结果的标签
        // this.option.series = []; //统计数据信息
        const range = XLSX.utils.decode_range(worksheet['!ref'])
        let C
        const R = range.s.r /* start in the first row */
        for (C = range.s.c; C <= range.e.c; ++C) {
          /* walk every column in the range */
          var cell =
            worksheet[
              XLSX.utils.encode_cell({ c: C, r: R })
            ] /* find the cell in the first row */
          var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
          this.cols.push(hdr)
        }

        this.resultData = XLSX.utils.sheet_to_json(worksheet)
        console.log(this.resultData)
        // 画图
        this.$nextTick(function() {
          this.preDraw()
          this.drawyibiaowaichart('yibiaowaichart')
          this.drawyibiaoneichart('yibiaoneichart')
          this.drawPoint('pointchart')
          this.drawTree('treechart')
          this.drawBar('barchart')
          this.drawParallel('parallelchart')
          this.drawHeatmap('heatmapchart')
          this.drawHeatmap2('heatmapchart2')
          // this.drawThemeRiver("themeRiverchart");
        })
      }
    },
    selectedTxt(data) {
      const reader = new FileReader() // 首先需要实例化FileReader对象：
      reader.readAsText(data.raw, 'UTF-8') // 读取文件
      reader.onload = e => {
        var headerArray = e.target.result.split('\n')
        var columNum = headerArray[0].split(',').length
        this.cols = []
        this.resultData = []
        for (var i = 0; i < columNum; i++) {
          this.cols.push(i)
        }
        for (var l in headerArray) {
          this.resultData[l] = []
        }
        for (var j in headerArray) {
          this.resultData[j] = headerArray[j].split(',')
        }
        this.$nextTick(function() {
          this.preDraw()
          this.drawyibiaowaichart('yibiaowaichart')
          this.drawyibiaoneichart('yibiaoneichart')
          this.drawPoint('pointchart')
          this.drawTree('treechart')
          this.drawBar('barchart')
          this.drawParallel('parallelchart')
          this.drawHeatmap('heatmapchart')
          this.drawHeatmap2('heatmapchart2')
        })
      }
    },
    preDraw() {
      // //获取标签+数据
      // let series1 = [];
      // let series2 = [];
      // this.soption.series = [];
      // //散点图
      // for (let data in this.resultData) {
      //   if (
      //     this.resultData[data].label !== "label" &&
      //     this.label.indexOf(this.resultData[data].label) == -1
      //   ) {
      //     this.label.push(this.resultData[data].label);
      //     this.soption.series.push({
      //       name: "" + this.resultData[data].label,
      //       type: "scatter",
      //       data: [],
      //       markArea: {
      //         silent: true,
      //         itemStyle: {
      //           normal: {
      //             color: "transparent",
      //             borderWidth: 1,
      //             borderType: "dashed"
      //           }
      //         },
      //         data: [
      //           [
      //             {
      //               name: "cluster" + this.resultData[data].label + "分布区域",
      //               xAxis: "min",
      //               yAxis: "min"
      //             },
      //             {
      //               xAxis: "max",
      //               yAxis: "max"
      //             }
      //           ]
      //         ]
      //       },
      //       markPoint: {
      //         data: [
      //           { type: "max", name: "最大值" },
      //           { type: "min", name: "最小值" }
      //         ]
      //       },
      //       markLine: {
      //         lineStyle: {
      //           normal: {
      //             type: "solid"
      //           }
      //         },
      //         data: [{ type: "average", name: "平均值" }, { xAxis: 160 }]
      //       }
      //     });
      //   }
      //   //根据实际聚类结果类别数要更改
      //   if (this.label.indexOf(this.resultData[data].label) == 0) {
      //     series1.push([
      //       this.resultData[data].feature1,
      //       this.resultData[data].feature2
      //     ]);
      //   } else {
      //     series2.push([
      //       this.resultData[data].feature1,
      //       this.resultData[data].feature2
      //     ]);
      //   }
      // }
      // this.soption.series[0].data = series1;
      // this.soption.series[1].data = series2;
      // //柱状图
      // var keys = Object.keys(this.resultData[0]);
      // for (let k of keys) {
      //   if (k !== "label" && k !== "index" && this.feature.indexOf(k) == -1) {
      //     this.feature.push(k);
      //     this.boption.series.push({
      //       type: "bar",
      //       barGap: 0,
      //       label: this.labelOption,
      //       name: k,
      //       data: []
      //     });
      //   }
      // }
      // var data01 = 0;
      // var data02 = 0;
      // var num0 = 0;
      // for (let item of this.soption.series[0].data) {
      //   if (item[0] != "feature1" && item[1] != "feature2") {
      //     data01 += item[0];
      //     data02 += item[1];
      //     num0++;
      //   }
      // }
      // var data11 = 0;
      // var data12 = 0;
      // var num1 = 0;
      // for (let item of this.soption.series[1].data) {
      //   if (item[0] != "feature1" && item[1] != "feature2") {
      //     data11 += item[0];
      //     data12 += item[1];
      //     num1++;
      //   }
      // }
      // this.boption.series[0].data = [data01 / num0, data02 / num0];
      // this.boption.series[1].data = [data11 / num1, data12 / num1];
      // //簇间特征对比表格
      // // this.dcols = ["name", "feature1", "feature2"];
      // if (this.dcols.indexOf("name") == -1) {
      //   this.dcols = this.feature.concat();
      //   this.dcols.unshift("name");
      //   for (let item in this.label) {
      //     let k = 0;
      //     this.decisionData.push({
      //       name: this.label[item],
      //       feature1: this.boption.series[k++].data[item],
      //       feature2: this.boption.series[k++].data[item]
      //     });
      //   }
      // }
      // //获取标签+数据
      // let series1 = [];
      // let series2 = [];
      // let series3 = [];
      // let series4 = [];
      // this.soption.series = [];
      // //散点图
      // for (let data in this.resultData) {
      //   if (
      //     this.resultData[data].label !== "label" &&
      //     this.label.indexOf(this.resultData[data].label) == -1
      //   ) {
      //     this.label.push(this.resultData[data].label);
      //     this.soption.series.push({
      //       name: "" + this.resultData[data].label,
      //       type: "scatter",
      //       data: [],
      //       markArea: {
      //         silent: true,
      //         itemStyle: {
      //           normal: {
      //             color: "transparent",
      //             borderWidth: 1,
      //             borderType: "dashed"
      //           }
      //         },
      //         data: [
      //           [
      //             {
      //               name: "cluster" + this.resultData[data].label + "分布区域",
      //               xAxis: "min",
      //               yAxis: "min"
      //             },
      //             {
      //               xAxis: "max",
      //               yAxis: "max"
      //             }
      //           ]
      //         ]
      //       },
      //       markPoint: {
      //         data: [
      //           { type: "max", name: "最大值" },
      //           { type: "min", name: "最小值" }
      //         ]
      //       },
      //       markLine: {
      //         lineStyle: {
      //           normal: {
      //             type: "solid"
      //           }
      //         },
      //         data: [{ type: "average", name: "平均值" }, { xAxis: 160 }]
      //       }
      //     });
      //   }
      //   //根据实际聚类结果类别数要更改
      //   if (this.label.indexOf(this.resultData[data].label) == 0) {
      //     series1.push([
      //       this.resultData[data].feature1,
      //       this.resultData[data].feature2
      //     ]);
      //   } else if (this.label.indexOf(this.resultData[data].label) == 1) {
      //     series2.push([
      //       this.resultData[data].feature1,
      //       this.resultData[data].feature2
      //     ]);
      //   } else if (this.label.indexOf(this.resultData[data].label) == 2) {
      //     series3.push([
      //       this.resultData[data].feature1,
      //       this.resultData[data].feature2
      //     ]);
      //   } else if (this.label.indexOf(this.resultData[data].label) == 3) {
      //     series4.push([
      //       this.resultData[data].feature1,
      //       this.resultData[data].feature2
      //     ]);
      //   }
      // }
      // this.soption.series[0].data = series1;
      // this.soption.series[1].data = series2;
      // this.soption.series[2].data = series3;
      // this.soption.series[3].data = series4;
      // //柱状图
      // var keys = Object.keys(this.resultData[0]);
      // for (let k of keys) {
      //   if (k !== "label" && k !== "index" && this.feature.indexOf(k) == -1) {
      //     this.feature.push(k);
      //     this.boption.series.push({
      //       type: "bar",
      //       barGap: 0,
      //       label: this.labelOption,
      //       name: k,
      //       data: []
      //     });
      //   }
      // }
      // var data01 = 0;
      // var data02 = 0;
      // var num0 = 0;
      // for (let item of this.soption.series[0].data) {
      //   if (item[0] != "feature1" && item[1] != "feature2") {
      //     data01 += item[0];
      //     data02 += item[1];
      //     num0++;
      //   }
      // }
      // var data11 = 0;
      // var data12 = 0;
      // var num1 = 0;
      // for (let item of this.soption.series[1].data) {
      //   if (item[0] != "feature1" && item[1] != "feature2") {
      //     data11 += item[0];
      //     data12 += item[1];
      //     num1++;
      //   }
      // }
      // var data21 = 0;
      // var data22 = 0;
      // var num2 = 0;
      // for (let item of this.soption.series[2].data) {
      //   if (item[0] != "feature1" && item[1] != "feature2") {
      //     data21 += item[0];
      //     data22 += item[1];
      //     num2++;
      //   }
      // }
      // var data31 = 0;
      // var data32 = 0;
      // var num3 = 0;
      // for (let item of this.soption.series[3].data) {
      //   if (item[0] != "feature1" && item[1] != "feature2") {
      //     data31 += item[0];
      //     data32 += item[1];
      //     num3++;
      //   }
      // }
      // this.boption.series[0].data = [
      //   (data01 / num0).toFixed(2),
      //   (data11 / num1).toFixed(2),
      //   (data21 / num2).toFixed(2),
      //   (data31 / num3).toFixed(2)
      // ];
      // this.boption.series[1].data = [
      //   (data02 / num0).toFixed(2),
      //   (data12 / num1).toFixed(2),
      //   (data22 / num2).toFixed(2),
      //   (data32 / num3).toFixed(2)
      // ];
      // //簇间特征对比表格
      // // this.dcols = ["name", "feature1", "feature2"];
      // if (this.dcols.indexOf("name") == -1) {
      //   this.dcols = this.feature.concat();
      //   this.dcols.unshift("name");
      //   for (let item in this.label) {
      //     let k = 0;
      //     this.decisionData.push({
      //       name: this.label[item],
      //       feature1: this.boption.series[k++].data[item],
      //       feature2: this.boption.series[k++].data[item]
      //     });
      //   }
      // }
      // 获取标签+数据
      const series1 = []
      const series2 = []
      const series3 = []
      const series4 = []
      const series5 = []
      const series6 = []
      this.soption.series = []
      // 散点图
      for (const data in this.resultData) {
        if (
          this.resultData[data].label !== 'label' &&
          this.label.indexOf(this.resultData[data].label) == -1
        ) {
          this.label.push(this.resultData[data].label)
          this.soption.series.push({
            name: '' + this.resultData[data].label,
            type: 'scatter',
            data: [],
            markArea: {
              silent: true,
              itemStyle: {
                normal: {
                  color: 'transparent',
                  borderWidth: 1,
                  borderType: 'dashed'
                }
              },
              data: [
                [
                  {
                    name: 'cluster' + this.resultData[data].label + '分布区域',
                    xAxis: 'min',
                    yAxis: 'min'
                  },
                  {
                    xAxis: 'max',
                    yAxis: 'max'
                  }
                ]
              ]
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              lineStyle: {
                normal: {
                  type: 'solid'
                }
              },
              data: [{ type: 'average', name: '平均值' }, { xAxis: 160 }]
            }
          })
        }
        // 根据实际聚类结果类别数要更改
        if (this.label.indexOf(this.resultData[data].label) == 0) {
          series1.push([
            this.resultData[data].feature1,
            this.resultData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultData[data].label) == 1) {
          series2.push([
            this.resultData[data].feature1,
            this.resultData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultData[data].label) == 2) {
          series3.push([
            this.resultData[data].feature1,
            this.resultData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultData[data].label) == 3) {
          series4.push([
            this.resultData[data].feature1,
            this.resultData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultData[data].label) == 4) {
          series5.push([
            this.resultData[data].feature1,
            this.resultData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultData[data].label) == 5) {
          series6.push([
            this.resultData[data].feature1,
            this.resultData[data].feature2
          ])
        }
      }
      this.soption.series[0].data = series1
      this.soption.series[1].data = series2
      this.soption.series[2].data = series3
      this.soption.series[3].data = series4
      this.soption.series[4].data = series5
      this.soption.series[5].data = series6
      // 柱状图
      var keys = Object.keys(this.resultData[0])
      for (const k of keys) {
        if (k !== 'label' && k !== 'index' && this.feature.indexOf(k) == -1) {
          this.feature.push(k)
          this.boption.series.push({
            type: 'bar',
            barGap: 0,
            label: this.labelOption,
            name: k,
            data: []
          })
        }
      }
      var data01 = 0
      var data02 = 0
      var num0 = 0
      for (const item of this.soption.series[0].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data01 += item[0]
          data02 += item[1]
          num0++
        }
      }
      var data11 = 0
      var data12 = 0
      var num1 = 0
      for (const item of this.soption.series[1].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data11 += item[0]
          data12 += item[1]
          num1++
        }
      }
      var data21 = 0
      var data22 = 0
      var num2 = 0
      for (const item of this.soption.series[2].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data21 += item[0]
          data22 += item[1]
          num2++
        }
      }
      var data31 = 0
      var data32 = 0
      var num3 = 0
      for (const item of this.soption.series[3].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data31 += item[0]
          data32 += item[1]
          num3++
        }
      }
      var data41 = 0
      var data42 = 0
      var num4 = 0
      for (const item of this.soption.series[4].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data41 += item[0]
          data42 += item[1]
          num4++
        }
      }
      var data51 = 0
      var data52 = 0
      var num5 = 0
      for (const item of this.soption.series[5].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data51 += item[0]
          data52 += item[1]
          num5++
        }
      }
      this.boption.series[0].data = [
        (data01 / num0).toFixed(2),
        (data11 / num1).toFixed(2),
        (data21 / num2).toFixed(2),
        (data31 / num3).toFixed(2),
        (data41 / num2).toFixed(2),
        (data51 / num3).toFixed(2)
      ]
      this.boption.series[1].data = [
        (data02 / num0).toFixed(2),
        (data12 / num1).toFixed(2),
        (data22 / num2).toFixed(2),
        (data32 / num3).toFixed(2),
        (data42 / num2).toFixed(2),
        (data52 / num3).toFixed(2)
      ]
      // 簇间特征对比表格
      // this.dcols = ["name", "feature1", "feature2"];
      if (this.dcols.indexOf('name') == -1) {
        this.dcols = this.feature.concat()
        this.dcols.unshift('name')
        for (const item in this.label) {
          let k = 0
          this.decisionData.push({
            name: this.label[item],
            feature1: this.boption.series[k++].data[item],
            feature2: this.boption.series[k++].data[item]
          })
        }
      }
      // //获取标签+数据
      // let series1 = [];
      // let series2 = [];
      // let series3 = [];
      // let series4 = [];
      // let series5 = [];
      // let series6 = [];
      // this.soption.series = [];
      // //散点图
      // for (let data in this.resultData) {
      //   if (
      //     this.resultData[data].label !== "label" &&
      //     this.label.indexOf(this.resultData[data].label) == -1
      //   ) {
      //     this.label.push(this.resultData[data].label);
      //     this.soption.series.push({
      //       name: "" + this.resultData[data].label,
      //       type: "scatter",
      //       data: [],
      //       markArea: {
      //         silent: true,
      //         itemStyle: {
      //           normal: {
      //             color: "transparent",
      //             borderWidth: 1,
      //             borderType: "dashed"
      //           }
      //         },
      //         data: [
      //           [
      //             {
      //               name: "cluster" + this.resultData[data].label + "分布区域",
      //               xAxis: "min",
      //               yAxis: "min"
      //             },
      //             {
      //               xAxis: "max",
      //               yAxis: "max"
      //             }
      //           ]
      //         ]
      //       },
      //       markPoint: {
      //         data: [
      //           { type: "max", name: "最大值" },
      //           { type: "min", name: "最小值" }
      //         ]
      //       },
      //       markLine: {
      //         lineStyle: {
      //           normal: {
      //             type: "solid"
      //           }
      //         },
      //         data: [{ type: "average", name: "平均值" }, { xAxis: 160 }]
      //       }
      //     });
      //   }
      //   //根据实际聚类结果类别数要更改
      //   if (this.label.indexOf(this.resultData[data].label) == 0) {
      //     series1.push([
      //       this.resultData[data].RI,
      //       this.resultData[data].Na,
      //       this.resultData[data].Mg,
      //       this.resultData[data].Al,
      //       this.resultData[data].Si,
      //       this.resultData[data].K,
      //       this.resultData[data].Ca,
      //       this.resultData[data].Ba,
      //       this.resultData[data].Fe
      //     ]);
      //   } else if (this.label.indexOf(this.resultData[data].label) == 1) {
      //     series2.push([
      //       this.resultData[data].RI,
      //       this.resultData[data].Na,
      //       this.resultData[data].Mg,
      //       this.resultData[data].Al,
      //       this.resultData[data].Si,
      //       this.resultData[data].K,
      //       this.resultData[data].Ca,
      //       this.resultData[data].Ba,
      //       this.resultData[data].Fe
      //     ]);
      //   } else if (this.label.indexOf(this.resultData[data].label) == 2) {
      //     series3.push([
      //       this.resultData[data].RI,
      //       this.resultData[data].Na,
      //       this.resultData[data].Mg,
      //       this.resultData[data].Al,
      //       this.resultData[data].Si,
      //       this.resultData[data].K,
      //       this.resultData[data].Ca,
      //       this.resultData[data].Ba,
      //       this.resultData[data].Fe
      //     ]);
      //   } else if (this.label.indexOf(this.resultData[data].label) == 3) {
      //     series4.push([
      //       this.resultData[data].RI,
      //       this.resultData[data].Na,
      //       this.resultData[data].Mg,
      //       this.resultData[data].Al,
      //       this.resultData[data].Si,
      //       this.resultData[data].K,
      //       this.resultData[data].Ca,
      //       this.resultData[data].Ba,
      //       this.resultData[data].Fe
      //     ]);
      //   } else if (this.label.indexOf(this.resultData[data].label) == 4) {
      //     series5.push([
      //       this.resultData[data].RI,
      //       this.resultData[data].Na,
      //       this.resultData[data].Mg,
      //       this.resultData[data].Al,
      //       this.resultData[data].Si,
      //       this.resultData[data].K,
      //       this.resultData[data].Ca,
      //       this.resultData[data].Ba,
      //       this.resultData[data].Fe
      //     ]);
      //   } else if (this.label.indexOf(this.resultData[data].label) == 5) {
      //     series6.push([
      //       this.resultData[data].RI,
      //       this.resultData[data].Na,
      //       this.resultData[data].Mg,
      //       this.resultData[data].Al,
      //       this.resultData[data].Si,
      //       this.resultData[data].K,
      //       this.resultData[data].Ca,
      //       this.resultData[data].Ba,
      //       this.resultData[data].Fe
      //     ]);
      //   }
      // }
      // this.soption.series[0].data = series1;
      // this.soption.series[1].data = series2;
      // this.soption.series[2].data = series3;
      // this.soption.series[3].data = series4;
      // this.soption.series[4].data = series5;
      // this.soption.series[5].data = series6;
      // //柱状图
      // var keys = Object.keys(this.resultData[0]);
      // for (let k of keys) {
      //   // if (k !== "label" && k !== "index" && this.feature.indexOf(k) == -1) {
      //   if (k !== "label" && k !== "Id" && this.feature.indexOf(k) == -1) {
      //     this.feature.push(k);
      //     this.boption.series.push({
      //       type: "bar",
      //       barGap: 0,
      //       label: this.labelOption,
      //       name: k,
      //       data: []
      //     });
      //   }
      // }
      // var data01 = 0;
      // var data02 = 0;
      // var data03 = 0;
      // var data04 = 0;
      // var data05 = 0;
      // var data06 = 0;
      // var data07 = 0;
      // var data08 = 0;
      // var data09 = 0;
      // var num0 = 0;
      // for (let item of this.soption.series[0].data) {
      //   if (
      //     item[0] != "RI" &&
      //     item[1] != "Na" &&
      //     item[2] != "Mg" &&
      //     item[3] != "Al" &&
      //     item[4] != "Si" &&
      //     item[5] != "K" &&
      //     item[6] != "Ca" &&
      //     item[7] != "Ba" &&
      //     item[8] != "Fe"
      //   ) {
      //     data01 += item[0];
      //     data02 += item[1];
      //     data03 += item[2];
      //     data04 += item[3];
      //     data05 += item[4];
      //     data06 += item[5];
      //     data07 += item[6];
      //     data08 += item[7];
      //     data09 += item[8];
      //     num0++;
      //   }
      // }
      // var data11 = 0;
      // var data12 = 0;
      // var data13 = 0;
      // var data14 = 0;
      // var data15 = 0;
      // var data16 = 0;
      // var data17 = 0;
      // var data18 = 0;
      // var data19 = 0;
      // var num1 = 0;
      // for (let item of this.soption.series[1].data) {
      //   if (
      //     item[0] != "RI" &&
      //     item[1] != "Na" &&
      //     item[2] != "Mg" &&
      //     item[3] != "Al" &&
      //     item[4] != "Si" &&
      //     item[5] != "K" &&
      //     item[6] != "Ca" &&
      //     item[7] != "Ba" &&
      //     item[8] != "Fe"
      //   ) {
      //     data11 += item[0];
      //     data12 += item[1];
      //     data13 += item[2];
      //     data14 += item[3];
      //     data15 += item[4];
      //     data16 += item[5];
      //     data17 += item[6];
      //     data18 += item[7];
      //     data19 += item[8];
      //     num1++;
      //   }
      // }
      // var data21 = 0;
      // var data22 = 0;
      // var data23 = 0;
      // var data24 = 0;
      // var data25 = 0;
      // var data26 = 0;
      // var data27 = 0;
      // var data28 = 0;
      // var data29 = 0;
      // var num2 = 0;
      // for (let item of this.soption.series[2].data) {
      //   if (
      //     item[0] != "RI" &&
      //     item[1] != "Na" &&
      //     item[2] != "Mg" &&
      //     item[3] != "Al" &&
      //     item[4] != "Si" &&
      //     item[5] != "K" &&
      //     item[6] != "Ca" &&
      //     item[7] != "Ba" &&
      //     item[8] != "Fe"
      //   ) {
      //     data21 += item[0];
      //     data22 += item[1];
      //     data23 += item[2];
      //     data24 += item[3];
      //     data25 += item[4];
      //     data26 += item[5];
      //     data27 += item[6];
      //     data28 += item[7];
      //     data29 += item[8];
      //     num2++;
      //   }
      // }
      // var data31 = 0;
      // var data32 = 0;
      // var data33 = 0;
      // var data34 = 0;
      // var data35 = 0;
      // var data36 = 0;
      // var data37 = 0;
      // var data38 = 0;
      // var data39 = 0;
      // var num3 = 0;
      // for (let item of this.soption.series[3].data) {
      //   if (
      //     item[0] != "RI" &&
      //     item[1] != "Na" &&
      //     item[2] != "Mg" &&
      //     item[3] != "Al" &&
      //     item[4] != "Si" &&
      //     item[5] != "K" &&
      //     item[6] != "Ca" &&
      //     item[7] != "Ba" &&
      //     item[8] != "Fe"
      //   ) {
      //     data31 += item[0];
      //     data32 += item[1];
      //     data33 += item[2];
      //     data34 += item[3];
      //     data35 += item[4];
      //     data36 += item[5];
      //     data37 += item[6];
      //     data38 += item[7];
      //     data39 += item[8];
      //     num3++;
      //   }
      // }
      // var data41 = 0;
      // var data42 = 0;
      // var data43 = 0;
      // var data44 = 0;
      // var data45 = 0;
      // var data46 = 0;
      // var data47 = 0;
      // var data48 = 0;
      // var data49 = 0;
      // var num4 = 0;
      // for (let item of this.soption.series[4].data) {
      //   if (
      //     item[0] != "RI" &&
      //     item[1] != "Na" &&
      //     item[2] != "Mg" &&
      //     item[3] != "Al" &&
      //     item[4] != "Si" &&
      //     item[5] != "K" &&
      //     item[6] != "Ca" &&
      //     item[7] != "Ba" &&
      //     item[8] != "Fe"
      //   ) {
      //     data41 += item[0];
      //     data42 += item[1];
      //     data43 += item[2];
      //     data44 += item[3];
      //     data45 += item[4];
      //     data46 += item[5];
      //     data47 += item[6];
      //     data48 += item[7];
      //     data49 += item[8];
      //     num4++;
      //   }
      // }
      // var data51 = 0;
      // var data52 = 0;
      // var data53 = 0;
      // var data54 = 0;
      // var data55 = 0;
      // var data56 = 0;
      // var data57 = 0;
      // var data58 = 0;
      // var data59 = 0;
      // var num5 = 0;
      // for (let item of this.soption.series[5].data) {
      //   if (
      //     item[0] != "RI" &&
      //     item[1] != "Na" &&
      //     item[2] != "Mg" &&
      //     item[3] != "Al" &&
      //     item[4] != "Si" &&
      //     item[5] != "K" &&
      //     item[6] != "Ca" &&
      //     item[7] != "Ba" &&
      //     item[8] != "Fe"
      //   ) {
      //     data51 += item[0];
      //     data52 += item[1];
      //     data53 += item[2];
      //     data54 += item[3];
      //     data55 += item[4];
      //     data56 += item[5];
      //     data57 += item[6];
      //     data58 += item[7];
      //     data59 += item[8];
      //     num5++;
      //   }
      // }
      // this.boption.series[0].data = [
      //   (data01 / num0).toFixed(2),
      //   (data11 / num1).toFixed(2),
      //   (data21 / num2).toFixed(2),
      //   (data31 / num3).toFixed(2),
      //   (data41 / num4).toFixed(2),
      //   (data51 / num5).toFixed(2)
      // ];
      // this.boption.series[1].data = [
      //   (data02 / num0).toFixed(2),
      //   (data12 / num1).toFixed(2),
      //   (data22 / num2).toFixed(2),
      //   (data32 / num3).toFixed(2),
      //   (data42 / num4).toFixed(2),
      //   (data52 / num5).toFixed(2)
      // ];
      // this.boption.series[2].data = [
      //   (data03 / num0).toFixed(2),
      //   (data13 / num1).toFixed(2),
      //   (data23 / num2).toFixed(2),
      //   (data33 / num3).toFixed(2),
      //   (data43 / num4).toFixed(2),
      //   (data53 / num5).toFixed(2)
      // ];
      // this.boption.series[3].data = [
      //   (data04 / num0).toFixed(2),
      //   (data14 / num1).toFixed(2),
      //   (data24 / num2).toFixed(2),
      //   (data34 / num3).toFixed(2),
      //   (data44 / num4).toFixed(2),
      //   (data54 / num5).toFixed(2)
      // ];
      // this.boption.series[4].data = [
      //   (data05 / num0).toFixed(2),
      //   (data15 / num1).toFixed(2),
      //   (data25 / num2).toFixed(2),
      //   (data35 / num3).toFixed(2),
      //   (data45 / num4).toFixed(2),
      //   (data55 / num5).toFixed(2)
      // ];
      // this.boption.series[5].data = [
      //   (data06 / num0).toFixed(2),
      //   (data16 / num1).toFixed(2),
      //   (data26 / num2).toFixed(2),
      //   (data36 / num3).toFixed(2),
      //   (data46 / num4).toFixed(2),
      //   (data56 / num5).toFixed(2)
      // ];
      // this.boption.series[6].data = [
      //   (data07 / num0).toFixed(2),
      //   (data17 / num1).toFixed(2),
      //   (data27 / num2).toFixed(2),
      //   (data37 / num3).toFixed(2),
      //   (data47 / num4).toFixed(2),
      //   (data57 / num5).toFixed(2)
      // ];
      // this.boption.series[7].data = [
      //   (data08 / num0).toFixed(2),
      //   (data18 / num1).toFixed(2),
      //   (data28 / num2).toFixed(2),
      //   (data38 / num3).toFixed(2),
      //   (data48 / num4).toFixed(2),
      //   (data58 / num5).toFixed(2)
      // ];
      // this.boption.series[8].data = [
      //   (data09 / num0).toFixed(2),
      //   (data19 / num1).toFixed(2),
      //   (data29 / num2).toFixed(2),
      //   (data39 / num3).toFixed(2),
      //   (data49 / num4).toFixed(2),
      //   (data59 / num5).toFixed(2)
      // ];
      // //簇间特征对比表格
      // // this.dcols = ["name", "feature1", "feature2"];
      // if (this.dcols.indexOf("name") == -1) {
      //   this.dcols = this.feature.concat();
      //   this.dcols.unshift("name");
      //   for (let item in this.label) {
      //     let k = 0;
      //     this.decisionData.push({
      //       name: this.label[item],
      //       RI: this.boption.series[k++].data[item],
      //       Na: this.boption.series[k++].data[item],
      //       Mg: this.boption.series[k++].data[item],
      //       Al: this.boption.series[k++].data[item],
      //       Si: this.boption.series[k++].data[item],
      //       K: this.boption.series[k++].data[item],
      //       Ca: this.boption.series[k++].data[item],
      //       Ba: this.boption.series[k++].data[item],
      //       Fe: this.boption.series[k++].data[item]
      //     });
      //   }
      // }
    },
    // 聚类结果可视化
    drawPoint(id) {
      this.charts = echarts.init(document.getElementById(id))
      var rawDatas = []
      var label = [
        // glass的label
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
      ]
      var slabel = []
      for (const i in this.label) {
        slabel.push('' + this.label[i])
        var rawData = {
          name: slabel[i],
          type: 'scatter',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: []
        }
        rawDatas.push(rawData)
      }
      for (const data of this.resultData) {
        const i = parseInt(data.label) - 1
        rawDatas[i].data.push(Object.values(data))
      }

      this.charts.setOption({
        title: {
          // text: "男性女性身高体重分布"
          // text: this.soption.title
          // text: "D31"
          // subtext: "抽样调查来自: Heinz  2003"
        },
        grid: {
          left: '5%',
          right: '7%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          // trigger: 'axis',
          showDelay: 0,
          formatter: function(params) {
            if (params.value.length > 1) {
              return (
                // params.label + " :<br/>" + params.value[0] + params.value[1]
                params.value[2] + ' :<br/>' + params.value[0] + params.value[1]
              )
            } else {
              return (
                params.seriesName +
                ' :<br/>' +
                params.name +
                ' : ' +
                params.value
              )
            }
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        toolbox: {
          feature: {
            dataZoom: {},
            magicType: { show: true, type: ['line'] }, // 折线图是单维数据
            // dataView: {show: true, readOnly: false},
            restore: { show: true },
            saveAsImage: { show: true },
            brush: {
              type: ['rect', 'polygon', 'clear']
            }
          }
        },
        brush: {},
        color: [
          '#000000',
          '#8C0044',
          '#880000',
          '#A42D00',
          '#BB5500',
          '#886600',
          '#888800',
          '#668800',
          '#227700',
          '#008800',
          '#008844',
          '#008866',
          '#008888',
          '#007799',
          '#003377',
          '#000088',
          '#220088',
          '#3a0088',
          '#550088',
          '#660077',
          '#770077',
          '#CC0000',
          '#FF5511',
          '#FF8800',
          '#FFBB00',
          '#FFFF00',
          '#BBFF00',
          '#77FF00',
          '#00FF00',
          '#5500FF',
          '#585858'
        ],
        legend: {
          // data: ["女性", "男性"],
          // data: ["" + this.label[0], "" + this.label[1]], //据实际情况编辑
          // data: ["" + this.label[0], "" + this.label[1], "" + this.label[2], "" + this.label[3]], //据实际情况编辑
          data: [
            '' + this.label[0],
            '' + this.label[1],
            '' + this.label[2],
            '' + this.label[3],
            '' + this.label[4],
            '' + this.label[5]
          ], // 据实际情况编辑
          // data: this.label,
          // left: "center",
          type: 'scroll',
          orient: 'horizontal',
          left: '8%',
          right: '38%',
          icon: 'circle'
        },
        xAxis: [
          {
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false
            }
          }
        ],

        visualMap: [
          // 按照label列的不同数值，显示不同颜色
          {
            show: false,
            dimension: 2, // 默认为最后一列
            categories: slabel,
            inRange: {
              symbol: {
                '': 'circle'
              },
              color: (function() {
                var colors = [
                  '#000000',
                  '#8C0044',
                  '#880000',
                  '#A42D00',
                  '#BB5500',
                  '#886600',
                  '#888800',
                  '#668800',
                  '#227700',
                  '#008800',
                  '#008844',
                  '#008866',
                  '#008888',
                  '#007799',
                  '#003377',
                  '#000088',
                  '#220088',
                  '#3a0088',
                  '#550088',
                  '#660077',
                  '#770077',
                  '#CC0000',
                  '#FF5511',
                  '#FF8800',
                  '#FFBB00',
                  '#FFFF00',
                  '#BBFF00',
                  '#77FF00',
                  '#00FF00',
                  '#5500FF',
                  '#585858'
                ]
                return colors.concat(colors)
              })()
            }
          }
          // {
          //   show: true,
          //   dimension: 3,
          //   categories: ["1", "2"],
          //   inRange: {
          //     symbol: {
          //       "2": "diamond",
          //       "1": "circle"
          //     }
          //   },
          //   outOfRange: {
          //     symbol: {
          //       "2": "diamond",
          //       "1": "circle"
          //     }
          //   }
          // }
        ],
        // series: this.soption.series
        series: rawDatas
      })
    },

    // 热力图
    drawHeatmap(id) {
      this.charts = echarts.init(document.getElementById(id))

      var xData = this.resultData.map(item => item.feature1)
      var yData = this.resultData.map(item => item.feature2)
      var zlabel = this.resultData.map(item => item.label)
      var rawData = []
      for (const i in this.resultData) {
        const da = []
        da.push(xData[i])
        da.push(yData[i])
        da.push(zlabel[i])
        rawData.push(da)
      }

      this.charts.setOption({
        tooltip: {},
        xAxis: {
          type: 'value',
          data: xData
        },
        yAxis: {
          type: 'value',
          data: yData
        },
        // visualMap: {
        //   type: "piecewise",
        //   categories: this.label,
        //   min: 0,
        //   max: 1,
        //   calculable: true,
        //   realtime: false,
        //   // dimension: CATEGORY_DIM,
        //   orient: "horizontal",
        //   top: 0,
        //   left: "center",
        //   inRange: {
        //     color: [
        //       "#313695",
        //       "#4575b4",
        //       "#74add1",
        //       "#abd9e9",
        //       "#e0f3f8",
        //       "#ffffbf",
        //       "#fee090",
        //       "#fdae61",
        //       "#f46d43",
        //       "#d73027",
        //       "#a50026"
        //     ]
        //   },
        //   outOfRange: {
        //     color: "#ddd"
        //   }
        //   // seriesIndex: [0]
        // },
        visualMap: {
          min: 0,
          max: 40,
          // calculable: true,
          // realtime: false,
          inRange: {
            color: [
              '#000000',
              '#8C0044',
              '#880000',
              '#A42D00',
              '#BB5500',
              '#886600',
              '#888800',
              '#668800',
              '#227700',
              '#008800',
              '#008844',
              '#008866',
              '#008888',
              '#007799',
              '#003377',
              '#000088',
              '#220088',
              '#3a0088',
              '#550088',
              '#660077',
              '#770077',
              '#CC0000',
              '#FF5511',
              '#FF8800',
              '#FFBB00',
              '#FFFF00',
              '#BBFF00',
              '#77FF00',
              '#00FF00',
              '#5500FF'
            ]
          }
        },
        series: [
          {
            name: '0',
            type: 'heatmap',
            data: rawData,
            emphasis: {
              itemStyle: {
                borderColor: '#333',
                borderWidth: 1
              }
            },
            // progressive: 1000,
            animation: false
          }
        ]
      })
    },
    drawHeatmap2(id) {
      this.charts = echarts.init(document.getElementById(id))

      var rawData = []
      // rawData = this.boption.series;
      var i = 0
      var j = 0
      for (const fe of this.boption.series) {
        const fee = Object.values(fe.data)
        for (const da in fee) {
          const rda = []
          rda.push(j++)
          rda.push(i)
          rda.push(fee[da])
          rawData.push(rda)
        }
        i = i + 1
        j = 0
      }

      this.charts.setOption({
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: this.label,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: this.feature,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 50,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          inRange: {
            color: [
              '#bcd3bb',
              '#e88f70',
              '#edc1a5',
              '#9dc5c8',
              '#e1e8c8',
              '#7b7c68',
              '#e5b5b5',
              '#f0b489',
              '#928ea8',
              '#bda29a'
            ]
          }
        },
        series: [
          {
            name: 'Punch Card',
            type: 'heatmap',
            data: rawData,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },

    drawParallel(id) {
      this.charts = echarts.init(document.getElementById(id))
      var schema = [
        // { name: "feature1", index: 1, text: "feature1" },
        // { name: "feature2", index: 2, text: "feature2" },
        // { name: "label", index: 3, text: "Label" }
        { name: 'feature1', index: 0, text: 'feature1' },
        { name: 'feature2', index: 1, text: 'feature2' },
        { name: 'label', index: 2, text: 'Label' }
        // { name: "RI", index: 1, text: "RI" },
        // { name: "Na", index: 2, text: "Na" },
        // { name: "Mg", index: 3, text: "Mg" },
        // { name: "Al", index: 4, text: "Al" },
        // { name: "Si", index: 5, text: "Si" },
        // { name: "K", index: 6, text: "K" },
        // { name: "Ca", index: 7, text: "Ca" },
        // { name: "Ba", index: 8, text: "Ba" },
        // { name: "Fe", index: 9, text: "Fe" },
        // { name: "label", index: 10, text: "Label" }
      ]
      var CATEGORY_DIM = schema.length - 1
      var rawData = []
      for (const data of this.resultData) {
        rawData.push(Object.values(data))
      }
      this.charts.setOption({
        animation: false,
        brush: {
          brushLink: 'all',
          xAxisIndex: [],
          yAxisIndex: [],
          inBrush: {
            opacity: 1
          }
        },
        visualMap: {
          // show: false,
          type: 'piecewise',
          categories: this.label,
          // dimension: CATEGORY_DIM,
          dimension: 2,
          orient: 'horizontal',
          top: 0,
          left: 'center',

          inRange: {
            color: [
              '#bcd3bb',
              '#e88f70',
              '#edc1a5',
              '#9dc5c8',
              '#e1e8c8',
              '#7b7c68',
              '#e5b5b5',
              '#f0b489',
              '#928ea8',
              '#bda29a'
            ]
          }
          // outOfRange: {
          //   color: "#ddd"
          // },
          // seriesIndex: [3]
        },
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          feature: {
            // dataZoom: {},
            // magicType: { show: true, type: ["line"] }, //折线图是单维数据
            // dataView: {show: true, readOnly: false},
            restore: { show: true },
            saveAsImage: { show: true },
            brush: {
              type: ['rect', 'polygon', 'clear']
            }
          }
        },
        parallelAxis: [
          { dim: 0, name: schema[0].text },
          { dim: 1, name: schema[1].text },
          { dim: 2, name: schema[2].text }
          // { dim: 1, name: schema[0].text },
          // { dim: 2, name: schema[1].text },
          // { dim: 3, name: schema[2].text }
          // { dim: 4, name: schema[3].text },
          // { dim: 5, name: schema[4].text },
          // { dim: 6, name: schema[5].text },
          // { dim: 7, name: schema[6].text },
          // { dim: 8, name: schema[7].text },
          // { dim: 9, name: schema[8].text },
          // { dim: 10, name: schema[9].text }
        ],
        parallel: {},
        grid: [],
        xAxis: [],
        yAxis: [],
        series: [
          {
            name: 'parallel',
            type: 'parallel',
            smooth: true,
            lineStyle: {
              width: 1,
              opacity: 0.3
            },
            data: rawData
          }
        ]
      })
    },
    drawThemeRiver(id) {
      this.charts = echarts.init(document.getElementById(id))

      const rawData = []
      for (const data of this.resultData) {
        var arr = []
        arr.push(data.feature1, data.feature2, data.label)
        rawData.push(arr)
        // rawData.push(Object.values(data))
      }

      this.charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'rgba(0,0,0,0.2)',
              width: 1,
              type: 'solid'
            }
          }
        },

        legend: {
          data: this.label
        },

        singleAxis: {
          top: 50,
          bottom: 50,
          axisTick: {},
          axisLabel: {},
          type: 'time',
          axisPointer: {
            animation: true,
            label: {
              show: true
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.2
            }
          }
        },

        series: [
          {
            type: 'themeRiver',
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.8)'
              }
            },
            data: rawData
          }
        ]
      })
    },

    // 评估指标可视化
    drawyibiaowaichart(id) {
      this.charts = echarts.init(document.getElementById(id))

      this.charts.setOption({
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '纯度',
            type: 'gauge',
            center: ['13%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 1,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '0.5':
                    return 'Purity'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.0, name: 'Purity' }]
          },
          {
            name: 'Jaccard指数',
            type: 'gauge',
            center: ['13%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 1,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '0.5':
                    return 'Jaccard'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.0, name: 'Jaccard' }]
          },
          {
            name: 'Foulkes-Mallows scores',
            type: 'gauge',
            center: ['38%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 1,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '0.5':
                    return 'F-M'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.0, name: 'F-M' }]
          },
          {
            name: '调和平均',
            type: 'gauge',
            center: ['38%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 1,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '0.5':
                    return '调和平均'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.0, name: '调和平均' }]
          },
          {
            name: '标准化互信息',
            type: 'gauge',
            center: ['63%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 1,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '0.5':
                    return 'NMI'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.0, name: 'NMI' }]
          },
          {
            name: '兰德系数',
            type: 'gauge',
            center: ['63%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 1,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '0.5':
                    return 'RI'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.0, name: 'RI' }]
          },
          {
            name: '调整互信息',
            type: 'gauge',
            center: ['88%', '30%'], // 默认全局居中
            radius: '35%',
            min: -1,
            max: 1,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '-1':
                    return '-1'
                  case '0':
                    return 'AMI'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.0, name: 'AMI' }]
          },
          {
            name: '调整兰德系数',
            type: 'gauge',
            center: ['88%', '30%'], // 默认全局居中
            radius: '35%',
            min: -1,
            max: 1,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '-1':
                    return '-1'
                  case '0':
                    return 'ARI'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.0, name: 'ARI' }]
          }
        ]
      })
    },
    drawyibiaoneichart(id) {
      this.charts = echarts.init(document.getElementById(id))

      this.charts.setOption({
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '误差平方和',
            type: 'gauge',
            center: ['20%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 10000,
            endAngle: 45,
            splitNumber: 10,
            axisLabel: {
              show: false
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, '-30%'] // x, y，单位px
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder'
            },
            data: [{ value: 6288.11, name: 'SSE' }]
          },
          {
            name: '轮廓系数',
            type: 'gauge',
            center: ['45%', '35%'], // 默认全局居中
            radius: '45%',
            min: -1,
            max: 1,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '-1':
                    return '-1'
                  case '0':
                    return '轮廓系数'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.32, name: '轮廓系数' }]
          },
          {
            name: 'CHI',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 1000,
            splitNumber: 10,
            center: ['80%', '35%'],
            radius: '50%',
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              show: false,
              backgroundColor: 'auto',
              borderRadius: 2,
              color: '#eee',
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: '#222'
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic'
            },

            data: [{ value: 914.0, name: 'CHI' }]
          },
          {
            name: 'DBI',
            type: 'gauge',
            center: ['20%', '75%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 7,
            endAngle: 45,
            splitNumber: 7,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, '-30%'] // x, y，单位px
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder'
            },
            data: [{ value: 0.516, name: 'DBI' }]
          },
          {
            name: 'DVI',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 1,
            splitNumber: 10,
            center: ['50%', '70%'],
            radius: '50%',
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              show: false,
              backgroundColor: 'auto',
              borderRadius: 2,
              color: '#eee',
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: '#222'
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic'
            },
            data: [{ value: 0.082, name: 'DVI' }]
          },
          {
            name: '紧密性',
            type: 'gauge',
            center: ['80%', '70%'], // 默认全局居中
            radius: '25%',
            min: 0,
            max: 20,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return 'L'
                  case '5':
                    return 'CP'
                  case '10':
                    return 'H'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 17.238, name: 'CP' }]
          },
          {
            name: '间隔性',
            type: 'gauge',
            center: ['80%', '75%'], // 默认全局居中
            radius: '25%',
            min: 0,
            max: 200,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return 'L'
                  case '10':
                    return 'SP'
                  case '20':
                    return 'H'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 167.258, name: 'SP' }]
          }
        ]
      })
    },

    // 特征分析可视化
    drawBar(id) {
      this.charts = echarts.init(document.getElementById(id))
      // var posList = [
      //   "left",
      //   "right",
      //   "top",
      //   "bottom",
      //   "inside",
      //   "insideTop",
      //   "insideLeft",
      //   "insideRight",
      //   "insideBottom",
      //   "insideTopLeft",
      //   "insideTopRight",
      //   "insideBottomLeft",
      //   "insideBottomRight"
      // ];
      // app.configParameters = {
      //   rotate: {
      //     min: -90,
      //     max: 90
      //   },
      //   align: {
      //     options: {
      //       left: "left",
      //       center: "center",
      //       right: "right"
      //     }
      //   },
      //   verticalAlign: {
      //     options: {
      //       top: "top",
      //       middle: "middle",
      //       bottom: "bottom"
      //     }
      //   },
      //   position: {
      //     options: echarts.util.reduce(
      //       posList,
      //       function(map, pos) {
      //         map[pos] = pos;
      //         return map;
      //       },
      //       {}
      //     )
      //   },
      //   distance: {
      //     min: 0,
      //     max: 100
      //   }
      // };
      // app.config = {
      //   rotate: 90,
      //   align: "left",
      //   verticalAlign: "middle",
      //   position: "insideBottom",
      //   distance: 15,
      //   onChange: function() {
      //     var labelOption = {
      //       normal: {
      //         rotate: app.config.rotate,
      //         align: app.config.align,
      //         verticalAlign: app.config.verticalAlign,
      //         position: app.config.position,
      //         distance: app.config.distance
      //       }
      //     };
      //     myChart.setOption({
      //       series: [
      //         {
      //           label: labelOption
      //         },
      //         {
      //           label: labelOption
      //         }
      //         // {
      //         //   label: labelOption
      //         // },
      //         // {
      //         //   label: labelOption
      //         // }
      //       ]
      //     });
      //   }
      // };
      // var labelOption = {
      //   show: false,
      //   rotate: 90,
      //   align: "left",
      //   verticalAlign: "middle",
      //   position: "insideBottom",
      //   distance: 15,
      //   formatter: "{c}  {name|{a}}",
      //   fontSize: 16,
      //   rich: {
      //     name: {
      //       textBorderColor: "#fff"
      //     }
      //   }
      // };
      this.charts.setOption({
        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          // data: ["" + this.feature[0], "" + this.feature[1]] //据实际情况编辑
          data: [
            '' + this.feature[0],
            '' + this.feature[1]
            // "" + this.feature[2],
            // "" + this.feature[3],
            // "" + this.feature[4],
            // "" + this.feature[5],
            // "" + this.feature[6],
            // "" + this.feature[7],
            // "" + this.feature[8],
            // "" + this.feature[9]
            // "" + this.feature[10]
          ] // 据实际情况编辑
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            boundaryGap: true,
            data: [
              '' + this.label[0],
              '' + this.label[1],
              '' + this.label[2],
              '' + this.label[3],
              '' + this.label[4],
              '' + this.label[5]
            ] // 据实际情况编辑
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.boption.series
      })
    },
    drawTree(id) {
      this.charts = echarts.init(document.getElementById(id))

      this.charts.setOption({
        series: [
          {
            type: 'treemap',
            visualMap: {
              color: [
                '#c23531',
                '#314656',
                '#61a0a8',
                '#dd8668',
                '#91c7ae',
                '#6e7074',
                '#61a0a8',
                '#bda29a',
                '#44525d',
                '#c4ccd3'
              ]
            },
            data: [
              //  //test
              // {
              //    name: "2小于等于0.5",
              //    value:79,
              //    children:[{
              //       name: "2小于等于0.5",
              //       value:41,
              //       children:[{
              //           name: "1小于等于-1.0",
              //           value:20,
              //           children:[{
              //               name :"2小于等于-0.5",
              //               value:19,
              //           },
              //           {
              //               name :"2大于-0.5",
              //               value:1,
              //           }]

              //       },
              //       {
              //           name: "1大于-1.0",
              //           value:21,
              //           children:[{
              //               name :"1小于等于0.5",
              //               value:4,
              //               children:[{
              //               name :"2小于等于-3.5",
              //               value:1,
              //           },{
              //               name :"2大于-3.5",
              //               value:3,
              //               children:[{
              //               name :"2小于等于-1.5",
              //               value:2,
              //           },{
              //               name :"2大于-1.5",
              //               value:1,
              //           }]
              //           }]
              //           },{
              //               name :"1大于0.5",
              //               value:17,

              //           }]
              //       }
              //       ]
              //   },
              //   {
              //   name: "2大于0.5",
              //   value:38,
              //       children:[{
              //        name: "1小于等于0.5",
              //        value:20,
              //        children:[{
              //               name :"1小于等于-0.5",
              //               value:17,
              //           },{
              //               name :"1大于-0.5",
              //               value:3,
              //               children:[{
              //               name :"2小于等于2.5",
              //               value:2,
              //           },{
              //               name :"2大于0.5",
              //               value:1,
              //           }]
              //           }]
              //       },
              //       {
              //       name: "1大于0.5",
              //       value:18,
              //       }
              //       ]
              //   }
              //   ]
              // }

              //  //jain
              //     {
              //      name: "2小于等于17.5",
              //      value:373,
              //      children:[{
              //         name: "2小于等于17.5",
              //         value:297,
              //         children:[{
              //             name: "2小于等于13.5",
              //             value:225,

              //         },
              //         {
              //             name: "2大于13.5，1小于等于10.5",
              //             value:72,
              //             children:[{
              //                 name :"1小于等于10.5",
              //                 value:9,
              //             },{
              //                 name :"1大于10.5，1小于等于32.0",
              //                 value:63,

              //                 children:[{
              //                     name :"1小于等于32.0",
              //                     value:37,
              //                      children:[{
              //                     name :"1小于等于19.0",
              //                     value:25,
              //                 },{
              //                     name :"1大于19.0",
              //                     value:12,

              //                 }]
              //                 },{
              //                     name :"1大于32.0",
              //                     value:26,

              //                 }]
              //             }]
              //         }
              //         ]
              //     },
              //     {
              //     name: "2大于17.5",
              //     value:76,
              //     }
              //     ]
              //     }
              // compound
              {
                name: '2.255',
                value: 398,
                children: [
                  {
                    name: '1小于等于24',
                    value: 257,
                    children: [
                      {
                        name: '2小于等于14.0',
                        value: 174,
                        children: [
                          {
                            name: '1小于等于14.5',
                            value: 72
                          },
                          {
                            name: '1大于14.5',
                            value: 102,
                            children: [
                              {
                                name: '1小于等于17.5',
                                value: 52,
                                children: [
                                  {
                                    name: '2小于等于10.5',
                                    value: 31,
                                    children: [
                                      {
                                        name: '2小于等于8.0',
                                        value: 15
                                      },
                                      {
                                        name: '0大于8.0',
                                        value: 16
                                      }
                                    ]
                                  },
                                  {
                                    name: '2大于10.5',
                                    value: 21
                                  }
                                ]
                              },
                              {
                                name: '1大于17.5',
                                value: 60
                              }
                            ]
                          }
                        ]
                      },
                      {
                        name: '2大于14.0',
                        value: 83,
                        children: [
                          {
                            name: '1小于等于14.5',
                            value: 39,
                            children: [
                              {
                                name: '1小于等于13.5',
                                value: 37
                              },
                              {
                                name: '1大于13.5',
                                value: 2,
                                children: [
                                  {
                                    name: '2小于等于19.0',
                                    value: 1
                                  },
                                  {
                                    name: '2大于19.0',
                                    value: 1
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            name: '1大于14.5',
                            value: 44
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: '1大24.0',
                    value: 141,
                    children: [
                      {
                        name: '2小于等于13.5',
                        value: 24,
                        children: [
                          {
                            name: '2小于等于12.5',
                            value: 20
                          },
                          {
                            name: '2大于12.5',
                            value: 4,
                            children: [
                              {
                                name: '1小于等于31.5',
                                value: 2
                              },
                              {
                                name: '1大于31.5',
                                value: 2
                              }
                            ]
                          }
                        ]
                      },
                      {
                        name: '2大于13.5',
                        value: 18,
                        children: [
                          {
                            name: '2小于等于19.5',
                            value: 105,
                            children: [
                              {
                                name: '1小于等于29.5',
                                value: 6
                              },
                              {
                                name: '1大于29.5',
                                value: 99,
                                children: [
                                  {
                                    name: '1小于等于39.0',
                                    value: 94,
                                    children: [
                                      {
                                        name: '1小于等于30.5',
                                        value: 2,
                                        children: [
                                          {
                                            name: '2小于等于16.0',
                                            value: 1
                                          },
                                          {
                                            name: '2大于16.0',
                                            value: 1
                                          }
                                        ]
                                      },
                                      {
                                        name: '1大于30.5',
                                        value: 92,
                                        children: [
                                          {
                                            name: '2小于等于15.5',
                                            value: 25,
                                            children: [
                                              {
                                                name: '1小于等于35.0',
                                                value: 23
                                              },
                                              {
                                                name: '1大于35.0',
                                                value: 2
                                              }
                                            ]
                                          },
                                          {
                                            name: '2大于15.5',
                                            value: 67
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    name: '1大于39.0',
                                    value: 5
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            name: '2大于19.5',
                            value: 12
                          }
                        ]
                      }
                    ]
                  }
                ]
              }

              // // glass
              // {
              //   name: "ALL",
              //   value: 213,
              //   children: [
              //     {
              //       name: "3小于等于2.5",
              //       value: 71,
              //       children: [
              //         {
              //           name: "2小于等于13.5",
              //           value: 38,
              //           children: [
              //             {
              //               name: "3小于等于1.5",
              //               value: 25,
              //               children: [
              //                 {
              //                   name: "7小于等于12.5",
              //                   value: 18,
              //                   children: [
              //                     {
              //                       name: "7小于等于9.5",
              //                       value: 6,
              //                       children: [
              //                         { name: "5小于等于72.5", value: 3 },
              //                         { name: "5大于72.5", value: 3 }
              //                       ]
              //                     },
              //                     {
              //                       name: "7大于9.5",
              //                       value: 12,
              //                       children: [
              //                         { name: "2小于等于12.5", value: 6 },
              //                         { name: "2大于12.5", value: 6 }
              //                       ]
              //                     }
              //                   ]
              //                 },
              //                 { name: "7大于12.5", value: 7 }
              //               ]
              //             },
              //             { name: "3大于1.5", value: 13 }
              //           ]
              //         },
              //         {
              //           name: "nod2大于13.5",
              //           value: 33,
              //           children: [
              //             {
              //               name: "8小于等于0.5",
              //               value: 20,
              //               children: [
              //                 { name: "4小于等于1.5", value: 8 },
              //                 {
              //                   name: "4大于1.5",
              //                   value: 12,
              //                   children: [
              //                     { name: "7小于等于9.5", value: 11 },
              //                     { name: "7大于9.5", value: 1 }
              //                   ]
              //                 }
              //               ]
              //             },
              //             {
              //               name: "8大于0.5",
              //               value: 13,
              //               children: [
              //                 { name: "5小于等于69.5", value: 1 },
              //                 { name: "5大于69.5", value: 12 }
              //               ]
              //             }
              //           ]
              //         }
              //       ]
              //     },
              //     {
              //       name: "3大于2.5",
              //       value: 142,
              //       children: [
              //         {
              //           name: "7小于等于7.5",
              //           value: 19,
              //           children: [
              //             { name: "7小于等于6.0", value: 2 },
              //             { name: "7大于6.0", value: 17 }
              //           ]
              //         },
              //         {
              //           name: "7大于7.5",
              //           value: 123,
              //           children: [
              //             {
              //               name: "4小于等于0.5",
              //               value: 21,
              //               children: [
              //                 {
              //                   name: "7小于等于10.5",
              //                   value: 20,
              //                   children: [
              //                     { name: "7小于等于8.5", value: 2 },
              //                     {
              //                       name: "7大于8.5",
              //                       value: 18,
              //                       children: [
              //                         { name: "2小于等于13.5", value: 10 },
              //                         { name: "2大于13.5", value: 8 }
              //                       ]
              //                     }
              //                   ]
              //                 },
              //                 { name: "7大于10.5", value: 1 }
              //               ]
              //             },
              //             {
              //               name: "4大于0.5",
              //               value: 102,
              //               children: [
              //                 {
              //                   name: "2小于等于12.5",
              //                   value: 39,
              //                   children: [
              //                     { name: "5小于等于72.5", value: 18 },
              //                     { name: "5大于72.5", value: 21 }
              //                   ]
              //                 },
              //                 { name: "2大于12.5", value: 63 }
              //               ]
              //             }
              //           ]
              //         }
              //       ]
              //     }
              //   ]
              // }
            ]
          }
        ]
      })
    },

    // 聚类结果对比分析
    preContraData(file, fileList) {
      var files = file
        var fileList
      if (!files || files.length == 0) {
        this.cols = []
        this.resultContraData = []
        return
      }
      // this.filename = file.name;
      // this.filepath = "/mycode/dataset/" + this.filename;
      // let formData = new FormData();
      // formData.append('filePath', this.filepath);
      // formData.append('file', file);
      if (!file) return
      this.soption.title = file.name.split('.')[0]
      if (file.name.split('.')[1] == 'txt') {
        this.listLoading = false
        this.selectedTxt(file)
      } else if (file.name.split('.')[1] == 'csv') {
        // ||file.name.split(".")[1]=='xlsx'||file.name.split(".")[1]=='xls'
        this.listLoading = false
        this.selectedContraExcel(file)
      } else {
        this.$message.warning(
          '您上传的格式暂不支持，请转换为系统支持文件上传！'
        )
      }
    },
    selectedContraExcel(data) {
      this.resultContraData = []
      const reader = new FileReader() // 首先需要实例化FileReader对象：
      reader.readAsArrayBuffer(data.raw)
      reader.onload = e => {
        const data2 = e.target.result
        let o = ''
        const l = 0
        const w = 10240
        // for (; l < e.target.result.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(e.target.result.slice(l * w, l * w + w))
        )
        const workbook = XLSX.read(btoa(o), { type: 'base64' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        this.cols = []
        this.label = [] // 统计聚类结果的标签

        // this.option.series = []; //统计数据信息
        const range = XLSX.utils.decode_range(worksheet['!ref'])
        let C
        const R = range.s.r /* start in the first row */
        for (C = range.s.c; C <= range.e.c; ++C) {
          /* walk every column in the range */
          var cell =
            worksheet[
              XLSX.utils.encode_cell({ c: C, r: R })
            ] /* find the cell in the first row */
          var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
          this.cols.push(hdr)
        }
        this.resultContraData = XLSX.utils.sheet_to_json(worksheet)
        this.resultDatas.push(this.resultContraData)
        if (this.resultDatas.length === 4) {
          // 画图
          this.$nextTick(function() {
            this.preContraDraw()
            this.drawMatrixPoint('pointmatrixchart')
            this.drawProfile('profilechart')
            this.drawContrayibiaowaichart('Contrayibiaowaichart')
            this.drawContrayibiaoneichart('Contrayibiaoneichart')
          })
        }
      }
    },
    preContraDraw() {
      // 获取标签+数据
      const series1 = []
      const series2 = []
      const series3 = []
      const series4 = []
      const series5 = []
      const series6 = []
      this.soption.series = []
      // 散点图
      this.resultContraData = this.resultDatas[0]
      // 默认展示最后一个
      for (const data in this.resultContraData) {
        if (
          this.resultContraData[data].label !== 'label' &&
          this.label.indexOf(this.resultContraData[data].label) == -1
        ) {
          this.label.push(this.resultContraData[data].label)
          this.soption.series.push({
            name: '' + this.resultContraData[data].label,
            type: 'scatter',
            data: [],
            markArea: {
              silent: true,
              itemStyle: {
                normal: {
                  color: 'transparent',
                  borderWidth: 1,
                  borderType: 'dashed'
                }
              },
              data: [
                [
                  {
                    name:
                      'cluster' +
                      this.resultContraData[data].label +
                      '分布区域',
                    xAxis: 'min',
                    yAxis: 'min'
                  },
                  {
                    xAxis: 'max',
                    yAxis: 'max'
                  }
                ]
              ]
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              lineStyle: {
                normal: {
                  type: 'solid'
                }
              },
              data: [{ type: 'average', name: '平均值' }, { xAxis: 160 }]
            }
          })
        }
        // 根据实际聚类结果类别数要更改
        if (this.label.indexOf(this.resultContraData[data].label) == 0) {
          series1.push([
            this.resultContraData[data].feature1,
            this.resultContraData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultContraData[data].label) == 1) {
          series2.push([
            this.resultContraData[data].feature1,
            this.resultContraData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultContraData[data].label) == 2) {
          series3.push([
            this.resultContraData[data].feature1,
            this.resultContraData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultContraData[data].label) == 3) {
          series4.push([
            this.resultContraData[data].feature1,
            this.resultContraData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultContraData[data].label) == 4) {
          series5.push([
            this.resultContraData[data].feature1,
            this.resultContraData[data].feature2
          ])
        } else if (this.label.indexOf(this.resultContraData[data].label) == 5) {
          series6.push([
            this.resultContraData[data].feature1,
            this.resultContraData[data].feature2
          ])
        }
      }
      this.soption.series[0].data = series1
      this.soption.series[1].data = series2
      this.soption.series[2].data = series3
      this.soption.series[3].data = series4
      this.soption.series[4].data = series5
      this.soption.series[5].data = series6
      console.log(this.soption.series)
      // 柱状图
      var keys = Object.keys(this.resultContraData[0])
      for (const k of keys) {
        if (k !== 'label' && k !== 'index' && this.feature.indexOf(k) == -1) {
          this.feature.push(k)
          this.boption.series.push({
            type: 'bar',
            barGap: 0,
            label: this.labelOption,
            name: k,
            data: []
          })
        }
      }
      var data01 = 0
      var data02 = 0
      var num0 = 0
      for (const item of this.soption.series[0].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data01 += item[0]
          data02 += item[1]
          num0++
        }
      }
      var data11 = 0
      var data12 = 0
      var num1 = 0
      for (const item of this.soption.series[1].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data11 += item[0]
          data12 += item[1]
          num1++
        }
      }
      var data21 = 0
      var data22 = 0
      var num2 = 0
      for (const item of this.soption.series[2].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data21 += item[0]
          data22 += item[1]
          num2++
        }
      }
      var data31 = 0
      var data32 = 0
      var num3 = 0
      for (const item of this.soption.series[3].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data31 += item[0]
          data32 += item[1]
          num3++
        }
      }
      var data41 = 0
      var data42 = 0
      var num4 = 0
      for (const item of this.soption.series[4].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data41 += item[0]
          data42 += item[1]
          num4++
        }
      }
      var data51 = 0
      var data52 = 0
      var num5 = 0
      for (const item of this.soption.series[5].data) {
        if (item[0] != 'feature1' && item[1] != 'feature2') {
          data51 += item[0]
          data52 += item[1]
          num5++
        }
      }
      this.boption.series[0].data = [
        (data01 / num0).toFixed(2),
        (data11 / num1).toFixed(2),
        (data21 / num2).toFixed(2),
        (data31 / num3).toFixed(2),
        (data41 / num4).toFixed(2),
        (data51 / num5).toFixed(2)
      ]
      this.boption.series[1].data = [
        (data02 / num0).toFixed(2),
        (data12 / num1).toFixed(2),
        (data22 / num2).toFixed(2),
        (data32 / num3).toFixed(2),
        (data42 / num4).toFixed(2),
        (data52 / num5).toFixed(2)
      ]
      // 簇间特征对比表格
      // this.dcols = ["name", "feature1", "feature2"];
      // if (this.dcols.indexOf("name") == -1) {
      //   this.dcols = this.feature.concat();
      //   this.dcols.unshift("name");
      //   for (let item in this.label) {
      //     let k = 0;
      //     this.decisionData.push({
      //       name: this.label[item],
      //       feature1: this.boption.series[k++].data[item],
      //       feature2: this.boption.series[k++].data[item]
      //     });
      //   }
      // }

      // //簇间对比
      // for (let data in this.resultContraData) {
      //   if (
      //     this.resultContraData[data].label !== "label" &&
      //     this.label.indexOf(this.resultContraData[data].label) == -1
      //   ) {
      //     this.label.push(this.resultContraData[data].label);
      //   }
      // }
      // var keys = Object.keys(this.resultContraData[0]);
      // for (let k of keys) {
      //   if (k !== "label" && k !== "index" && this.feature.indexOf(k) == -1) {
      //     this.feature.push(k);
      //     this.boption.series.push({
      //       type: "bar",
      //       barGap: 0,
      //       label: this.labelOption,
      //       name: k,
      //       data: []
      //     });
      //   }
      // }
      if (this.dcols2.indexOf('name') == -1) {
        this.dcols2 = this.feature.concat()
        this.dcols2.unshift('name')
        for (const item in this.label) {
          let k = 0
          this.decisionData2.push({
            name: this.label[item],
            feature1: this.boption.series[k++].data[item],
            feature2: this.boption.series[k++].data[item]
            // feature1: 15,
            // feature2: 21
          })
        }
      }
    },
    drawMatrixPoint(id) {
      this.charts = echarts.init(document.getElementById(id))

      var rawDatas = []
      for (const resultData of this.resultDatas) {
        var rawData = []
        for (const data of resultData) {
          rawData.push(Object.values(data))
        }
        rawDatas.push(rawData)
      }

      this.charts.setOption({
        grid: [
          { x: '13%', y: '7%', width: '38%', height: '38%' },
          { x2: '1%', y: '7%', width: '38%', height: '38%' },
          { x: '13%', y2: '7%', width: '38%', height: '38%' },
          { x2: '1%', y2: '7%', width: '38%', height: '38%' }
        ],
        tooltip: {
          // formatter: "Group {a}: ({c})"
          formatter: function(params) {
            if (params.value.length > 1) {
              return (
                // params.label + " :<br/>" + params.value[0] + params.value[1]
                params.value[2] + ' :<br/>' + params.value[0] + params.value[1]
              )
            } else {
              return (
                params.seriesName +
                ' :<br/>' +
                params.name +
                ' : ' +
                params.value
              )
            }
          }
        },
        xAxis: [
          { gridIndex: 0, min: 0, max: 50 },
          { gridIndex: 1, min: 0, max: 50 },
          { gridIndex: 2, min: 0, max: 50 },
          { gridIndex: 3, min: 0, max: 50 }
        ],
        yAxis: [
          { gridIndex: 0, min: 0, max: 30 },
          { gridIndex: 1, min: 0, max: 30 },
          { gridIndex: 2, min: 0, max: 30 },
          { gridIndex: 3, min: 0, max: 30 }
        ],
        // xAxis: [
        //   { gridIndex: 0, min: -15, max: 15 },
        //   { gridIndex: 1, min: -15, max: 15 },
        //   { gridIndex: 2, min: -15, max: 15 },
        //   { gridIndex: 3, min: -15, max: 15 }
        // ],
        // yAxis: [
        //   { gridIndex: 0, min: -15, max: 15 },
        //   { gridIndex: 1, min: -15, max: 15 },
        //   { gridIndex: 2, min: -15, max: 15 },
        //   { gridIndex: 3, min: -15, max: 15 }
        // ],
        visualMap: [
          // 按照label列的不同数值，显示不同颜色
          {
            // show: false,
            dimension: 2, // 默认为最后一列   4
            categories: this.label,
            left: '-1%', // 组件离容器左侧的距离,'left', 'center', 'right','20%'
            inRange: {
              color: (function() {
                var colors = [
                  '#bcd3bb',
                  '#e88f70',
                  '#edc1a5',
                  '#9dc5c8',
                  '#e1e8c8',
                  '#7b7c68',
                  '#e5b5b5',
                  '#f0b489',
                  '#928ea8',
                  '#bda29a'
                ]
                return colors.concat(colors)
              })()
            }
          }
        ],
        series: [
          {
            // name: "" + rawDatas[0].label,
            name: 'I',
            type: 'scatter',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: rawDatas[0]
          },
          {
            // name: "" + rawDatas[1].label,
            name: 'II',
            type: 'scatter',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: rawDatas[1]
          },
          {
            // name: "" + rawDatas[2].label,
            name: 'III',
            type: 'scatter',
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: rawDatas[2]
          },
          {
            // name: "" + rawDatas[3].label,
            name: 'IV',
            type: 'scatter',
            xAxisIndex: 3,
            yAxisIndex: 3,
            data: rawDatas[3]
            // markLine: markLineOpt
          }
        ]
      })
    },
    drawProfile(id) {
      // 随机生成数据
      this.charts = echarts.init(document.getElementById(id))
      var categories = ['data1', 'data2', 'data3', 'data4']
      var data = []
      var index = 0
      var color = [
        '#7b9ce1',
        '#bd6d6c',
        '#75d874',
        '#e0bc78',
        '#72b362',
        '#dc77dc'
      ]

      for (const resultData of this.resultDatas) {
        var start = 0
        var end = 0
        var nums = [0, 0, 0, 0, 0, 0]
        for (const data of resultData) {
          var k = data.label - 1 // 类标从1开始
          nums[k]++
        }
        for (var i = 0; i < nums.length; i++) {
          end = start + nums[i]
          data.push({
            name: '' + this.label[i],
            value: [index, start, end, nums[i]], //, this.label[i]
            itemStyle: {
              normal: {
                color: color[i]
              }
            }
          })
          start = end + 10
        }
        index++
      }
      this.charts.setOption({
        tooltip: {
          formatter: function(params) {
            return params.marker + params.name + ': ' + params.value[3]
          }
        },
        grid: {
          height: 300
        },
        xAxis: {
          // min: startTime,
          scale: true,
          axisLabel: false
        },
        yAxis: {
          data: categories
        },
        series: [
          {
            type: 'custom',
            renderItem: function(params, api) {
              var categoryIndex = api.value(0)
              var start = api.coord([api.value(1), categoryIndex])
              var end = api.coord([api.value(2), categoryIndex])
              var height = api.size([0, 1])[1] * 0.6
              var rectShape = echarts.graphic.clipRectByRect(
                {
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
                },
                {
                  x: params.coordSys.x,
                  y: params.coordSys.y,
                  width: params.coordSys.width,
                  height: params.coordSys.height
                }
              )

              return (
                rectShape && {
                  type: 'rect',
                  shape: rectShape,
                  style: api.style()
                }
              )
            },
            itemStyle: {
              opacity: 0.8
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            // data: this.boption.series.data
            data: data
          }
        ]
      })
    },
    drawContrayibiaowaichart(id) {
      this.charts = echarts.init(document.getElementById(id))

      this.charts.setOption({
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '纯度',
            type: 'gauge',
            center: ['13%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '1':
                    return 'Purity'
                  case '2':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.92, name: 'Purity' }]
          },
          {
            name: 'Jaccard指数',
            type: 'gauge',
            center: ['13%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '1':
                    return 'Jaccard'
                  case '2':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.98, name: 'Jaccard' }]
          },
          {
            name: 'Foulkes-Mallows scores',
            type: 'gauge',
            center: ['38%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '1':
                    return 'F-M'
                  case '2':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.98, name: 'F-M' }]
          },
          {
            name: '调和平均',
            type: 'gauge',
            center: ['38%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '1':
                    return '调和平均'
                  case '2':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.88, name: '调和平均' }]
          },
          {
            name: '标准化互信息',
            type: 'gauge',
            center: ['63%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '1':
                    return 'NMI'
                  case '2':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.59, name: 'NMI' }]
          },
          {
            name: '兰德系数',
            type: 'gauge',
            center: ['63%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0'
                  case '1':
                    return 'RI'
                  case '2':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.66, name: 'RI' }]
          },
          {
            name: '调整互信息',
            type: 'gauge',
            center: ['88%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '-1'
                  case '1':
                    return 'AMI'
                  case '2':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.97, name: 'AMI' }]
          },
          {
            name: '调整兰德系数',
            type: 'gauge',
            center: ['88%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '-1'
                  case '1':
                    return 'ARI'
                  case '2':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 1.79, name: 'ARI' }]
          }
        ]
      })

      // setInterval(function (){
      //     // option.series[0].data[0].value = (Math.random()).toFixed(2) - 0;
      //     // option.series[1].data[0].value = (Math.random()).toFixed(2) - 0;
      //     // option.series[2].data[0].value = (Math.random()).toFixed(2) - 0;
      //     // option.series[3].data[0].value = (Math.random()).toFixed(2) - 0;
      //     // option.series[4].data[0].value = (Math.random()).toFixed(2) - 0;
      //     // option.series[5].data[0].value = (Math.random()).toFixed(2) - 0;
      //     // option.series[6].data[0].value = ((-1)+Math.random()).toFixed(2) - 0;
      //     // option.series[7].data[0].value = ((-1)+Math.random()).toFixed(2) - 0;
      //     option.series[0].data[0].value = 1.92;
      //     option.series[1].data[0].value = 0.98;
      //     option.series[2].data[0].value = 1.98;
      //     option.series[3].data[0].value = 1.88;
      //     option.series[4].data[0].value = 1.59;
      //     option.series[5].data[0].value = 1.66;
      //     option.series[6].data[0].value = 1.97;
      //     option.series[7].data[0].value = 1.79;
      //     myChart.setOption(option,true);
      // },2000);
    },
    drawContrayibiaoneichart(id) {
      this.charts = echarts.init(document.getElementById(id))

      this.charts.setOption({
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '误差平方和',
            type: 'gauge',
            center: ['20%', '30%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 10000,
            endAngle: 45,
            splitNumber: 10,
            axisLabel: {
              show: false
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, '-30%'] // x, y，单位px
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder'
            },
            data: [{ value: 6288.11, name: 'SSE' }]
          },
          {
            name: '轮廓系数',
            type: 'gauge',
            center: ['45%', '35%'], // 默认全局居中
            radius: '45%',
            min: -1,
            max: 1,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '-1':
                    return '-1'
                  case '0':
                    return '轮廓系数'
                  case '1':
                    return '1'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.32, name: '轮廓系数' }]
          },
          {
            name: 'CHI',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 1000,
            splitNumber: 10,
            center: ['80%', '35%'],
            radius: '50%',
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              show: false,
              backgroundColor: 'auto',
              borderRadius: 2,
              color: '#eee',
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: '#222'
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic'
            },

            data: [{ value: 914.0, name: 'CHI' }]
          },
          {
            name: 'DBI',
            type: 'gauge',
            center: ['20%', '75%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 7,
            endAngle: 45,
            splitNumber: 7,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, '-30%'] // x, y，单位px
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder'
            },
            data: [{ value: 0.516, name: 'DBI' }]
          },
          {
            name: 'DVI',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 1,
            splitNumber: 10,
            center: ['50%', '70%'],
            radius: '50%',
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              show: false,
              backgroundColor: 'auto',
              borderRadius: 2,
              color: '#eee',
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: '#222'
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic'
            },
            data: [{ value: 0.082, name: 'DVI' }]
          },
          {
            name: '紧密性',
            type: 'gauge',
            center: ['80%', '70%'], // 默认全局居中
            radius: '25%',
            min: 0,
            max: 20,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return 'L'
                  case '5':
                    return 'CP'
                  case '10':
                    return 'H'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 17.238, name: 'CP' }]
          },
          {
            name: '间隔性',
            type: 'gauge',
            center: ['80%', '75%'], // 默认全局居中
            radius: '25%',
            min: 0,
            max: 200,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return 'L'
                  case '10':
                    return 'SP'
                  case '20':
                    return 'H'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 167.258, name: 'SP' }]
          }
        ]
      })
    }
  }
}
</script>
