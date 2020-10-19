<template>
  <div class="app-container">
    <h1>聚类结果的可视化分析</h1>
    <el-button slot="trigger" size="small" type="primary" @click="contraShowDialog=true">
      对比分析
    </el-button>
    <el-dialog title="聚类结果对比分析" :visible.sync="contraShowDialog" width="1600px" fullscreen>
      <el-upload
        class="upload-demo"
        action="http://10.4.20.151:8101/govern-spark/hdfs/createWriteFileByFile"
        :on-error="uploadError"
        :before-remove="beforeRemove"
        multiple
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
          <div id="yibiaoneichart" style="width:600px;height: 400px;display:inline; margin-top: -40px;">
            内部评价
          </div>
          <div id="yibiaowaichart" style="width:600px;height: 400px; display:inline;margin-top: -60px;">
            外部评价
          </div>
        </div>
        <div style="display:inline;float:left; width: 450px;height: 700px;margin-top:20px;margin-left:120px">
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
          <span v-else>暂未上传数据</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import XLSX from 'xlsx'

import echarts from 'echarts' // 引入echarts

// import UserCard from './components/UserCard'
// import Activity from './components/Activity'
// import Timeline from './components/Timeline'
// import Account from './components/Account'
import allTree from '@/assets/images/tree1.png'

export default {
  name: 'Profile',
  // components: { UserCard, Activity, Timeline, Account },
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
        show: true,
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

      decisionData2: [],
      dcols2: [],

      // user: {},
      // activeTab: "activity"
    }
  },
  computed: {
    // ...mapGetters([
    //   'name',
    //   'avatar',
    //   'roles'
    // ])
  },
  created() {},
  methods: {
    callCluster() {
      // 调用聚类算法
      this.$alert('确定调用聚类算法吗？', '调用聚类', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    uploadSuccess(response, file, fileList) {
      this.temp.position = this.upLoadData.filePath
      this.$message.success('上传成功！')
    },
    uploadError(err, file, fileList) {
      this.$message.error('上传出错，请重新上传！')
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
    previewData(file, fileList) {
      var files = file
        var fileList
      if (!files || files.length == 0) {
        this.cols = []
        this.resultData = []
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
        this.selectedExcel(file)
      } else {
        this.$message.warning(
          '您上传的格式暂不支持，请转换为系统支持文件上传！'
        )
      }
    },
    selectedExcel(data) {
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
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(e.target.result.slice(l * w))
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
        // 画图
        this.$nextTick(function() {
          this.preDraw()
          this.drawPoint('pointchart')
          this.drawBar('barchart')
          this.allTree = allTree + '?' + +new Date()
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
          this.drawPoint('pointchart')
        })
      }
    },
    preDraw() {
      // 获取标签+数据
      const series1 = []
      const series2 = []
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
        } else {
          series2.push([
            this.resultData[data].feature1,
            this.resultData[data].feature2
          ])
        }
      }
      this.soption.series[0].data = series1
      this.soption.series[1].data = series2
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
      this.boption.series[0].data = [data01 / num0, data02 / num0]
      this.boption.series[1].data = [data11 / num1, data12 / num1]
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
    },
    drawPoint(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          // text: "男性女性身高体重分布"
          text: this.soption.title
          // subtext: "抽样调查来自: Heinz  2003"
        },
        grid: {
          left: '3%',
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
                params.seriesName +
                ' :<br/>' +
                params.value[0] +
                'cm ' +
                params.value[1] +
                'kg '
              )
            } else {
              return (
                params.seriesName +
                ' :<br/>' +
                params.name +
                ' : ' +
                params.value +
                'kg '
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
            brush: {
              type: ['rect', 'polygon', 'clear']
            }
          }
        },
        brush: {},
        legend: {
          // data: ["女性", "男性"],
          data: ['' + this.label[0], '' + this.label[1]], // 据实际情况编辑
          left: 'center'
        },
        xAxis: [
          {
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value} cm'
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
              formatter: '{value} kg'
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: this.soption.series
      })
    },
    drawBar(id) {
      this.charts = echarts.init(document.getElementById(id))

      var posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ]
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: echarts.util.reduce(
            posList,
            function(map, pos) {
              map[pos] = pos
              return map
            },
            {}
          )
        },
        distance: {
          min: 0,
          max: 100
        }
      }
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          }
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          })
        }
      }
      var labelOption = {
        show: true,
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
      }

      this.charts.setOption({
        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['' + this.feature[0], '' + this.feature[1]] // 据实际情况编辑
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
            data: ['' + this.label[1], '' + this.label[0]] // 据实际情况编辑
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
    showHistory() {
      // 显示历史聚类结果
      this.$notify({
        title: '提示',
        message: '显示历史聚类结果',
        duration: 0
      })
    },
    exportBI() {
      // 导出BI报表
      this.$alert('确定导出BI报表？', '导出BI报表', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    // 聚类结果对比分析
    preContraData(file, fileList) {
      var files = file
        var fileList
      if (!files || files.length == 0) {
        this.cols = []
        this.resultData = []
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
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(e.target.result.slice(l * w))
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
        // 画图
        this.$nextTick(function() {
          // this.preDraw();
          this.preContraDraw()
          this.drawMatrixPoint('pointmatrixchart')
          this.drawProfile('profilechart')
          this.drawyibiaowaichart('yibiaowaichart')
          this.drawyibiaoneichart('yibiaoneichart')

          // this.allTree = allTree + "?" + +new Date();
        })
      }
    },
    preContraDraw() {
      // 簇间对比
      for (const data in this.resultData) {
        if (
          this.resultData[data].label !== 'label' &&
          this.label.indexOf(this.resultData[data].label) == -1
        ) {
          this.label.push(this.resultData[data].label)
        }
      }
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
      if (this.dcols2.indexOf('name') == -1) {
        this.dcols2 = this.feature.concat()
        this.dcols2.unshift('name')
        for (const item in this.label) {
          const k = 0
          this.decisionData2.push({
            name: this.label[item],
            // feature1: this.boption.series[k++].data[item],
            // feature2: this.boption.series[k++].data[item]
            feature1: 15,
            feature2: 21
          })
        }
      }
    },
    drawMatrixPoint(id) { // 四个散点图显示同一组数据
      this.charts = echarts.init(document.getElementById(id))

      var sizeValue = '57%'
      var symbolSize = 2.5
      this.charts.setOption({
        legend: {},
        tooltip: {},
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {}
            }
        },
        grid: [
            { right: sizeValue, bottom: sizeValue },
            { left: sizeValue, bottom: sizeValue },
            { right: sizeValue, top: sizeValue },
            { left: sizeValue, top: sizeValue }
        ],
        xAxis: [
            { type: 'value', gridIndex: 0, name: 'feature1', axisLabel: { rotate: 50, interval: 0 }},
            { type: 'value', gridIndex: 1, name: ' ', boundaryGap: false, axisLabel: { rotate: 50, interval: 0 }},
            { type: 'value', gridIndex: 2, name: 'feature1', axisLabel: { rotate: 50, interval: 0 }},
            { type: 'value', gridIndex: 3, name: ' ', axisLabel: { rotate: 50, interval: 0 }}
        ],
        yAxis: [
            { type: 'value', gridIndex: 0, name: 'feature2' },
            { type: 'value', gridIndex: 1, name: 'feature2' },
            { type: 'value', gridIndex: 2, name: 'feature2' },
            { type: 'value', gridIndex: 3, name: 'feature2' }
        ],
        dataset: {
            dimensions: [
                'feature1',
                'feature2',
                'index',
                'label',
                // {name: 'Year', type: 'ordinal'}
            ],
            source: this.resultData
        },
        visualMap: [// 按照label列的不同数值，显示不同颜色
        {
          // show: false,
          // dimension: 3,//默认为最后一列
          categories: this.label,
          // calculable: true,
          // precision: 0.1,
          // textGap: 30,
          // textStyle: {
          //   color: '#ccc'
          // },
          inRange: {
            color: (function() {
              var colors = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a']
                return colors.concat(colors)
              })()
            }
          }
        ],
        series: [
            {
                type: 'scatter',
                symbolSize: symbolSize,
                xAxisIndex: 0,
                yAxisIndex: 0,
                markArea: {
                  silent: true,
                  itemStyle: {
                    normal: {
                      // color: "transparent",
                      color: function(e) {
                        console.log(e)
                        if (e.name == $('#deptname').val()) {
                          return 'red'
                        } else {
                          return 'blue'
                        }
                        console.log(e)
                      },
                      borderWidth: 1,
                      borderType: 'dashed'
                    }
                  },
                },
                encode: {
                    x: 'feature1',
                    y: 'feature2',
                    tooltip: [0, 1, 2, 3, 4]
                }
            },
            {
                type: 'scatter',
                symbolSize: symbolSize,
                xAxisIndex: 1,
                yAxisIndex: 1,
                markArea: {
                  silent: true,
                  itemStyle: {
                    normal: {
                      color: 'transparent',
                      borderWidth: 1,
                      borderType: 'dashed'
                    }
                  },
                },
                encode: {
                    x: 'feature1',
                    y: 'feature2',
                    tooltip: [0, 1, 2, 3, 4]
                }
            },
            {
                type: 'scatter',
                symbolSize: symbolSize,
                xAxisIndex: 2,
                yAxisIndex: 2,
                markArea: {
                  silent: true,
                  itemStyle: {
                    normal: {
                      color: 'transparent',
                      borderWidth: 1,
                      borderType: 'dashed'
                    }
                  },
                },
                encode: {
                    x: 'feature1',
                    y: 'feature2',
                    tooltip: [0, 1, 2, 3, 4]
                }
            },
            {
                type: 'scatter',
                symbolSize: symbolSize,
                xAxisIndex: 3,
                yAxisIndex: 3,
                markArea: {
                  silent: true,
                  itemStyle: {
                    normal: {
                      color: 'transparent',
                      borderWidth: 1,
                      borderType: 'dashed'
                    }
                  },
                },
                encode: {
                    x: 'feature1',
                    y: 'feature2',
                    tooltip: [0, 1, 2, 3, 4]
                }
            }
        ]
      })
      // console.log(this.resultData)
    },
    drawProfile(id) { // 随机生成数据
      this.charts = echarts.init(document.getElementById(id))

      var data = []
      var dataCount = 10
      var startTime = +new Date()
      var categories = ['data1', 'data2', 'data3']
      var types = [
          { name: 'JS Heap', color: '#7b9ce1' },
          { name: 'Documents', color: '#bd6d6c' },
          { name: 'Nodes', color: '#75d874' },
          { name: 'Listeners', color: '#e0bc78' },
          { name: 'GPU Memory', color: '#dc77dc' },
          { name: 'GPU', color: '#72b362' }
      ]

      // Generate mock data
      echarts.util.each(categories, function(category, index) {
        var baseTime = startTime
        for (var i = 0; i < dataCount; i++) {
            var typeItem = types[Math.round(Math.random() * (types.length - 1))]
            var duration = Math.round(Math.random() * 10000)
            data.push({
                name: typeItem.name,
                value: [
                    index,
                    baseTime,
                    baseTime += duration,
                    duration
                ],
                itemStyle: {
                    normal: {
                        color: typeItem.color
                    }
                }
            })
            baseTime += Math.round(Math.random() * 2000)
        }
      })

      this.charts.setOption({
        // tooltip: {
        //   formatter: function (params) {
        //       return params.marker + params.name + ': ' + params.value[3] + ' ms';
        //   }
        // },
        // title: {
        //     text: 'Profile',
        //     left: 'center'
        // },
        dataZoom: [{
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            height: 8,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            },
            labelFormatter: ''
        }, {
            type: 'inside',
            filterMode: 'weakFilter'
        }],
        grid: {
            height: 300
        },
        xAxis: {
            min: startTime,
            scale: true,
            axisLabel: false,
            // axisLabel: {
            //     formatter: function (val) {
            //         return Math.max(0, val - startTime) + ' ms';
            //     }
            // }
        },
        yAxis: {
            data: categories
        },
        series: [{
            type: 'custom',
            renderItem: function(params, api) {
              var categoryIndex = api.value(0)
              var start = api.coord([api.value(1), categoryIndex])
              var end = api.coord([api.value(2), categoryIndex])
              var height = api.size([0, 1])[1] * 0.6

              var rectShape = echarts.graphic.clipRectByRect({
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
              }, {
                  x: params.coordSys.x,
                  y: params.coordSys.y,
                  width: params.coordSys.width,
                  height: params.coordSys.height
              })

              return rectShape && {
                  type: 'rect',
                  shape: rectShape,
                  style: api.style()
              }
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
        }]

      })
    },
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
                max: 2,
                startAngle: 135,
                endAngle: 45,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    splitNumber: 5,
                    length: 10, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return '0'
                            case '1' : return 'Purity'
                            case '2' : return '1'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return '0'
                            case '1' : return 'Jaccard'
                            case '2' : return '1'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    splitNumber: 5,
                    length: 10, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return '0'
                            case '1' : return 'F-M'
                            case '2' : return '1'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return '0'
                            case '1' : return '调和平均'
                            case '2' : return '1'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    splitNumber: 5,
                    length: 10, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return '0'
                            case '1' : return 'NMI'
                            case '2' : return '1'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return '0'
                            case '1' : return 'RI'
                            case '2' : return '1'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    splitNumber: 5,
                    length: 10, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return '-1'
                            case '1' : return 'AMI'
                            case '2' : return '1'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return '-1'
                            case '1' : return 'ARI'
                            case '2' : return '1'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                name: '和方差',
                type: 'gauge',
                center: ['20%', '30%'], // 默认全局居中
                radius: '35%',
                min: 0,
                max: 7,
                endAngle: 45,
                splitNumber: 7,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 12, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: { // 分隔线
                    length: 20, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 5
                },
                title: {
                    offsetCenter: [0, '-30%'], // x, y，单位px
                },
                detail: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                },
                data: [{ value: (Math.random() * 7).toFixed(2) - 0, name: 'SSE' }]
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
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    splitNumber: 5,
                    length: 10, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '-1' : return '-1'
                            case '0' : return '轮廓系数'
                            case '1' : return '1'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                data: [{ value: (Math.random() + (-1)).toFixed(2) - 0, name: '轮廓系数' }]
            },
            {
                name: 'CHI',
                type: 'gauge',
                z: 3,
                min: 0,
                max: 220,
                splitNumber: 11,
                center: ['80%', '35%'],
                radius: '50%',
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 10
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: { // 分隔线
                    length: 20, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
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

                data: [{ value: (Math.random() * 220).toFixed(2) - 0, name: 'CHI' }]
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
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 12, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: { // 分隔线
                    length: 20, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 5
                },
                title: {
                    offsetCenter: [0, '-30%'], // x, y，单位px
                },
                detail: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                },
                data: [{ value: (Math.random() * 7).toFixed(2) - 0, name: 'DBI' }]
            },
            {
                name: 'DVI',
                type: 'gauge',
                z: 3,
                min: 0,
                max: 220,
                splitNumber: 11,
                center: ['50%', '70%'],
                radius: '50%',
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 10
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: { // 分隔线
                    length: 20, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
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
                data: [{ value: (Math.random() * 220).toFixed(2) - 0, name: 'DVI' }]
            },
            {
                name: '紧密性',
                type: 'gauge',
                center: ['80%', '70%'], // 默认全局居中
                radius: '25%',
                min: 0,
                max: 2,
                startAngle: 135,
                endAngle: 45,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    splitNumber: 5,
                    length: 10, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return 'L'
                            case '1' : return 'CP'
                            case '2' : return 'H'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                data: [{ value: (Math.random() * 2).toFixed(2) - 0, name: 'CP' }]
            },
            {
                name: '间隔性',
                type: 'gauge',
                center: ['80%', '75%'], // 默认全局居中
                radius: '25%',
                min: 0,
                max: 2,
                startAngle: 315,
                endAngle: 225,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter: function(v) {
                        switch (v + '') {
                            case '0' : return 'L'
                            case '1' : return 'SP'
                            case '2' : return 'H'
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
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
                data: [{ value: (Math.random() * 2).toFixed(2) - 0, name: 'SP' }]
            }
        ]
      })
    },

  }
}
</script>
