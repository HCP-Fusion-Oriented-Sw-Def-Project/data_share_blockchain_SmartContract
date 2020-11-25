<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        style="width: 200px;"
        class="filter-item"
        placeholder="算法作业名称"
        @keyup.enter.native="handleFilter"
      />

      <div style="margin-bottom: 5px;margin-top: 0px">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
        >
          添加
        </el-button>
        <el-button
          size="small"
          type="info"
          @click="deleteInBatches"
        >
          <svg-icon icon-class="delete" />批量删除
        </el-button>
        <div style="float:right">
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="handleFilter"
          >
            查找
          </el-button>
          <el-button
            v-waves
            class="filter-item"
            type="info"
            size="small"
            icon="el-icon-refresh"
            @click="resetListQuery"
          >
            重置
          </el-button>
        </div>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="algorTaskList.slice(
        (listQuery.pages - 1) * listQuery.rows,
        listQuery.pages * listQuery.rows
      )"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 100%; "
      :height="fullHeight-300"
      @selection-change="handleBatchSelect"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        align="center"
        width="65"
        type="index"
        label="序号"
      />
      <el-table-column
        align="center"
        width="150px"
        label="算法作业名称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="算法作业描述"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createDate | formatTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="200px"
        label="算法使用"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.algorithm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="200px"
        label="算法数据源"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.datasource }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width="100"
      >
        <template slot-scope="scope">
          <!-- <span>{{scope.row.status}}</span> -->
          <el-tag
            v-if="scope.row.status == 1"
            :type="scope.row.status | statusFilter"
          >
            未执行
          </el-tag>
          <el-tag
            v-if="scope.row.status == 2"
            :type="scope.row.status | statusFilter"
          >
            已完成
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="400"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            style="margin-left:10px"
            @click="handleUpdate(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="scope.row.status==1"
            size="mini"
            type="success"
            style="margin-left:10px"
            @click="handleModifyStatus(scope.row,2)"
          >
            执行
          </el-button>
          <el-button
            v-if="scope.row.status==2"
            size="mini"
            type="success"
            style="margin-left:10px"
            @click="handleModifyStatus(scope.row,2)"
          >
            重新执行
          </el-button>
          <el-button
            v-if="scope.row.status==2"
            size="mini"
            type="warning"
            style="margin-left:10px"
            @click="handleVisual(scope.row)"
          >
            可视化
          </el-button>
          <el-popover
            placement="top"
            width="160"
            trigger="click"
          >
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="cancelPopover(scope.row, scope.$index)"
              >
                取消
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="cancelPopover(scope.row, scope.$index),handleDelete(scope.row)"
              >
                确定
              </el-button>
            </div>
            <el-button
              :ref="'btn'+scope.$index"
              slot="reference"
              size="mini"
              type="danger"
              style="margin-left:10px"
            >
              删除
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.pages"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="listQuery.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { initWSocket } from '@/utils/wsCluster'
import waves from '@/directive/waves' // 水波纹指令
import { getAlgoTaskList, deleteAlgoTask, deleteAlgoTaskByIds, modifyAlgoTask } from '@/api/algoTask'
import { fetchFileInfo } from '@/api/file'
export default {
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'info',
        2: 'success',
      }
      return statusMap[status]
    },
    formatTimes(updateDate) {
      var y = new Date(updateDate).getFullYear()
      var m = new Date(updateDate).getMonth() + 1
      var d = new Date(updateDate).getDate()
      var h = new Date(updateDate).getHours()
      var i = new Date(updateDate).getMinutes()
      var s = new Date(updateDate).getSeconds()
      m = m > 10 ? m : '0' + m
      d = d > 10 ? d : '0' + d
      h = h > 10 ? h : '0' + h
      i = i > 10 ? i : '0' + i
      s = s > 10 ? s : '0' + s
      var t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s
      return t
    },
  },
  data() {
    return {
      listQuery: {
        name: '',
        pages: 1,
        rows: 10
      },
      algorTaskList: [],
      total: 0,
      listLoading: true,
      fullHeight: document.documentElement.clientHeight,
      // 表格多选
      mutliSelection: [],
      // 同时选中路径
      mutliSelectionPath: [],
      // 可视化部分参数
      resultData: [],
      filePath: '',
      title: []
    }
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    }
  },
  created() {
    this.$store.commit('setContractKey', '04c4c855862b53f323e077ccfcc744ecc2c0a04645ed16d99ede8fd5866b38c0670a97ad22c6260d1a4672aba2a5fe229a2d4eba34627c054aab102620afa288c1' + ',dc19f5a32466a89f6abcaf11e1477817b960c6dec120e1026960eb049cb5c5ac')
    this.$store.commit('setNodeAddr', '39.104.208.148:21030')
    setTimeout(() => {
      this.getAlgorList()
    }, 1000)
    initWSocket()
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.clientHeight = document.body.clientHeight
        that.fullHeight = window.clientHeight
      })()
    }
  },
  methods: {
    handleResult(row) {
      for (const param of row.algoTaskParamList) {
        if (param.name === 'resultPath') {
          this.filePath = param.content + '/part-00000'
        }
      }
      this.resultData = []
      var k = 0
      for (var i = 0; i < 2; i++) {
        this.filePath = this.filePath.substring(0, this.filePath.length - 1)
        this.filePath += i
        fetchFileInfo(this.filePath).then(response => {
          var str = response.result
          var regex = /Row\((.+)\)\n/g
          var regex2 = /(.+), (.+)$|(.+)$/ // 匹配有误
          // var regex1 = /(.+), [a-zA-Z]+$|(.+)$/ // 匹配无误
          var line = regex.exec(str)[1]
          var str1 = line.split('=')
          this.title = []
          var l = 0
          this.title.push({ label: str1[0], value: 'f' + l })
          console.log(this.title)
          for (var j = 1; j < str1.length; j++) {
            l++
            var str2 = str1[j]
            if (j === str1.length - 1) {
              continue
            } else {
              this.title.push({
                label: regex2.exec(str2)[2],
                value: 'f' + l
              })
            }
          }
          while (line != null) {
            str1 = line.split('=')
            this.resultData.push({ f0: '' })
            for (j = 1; j < str1.length; j++) {
              str2 = str1[j]
              // console.log(str2)
              // var regex2 = /DenseVector\(\[(.+)\]\),/  //从densevector中匹配出数据
              // var regex2 =  /(.+), (.+)+$|(.+)$/
              // regex2.exec(str2)[1]  //前一个的数据
              // regex2.exec(str2)[2]   //后一个的标签
              if (l === 3) {
                if (j === str1.length - 1) {
                  if (
                    regex2.exec(str2)[1] === undefined &&
                    regex2.exec(str2)[2] === undefined
                  ) {
                    this.resultData[k].f2 = regex2.exec(str2)[3]
                  } else {
                    this.resultData[k].f2 =
                      regex2.exec(str2)[1] + ', ' + regex2.exec(str2)[2]
                  }
                } else {
                  if (this.resultData[k].f0 === '') {
                    this.resultData[k].f0 = regex2.exec(str2)[1]
                  } else {
                    this.resultData[k].f1 = regex2.exec(str2)[1]
                  }
                }
              } else if (l === 2) {
                if (j === str1.length - 1) {
                  if (
                    regex2.exec(str2)[1] === undefined &&
                    regex2.exec(str2)[2] === undefined
                  ) {
                    this.resultData[k].f1 = regex2.exec(str2)[3]
                  } else {
                    this.resultData[k].f1 =
                      regex2.exec(str2)[1] + ', ' + regex2.exec(str2)[2]
                  }
                } else {
                  this.resultData[k].f0 = regex2.exec(str2)[1]
                }
              } else if (l === 1) {
                if (
                  regex2.exec(str2)[1] === undefined &&
                  regex2.exec(str2)[2] === undefined
                ) {
                  this.resultData[k].f0 = regex2.exec(str2)[3]
                } else {
                  this.resultData[k].f0 =
                    regex2.exec(str2)[1] + ', ' + regex2.exec(str2)[2]
                }
              }
            }
            k++
            const reg = regex.exec(str)
            if (reg === null) {
              break
            }
            line = reg[1]
          }
        })
      }
    },
    // 跳转到可视化
    handleVisual(row) {
      this.handleResult(row)
      this.$router.push({
        name: 'single_vis_new',
        params: {
          type: 'taskResult',
          filePath: this.filePath,
          resultData: this.resultData
        }
      })
    },
    // 获取算法作业列表
    getAlgorList() {
      this.algorTaskList = []
      this.listLoading = true
      getAlgoTaskList().then((res) => {
        if (res.data.code === 20000) {
          this.algorTaskList = res.data.data
          this.total = this.algorTaskList.length
          this.listLoading = false
        } else {
          this.$notify({
            title: '失败',
            message: res.data.message,
            type: 'error',
            duration: 2000
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 查找
    handleFilter() {

    },
    // 批量删除
    deleteInBatches() {
      for (const v of this.mutliSelectionPath) {
        var temp = {
          filePath: v,
          rmR: false
        }
        window.executeContract('algoModule', 'deleteFileDirectory', JSON.stringify(temp), (res) => {
        })
      }
      deleteAlgoTaskByIds(this.mutliSelection.join(',')).then((res) => {
        console.log(res)
        if (res.data.code === 20000) {
          this.$notify({
            title: '删除成功',
            message: res.data.message,
            type: 'success',
            duration: 2000
          })
          this.getAlgorList()
        } else {
          this.$notify({
            title: '删除失败',
            message: res.data.message,
            type: 'error',
            duration: 2000
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 添加
    handleAdd() {
      this.$router.push({
        name: 'addAlgorithmJob', params: {
          id: null
        }
      })
    },
    // 编辑
    handleUpdate(row) {
      // 先按remarks字段将算法参数排序,执行合约参数顺序要统一
      row.algoTaskParamList.sort(function(a, b) {
        if (a.remarks < b.remarks) {
          return -1
        } else if (a.remarks === b.remarks) {
          return 0
        } else {
          return 1
        }
      })
      this.$router.push({ name: 'addAlgorithmJob', params: { id: row.id, row: row } })
    },
    // 修改状态
    handleModifyStatus(row, state) {
      var args1 = []
      row.status = state
      row.algoTaskParamList.sort(function(a, b) {
        if (a.remarks < b.remarks) {
          return -1
        } else if (a.remarks === b.remarks) {
          return 0
        } else {
          return 1
        }
      })
      modifyAlgoTask(row).then((res) => {
        console.log(res)
        if (res.data.code !== 20000) {
          this.$notify({
            title: '失败',
            message: res.data.message,
            type: 'error',
            duration: 2000
          })
        }
      }).catch((error) => {
        console.log(error)
      })
      args1.push(row.datasourcepath)
      for (const v of row.algoTaskParamList) {
        args1.push(v.content)
      }
      var data = {
        file: row.algorithmpath,
        args: args1
      }
      var arg = { url: 'http://152.136.214.48:8998/batches/', data: JSON.stringify(data) }
      window.executeContract('algoModule', 'executeByLivy', JSON.stringify(arg), (res) => {
        console.log(res)
      })
    },
    // 删除
    handleDelete(row) {
      const temp = {
        filePath: row.datasourcepath,
        rmR: false
      }
      window.executeContract('algoModule', 'deleteFileDirectory', JSON.stringify(temp), (res) => {
        console.log(res)
      })
      deleteAlgoTask(row.id).then((res) => {
        if (res.data.code === 20000) {
          this.getAlgorList()
          this.$notify({
            title: '删除成功',
            message: res.data.message,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '删除失败',
            message: res.data.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    cancelPopover(row, index) {
      this.$refs['btn' + index].$el.click()
    },
    // 多选
    handleBatchSelect(sel) {
      for (const v of sel) {
        this.mutliSelection.push(v.id)
        this.mutliSelectionPath.push(v.datasourcepath)
      }
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
    },
    handleCurrentChange(val) {
      this.listQuery.pages = val
    },
    // 重置
    resetListQuery() {

    }
  }
}
</script>

<style>
</style>
