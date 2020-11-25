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
      <el-input
        v-model="listQuery.type"
        class="filter-item"
        placeholder="类别"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.applicant"
        class="filter-item"
        placeholder="申请人"
        @keyup.enter.native="handleFilter"
      />
    </div>
    <!-- 中部，添加、批量删除等操作-->
    <div class="edit-container">
      <el-button
        size="small"
        type="info"
        icon="el-icon-refresh-right"
        @click="handleFilter"
      >
        刷新
      </el-button>
      <div class="filter-button">
        <el-button
          v-waves
          class="filter-item"
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          查找
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          size="small"
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
      :data="verifyList.slice(
        (pageSize.page - 1) * pageSize.size,
        pageSize.page * pageSize.size
      )"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      :height="fullHeight - 300"
    >
      <el-table-column
        align="center"
        label
        width="65"
        type="index"
      />
      <el-table-column
        align="center"
        width="120px"
        label="申请人"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.applicant }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        label="申请理由"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.instructions }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="数据名称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属类别"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="申请时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.applyTime | formatTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="处理时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.passTime | formatTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="审核状态"
      >
        <template slot-scope="scope">
          <span>
            <el-tag
              v-if="scope.row.auditStatus == 1"
              :type="scope.row.auditStatus | statusFilter"
            >未审核</el-tag>
            <el-tag
              v-if="scope.row.auditStatus == 2"
              :type="scope.row.auditStatus | statusFilter"
            >审核不通过</el-tag>
            <el-tag
              v-if="scope.row.auditStatus == 3"
              :type="scope.row.auditStatus | statusFilter"
            >审核通过</el-tag>
            <el-tag
              v-if="scope.row.auditStatus == 4"
              :type="scope.row.auditStatus | statusFilter"
            >禁用</el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
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
                @click="
                  cancelPopover(scope.row, scope.$index),
                  handleDelete(scope.row)
                "
              >
                确定
              </el-button>
            </div>
            <el-button
              :ref="'btn' + scope.$index"
              slot="reference"
              size="small"
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
        :current-page="pageSize.page"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="pageSize.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { getAppliedList } from '@/api/dataShare'
export default {
  name: 'ApplicationHistory',
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
      verifyList: [],
      total: 0,
      roleTotal: null,
      listLoading: true,
      listQuery: {
        name: '',
        type: '',
        applicant: ''
      },
      pageSize: {
        size: 10,
        page: 1
      },
      applylist: []
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
      this.listLoading = true
      getAppliedList('1').then((res) => {
        console.log(res)
        if (res.data.code === 20000) {
          for (const v of res.data.data) {
            this.verifyList.push({
              id: v.dataShareApplication.id,
              dataId: v.dataShareInfoBase.id,
              applicant: v.dataShareApplication.applicant.substring(0, 5),
              name: v.dataShareInfoBase.dataName,
              category: v.dataShareInfoBase.typeId,
              auditStatus: v.dataShareApplication.auditStatus,
              instructions: v.dataShareApplication.useDescription,
              pubkey: v.dataShareApplication.applicant,
              passTime: v.dataShareApplication.updateDate,
              applyTime: v.dataShareApplication.createDate
            })
          }
          this.total = this.verifyList.length
          this.listLoading = false
        } else {
          this.$notify({
            title: '失败',
            message: res.data.message,
            type: 'error',
            duration: 1000
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        size: 10,
        loginName: '',
        name: '',
        type: '',
        applicant: ''
      }
      this.handleFilter()
    },
    handleSizeChange(val) {
      this.pageSize.size = val
    },
    handleCurrentChange(val) {
      this.pageSize.page = val
    },
    cancelPopover(row, index) {
      this.$refs['btn' + index].$el.click()
    },
    handleDelete(row) {
      // deleteLogicalUser(row.id).then(response =>{
      //   this.$notify({
      //     title: '成功',
      //     message: response.data.msg,
      //     type: 'success',
      //     duration: 2000
      //   });
      //   const index = this.list.indexOf(row);
      //   this.list.splice(index, 1);
      //   this.handleFilter();
      // }).catch(error=>{
      //   console.log(error)
      // })
    }
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
  margin-bottom: 10px;
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
</style>
