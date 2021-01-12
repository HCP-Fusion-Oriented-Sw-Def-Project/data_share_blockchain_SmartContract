<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        style="width: 200px;"
        class="filter-item"
        placeholder="算法名称"
        @keyup.enter.native="handleFilter"
      />
      <div style="float:right">
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          查找
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          type="info"
          icon="el-icon-refresh"
          @click="resetListQuery"
        >
          重置
        </el-button>
      </div>
    </div>
    <div style="margin-bottom: 10px;margin-top: 0px">
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
    </div>
    <div>
      <el-table
        v-loading="listLoading"
        :data="algorithmList.slice(
          (listQuery.pages - 1) * listQuery.rows,
          listQuery.pages * listQuery.rows
        )"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        :height="fullHeight-300"
        @selection-change="handleBatchDelete"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          align="center"
          label="算法拥有者"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.owner }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="算法名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="算法路径"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.path }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="300px"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
            >
              详情
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          :current-page="listQuery.pages"
          :page-sizes="[5,10,20,30, 50]"
          :page-size="listQuery.rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { initWSocket } from '@/utils/wsCluster'
import waves from '@/directive/waves' // 水波纹指令
export default {
  directives: {
    waves
  },
  data() {
    return {
      // 查询条件
      listQuery: {
        name: '',
        pages: 1,
        rows: 10,
      },
      // 算法列表
      algorithmList: [{
        name: 'kmeans',
        path: '/haha',
      }],
      // 算法路径列表
      pathList: ['/blockchain/algo'],
      listLoading: true,
      fullHeight: document.documentElement.clientHeight,
      total: 0
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
    initWSocket()
    setTimeout(() => {
      this.getAlgorithmList()
    }, 4000)
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
    // 算法列表初始化
    getAlgorithmList() {
      this.algorithmList = []
      this.listLoading = true
      for (const i of this.pathList) {
        window.executeContract('algoModule', 'getFileList', i, (res) => {
          var temp = JSON.parse(JSON.parse(res.result))
          for (const v of temp) {
            var arr = v.path.split('/')
            var len = arr.length
            var index = arr[len - 1].indexOf('.py')
            this.algorithmList.push({
              owner: v.owner,
              name: index === -1 ? arr[len - 1] : arr[len - 1].substring(0, index),
              path: v.path
            })
          }
          this.listLoading = false
          this.total = this.algorithmList.length
        })
      }
    },
    // 算法查询
    handleFilter() {

    },
    // 重置查询输入
    resetListQuery() {

    },
    // 添加算法
    handleAdd() {

    },
    // 批量删除
    deleteInBatches() {

    },
    // 获得表格多选列表
    handleBatchDelete() {

    },
    // 编辑
    handleEdit() {

    },
    // 删除
    handleDelete() {

    },
    // 改变当前页面显示条数
    handleSizeChange(val) {
      this.listQuery.rows = val
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.listQuery.pages = val
    }
  }
}
</script>

<style>
</style>
