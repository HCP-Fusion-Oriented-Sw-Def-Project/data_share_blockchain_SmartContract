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
        <el-select
          v-model="listQuery.status"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        >
          <el-option
            v-for="item in optionStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>

    <div style="clear:both;">
      <div style="float:left;">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="
            dialogDataShare = true
            handleCreate()
          "
        >
          添加共享数据
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="deleteInBatches()"
        >
          <svg-icon icon-class="delete" />批量删除
        </el-button>
      </div>
      <div style="float:right;">
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
    <!-- <div style="margin-top:20px;margin-bottom:10px; height:215x;">
      <span style="font-size:15px; font-weight:bold;">我的共享记录:</span>
    </div> -->
    <div style="margin-top:45px;">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="
          shareList.slice(
            (pageList.page - 1) * pageList.size,
            pageList.page * pageList.size
          )
        "
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
          label
          width="65"
          type="index"
        />
        <el-table-column
          align="center"
          label="数据名称"
          width="150px"
        >
          <template slot-scope="scope">
            <span
              class="link-type"
              @click="handleUpdate(scope.row)"
            >
              {{
                scope.row.name
              }}
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
            <span v-if="scope.row.permiss == '3'">可申请访问但禁止查看详情</span>
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
              style="margin-left:10px"
              @click="handleModify(scope.row, 2)"
            >
              可申请访问
            </el-button>
            <el-button
              v-if="(scope.row.permiss == 2 || scope.row.permiss == 3) && scope.row.useAble == 3"
              size="mini"
              type="info"
              style="margin-left:10px"
              @click="handleModify(scope.row, 1)"
            >
              禁止访问
            </el-button>
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="
                handleUpdate(scope.row)
              "
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
          :current-page="pageList.page"
          :page-sizes="[5, 10, 20, 30, 50]"
          :page-size="pageList.size"
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
// import '@/utils/wsCluster.js'
import { initWSocket } from '@/utils/wsCluster'
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
} from '@/api/dataShare'
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
      },
      // 状态
      optionStatus: [
        {
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
      pageList: {
        size: 10,
        page: 1
      },
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
      getDataFromChild: {}
    }
  },
  computed: {
    dataFromChild() {
      return this.$store.state.dataShare.dataToPar
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
      getMyShare().then((res) => {
        console.log(res.data.data)
        if (res.data.code === 20000) {
          this.list = res.data.data
          for (const v of this.list) {
            var temp = {
              id: v.id,
              name: v.dataName,
              type: v.typeId,
              useAble: v.auditState,
              permiss: v.accessRight,
              createDate: v.createDate,
              contractKey: v.contractKey,
              nodeAddr: v.nodeAddr
            }
            this.shareList.push(temp)
          }
          this.listLoading = false
          this.shareAllList = this.shareList
          this.total = this.shareList.length
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
    indexMethod(index) { },
    // 查找
    handleFilter() {
      if (this.listQuery.name === '' && this.listQuery.type === '' && this.listQuery.status === '') {
        this.$message('请输入查询条件!')
      } else {
        var temp = []
        for (const v of this.shareAllList) {
          if (v.name.indexOf(this.listQuery.name) >= 0 && v.type.indexOf(this.listQuery.type) >= 0 && v.useAble.indexOf(this.listQuery.status) >= 0) {
            temp.push(v)
          }
        }
        this.shareList = temp
      }
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
      console.log(this.sels)
      for (const v of this.selsName) {
        window.deleteFile(v)
        window.killContractProcess(v)
      }
      deleteDataShareByIds(this.sels.join(',')).then((res) => {
        if (res.data.code === 20000) {
          this.getShareList()
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
      // var coverUrl = 'assets/dashboard/dashboard.png'
      // this.convertImgToBase64(coverUrl, function(base64Img) {
      //   // 转化后的base64
      //   console.log(base64Img)
      // })
      window.startContract('testyur')
      this.listQuery = {
        name: '',
        type: '',
        status: '',
      }
      this.shareList = this.shareAllList
    },
    // 将图片转换成base634格式
    // convertImgToBase64(url, callback, outputFormat) {
    //   var canvas = document.createElement('CANVAS')
    //   var ctx = canvas.getContext('2d')
    //   var img = new Image()
    //   img.crossOrigin = 'Anonymous'
    //   img.onload = function() {
    //     canvas.height = img.height
    //     canvas.width = img.width
    //     ctx.drawImage(img, 0, 0)
    //     var dataURL = canvas.toDataURL(outputFormat || 'image/png')
    //     callback.call(this, dataURL)
    //     canvas = null
    //   }
    //   img.src = url
    // },
    // 是否禁用
    handleModify(row, permiss) {
      let temp = {}
      for (const v of this.shareList) {
        if (v.id === row.id) {
          temp = v
          break
        }
      }
      temp.accessRight = permiss
      editDataShareStatus(temp).then((res) => {
        console.log(res)
        if (res.data.code === 20000) {
          this.getShareList()
        } else {
          this.$notify({
            title: '编辑失败',
            message: res.data.message,
            type: 'error',
            duration: 2000
          })
        }
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
        if (res.data.code === 20000) {
          this.$notify({
            title: '修改成功',
            message: res.data.message,
            type: 'success',
            duration: 2000
          })
          let tempData = {}
          for (const v of _this.list) {
            if (v.id === row.id) {
              tempData = v
              break
            }
          }
          console.log(tempData)
          // this.data = row;
          _this.data = {
            basicInfo: {
              name: tempData.dataName,
              discription: tempData.dataDescription,
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
              fileType: tempData.dataType,
              shareType: tempData.shareType,
              discription: tempData.shareDescription,
              dataTable: tempData.dataTable
            },
            tableData: res.data.data.dataShareInfoFieldList,
            isAllEdited: false,
            isPartEdited: true
          }
          _this.dialogDataShare = true
        } else {
          this.$notify({
            title: '失败',
            message: res.data.message,
            type: 'danger',
            duration: 2000
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 删除
    handleDelete(row) {
      console.log(row)
      this.$store.commit('setContractKey', row.contractKey)
      this.$store.commit('setNodeAddr', row.nodeAddr)
      initWSocket()
      deleteMyShare(row.id).then((res) => {
        if (res.data.code === 20000) {
          const index = this.shareList.indexOf(row)
          this.shareList.splice(index, 1)
          this.$notify({
            title: '删除成功',
            message: res.data.message,
            type: 'success',
            duration: 2000
          })
          setTimeout(() => {
            window.killContractProcess(row.name)
            window.deleteFile(row.name)
          }, 5000)
          this.$store.commit('setContractKey', '')
          this.$store.commit('setNodeAddr', '')
        } else {
          this.$notify({
            title: '删除失败',
            message: res.data.message,
            type: 'danger',
            duration: 2000
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 是否删除
    cancelPopover(row, index) {
      // this.delVisibles.splice(index, 1, false)
      this.$refs['btn' + index].$el.click()
    },
    handleSizeChange(val) {
      this.pageList.size = val
      // this.getShareList();
    },
    handleCurrentChange(val) {
      this.pageList.page = val
      // this.getShareList();
    },
    // getId(){
    //     killContractProcess(this.$store.state.dataShare.startContract.cid);

    // }
    // // 创建我的共享数据
    // async test() {
    //   await startContract()
    // },
    // fetch方法发送请求
    postData() {
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
    // 使用fetch创建合约
    createShareData(data, token) {
      return fetch('https://trybaas.internetapi.cn/api/apps', {
        headers: {
          'Content-Type': 'application/json',
          // 'accept': 'application/json, text/plain, */*',
          // 'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
          'authorization': 'Bearer ' + token,
        },
        // referrer: 'https://trybaas.internetapi.cn/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify(data),
        method: 'POST',
        // mode: 'cors'
      }).then(response => response.json())
    },
    handleAdd1() {
      this.$refs.shareData.transferToPar()
    },
    handleAdd() {
      if (this.dialogStatus === 'create') {
        var obj = this.getDataFromChild
        if (obj !== undefined) {
          this.dialogDataShare = false
          if (obj.shareControl.fileType === '1') {
            const tempData = {
              dataShareInfoBase: {
                dataName: obj.basicInfo.name,
                dataDescription: obj.basicInfo.discription,
                industryType: obj.basicInfo.work,
                typeId: '1',
                dataProvider: obj.basicInfo.provider,
                provideOrgan: obj.basicInfo.providerOffice,
                updatePeriod: obj.basicInfo.cyc,
                accessRight: obj.shareControl.permiss,
                isPublic: obj.shareControl.public,
                isPassed: obj.shareControl.defaultPermiss,
                dataType: obj.shareControl.fileType,
                shareType: obj.shareControl.shareType,
                dataTable: obj.shareControl.dataTable,
                shareDescription: obj.shareControl.discription,
                dataSourceUrl: obj.shareControl.dataLink,
                dataSource: obj.shareControl.dataSource,
                username: obj.shareControl.dataName,
                password: obj.shareControl.dataPassword
              },
              dataShareInfoFieldList: obj.formTable.tableData
            }
            var _this = this
            // 登录baas获取token
            new Promise((resolve, reject) => {
              _this.postData().then((res) => {
                console.log(res)
                resolve(res)
              }).catch((error) => {
                console.log(error)
                _this.$notify({
                  title: '失败',
                  message: '登录baas失败',
                  type: 'warning',
                  duration: 2000
                })
                reject()
              })
            }).then(function(token) {
              // 生成合约
              return new Promise((resolve, reject) => {
                const contractCfg = {
                  contractName: obj.basicInfo.name,
                  basicInfo: '',
                  isPrivate: true,
                  tableName: obj.shareControl.dataTable,
                  dbUrl: 'jdbc:mysql://' + obj.shareControl.dataLink,
                  dbUserName: obj.shareControl.dataName,
                  dbPWD: obj.shareControl.dataPassword,
                  defaultAccept: obj.shareControl.defaultPermiss === '1',
                  accessPolicy: 'DAC',
                  chainName: 'demo'
                }
                const appInfo = {
                  chainID: '61830b9d-2cbe-4afb-9247-2e7a1c325994',
                  coverUrl: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAZABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKAP/2Q==',
                  intro: '1',
                  name: obj.basicInfo.name,
                  type: '医疗健康',
                  version: '1.2.3'
                }
                const contractInfo = {
                  cApiName: 'generateMySQLProject',
                  cTemplate: 'MySQL',
                  upload: false
                }
                var data = {
                  appInfo: appInfo,
                  contractCfg: contractCfg,
                  contractInfo: contractInfo
                }
                _this.createShareData(data, token).then((res1) => {
                  // 获得返回值当前合约节点ip, 当前合约公私玥
                  _this.$store.commit('setNodeAddr', res1.data.nodeAddr)
                  _this.$store.commit('setContractKey', res1.data.keyPair.publicKey + ',' + res1.data.keyPair.privateKey)
                  resolve()
                }).catch((error) => {
                  _this.$notify({
                    title: '失败',
                    message: '创建合约失败',
                    type: 'warning',
                    duration: 2000
                  })
                  console.log(error)
                  reject()
                })
              })
            }).then(function() {
              // 建立websocket连接, 登录节点启动合约
              return new Promise((resolve, reject) => {
                initWSocket()
                resolve()
              })
            }).then(function() {
              // 传给自己后端存储
              return new Promise((resolve, reject) => {
                tempData.dataShareInfoBase.contractKey = _this.$store.state.dataShare.contractKey
                tempData.dataShareInfoBase.nodeAddr = _this.$store.state.dataShare.nodeAddr
                addDataShareInfoBase(tempData).then((res) => {
                  if (res.data.code === 20000) {
                    _this.$notify({
                      title: '成功',
                      message: res.data.message,
                      type: 'success',
                      duration: 2000
                    })
                    _this.getShareList()
                    resolve()
                  } else {
                    _this.$notify({
                      title: '失败',
                      message: res.data.message,
                      type: 'warning',
                      duration: 2000
                    })
                    reject()
                  }
                }).catch((error) => {
                  console.log(error)
                })
              })
            }).then(function() {
              // 启动合约
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  window.startContract(obj.basicInfo.name)
                  _this.$store.commit('setContractKey', '')
                  _this.$store.commit('setNodeAddr', '')
                  resolve()
                }, 8000)
              })
            }).then(function() {
              return new Promise((resolve, reject) => {
                window.executeContract(obj.basicInfo.name, 'changeOwner', _this.$store.state.user.pubKey.split(',')[0])
                resolve()
              })
            }).catch((error) => {
              console.log(error)
            })
            // addDataShareInfoBase(tempData).then((res) => {
            //   if (res.data.code === 20000) {
            //     this.$notify({
            //       title: '成功',
            //       message: res.data.message,
            //       type: 'success',
            //       duration: 2000
            //     })
            //     this.getShareList()
            //   } else {
            //     this.$notify({
            //       title: '失败',
            //       message: res.data.message,
            //       type: 'warning',
            //       duration: 2000
            //     })
            //   }
            // }).catch((error) => {
            //   console.log(error)
            // })

            // this.postData().then((res) => {

            //   var _this = this
            //   this.createShareData(data, res).then((response) => {
            //     console.log(response)
            //     _this.$store.commit('setNodeAddr', response.data.nodeAddr)
            //     _this.$store.commit('setContractKey', response.data.keyPair.publicKey + ',' + response.data.keyPair.privateKey)
            //     initWSocket()
            //     setTimeout(() => {
            //       window.startContract(obj.basicInfo.name)
            //       _this.$store.commit('setContractKey', '')
            //     }, 8000)
            //   })
            // }).catch((error) => {
            //   console.log(error)
            // })
            // window.generateMySQLProject(args, fieldList)
            // window.startContract(args.contractName)
          } else {
            const tempData = {
              dataShareInfoBase: {
                dataName: obj.basicInfo.name,
                dataDescription: obj.basicInfo.discription,
                industryType: obj.basicInfo.work,
                typeId: '123',
                dataProvider: obj.basicInfo.provider,
                provideOrgan: obj.basicInfo.providerOffice,
                updatePeriod: obj.basicInfo.cyc,
                accessRight: obj.shareControl.permiss,
                isPublic: obj.shareControl.public,
                isPassed: obj.shareControl.defaultPermiss,
                dataType: obj.shareControl.fileType,
                shareType: obj.shareControl.shareType,
                shareDescription: obj.shareControl.discription,
              },
              dataShareInfoFieldList: obj.formTable.tableData
            }
            _this = this
            // 登录baas获取token
            new Promise((resolve, reject) => {
              _this.postData().then((res) => {
                console.log(res)
                resolve(res)
              }).catch((error) => {
                console.log(error)
                _this.$notify({
                  title: '失败',
                  message: '登录baas失败',
                  type: 'warning',
                  duration: 2000
                })
                reject()
              })
            }).then(function(token) {
              // 生成合约
              return new Promise((resolve, reject) => {
                const contractCfg = {
                  contractName: obj.basicInfo.name,
                  basicInfo: '生成csv数据合约',
                  // isPrivate: true,
                  base64EncodedData: obj.shareControl.base64EncodedData,
                  defaultAccept: obj.shareControl.defaultPermiss === '1',
                  accessPolicy: 'DAC'
                }
                const appInfo = {
                  chainID: '61830b9d-2cbe-4afb-9247-2e7a1c325994',
                  coverUrl: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAZABMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigAooooAKKKKAP/2Q==',
                  intro: '21',
                  name: obj.basicInfo.name,
                  type: '1',
                  version: '1.0.0'
                }
                const contractInfo = {
                  cApiName: 'generateCSVProject',
                  cTemplate: 'CSV',
                  upload: false
                }
                var data = {
                  appInfo: appInfo,
                  contractCfg: contractCfg,
                  contractInfo: contractInfo
                }
                _this.createShareData(data, token).then((res1) => {
                  // 获得返回值当前合约节点ip, 当前合约公私玥
                  _this.$store.commit('setNodeAddr', res1.data.nodeAddr)
                  _this.$store.commit('setContractKey', res1.data.keyPair.publicKey + ',' + res1.data.keyPair.privateKey)
                  resolve()
                }).catch((error) => {
                  console.log(error)
                  _this.$notify({
                    title: '失败',
                    message: '创建合约失败',
                    type: 'warning',
                    duration: 2000
                  })
                  reject()
                })
              })
            }).then(function() {
              // 建立websocket连接, 登录节点启动合约
              return new Promise((resolve, reject) => {
                initWSocket()
                resolve()
              })
            }).then(function() {
              // 传给自己后端存储
              return new Promise((resolve, reject) => {
                tempData.dataShareInfoBase.contractKey = _this.$store.state.dataShare.contractKey
                tempData.dataShareInfoBase.nodeAddr = _this.$store.state.dataShare.nodeAddr
                addDataShareInfoBase(tempData).then((res) => {
                  if (res.data.code === 20000) {
                    _this.$notify({
                      title: '成功',
                      message: res.data.message,
                      type: 'success',
                      duration: 2000
                    })
                    _this.getShareList()
                    resolve()
                  } else {
                    _this.$notify({
                      title: '失败',
                      message: res.data.message,
                      type: 'warning',
                      duration: 2000
                    })
                    reject()
                  }
                }).catch((error) => {
                  console.log(error)
                })
              })
            }).then(function() {
              // 启动合约
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  window.startContract(obj.basicInfo.name)
                  _this.$store.commit('setContractKey', '')
                  _this.$store.commit('setNodeAddr', '')
                  resolve()
                }, 8000)
              })
            }).then(function() {
              return new Promise((resolve, reject) => {
                // 更改新生成的合约的公钥
                window.executeContract(obj.basicInfo.name, 'changeOwner', _this.$store.state.user.pubKey.split(',')[0])
                resolve()
              })
            }).catch((error) => {
              console.log(error)
            })
          }
        } else {
          this.dialogDataShare = true
        }
      } else { // 修改
        var obj1 = this.getDataFromChild
        if (obj1 !== undefined) {
          this.dialogDataShare = false
          if (obj1.shareControl.defaultPermiss !== this.data.shareControl.defaultPermiss && obj1.shareControl.defaultPermiss === '2') {
            window.executeContract(
              obj.basicInfo.name,
              'cancel',
              this.$store.state.user.pubKey.split(',')[0],
              (res) => {
                console.log(res)
              }
            )
          }
          // mysql类型修改
          if (obj.shareControl.fileType === '1') {
            const tempData = {
              dataShareInfoBase: {
                dataName: obj.basicInfo.name,
                dataDescription: obj.basicInfo.discription,
                industryType: obj.basicInfo.work,
                typeId: '123',
                dataProvider: obj.basicInfo.provider,
                provideOrgan: obj.basicInfo.providerOffice,
                updatePeriod: obj.basicInfo.cyc,
                accessRight: obj.shareControl.permiss,
                isPublic: obj.shareControl.public,
                isPassed: obj.shareControl.defaultPermiss,
                dataType: obj.shareControl.fileType,
                shareType: obj.shareControl.shareType,
                dataTable: obj.shareControl.dataTable,
                shareDescription: obj.shareControl.discription,
                dataSourceUrl: obj.shareControl.dataLink,
                dataSource: obj.shareControl.dataSource,
                username: obj.shareControl.dataName,
                password: obj.shareControl.dataPassword
              },
              dataShareInfoFieldList: obj.formTable.tableData
            }
            editMyShare(tempData).then((res) => {
              if (res.data.code === 20000) {
                this.$notify({
                  title: '修改成功',
                  message: res.data.message,
                  type: 'success',
                  duration: 2000
                })
                this.getShareList()
              } else {
                this.$notify({
                  title: '失败',
                  message: res.data.message,
                  type: 'warning',
                  duration: 2000
                })
              }
            }).catch((error) => {
              console.log(error)
            })
          } else { // csv格式修改
            const tempData = {
              dataShareInfoBase: {
                dataName: obj.basicInfo.name,
                dataDescription: obj.basicInfo.discription,
                industryType: obj.basicInfo.work,
                typeId: '123',
                dataProvider: obj.basicInfo.provider,
                provideOrgan: obj.basicInfo.providerOffice,
                updatePeriod: obj.basicInfo.cyc,
                accessRight: obj.shareControl.permiss,
                isPublic: obj.shareControl.public,
                isPassed: obj.shareControl.defaultPermiss,
                dataType: obj.shareControl.fileType,
                shareType: obj.shareControl.shareType,
                shareDescription: obj.shareControl.discription,
              },
              dataShareInfoFieldList: obj.formTable.tableData
            }
            editMyShare(tempData).then((res) => {
              if (res.data.code === 20000) {
                this.$notify({
                  title: '成功',
                  message: res.data.message,
                  type: 'success',
                  duration: 2000
                })
                this.getShareList()
              } else {
                this.$notify({
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
          this.dialogDataShare = true
        }
      }
    }
  }
}
</script>
<style scoped>
.table {
  margin-top: 0px;
}
</style>
