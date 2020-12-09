<template>
  <div>
    <div
      id="Graph"
      class="graph"
    ></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      option: {
        title: {
          top: 20,
          left: 30,
          text: '区块链全流程追溯关系图',
          textStyle: {
            color: 'white',
          }
        },
        type: 'tree',
        backgroundColor: '#000',
        toolbox: { // 工具栏
          show: true,
          iconStyle: {
            borderColor: '#03ceda'
          },
          feature: {
            restore: {}
          }
        },
        tooltip: {// 提示框
          trigger: 'item',
          triggerOn: 'mousemove',
          backgroundColor: 'rgba(1,70,86,1)',
          borderColor: 'rgba(0,246,255,1)',
          borderWidth: 0.5,
          textStyle: {
            fontSize: 10
          }
        },
        series: [
          {
            type: 'tree',
            hoverAnimation: true, // hover样式
            data: [],
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            layout: 'radial',
            symbol: 'circle',
            symbolSize: 10,
            nodePadding: 20,
            animationDurationUpdate: 750,
            expandAndCollapse: true, // 子树折叠和展开的交互，默认打开
            initialTreeDepth: 0,
            roam: true, // 是否开启鼠标缩放和平移漫游。scale/move/true
            focusNodeAdjacency: true,
            itemStyle: {
              borderWidth: 1,
            },
            label: { // 标签样式
              color: '#fff',
              fontSize: 10,
              fontFamily: 'SourceHanSansCN',
              position: 'inside',
              rotate: 0,
            },
            lineStyle: {
              width: 1,
              curveness: 0.5,
            }
          }
        ]
      },
      colors: [
        '#00ADD0',
        '#FFA12F',
        '#B62AFF',
        '#604BFF',
        '#6E35FF',
        '#002AFF',
        '#20C0F4',
        '#95F300',
        '#04FDB8',
        '#AF5AFF'
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 初始化树状图数据
    getData() {
      const myChart = echarts.init(document.getElementById('Graph'))
      const sessionStorage = window.sessionStorage
      window.executeContract('FoodManagement', 'find', sessionStorage.getItem('keyword'), (res) => {
        console.log(JSON.parse(res.result))
        const obj = JSON.parse(res.result)
        const tree = { name: obj.data[0], value: '0' }
        this.getTree(tree, obj, '0')
        console.log(tree)
        let arr = []
        arr.push(tree)
        arr = this.handleData(arr, 0)
        console.log(arr)
        this.option.series[0].data = arr
        myChart.setOption(this.option)
      })
      // const data = {
      //   name: '根节点1',
      //   value: 0,
      //   children: []
      // }
      // for (let i = 1; i <= 10; i++) {
      //   const obj = {
      //     name: '节点' + i,
      //     value: i,
      //     children: [],
      //   }
      //   for (let j = 1; j <= 5; j++) {
      //     const obj2 = {
      //       name: `节点1-${i}-${j}`,
      //       value: 1 + '-' + i + '-' + j,
      //     }
      //     if (j % 2 === 1) {
      //       obj2.children = []
      //       for (let k = 1; k <= 3; k++) {
      //         const obj3 = {
      //           name: `节点1-${i}-${j}-${k}`,
      //           value: 1 + '-' + i + '-' + j + '-' + k,
      //         }
      //         obj2.children.push(obj3)
      //       }
      //     }

      //     obj.children.push(obj2)
      //   }

      //   data.children.push(obj)
      // }
      // let arr = []
      // arr.push(data)
      // arr = this.handleData(arr, 0)
      // console.log(arr)
      // this.option.series[0].data = arr
      // myChart.setOption(this.option)
    },

    getTree(root, node, id) {
      if (node.children.length !== 0) {
        root.children = []
        let i = 0
        let j = 0
        for (const v of node.children) {
          // if (v.data[0] === '肖恩') { console.log(v) }
          if (v.data.length > 1) {
            for (let m = 0; m < v.data.length; m++) {
              const obj = {
                name: v.data[m],
                value: `${id}-${i++}`,
              }
              root.children.push(obj)
              j++
            }
            // break
          } else {
            const obj = {
              name: v.data[0],
              value: `${id}-${i++}`,
            }
            // if (v.children.length !== 0) { root.children.push(obj) }
            root.children.push(obj)
            this.getTree(root.children[j++], v, obj.value)
          }
        }
      }
      // root.children = []
      // for (let i = 0; i < node.data.length; i++) {
      //   const obj = {
      //     name: node.data[i],
      //     value: `${id}-${i}`,
      //   }
      //   root.children.push(obj)
      // }
      // }
    },

    handleData(data, index, color = '#00f6ff') {
      // index标识第几层
      const self = this
      return data.map((item, index2) => {
        // 计算出颜色
        if (index === 1) {
          color = self.colors.find((item, eq) => eq === index2 % 10)
        }
        // 设置节点大小
        if (index === 0 || index === 1) {
          item.label = {
            position: 'inside',
            //   rotate: 0,
            //   borderRadius: "50%",
          }
        }
        // 设置label大小
        switch (index) {
          case 0:
            item.symbolSize = 70
            break
          case 1:
            item.symbolSize = 60
            break
          case 2:
            item.symbolSize = 50
            break
          case 3:
            item.symbolSize = 40
            break
          case 4:
            item.symbolSize = 30
            break
          default:
            item.symbolSize = 20
            break
        }
        // 设置线条颜色
        item.lineStyle = { color: color }

        if (item.children) { // 存在子节点
          item.itemStyle = {
            borderColor: color,
            color: color
          }
          item.children = self.handleData(item.children, index + 1, color)
        } else { // 不存在
          item.itemStyle = {
            color: 'transparent',
            borderColor: color
          }
        }
        return item
      })
    }
  }
}
</script>

<style>
.graph {
  width: 100%;
  height: 850px;
  margin: 0 auto;

  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
</style>
