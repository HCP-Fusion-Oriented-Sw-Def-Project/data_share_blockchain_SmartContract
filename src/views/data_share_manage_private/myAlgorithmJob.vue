<template>
  <div class="app-container">
    <!-- 上部 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        style="width: 200px;"
        class="filter-item"
        placeholder="算法作业名称"
        @keyup.enter.native="handleFilter"
      />
    </div>
    <!-- 中部，添加、批量删除等操作-->
    <!-- <div style="margin-bottom: 10px;margin-top: 0px"> -->
    <div class="edit-container">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd">
        添加
      </el-button>
      <el-button size="small" type="info" @click="deleteInBatches">
        <svg-icon icon-class="delete" />批量删除
      </el-button>
      <div class="filter-button" style="float: right">
        <el-button
          v-waves
          size="small"
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          查找
        </el-button>
        <el-button
          v-waves
          size="small"
          class="filter-item"
          type="info"
          icon="el-icon-refresh"
          @click="resetListQuery"
        >
          重置
        </el-button>
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
      style="width: 100%; margin-top:10px;"
      :height="fullHeight-300"
      @selection-change="handleBatchSelect"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" width="65" type="index" label="序号" />
      <el-table-column align="center" width="150px" label="算法作业名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="算法作业描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate | formatTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200px" label="算法使用">
        <template slot-scope="scope">
          <span>{{ scope.row.algorithm }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200px" label="算法数据源">
        <template slot-scope="scope">
          <span>{{ scope.row.datasource }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.status}}</span> -->
          <el-tag v-if="scope.row.status == 1" :type="scope.row.status | statusFilter">
            未执行
          </el-tag>
          <el-tag v-if="scope.row.status == 2" :type="scope.row.status | statusFilter">
            已完成
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="400" class-name="small-padding fixed-width">
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
          <el-popover placement="top" width="160" trigger="click">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="cancelPopover(scope.row, scope.$index)">
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
      algorTaskList: [{
        id: '',
        name: 'test',
        description: 'test',
        algorithm: 'kmeans',
        algorithmpath: '/path',
        datasource: 'cancer',
        datasourcepath: '/path',
        // 参数数组
        algoTaskParamList: [{
          name: '特征列数',
          paramValue: '0;1;2;3',
        },
        {
          name: 'k值',
          paramValue: '2',
        }, {
          name: '运行结果路径',
          paramValue: '/blockchain/result/',
        }],
        // 选择保存还是立即执行
        status: '1',
      },
      {
        id: '',
        name: 'test',
        description: 'test',
        algorithm: 'kmeans',
        algorithmpath: '/path',
        datasource: 'cancer',
        datasourcepath: '/path',
        // 参数数组
        algoTaskParamList: [{
          name: '特征列数',
          paramValue: '0,1,2,3,4,5,6,7,8',
        },
        {
          name: 'k值',
          paramValue: '2',
        }, {
          name: '运行结果路径',
          paramValue: '/blockchain/result/',
        }],
        // 选择保存还是立即执行
        status: '2',
      }],
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
    this.getAlgorList()
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
        console.log(res)
        this.algorTaskList = res.data.data
        this.total = this.algorTaskList.length
        this.listLoading = false
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
        this.getAlgorList()
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
      row.algoTaskParamList.sort(function(a, b) {
        if (a.remarks < b.remarks) {
          return -1
        } else if (a.remarks === b.remarks) {
          return 0
        } else {
          return 1
        }
      })
      console.log(row)
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
      console.log(JSON.stringify(arg))
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
        console.log(res)
        this.getAlgorList()
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

<style scoped>
.filter-container {
  margin-top: 0;
  padding-bottom: 10px;
}
.edit-container {
  margin-top: 0;
  margin-bottom: 21px;
}
</style>
