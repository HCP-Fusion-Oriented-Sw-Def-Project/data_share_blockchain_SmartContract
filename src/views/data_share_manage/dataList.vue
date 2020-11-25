<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div style="float:left;">
        <el-input
          v-model="listQuery.name"
          style="width: 200px;"
          class="filter-item"
          placeholder="名称"
          @keyup.enter.native="handleFilter"
        />
        <el-input
          v-model="listQuery.type"
          style="width: 200px;"
          class="filter-item"
          placeholder="类别"
          @keyup.enter.native="handleFilter"
        />
      </div>
      <div style="float:right;margin-right:5px;">
        <el-button
          v-waves
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          查找
        </el-button>
        <el-button
          v-waves
          type="info"
          icon="el-icon-refresh"
          @click="resetListQuery"
        >
          重置
        </el-button>
      </div>
    </div>
    <div style="margin-top:10px;margin-bottom:10px;clear:both;">
      <span style="font-size:15px; font-weight:bold;">数据清单:</span>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="dataList.slice(
        (listQuery.pages - 1) * listQuery.rows,
        listQuery.pages * listQuery.rows
      )"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :height="fullHeight-300"
    >
      <el-table-column
        type="selection"
        width="65"
        align="center"
      />
      <el-table-column
        align="center"
        label="序号"
        width="65"
        type="index"
      />
      <el-table-column
        align="center"
        label="名称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dataName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属类别"
        width="300px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.typeId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="访问权限"
        width="300"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.accessRight == '1'">无条件访问</span>
          <span v-if="scope.row.accessRight == '2'">申请后访问</span>
          <span v-if="scope.row.accessRight == '3'">可申请访问但禁止查看详情</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="300px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            style="margin-left:10px"
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
    <!-- </div> -->
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
      style="margin-top: 150px;"
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
          @click="dialogReason=false;dialogDataList=false;apply()"
        >
          确定
        </el-button>
        <!-- </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import $ from 'jquery'
import waves from '@/directive/waves' // 水波纹指令
import editShare from './edit-share'
import { init } from '@/utils/wsCluster'
import { getDataShareInfoBase, getMyShareParam, addApplication } from '@/api/dataShare'
import { loginBaas, getList } from '@/api/dataList'
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
      // listTest: []
    }
  },
  computed: {
    // listCon() {
    //   return this.$store.state.dataShare.contractProcessList
    // }
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    },
    // listCon(val) {
    //   this.listTest = val
    //   this.getDataList()
    // }
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
    // this.listTest = this.$store.state.dataShare.contractProcessList
    init()
    this.getDataList()
  },
  methods: {
    // 登录bass平台
    loginBass() {
      return fetch('https://trybaas.internetapi.cn/api/auth/login', {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
          'content-type': 'application/json;charset=UTF-8',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin'
        },
        referrer: 'https://trybaas.internetapi.cn/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify({ email: 'demo@bdware.org', password: 'test@123' }),
        method: 'POST',
        mode: 'cors'
      }).then(response => response.headers.get('authorization'))
    },
    getDataList() {
      var _this = this
      new Promise((resolve, reject) => {
        loginBaas().then((res) => {
          if (res !== null) { resolve(res.headers.get('authorization')) } else { reject() }
        })
      }).then(function(token) {
        return new Promise((resolve, reject) => {
          // $.ajax({
          //   url: 'https://trybaas.internetapi.cn/api/apps/ecffe8fc-6913-4f64-99ff-940a12937515/contracts',
          //   method: 'GET',
          //   timeout: '0',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'accept': 'application/json, text/plain, */*',
          //     'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
          //     'authorization': 'Bearer ' + token,
          //   },
          // }).done((response) => {
          //   if (response.code === 20000) {
          //     resolve(response)
          //   } else {
          //     _this.$notify({
          //       title: '获取合约列表失败',
          //       type: 'error',
          //       duration: 2000
          //     })
          //     reject()
          //   }
          // })
          getList(token).then((response) => {
            if (response.code === 20000) {
              resolve(response)
            } else {
              _this.$notify({
                title: '获取合约列表失败',
                type: 'error',
                duration: 2000
              })
              reject()
            }
          })
        })
      }).then(function(result) {
        return new Promise((resolve, reject) => {
          var data = result.data.data
          console.log(result)
          _this.listLoading = true
          var tempData = []
          // data为内部变量都是对象,用in访问
          for (const v in data) {
            for (const i of data[v].contracts) {
              tempData.push(i.contractName)
            }
          }
          getDataShareInfoBase(tempData.join(',')).then((res) => {
            console.log(res)
            if (res.data.code === 20000) {
              _this.dataList = res.data.data
              _this.total = _this.dataList.length
              _this.listLoading = false
            } else {
              _this.$notify({
                title: '获取数据失败',
                message: res.data.message,
                type: 'error',
                duration: 2000
              }).catch((error) => {
                console.log(error)
              })
            }
          }).catch((error) => {
            console.log(error)
          })
        })
      }).catch((error) => {
        console.log(error)
      })
      // var _this = this
      // this.listLoading = true
      // var tempData = []
      // for (const v of this.listTest) {
      //   tempData.push(v.name)
      // }
      // getDataShareInfoBase(tempData.join(',')).then((res) => {
      //   console.log(res)
      //   // for (const v of res.data.data) {
      //   //   if (v.accessRight === '2') {
      //   //     this.dataList.push(v)
      //   //   }
      //   // }
      //   if (res.data.code === 20000) {
      //     this.dataList = res.data.data
      //     this.total = this.dataList.length
      //     this.listLoading = false
      //   } else {
      //     this.$notify({
      //       title: '获取数据失败',
      //       message: res.data.message,
      //       type: 'error',
      //       duration: 2000
      //     }).catch((error) => {
      //       console.log(error)
      //     })
      //   }
      // })
    },
    handleApply(row) {
      window.executeContract(row.dataName, 'getStatus', '', (res) => {
        if (res.result === '审核通过') {
          this.$confirm('该数据您已申请通过,无法再次申请!', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else if (res.result === '禁用') {
          this.$confirm('该数据您已禁用,无法申请!', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else if (res.result === '未审核') {
          this.$confirm('该数据您已申请,请等待审核!', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          getMyShareParam(row.id).then((res) => {
            if (res.data.code === 20000) {
              this.data = {
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
                  fileType: row.dataType,
                  shareType: row.shareType,
                  discription: row.shareDescription,
                },
                tableData: res.data.data.dataShareInfoFieldList,
                isAllEdited: true,
                isPartEdited: true
              }
            } else {
              this.$notify({
                title: '失败',
                message: res.data.message,
                type: 'error',
                duration: 2000
              })
            }
            this.dialogDataList = true
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    },
    handleFilter() {
      if (this.listQuery.name === '' && this.listQuery.type === '') {
        this.$message('请输入查询条件!')
      } else {
        var temp = []
        console.log(this.dataList)
        for (const v of this.dataList) {
          if (v.dataName.indexOf(this.listQuery.name) >= 0 && v.dataType.indexOf(this.listQuery.type) >= 0) {
            temp.push(v)
          }
        }
        this.dataList = temp
        this.total = this.dataList.length
      }
    },
    resetListQuery() {
      this.getDataList()
      this.listQuery = {
        name: '',
        type: '',
        pages: 1,
        rows: 10
      }
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
    },
    handleCurrentChange(val) {
      this.listQuery.pages = val
    },
    apply() {
      // var time = new Date()
      // const args = {
      //   contractID: 'iris',
      //   data: {
      //     userName: 'uTest',
      //     data: time.getTime()
      //   }
      // }
      var pubkey = this.$store.state.user.pubKey.split(',')[0]
      const tempData = {
        dataShareInfoBaseId: this.data.id,
        useDescription: this.applyReason,
        applicant: pubkey
      }
      window.executeContract(
        this.data.basicInfo.name,
        'apply',
        this.applyReason,
        function(ret) {
          console.log(ret)
        }
      )
      var _this = this
      addApplication(tempData).then((res) => {
        setTimeout(() => {
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
        }, 50)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.table {
  width: 1027px;
  /* min-width: 850px; */
}
</style>
