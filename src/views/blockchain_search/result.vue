<template>
  <div>
    <div
      id="Graph"
      class="graph"
    ></div>
    <div
      v-if="tableVisible"
      class="clickReult"
    >
      <h3>食品链节点信息:</h3>
      <el-table
        :data="singleNodeInfo"
        border
        style="width: 400px;"
        :height="fullHeight-300"
      >
        <el-table-column
          label="属性"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.attribute }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="back">
      <el-button
        size="small"
        type="primary"
        @click="back"
      >
        返回搜索页
      </el-button>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// import { initWSocket } from '@/utils/wsCluster'
export default {
  data() {
    return {
      // 中间关系图
      option: {
        title: {
          top: 20,
          left: 30,
          text: '食品数据追溯',
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 40, // 节点大小
            // itemStyle: {
            //   color: '	#98F5FF'
            // },
            roam: true,
            label: {
              show: true,
              fontSize: 12,
              // fontFamily: 'Microsoft YaHei',
              // color: '#696969'
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 10
            },
            force: {
              edgeLength: 155, // 连线的长度
              repulsion: 500 // 子节点之间的间距
            },
            data: [{
              name: '节点1',
            }, {
              name: '节点2',
            }, {
              name: '节点3',
            }, {
              name: '节点4',
            }],
            links: [{
              source: 0,
              target: 1,
            }, {
              source: '节点2',
              target: '节点1',
            }, {
              source: '节点1',
              target: '节点3'
            }, {
              source: '节点2',
              target: '节点3'
            }, {
              source: '节点2',
              target: '节点4'
            }, {
              source: '节点1',
              target: '节点4'
            }],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      },
      // 节点信息
      nodeInfo: {},
      // 单个节点信息
      singleNodeInfo: [],
      // 表格出现
      tableVisible: false,
      fullHeight: document.documentElement.clientHeight,
    }
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    }
  },

  mounted() {
    // 进入初始化
    this.getGraph()
    // setTimeout(() => {
    //   this.getGraph()
    // }, 3000)
  },
  methods: {

    // 显示节点信息
    clickGraph(param) {
      this.singleNodeInfo = []
      this.tableVisible = true
      for (let i = 0; i < this.nodeInfo[param.data.name].data[0].length; i++) {
        this.singleNodeInfo.push({
          attribute: this.nodeInfo[param.data.name].columns[i],
          name: this.nodeInfo[param.data.name].data[0][i]
        })
      }
      // this.singleNodeInfo = this.nodeInfo[param.data.name].data
    },

    // 企业追溯初始化图
    getGraph() {
      const myChart = echarts.init(document.getElementById('Graph'))
      // var pubkey = this.$store.state.user.pubKey.split(',')[0]
      let data = {}
      const self = this
      const sessionStorage = window.sessionStorage
      console.log(sessionStorage.getItem('keyword'))
      window.executeContract('FoodManagment', 'association', sessionStorage.getItem('keyword'), (res) => {
        console.log(res)
        data = JSON.parse(res.result)
        console.log(data, 'data')
        const relation = data['relations']

        const link = []
        for (const v of relation) {
          link.push({
            source: v[0],
            target: v[1]
          })
        }
        // 所有节点信息
        const node = data['data']
        console.log(node)
        // 构建图所需信息
        const node1 = []
        for (const d in node) {
          node1.push({ name: d })
        }
        myChart.on('click', self.clickGraph)
        self.nodeInfo = node
        this.option.series[0].data = node1
        this.option.series[0].links = link
        myChart.setOption(self.option)
      })
    },

    // 返回搜索页
    back() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.graph {
  float: left;
  width: 800px;
  height: 500px;
  margin-left: 30px;
  margin-top: 50px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.clickReult {
  width: 500px;
  height: 200px;
  margin-top: 30px;
  margin-left: 50px;
  float: left;
}
.back {
  float: right;
  margin-top: 20px;
  margin-right: 30px;
}
</style>
