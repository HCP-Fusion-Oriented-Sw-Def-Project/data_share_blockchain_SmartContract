<template>
  <div>
    <div
      id="Graph"
      class="graph"
    ></div>
    <div class="clickReult">
      <h3>节点信息:</h3>
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
            roam: true,
            label: {
              show: true
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
    }
  },
  mounted() {
    // 进入初始化
    this.getGraph()
  },
  methods: {

    // 显示节点信息
    clickGraph(param) {
      console.log(param, 'test')
    },

    // 企业追溯初始化图
    getGraph() {
      const myChart = echarts.init(document.getElementById('Graph'))
      const self = this
      myChart.on('click', self.clickGraph)
      console.log(this.$route.params)
      // window.executeContract()
      // // 初始化节点
      // var data = {}
      // // 初始化边
      // var links = {}
      // this.nodeList.forEach(x => {
      //   data.push(x.name)
      //   links.push({ source: x.name, target: x.linkName })
      // })
      // this.option.series[0].data = data
      // this.option.series[0].link = links
      myChart.setOption(self.option)
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
  width: 700px;
  height: 350px;
  margin-left: 30px;
  margin-top: 50px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.clickReult {
  width: 500px;
  height: 200px;
  margin-top: 50px;
  margin-left: 50px;
  float: left;
}
.back {
  float: right;
  margin-top: 20px;
  margin-right: 30px;
}
</style>
