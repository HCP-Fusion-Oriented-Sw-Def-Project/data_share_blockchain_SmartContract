<template>
  <div class="app-container calendar-list-container">
    <!-- 上部 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        style="width: 200px"
        class="filter-item"
        placeholder="名称"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.type"
        style="width: 200px"
        class="filter-item"
        placeholder="类别"
        @keyup.enter.native="handleFilter"
      />
      <!-- 中部，添加、批量删除等操作-->
      <div class="edit-container">
        <div
          class="filter-button"
          style="float: right"
        >
          <el-button
            v-waves
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >
            查找
          </el-button>
          <el-button
            v-waves
            size="small"
            type="info"
            icon="el-icon-refresh"
            @click="resetListQuery"
          >
            重置
          </el-button>
        </div>
      </div>
    </div>
    <div style="margin-top: 10px; margin-bottom: 10px; clear: both">
      <span style="font-size: 15px; font-weight: bold">数据清单:</span>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="dataList"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%"
        :height="600"
      >
        <el-table-column
          align="center"
          label="序号"
          width="65"
          type="index"
          :index="indexMethod"
        />
        <el-table-column
          align="center"
          label="名称"
          width="150px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.dataName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="所属类别"
          width="150px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.typeId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="访问权限"
          width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.accessRight == '1'">无条件访问</span>
            <span v-if="scope.row.accessRight == '2'">申请后访问</span>
            <span v-if="scope.row.accessRight == '3'">可申请访问但禁止查看
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="305px"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 10px"
              @click="handleApply(scope.row)"
            >
              详情
            </el-button>
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
    <el-dialog
      v-dialogDrag
      title="数据详情"
      :visible.sync="dialogDataList"
      width="1300px"
      top="7vh"
    >
      <div v-if="dialogDataList">
        <edit-share
          ref="shareData"
          :data="data"
        />
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogDataList = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogReason = true"
        >
          申请使用
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="申请理由"
      :visible.sync="dialogReason"
      center
      top="7vh"
      width="300px"
      style="margin-top: 150px"
    >
      <el-input
        v-model="applyReason"
        type="textarea"
      />
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogReason = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="
            dialogReason = false
            dialogDataList = false
            apply()
          "
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import editShare from './edit-share'
import { getDataShareInfoBase, getMyShareParam, addApplication, getMyApplicationStatus } from '@/api/dataShareByDb'
export default {
  directives: {
    waves
  },
  components: {
    'edit-share': editShare
  },
  data() {
    return {
      dialogDataList: false,
      tableKey: 0,
      listLoading: true,
      listQuery: {
        name: '',
        type: '',
        pages: 1,
        rows: 10
      },
      total: 0,
      dataList: [],
      fullHeight: document.documentElement.clientHeight,
      data: {},
      // 申请理由
      dialogReason: false,
      applyReason: '',
      listTest: []
    }
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return () => {
        window.clientHeight = document.body.clientHeight
        that.fullHeight = window.clientHeight
      }
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    //  计算序号
    indexMethod(index) {
      if (this.listQuery.page === 1) {
        return index + 1
      } else {
        // console.log(index)
        return index + (this.listQuery.pages - 1) * this.listQuery.rows + 1
      }
    },
    getDataList() {
      this.listLoading = true
      getDataShareInfoBase(this.listQuery).then((res) => {
        console.log(res)
        if (res.data.code === 20000) {
          this.dataList = res.data.data.list
          this.total = res.data.data.totalSize
          this.listLoading = false
        } else {
          this.$message({
            title: '失败',
            message: res.data.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    handleApply(row) {
      // var _this = this
      var _this = this
      new Promise((resolve, reject) => {
        getMyApplicationStatus(row.id).then((res) => {
          if (res.data.code === 10000) {
            resolve(res.data.data)
          } else {
            this.$message({
              title: '失败',
              message: res.data.message,
              type: 'warning'
            })
            reject()
          }
        }).catch((error) => {
          console.log(error)
        })
      }).then(function(data) {
        return new Promise((resolve, reject) => {
          if (data === '1') {
            _this.$confirm('该数据您已申请,请等待审核!', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          } else if (data === '2') {
            _this.$confirm('该数据您申请不通过!', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          } else if (data === '3') {
            _this.$confirm('该数据您已申请通过,无法再次申请!', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          } else if (data === '4') {
            _this.$confirm('该数据您已禁用,无法申请!', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          } else {
            getMyShareParam(row.id).then((res) => {
              if (res.data.code === 10000) {
                _this.data = {
                  id: row.id,
                  basicInfo: {
                    name: row.dataName,
                    discription: row.dataDescription,
                    work: row.industryType,
                    typeId: row.typeId,
                    providerOffice: row.provideOrgan,
                    provider: row.dataProvider,
                    cyc: row.updatePeriod,
                    type: '类别'
                  },
                  shareControl: {
                    permiss: row.accessRight,
                    public: row.isPublic,
                    defaultPermiss: row.isPassed,
                    databaseName: row.dataType,
                    shareType: row.shareType,
                    discription: row.shareDescription,
                    dataTable: row.dataTable
                  },
                  tableData: res.data.data.dataShareByDbInfoFieldList,
                  isAllEdited: true,
                  isPartEdited: true
                }
                _this.dialogDataList = true
              } else {
                this.$message({
                  title: '失败',
                  message: res.data.message,
                  type: 'warning'
                })
              }
            }).catch((error) => {
              console.log(error)
            })
          }
        })
      })
    },
    handleFilter() {
      this.listQuery.pages = 1
      this.getDataList()
    },
    resetListQuery() {
      this.listQuery = {
        name: '',
        type: '',
        pages: 1,
        rows: 10
      }
      this.handleFilter()
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.listQuery.pages = val
      this.getDataList()
    },
    apply() {
      const tempData = {
        dataShareByDbInfoBaseId: this.data.id,
        useDescription: this.applyReason,
        applicant: 'pubkey'
      }
      var _this = this
      addApplication(tempData).then((res) => {
        if (res.data.code === 10000) {
          if (_this.data.shareControl.defaultPermiss === '1') {
            this.$confirm('该数据默认授权,您已申请通过', '提示', {
              confirmButtonText: '确定',
              type: 'info'
            })
          } else {
            this.$confirm('已申请,请等待审核', '提示', {
              confirmButtonText: '确定',
              type: 'info'
            })
          }
          _this.applyReason = ''
        } else {
          this.$message({
            title: '失败',
            message: res.data.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.table {
  width: 827px;
  /* min-width: 850px; */
}
.filter-container {
  margin-top: 0;
  padding-bottom: 10px;
}
.edit-container {
  margin-top: 0;
  margin-bottom: 21px;
}
.pagination-container {
  margin-bottom: 0px;
}
</style>
