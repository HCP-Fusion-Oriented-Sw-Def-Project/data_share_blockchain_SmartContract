<template>
  <div class="app-container calendar-list-container">
    <!-- 上部 -->
    <div class="filter-container">
      <!-- <div style="float: left"> -->
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
      <el-select
        v-model="listQuery.status"
        style="width: 200px"
        class="filter-item"
        placeholder="审核状态"
        @keyup.enter.native="handleFilter"
      >
        <el-option
          v-for="item in optionStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- </div> -->
    </div>
    <!-- 中部，添加、批量删除等操作-->
    <div class="edit-container">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="
          dialogDataShare = true
          handleCreate()
        "
      >
        添加
      </el-button>
      <el-button
        size="small"
        type="danger"
        @click="deleteInBatches()"
      >
        <svg-icon icon-class="delete" />批量删除
      </el-button>
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
    <div style="margin-top: 0px; margin-bottom: 10px; height: 215x; clear: both">
      <span style="font-size: 15px; font-weight: bold">我的共享记录:</span>
    </div>
    <div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="shareList"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="height: 600px"
        @selection-change="handleBatchDelete"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          align="center"
          label
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
            <span
              class="link-type"
              @click="handleUpdate(scope.row)"
            >
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="所属类别"
          width="150px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
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
          label="访问权限"
          width="200"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.permiss == '1'">禁止访问</span>
            <span v-if="scope.row.permiss == '2'">申请后访问</span>
            <span v-if="scope.row.permiss == '3'">可申请访问但禁止查看</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          class-name="status-col"
          label="审核状态"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.useAble == 0"
              :type="scope.row.useAble | statusFilter"
            >
              未提交
            </el-tag>
            <el-tag
              v-if="scope.row.useAble == 1"
              :type="scope.row.useAble | statusFilter"
            >
              未审核
            </el-tag>
            <el-tag
              v-if="scope.row.useAble == 2"
              :type="scope.row.useAble | statusFilter"
            >
              审核不通过
            </el-tag>
            <el-tag
              v-if="scope.row.useAble == 3"
              :type="scope.row.useAble | statusFilter"
            >
              审核通过
            </el-tag>
            <el-tag
              v-if="scope.row.useAble == 4"
              :type="scope.row.useAble | statusFilter"
            >
              禁用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.permiss == 1"
              size="mini"
              type="success"
              style="margin-left: 10px"
              @click="handleModify(scope.row, 2)"
            >
              可申请访问
            </el-button>
            <el-button
              v-if="(scope.row.permiss == 2 || scope.row.permiss == 3) &&scope.row.useAble == 3
              "
              size="mini"
              type="info"
              style="margin-left: 10px"
              @click="handleModify(scope.row, 1)"
            >
              禁止访问
            </el-button>
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 10px"
              @click="handleUpdate(scope.row)"
            >
              编辑
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
                size="mini"
                type="danger"
                style="margin-left: 10px"
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

    <el-dialog
      v-dialogDrag
      :title="textMap[dialogStatus]"
      :visible.sync="dialogDataShare"
      width="1300px"
      top="7vh"
    >
      <div v-if="dialogDataShare">
        <edit-share
          ref="shareData"
          :data="data"
        />
      </div>
      <!-- <edit-share v-else :obj ref="shareData"></edit-share> -->
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogDataShare = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleAdd1()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import editShare from './edit-share'
import {
  getMyShare,
  addDataShareInfoBase,
  getMyShareParam,
  deleteMyShare,
  editDataShareStatus,
  deleteDataShareByIds,
  editMyShare
} from '@/api/dataShareByDb'
export default {
  directives: {
    waves
  },
  components: {
    'edit-share': editShare
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
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
      // 组合查询
      listQuery: {
        name: '',
        type: '',
        status: '',
        page: 1,
        size: 10,
      },
      // 状态
      optionStatus: [{
        label: '未提交',
        value: '0'
      },
      {
        label: '未审核',
        value: '1'
      },
      {
        label: '审核不通过',
        value: '2'
      },
      {
        label: '审核通过',
        value: '3'
      },
      {
        label: '禁用',
        value: '4'
      }
      ],
      // 共享记录
      shareList: [],
      // 共享记录列表备份
      shareAllList: [],
      fullHeight: document.documentElement.clientHeight,
      listLoading: true,
      tableKey: 0,
      // 批量删除对象
      sels: [],
      selsName: [],
      // 当前页对象
      // this.listQuery: {
      //   size: 10,
      //   page: 1
      // },
      total: 0,
      textMap: {
        create: '添加',
        update: '编辑'
      },
      dialogStatus: 'create',
      dialogDataShare: false,
      // 传给子组件的行对象
      data: {},
      // 所有共享记录
      list: [],
      getDataFromChild: {},
      // 当前行id
      currentRowId: ''
    }
  },
  computed: {
    dataFromChild() {
      return this.$store.state.dataShareByDb.dataToPar
    },
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    },
    dataFromChild(val) {
      console.log(val)
      this.getDataFromChild = val
      this.handleAdd()
    }
  },
  created() {
    this.getShareList()
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
  methods: {
    // 获取记录
    getShareList() {
      this.listLoading = true
      this.shareList = []
      getMyShare(this.listQuery).then((res) => {
        if (res.status === 200) {
          this.list = res.data.data.list
          for (const v of this.list) {
            var temp = {
              id: v.id,
              name: v.dataName,
              type: v.typeId,
              useAble: v.auditState,
              permiss: v.accessRight,
              createDate: v.createDate
            }
            this.shareList.push(temp)
          }
          this.listLoading = false
          this.shareAllList = this.shareList
          this.total = res.data.data.totalSize
        } else {
          this.$message
        }
      })
    },
    indexMethod(index) {
      if (this.listQuery.page === 1) {
        return index + 1
      } else {
        return index + (this.listQuery.page - 1) * this.listQuery.size + 1
      }
    },
    // 查找
    handleFilter() {
      this.listQuery.pages = 1
      this.getShareList()
    },
    // 添加
    handleCreate() {
      this.dialogStatus = 'create'
      // 调用子组件清除验证
      // setTimeout(() => {
      // this.$refs.shareData.resetAllParams();
      this.data = {
        basicInfo: {},
        shareControl: {
          // dataTable: 'iris',
          // dataLink: '152.136.214.48:3306/cluster',
          // dataName: 'root',
          // dataPassword: 'Root@123'
        },
        tableData: [],
        isAllEdited: false,
        isPartEdited: false
      }
      // }, 10);
    },
    // 批量删除
    deleteInBatches() {
      console.log('delete')
      console.log(this.sels)
      console.log('1' + typeof (this.sels) === 'string')
      deleteDataShareByIds(this.sels.join(',')).then((res) => {
        console.log(res)
        this.handleFilter()
      })
    },
    handleBatchDelete(sels) {
      this.sels = []
      this.selsName = []
      for (const v of sels) {
        this.sels.push(v.id)
        this.selsName.push(v.name)
      }
    },
    // 重置
    resetListQuery() {
      this.listQuery = {
        name: '',
        type: '',
        status: '',
        page: 1,
        size: 10,
      }
      this.handleFilter()
    },
    // 是否禁用
    handleModify(row, permiss) {
      // let temp = {}
      // for (const v of this.shareList) {
      //   if (v.id === row.id) {
      //     temp = v
      //     breakrow.id
      //   }
      // }
      // temp.accessRight = permiss
      console.log(row.id)
      editDataShareStatus(row.id).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$message({
            title: '成功',
            message: res.data.message,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message({
            title: '失败',
            message: res.data.message,
            type: 'warning',
            duration: 2000
          })
        }
        this.getShareList()
      }).catch((error) => {
        console.log(error)
      })
    },
    // 编辑
    handleUpdate(row) {
      this.dialogStatus = 'update'
      var _this = this
      getMyShareParam(row.id).then((res) => {
        console.log(res)
        let tempData = {}
        for (const v of _this.list) {
          if (v.id === row.id) {
            tempData = v
            break
          }
        }
        this.currentRowId = row.id
        console.log(tempData)
        // this.data = row;
        _this.data = {
          basicInfo: {
            name: tempData.dataName,
            description: tempData.dataDescription,
            work: tempData.industryType,
            typeId: tempData.typeId,
            providerOffice: tempData.provideOrgan,
            provider: tempData.dataProvider,
            cyc: tempData.updatePeriod,
            type: '类别'
          },
          shareControl: {
            permiss: tempData.accessRight,
            public: tempData.isPublic,
            defaultPermiss: tempData.isPassed,
            databaseName: tempData.dataType,
            shareType: tempData.shareType,
            description: tempData.shareDescription,
            dataTable: tempData.dataTable
          },
          tableData: res.data.data.dataShareInfoFieldList,
          isAllEdited: false,
          isPartEdited: true
        }
        _this.dialogDataShare = true
      })
    },
    // 删除
    handleDelete(row) {
      var _this = this
      deleteMyShare(row.id).then((res) => {
        if (res.status === 200) {
          const index = _this.shareList.indexOf(row)
          _this.shareList.splice(index, 1)
          this.handleFilter()
          this.$message({
            title: '成功',
            message: res.data.message,
            type: 'success',
            duration: 2000
          })
        } else {
          this.handleFilter()
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
    // 是否删除
    cancelPopover(row, index) {
      this.$refs['btn' + index].$el.click()
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getShareList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getShareList()
    },
    // getId(){
    //     killContractProcess(this.$store.state.dataShareByDb.startContract.cid);

    // }
    // // 创建我的共享数据
    // async test() {
    //   await startContract()
    // },

    // 转到子页面edit-share检测创建页面信息是否完整
    handleAdd1() {
      this.$refs.shareData.transferToPar()
    },
    // 添加函数
    handleAdd() {
      if (this.dialogStatus === 'create') {
        var obj = this.getDataFromChild
        if (obj !== undefined) {
          this.dialogDataShare = false
          const tempData = {
            dataShareInfoBase: {
              dataName: obj.basicInfo.name,
              dataDescription: obj.basicInfo.description,
              industryType: obj.basicInfo.work,
              typeId: '123',
              dataProvider: obj.basicInfo.provider,
              provideOrgan: obj.basicInfo.providerOffice,
              updatePeriod: obj.basicInfo.cyc,
              accessRight: obj.shareControl.permiss,
              isPublic: obj.shareControl.public,
              isPassed: obj.shareControl.defaultPermiss,
              dataType: obj.shareControl.databaseName,
              dataTable: obj.shareControl.dataTable,
              shareType: obj.shareControl.shareType,
              shareDescription: obj.shareControl.description,
            },
            dataShareInfoFieldList: obj.formTable.tableData
          }
          addDataShareInfoBase(tempData).then((res) => {
            if (res.status === 200) {
              this.$message({
                title: '成功',
                message: res.data.message,
                type: 'success',
                duration: 2000
              })
              this.getShareList()
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
        }
      } else {
        var obj1 = this.getDataFromChild
        if (obj1 !== undefined) {
          console.log(obj1)
          this.dialogDataShare = false
          // if (obj.shareControl.databaseName === '1') {
          //   const tempData = {
          //     dataShareInfoBase: {
          //       dataName: obj.basicInfo.name,
          //       dataDescription: obj.basicInfo.description,
          //       industryType: obj.basicInfo.work,
          //       typeId: '123',
          //       dataProvider: obj.basicInfo.provider,
          //       provideOrgan: obj.basicInfo.providerOffice,
          //       updatePeriod: obj.basicInfo.cyc,
          //       accessRight: obj.shareControl.permiss,
          //       isPublic: obj.shareControl.public,
          //       isPassed: obj.shareControl.defaultPermiss,
          //       dataType: obj.shareControl.databaseName,
          //       shareType: obj.shareControl.shareType,
          //       dataTable: obj.shareControl.dataTable,
          //       shareDescription: obj.shareControl.description,
          //       dataSourceUrl: obj.shareControl.dataLink,
          //       dataSource: obj.shareControl.dataSource,
          //       username: obj.shareControl.dataName,
          //       password: obj.shareControl.dataPassword
          //     },
          //     dataShareInfoFieldList: obj.formTable.tableData
          //   }
          //   editMyShare(tempData).then((res) => {
          //     this.$notify({
          //       title: '成功',
          //       message: res.message,
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.getShareList()
          //   })
          // }
          // else {
          const tempData = {
            dataShareInfoBase: {
              id: this.currentRowId,
              dataName: obj1.basicInfo.name,
              dataDescription: obj1.basicInfo.description,
              industryType: obj1.basicInfo.work,
              typeId: '123',
              dataProvider: obj1.basicInfo.provider,
              provideOrgan: obj1.basicInfo.providerOffice,
              updatePeriod: obj1.basicInfo.cyc,
              accessRight: obj1.shareControl.permiss,
              isPublic: obj1.shareControl.public,
              isPassed: obj1.shareControl.defaultPermiss,
              dataType: obj1.shareControl.databaseName,
              shareType: obj1.shareControl.shareType,
              shareDescription: obj1.shareControl.description,
              dataTable: obj1.shareControl.dataTable,
            },
            dataShareInfoFieldList: obj1.formTable.tableData
          }
          editMyShare(tempData).then((res) => {
            if (res.status === 200) {
              this.$message({
                title: '成功',
                message: res.data.message,
                type: 'success',
                duration: 2000
              })
              this.getShareList()
            } else {
              this.$message({
                title: '失败',
                message: res.data.message,
                type: 'warning',
                duration: 2000
              })
              this.getShareList()
            }
          }).catch((error) => {
            console.log(error)
          })
        }
        // } else {
        //   this.dialogDataShare = true
        // }
      }
    }
  }
}
</script>

<style scoped>
/* .table {
  width: 920px;
  min-width: 930px;
} */
/* .filter-container {
  margin-top: 0;
  padding-bottom: 10px;
} */
.edit-container {
  margin-top: 0;
  margin-bottom: 21px;
}
</style>
