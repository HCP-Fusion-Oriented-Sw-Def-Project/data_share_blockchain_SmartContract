<template>
  <div class="app-container calendar-list-container">
    <!-- 上部 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        class="filter-item"
        placeholder="名称"
        @keyup.enter.native="handleFilter"
      />
    </div>
    <!-- 中部，添加、批量删除等操作-->
    <div class="edit-container">
      <el-button size="small" type="info" icon="el-icon-refresh-right" @click="handleFilter">
        刷新
      </el-button>
      <el-button size="small" type="primary" icon="el-icon-time" @click="handleHistory">
        历史记录
      </el-button>
      <div class="filter-button">
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
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      :height="fullHeight - 300"
    >
      <el-table-column align="center" label width="65" type="index" :index="indexMethod" />
      <el-table-column width="200px" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属类别">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate | formatTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核状态">
        <template slot-scope="scope">
          <span>
            <el-tag v-if="scope.row.state == 1" :type="scope.row.state | statusFilter">未审核</el-tag>
            <el-tag v-if="scope.row.state == 2" :type="scope.row.state | statusFilter">审核不通过</el-tag>
            <el-tag v-if="scope.row.state == 3" :type="scope.row.state | statusFilter">审核通过</el-tag>
            <el-tag v-if="scope.row.state == 4" :type="scope.row.state | statusFilter">禁用</el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.state === '3'"
            type="danger"
            size="mini"
            style="margin-left:10px"
            @click="handleBack()"
          >
            退订
          </el-button>
          <el-button
            v-if="scope.row.state === '3'"
            type="primary"
            size="mini"
            style="margin-left:10px"
            @click="downloadData()"
          >
            下载
          </el-button>
          <el-button
            v-if="scope.row.state === '1' || scope.row.state === '2'"
            type="danger"
            size="mini"
            style="margin-left:10px"
            @click="handleCancel()"
          >
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.page"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog v-dialogDrag title="数据详情" :visible.sync="dialogTableVisible" top="8vh">
      <div class="dialog">
        <el-row>
          <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
            <el-table-column label="序号" type="index" />
            <el-table-column label="字段名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="英文编码">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="字段描述">
              <template slot-scope="scope">
                <span>{{ scope.row.discription }}</span>
              </template>
            </el-table-column>
            <el-table-column label="访问权限">
              <template slot-scope="scope">
                <el-select v-model="scope.row.permiss" class="filter-item" size="small">
                  <el-option
                    v-for="item in optionPermiss"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="关联字段">
              <template slot-scope="scope">
                <span>{{ scope.row.relation }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="dialog-button">
          <el-button type="primary" size="mini" @click="handleDownload()">
            下载
          </el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { getMyApplication } from '@/api/dataShare'
export default {
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'info',
        2: 'info',
        3: 'success',
        4: 'info'
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
      m = m >= 10 ? m : '0' + m
      d = d >= 10 ? d : '0' + d
      h = h >= 10 ? h : '0' + h
      i = i >= 10 ? i : '0' + i
      s = s >= 10 ? s : '0' + s
      var t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s
      return t
    },
  },
  data() {
    return {
      tableKey: 0,
      fullHeight: document.documentElement.clientHeight,
      list: [],
      total: 0,
      roleTotal: null,
      listLoading: false,
      listQuery: {
        page: 1,
        size: 10,
        name: ''
      },
      dialogTableVisible: false,
      tableData: []
    }
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.clientHeight = document.body.clientHeight
        that.fullHeight = window.clientHeight
        const height = that.fullHeight - 100 + 'px'
        document.getElementById('side-filter').style.height = height
      })()
    }
  },
  methods: {
    indexMethod(index) {
      if (this.listQuery.page === 1) {
        return index + 1
      } else {
        return index + (this.listQuery.page - 1) * this.listQuery.size + 1
      }
    },
    getList() {
      getMyApplication().then((res) => {
        console.log(res)
        let tempData = {}
        for (const v of res.data.data) {
          tempData = {
            name: v.dataShareInfoBase.dataName,
            category: v.dataShareInfoBase.typeId,
            type: v.dataShareInfoBase.dataType,
            state: v.dataShareApplication.auditStatus,
            createDate: v.dataShareApplication.createDate
          }
          this.list.push(tempData)
        }
        this.total = this.list.length
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getMyApplication()
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        size: 10,
        name: '',
        type: '',
        applicant: ''
      }
      this.handleFilter()
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleHistory() {
      const temp = {
        name: 'applicationHistory',
        params: { id: '1' }
      }
      this.$router.push(temp)
    },
    downloadData() {
      this.dialogTableVisible = true
    },
    handleCancel() { },
    handleDownload() { }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  padding: 20px;
}
.filter-container {
  margin-top: 0;
  padding-bottom: 10px;
  .filter-item {
    width: 150px;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 0;
    margin-bottom: 10px;
  }
}
.edit-container {
  margin-top: 0;
  margin-bottom: 21px;
  .filter-button {
    float: right;
  }
}
.pagination-container {
  margin-bottom: 10px;
}
.el-table {
  width: 100%;
  margin-top: 0;
  margin-bottom: 10px;
}
.el-button {
  margin-left: 5px;
}
.dialog {
  height: 600px;
  overflow-y: auto;
  .dialog-button {
    text-align: center;
    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
