<template>
  <div class="app-container calendar-list-container">
    <!-- 上部 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.applicant"
        class="filter-item"
        placeholder="申请人"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.name"
        class="filter-item"
        placeholder="数据名称"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.type"
        class="filter-item"
        placeholder="所属类别"
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
      :data="verifyList"
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
        :index="indexMethod"
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
        label="数据描述"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            style="margin-left: 10px"
            @click="
              dialogVerifyList = true
              handlePass(scope.row, scope.$index)
            "
          >
            通过
          </el-button>
          <el-button
            type="danger"
            size="mini"
            style="margin-left: 10px"
            @click="
              dialogVerifyList = true
              handleStop(scope.row, scope.$index)
            "
          >
            不通过
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
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { getAppliedList, getJudgeAccess } from '@/api/dataShareByDb'
export default {
  name: 'UseExamine',
  directives: {
    waves
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
        applicant: '',
        size: 10,
        page: 1
      },
      // pageSize: {
      //   size: 10,
      //   page: 1
      // },
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
        // const height = that.fullHeight - 100 + 'px'
        // document.getElementById("side-filter").style.height = height;
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
      getAppliedList(this.listQuery).then((res) => {
        console.log(res.data.data.list)
        this.verifyList = []
        if (res.data.code === 20000) {
          console.log('get chengong')
          if (res.data.data.list !== null) {
            for (const v of res.data.data.list) {
              // console.log(v)
              // console.log('v')
              // console.log(v[0])
              // console.log(v[1])
              if (v.dataShareApplication.auditStatus === '1') {
                var temp = {
                  // id: v.id,
                  // dataId: v.dataShareInfoBaseId,
                  // applicant: v.applicant.substring(0, 5),
                  // // name: v.updateBy,
                  // // type: v.typeId,
                  // // useAble: v.auditState,
                  // // permiss: v.accessRight,
                  // // createDate: v.createDate,
                  // instructions: v.useDescription,
                  // pubkey: v.applicant
                  id: v.dataShareApplication.id,
                  dataId: v.dataShareInfoBase.id,
                  applicant: v.dataShareApplication.applicant.substring(0, 5),
                  name: v.dataShareInfoBase.dataName,
                  category: v.dataShareInfoBase.typeId,
                  description: v.dataShareInfoBase.dataDescription,
                  instructions: v.dataShareApplication.useDescription,
                  pubkey: v.dataShareApplication.applicant
                }
                console.log('get chengong3')
                this.verifyList.push(temp)
              }
            }
          }
          this.listLoading = false
        } else {
          this.$message({
            title: '失败',
            message: res.data.message,
            type: 'warning',
            duration: 2000
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
        name: '',
        type: '',
        applicant: '',
        size: 10,
        page: 1
      }
      this.handleFilter()
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.handleFilter()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.handleFilter()
    },

    handlePass(row, index) {
      const tempData = {
        id: row.id,
        dataShareInfoBaseId: row.dataId,
        useDescription: row.instructions,
        auditStatus: '3'
      }
      getJudgeAccess(tempData).then((res) => {
        console.log(res)
        if (res.data.code === 10000) {
          this.$message({
            title: '已通过',
            message: res.data.message,
            type: 'success',
            duration: 2000
          })
          this.handleFilter()
        } else {
          this.$message({
            title: '失败',
            message: res.data.message,
            type: 'warning',
            duration: 2000
          })
          this.handleFilter()
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    handleStop(row, index) {
      const tempData = {
        id: row.id,
        dataShareInfoBaseId: row.dataId,
        useDescription: row.instructions,
        auditStatus: '2'
      }
      getJudgeAccess(tempData).then((res) => {
        console.log(res)
        if (res.data.code === 10000) {
          this.$message({
            title: '已执行未通过',
            message: res.data.message,
            type: 'success',
            duration: 2000
          })
          this.handleFilter()
        } else {
          this.$message({
            title: '失败',
            message: res.data.message,
            type: 'warning',
            duration: 2000
          })
          this.handleFilter()
        }
      }).catch((error) => {
        console.log(error)
      })
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
  margin-top: 0px;
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
</style>
