<template>
  <div class="app-container">
    <el-row :gutter="2">
      <el-col :span="8">
        <el-row class="chartHeader">
          <label>前k日调用数量统计</label>
          <el-select
            v-model="days1"
            size="mini"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <label>天数：</label>
        </el-row>
        <div
          id="chart1"
          :style="{ height: '400px', width: '400px' }"
        ></div>
      </el-col>
      <el-col :span="8">
        <el-row class="chartHeader">
          <label>前k日不同数据合约的调用统计</label>
          <el-select
            v-model="days2"
            size="mini"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <label>天数：</label>
        </el-row>
        <div
          id="chart2"
          :style="{ height: '400px', width: '400px' }"
        ></div>
      </el-col>
      <el-col :span="8">
        <el-row class="chartHeader">
          <label>前k日调用合约关系图</label>
          <el-select
            v-model="days3"
            size="mini"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <label>天数：</label>
        </el-row>
        <div
          id="chart3"
          :style="{
            marginLeft: '10px',
            height: '350px',
            width: '400px',
            // backgroundColor: '#F5FFFA',
            borderRadius: '5px'
          }"
        ></div>
      </el-col>
    </el-row>
    <el-row>
      <el-row style="width: 100%;">
        <label style="color: #606266;font-size:18px;float:left">近期日志</label>
        <el-select
          v-model="count"
          style="float: right;margin-bottom: 5px"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <label style="color: #606266;font-size:14px;float:right;margin-top: 8px">条数范围：</label>
      </el-row>
      <el-table
        v-loading="listLoading"
        :data="list.slice((currentPage-1)*pageSize, currentPage*pageSize)"
        :height="fullHeight-590"
        border
        highlight-current-row
      >
        <el-table-column
          align="center"
          width="65"
          type="index"
          :index="indexMethod"
        />
        <el-table-column label="contractID">
          <template slot-scope="scope">
            <span>{{ scope.row.contractID }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="contractName"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.contractName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="function"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.function }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="costTime"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.costTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="date"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.date | formatTimes }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="clear:both; width: 100%"
        background
        :current-page="currentPage"
        :page-sizes="[5,10,20,30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>

<script>
import { initWSocket } from '@/utils/wsCluster'
import { loginBaas, getList } from '@/api/dataList'
import echarts from 'echarts'
// import store from '../../store'
// import store from '../../store'
require('echarts/theme/macarons')

export default {
  name: 'LogAudit',
  filters: {
    formatTimes(updateDate) {
      const y = new Date(updateDate).getFullYear()
      const m = new Date(updateDate).getMonth() + 1
      const d = new Date(updateDate).getDate()
      const h = new Date(updateDate).getHours()
      const i = new Date(updateDate).getMinutes()
      const s = new Date(updateDate).getSeconds()

      var t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s
      return t
    }
  },
  data() {
    return {
      className: 'chart',
      fullHeight: document.documentElement.clientHeight,
      pageSize: 10,
      currentPage: 1,
      chart1: null,
      chart2: null,
      myOption1: {
        // title: {
        //   show: true,
        //   text: '上周的每日调用数量统计',
        //   top: 10,
        //   left: 30,
        //   textStyle: {
        //     fontWeight: 'normal',
        //     color: '#333',
        //     fontSize: 18
        //   }
        // },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          hideDelay: 100,
          padding: [5, 5, 5, 5],
          borderColor: '#333',
          borderWidth: 0,
          textStyle: {
            color: '#fff',
            fontFamily: 'sans-serif',
            fontSize: 12,
            fontWeight: 'normal'
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              color: '#555',
              width: 1,
              type: 'solid'
            }
          }
        },
        grid: {
          // top: '80',
          left: '30',
          right: '40',
          bottom: '30',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        showLoading: {
          text: '暂无数据',
          color: '#ffffff',
          textColor: '#8a8e91',
          maskColor: 'rgba(255, 255, 255, 0.8)',
        },
        xAxis: [
          {
            name: '日期',
            type: 'category',
            axisLabel: {
              show: true,
              rotate: 45,
              margin: 10,
              interval: 0,
              textStyle: {
                color: '#444645',
                fontSize: '12',
                fontWeight: 'normal'
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '调用数量'
          }
        ],
        series: [
          {
            name: '调用数量统计',
            type: 'bar',
            data: [],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#444645',
                    fontSize: '12',
                    fontWeight: 'normal'
                  }
                }
              }
            }
          }
        ]
      },
      myOption2: {
        // title: {
        //   show: true,
        //   text: '前一日不同用户调用数量统计',
        //   top: 10,
        //   left: 30,
        //   textStyle: {
        //     fontWeight: 'normal',
        //     color: '#333',
        //     fontSize: 18
        //   }
        // },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          hideDelay: 100,
          padding: [5, 5, 5, 5],
          borderColor: '#333',
          borderWidth: 0,
          textStyle: {
            color: '#fff',
            fontFamily: 'sans-serif',
            fontSize: 12,
            fontWeight: 'normal'
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              color: '#555',
              width: 1,
              type: 'solid'
            }
          }
        },
        grid: {
          // top: '80',
          left: '30',
          right: '40',
          bottom: '30',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        xAxis: [
          {
            name: '数据合约',
            type: 'category',
            axisLabel: {
              show: true,
              rotate: 45,
              margin: 10,
              interval: 0,
              textStyle: {
                color: '#444645',
                fontSize: '12',
                fontWeight: 'normal'
              }
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '调用数量'
          }
        ],
        series: [
          {
            name: '调用数量统计',
            type: 'bar',
            data: [],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#444645',
                    fontSize: '12',
                    fontWeight: 'normal'
                  }
                }
              }
            }
          }
        ]
      },
      myOption3: {
        legend: {
          orient: 'vertical',
          x: 'left', // 可设定图例在左、右、居中
          y: 'top', // 可设定图例在上、下、居中
          padding: [50, 0, 0, 30],
          data: ['用户', '合约']
        },
        title: {
          show: true,
          text: '调用合约关系图',
          top: 10,
          left: 30,
          target: 'blank',
          textAlign: 'auto',
          textVerticalAlign: 'auto',
          itemGap: 10,
          textStyle: {
            fontWeight: 'normal',
            color: '#333',
            fontSize: 15
          }
        },
        tooltip: {},
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'pubkey',
            type: 'graph',
            layout: 'force',
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: [],
            links: [],
            categories: [
              {
                name: '用户',
                itemStyle: { normal: { color: '#c23531' } },
                symbolSize: [11, 11]
              },
              {
                name: '合约',
                itemStyle: { normal: { color: '#61a0a8' } },
                symbolSize: [11, 11]
              }
            ],
            force: {
              edgeLength: 105, // 连线的长度
              repulsion: 100 // 子节点之间的间距
            },
            roam: true,
            focusNodeAdjacency: true,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 10
              }
            }
          }
        ]
      },

      list: [],
      count: 10,
      options: [
        {
          value: 5,
          label: '5'
        },
        {
          value: 10,
          label: '10'
        },
        {
          value: 20,
          label: '20'
        },
        {
          value: 50,
          label: '50'
        }
      ],
      days1: 7,
      days2: 7,
      days3: 7,
      options1: [
        {
          value: 7,
          label: '7'
        },
        {
          value: 30,
          label: '30'
        },
        {
          value: 360,
          label: '360'
        },
      ],
      interval: {
        '7': 1000 * 3600 * 24 * 1,
        '30': 1000 * 3600 * 24 * 5,
        '360': 1000 * 3600 * 24 * 30
      },
      contractNameList: '',
      contractIdList: [],
      listLoading: true,
      contractList1: []
    }
  },
  computed: {
    contractLogList() {
      return this.$store.state.dataShare.contractLogList
    },
    countContractLog() {
      return this.$store.state.dataShare.countContractLog
    },
    contractLogListByDate() {
      return this.$store.state.dataShare.contractLogListByDate
    },
    contractProcessList() {
      return this.$store.state.dataShare.contractProcessList
    },
  },
  watch: {
    count: {
      handler(nval) {
        window.queryContractLogByOffset(nval)
      },
      deep: true
    },
    days1: {
      handler(nval) {
        this.chart1.showLoading()
        this.getChart1Data(this.countContractLog, nval)
      },
      deep: true
    },
    days2: {
      handler(nval) {
        this.chart2.showLoading()
        this.getChart2Data(this.countContractLog, nval)
      },
      deep: true
    },
    days3: {
      handler(nval) {
        window.queryContractLogByDate(this.getDateDaysBefore(this.days3), this.getDateDaysBefore(0), '')
        this.chart3.showLoading()
      },
      deep: true
    },
    contractLogList(nval) {
      this.list = JSON.parse(JSON.stringify(nval)).data.reverse()
      this.listLoading = false
    },
    countContractLog: {
      handler(nval) {
        if (JSON.stringify(nval[this.days1]) !== '{}') {
          this.getChart1Data(nval, this.days1)
        } else {
          this.noDataShow('chart1')
        }
        if (JSON.stringify(nval[this.days2]) !== '{}') {
          this.getChart2Data(nval, this.days2)
        } else {
          this.noDataShow('chart2')
        }
      },
      deep: true
    },
    contractLogListByDate(nval) {
      const contractList = nval.data
      console.log(nval.data)
      if (contractList.length !== 0) {
        // 将所有节点先放入图中
        var data = []
        var links = []
        for (const contract of contractList) {
          // console.log(contract.pubKey)
          // 将pubkey转换成合约ID,来判断此pubkey是用户还是合约
          var contractID = String(this.changePubKeyIntoID(contract.pubKey))
          // console.log(contractID)
          // 判断用户还是合约
          // var res = this.$store.state.dataShare.contractProcessList.some(
          //   (item) => {
          //     if (item.id === contractID) return true
          //   }
          // )
          // 管理员：所有合约；普通用户：我的合约
          var res = false
          var _this = this
          // var contractlist = this.$store.state.dataShare.contractProcessList
          for (const v of _this.contractList1) {
            if (v.contractID === contractID) {
              res = true
              break
            }
            if (v.contractID === contract.contractID) {
              res = true
              break
            }
          }
          // 是合约
          if (res) {
            // 判断data中是否已经含有这两个节点了
            var res1 = data.some((item) => {
              if (item.name === contractID) return true
            })
            var res2 = data.some((item) => {
              if (item.name === contract.contractID) return true
            })
            // 含有该两个节点
            if (res1 && res2) {
              // 判断是否含有这条边
              var res3 = links.some((item) => {
                if (
                  item.source === contractID &&
                  item.target === contract.contractID
                ) {
                  item.value++
                  return true
                }
              })
              // 不含有这条边
              if (!res3) {
                var temp1 = {
                  source: contractID,
                  target: contract.contractID,
                  value: 1
                }
                links.push(temp1)
              }
            } else {
              //  不含有该节点
              if (!res1) {
                temp1 = {
                  name: contractID,
                  value: contractID.substring(0, 5),
                  category: 1
                }
                data.push(temp1)
              }
              if (!res2) {
                var temp2 = {
                  name: contract.contractID,
                  value: contract.contractID.substring(0, 5),
                  category: 1
                }
                data.push(temp2)
              }
              temp1 = {
                source: contractID,
                target: contract.contractID.substring(0, 5),
                value: 1
              }
              links.push(temp1)
            }
          } else {
            // 用户
            // if (store.state.user.roles.indexOf('admin') === -1 && contract.pubKey !== _this.$store.state.user.pubKey.split(',')[0]) {
            //     continue
            // }
            // 判断data中是否已经含有这个节点了
            res1 = data.some((item) => {
              if (item.name === contractID) {
                return true
              }
            })
            res2 = data.some((item) => {
              if (item.name === contract.contractID) return true
            })
            // 含有该节点
            if (res1 && res2) {
              // 判断是否含有这条边
              res3 = links.some((item) => {
                if (
                  item.source === contractID &&
                  item.target === contract.contractID
                ) {
                  item.value++
                  return true
                }
              })
              // 不含有这条边
              if (!res3) {
                const temp1 = {
                  source: contractID,
                  target: contract.contractID,
                  value: 1
                }
                links.push(temp1)
              }
            } else {
              //  不含有该节点
              if (!res1) {
                const temp1 = {
                  name: contractID,
                  value: contract.pubKey.substring(0, 5),
                  category: 0
                }
                data.push(temp1)
              }
              if (!res2) {
                const temp2 = {
                  name: contract.contractID,
                  value: contract.contractID.substring(0, 5),
                  category: 1
                }
                data.push(temp2)
              }
              const temp1 = {
                source: contractID,
                target: contract.contractID,
                value: 1
              }
              links.push(temp1)
            }
          }
        }
        if (data.length === 0 && links.length === 0) {
          _this.noDataShow('chart3')
        } else {
          _this.myOption3.series[0].data = data
          _this.myOption3.series[0].links = links
          _this.chart3 = echarts.init(document.getElementById('chart3'), 'macarons')
          _this.chart3.setOption(this.myOption3)
          _this.chart3.hideLoading()
        }
      } else {
        _this.noDataShow('chart3')
      }
    },
    contractProcessList(nval) {
      this.getContract(nval)
    }
  },
  created() {
    this.$store.commit('setContractKey', '04421c01a016eddc6c670a653de8f6a1bc0cded6ca954ab8dabb05a147544a40c83cddb8fd9856e6a40691898a675e9ac6f1bdfda3b4187e3a90a0b28f4590fb39' + ',52ade32d48a3ca77f0ea30d1509a2d3e7978cfafee6de70f85ee074be5517c21')
    this.$store.commit('setNodeAddr', '39.104.208.148:21030')
    setTimeout(() => {
      this.getlist()
    }, 1000)
    initWSocket()
    var _this = this
    new Promise((resolve, reject) => {
      loginBaas().then((res) => {
        console.log(res)
        if (res.status === 200) {
          var token = res.headers.get('authorization')
          resolve(token)
        } else {
          reject()
        }
      })
    }).then(function(token) {
      return new Promise((resolve, reject) => {
        getList(token).then((res1) => {
          if (res1.code === 20000) {
            resolve(res1)
          } else {
            reject()
          }
        })
      })
    }).then(function(result) {
      return new Promise((resolve, reject) => {
        var data = result.data.data
        console.log(result)
        // var tempData = []
        // data为内部变量都是对象,用in访问
        for (const v in data) {
          for (const i of data[v].contracts) {
            _this.contractIdList.push(i)
          }
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  mounted() {
  },
  methods: {
    getlist() {
      window.queryContractLogByOffset(this.count, 0, '')
      this.getContract(this.contractProcessList)
      for (const item of this.options1) {
        window.countContractLogGroupByCategory(this.getDateDaysBefore(item.value), this.getDateDaysBefore(0), this.interval[item.label], this.contractNameList)
      }

      window.queryContractLogByDate(this.getDateDaysBefore(this.days3), this.getDateDaysBefore(0), '')
      this.chart1 = echarts.init(document.getElementById('chart1'), 'macarons')
      this.chart1.setOption(this.myOption1)
      this.chart2 = echarts.init(document.getElementById('chart2'), 'macarons')
      this.chart2.setOption(this.myOption2)
      this.chart3 = echarts.init(document.getElementById('chart3'), 'macarons')
      this.chart3.setOption(this.myOption3)
      this.chart1.showLoading()
      this.chart2.showLoading()
      this.chart3.showLoading()
      this.listLoading = true
      // window.queryContractLogByOffset(this.count, offset, '')

      // console.log('listProjects')
      // window.listProjects()
    },
    changePubKeyIntoID(pubkey) {
      const str = pubkey
      var h = 0
      for (var i = 0; i < str.length; i++) {
        h = h * 31 + str.charCodeAt(i)
        h &= 0xffffffff
      }
      return h
    },
    getDateDaysBefore(daysAgo) {
      const dateStr = new Date().toISOString().substring(0, 10)
      return new Date(dateStr).getTime() - daysAgo * 24 * 3600 * 1000
    },
    noDataShow(chart) {
      const html = '<div  style="padding-top: 160px; padding-left: 180px;"><span  style="color:#868686; font-size: 20px;">暂无数据</span></div>'
      document.getElementById(chart).innerHTML = html
      document.getElementById(chart).removeAttribute('_echarts_instance_')
    },
    getContract(contractList) {
      this.contractNameList = ''
      this.contractIdList = []
      for (const contract of contractList) {
        this.contractNameList += contract.name
        this.contractNameList += ','
        this.contractIdList.push(contract.id)
      }
      // console.log('contractNameList')
      if (this.contractNameList.length !== 0) {
        this.contractNameList = this.contractNameList.substring(0, this.contractNameList.length - 1)
        // console.log(this.contractNameList)
        // window.countContractLogGroupByCategory(this.getDateDaysBefore(this.days2), this.getDateDaysBefore(0), this.interval2, this.contractNameList)
      } else {
        this.noDataShow('chart2')
      }
    },
    getChart1Data(countContractLog, days) {
      // console.log('countContractLog[this.days1]')
      // console.log(countContractLog[days])
      this.myOption1.xAxis[0].data = []
      for (let i = 1000 * 3600 * 24 * days / this.interval[days]; i > 0; i--) {
        const dateStr = new Date().toISOString().substring(0, 10)
        const date = new Date(dateStr).getTime() - i * this.interval[days]
        const y = new Date(date).getFullYear()
        const m = new Date(date).getMonth() + 1
        const d = new Date(date).getDate()
        var t = y + '-' + m + '-' + d
        this.myOption1.xAxis[0].data.push(t)
      }
      const seriesData = []
      let index = 0
      for (const contract in countContractLog[days]) {
        for (let i = 0; i < countContractLog[days][contract].length; i++) {
          if (index === 0) {
            seriesData.push(countContractLog[days][contract][i])
          } else {
            seriesData[i] += countContractLog[days][contract][i]
          }
        }
        index += 1
      }
      this.myOption1.series[0].data = seriesData
      this.chart1 = echarts.init(document.getElementById('chart1'), 'macarons')
      this.chart1.setOption(this.myOption1)
      this.chart1.hideLoading()
    },
    getChart2Data(countContractLog, days) {
      // console.log('nval[this.days2]')
      // console.log(countContractLog[days])
      const xAxisData = []
      const seriesData = []
      for (const key in countContractLog[days]) {
        xAxisData.push(key)
        let data = 0
        countContractLog[days][key].forEach(item => {
          data += item
        })
        seriesData.push(data)
      }
      this.myOption2.xAxis[0].data = xAxisData
      this.myOption2.series[0].data = seriesData
      this.chart2 = echarts.init(document.getElementById('chart2'), 'macarons')
      this.chart2.setOption(this.myOption2)
      this.chart2.hideLoading()
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    indexMethod(index) {
      if (this.currentPage === 1) {
        return index + 1
      } else {
        return index + (this.currentPage - 1) * this.pageSize + 1
      }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  padding: 20px;
}
.chartHeader {
  width: 400px;
  label {
    color: #606266;
    font-size: 18px;
    float: left;
    &:last-child {
      font-size: 14px;
      float: right;
      margin-top: 8px;
    }
  }
  .el-select {
    float: right;
    width: 100px;
  }
}
</style>
