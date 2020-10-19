<template>
  <div class="app-container calendar-list-container">
    <div id="left-container" class="left-container">
      <p>组织机构</p>
      <el-tree
        :data="officeData"
        :props="defaultProps"
        default-expand-all
        :highlight-current="true"
        @node-click="handleNodeClick"
      />
    </div>
    <div class="right-container">
      <!-- 上部 -->
      <div class="filter-container">
        <el-input
          v-model="listQuery.loginName"
          class="filter-item"
          placeholder="账号"
          @keyup.enter.native="handleFilter"
        />
        <el-input
          v-model="listQuery.name"
          class="filter-item"
          placeholder="昵称"
          @keyup.enter.native="handleFilter"
        />
        <el-input
          v-model="listQuery.phone"
          class="filter-item"
          placeholder="电话"
          @keyup.enter.native="handleFilter"
        />
        <el-input
          v-model="listQuery.uacOffice.name"
          class="filter-item"
          placeholder="部门"
          @keyup.enter.native="handleFilter"
          @change="handleFilter"
          @focus="
            ;(officeDialogFormVisible = true), (officeDialogStatus = 'officeId')
          "
        />
      </div>
      <!-- 中部，添加、批量删除等操作-->
      <div class="edit-container">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          添加
        </el-button>
        <el-button size="small" type="danger" @click="deleteInBatches">
          <svg-icon icon-class="delete" />批量删除
        </el-button>
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
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        :height="fullHeight - 300"
        @selection-change="handleBatchDelete"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          align="center"
          label
          width="65"
          type="index"
          :index="indexMethod"
        />
        <el-table-column min-width="65px" label="用户账号">
          <template slot-scope="scope">
            <span class="link-type" @click="handleUpdate(scope.row)">
              {{ scope.row.loginName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column width="110px" align="center" label="昵称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="邮箱">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电话">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="归属机构">
          <template slot-scope="scope">
            <span>{{ scope.row.officeName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="150px" align="center" label="更新日期">
          <template slot-scope="scope">
            <span>{{ scope.row.updateDate | formatTimes }}</span>
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
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="handleUpdate(scope.row)"
            >
              编辑
            </el-button>
            <!-- <el-button v-if="scope.row.sysUser.loginFlag!=0" size="mini" type="success" style='margin-left:10px'  @click="handleModifyStatus(scope.row,0)">正常
            </el-button>
            <el-button v-if="scope.row.sysUser.loginFlag!=1" size="mini" type="info" style='margin-left:10px' @click="handleModifyStatus(scope.row,1)">停用
            </el-button>-->
            <el-popover placement="top" width="160" trigger="click">
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
                style="margin-left:10px"
              >
                删除
              </el-button>
            </el-popover>
            <!--            <el-button size="mini" type="danger" v-popover:delpopover style='margin-left:10px' @click="deleteTmp(scope.$index)">删除</el-button>-->
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
      :visible.sync="dialogFormVisible"
      top="10vh"
    >
      <el-form
        ref="dataForm"
        :inline="true"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="100px"
      >
        <el-col :span="12">
          <el-form-item label="头像 ：" prop="photo">
            <el-input v-model="temp.photo" />
            <!--            <el-upload-->
            <!--              class="avatar-uploader"-->
            <!--              drag-->
            <!--              action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--              :onSuccess="uploadSuccess"-->
            <!--              :onError="uploadError"-->
            <!--              :show-file-list="false">-->
            <!--              <img v-if="temp.photo" :src="temp.photo" class="avatar">-->
            <!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--            </el-upload>-->
            <!--            <el-col :span="8">-->
            <!--            :action="action"-->
            <!--            :headers = "headers"-->
            <!--              <el-img :src="temp.photo"></el-img>-->
            <!--            </el-col>-->
            <!--            <el-col :span="8">-->
            <!--              <el-button @click="onClickPhotoSelect">选择</el-button>-->
            <!--            </el-col>-->
            <!--            <el-col :span="8">-->
            <!--              <el-button @click="onClickPhotoClear">清除</el-button>-->
            <!--            </el-col>-->
          </el-form-item>
          <el-form-item label="账号 :" prop="loginName">
            <el-input v-model="temp.loginName" />
          </el-form-item>
          <el-form-item label="密码 :" prop="loginPwd">
            <el-input v-model="temp.loginPwd" type="password" />
          </el-form-item>
          <el-form-item label="邮箱 :" prop="email">
            <el-input v-model="temp.email" />
          </el-form-item>
          <el-form-item label="归属机构 :" prop="officeName">
            <el-input
              v-model="temp.officeName"
              @focus="
                ;(officeDialogFormVisible = true),
                  (officeDialogStatus = 'tempOfficeId')
              "
            />
          </el-form-item>
          <el-form-item label="用户角色 :" prop="uacRole">
            <el-select
              v-model="temp.uacRole"
              multiple
              placeholder="请选择"
              @change="$forceUpdate()"
            >
              <el-option
                v-for="item in getAllRolesList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="dialogStatus !== 'create'"
            label="创建时间 :"
            prop="createDate"
          >
            <span>{{ temp.createDate | formatTimes }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工号 :" prop="userCode">
            <el-input v-model="temp.userCode" />
          </el-form-item>
          <el-form-item label="昵称 :" prop="name">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="确认密码 :" prop="confirmPwd">
            <el-input v-model="temp.confirmPwd" type="password" />
          </el-form-item>
          <el-form-item label="电话 :" prop="phone">
            <el-input v-model.number="temp.phone" />
          </el-form-item>
          <el-form-item label="账号状态 :" prop="status">
            <el-radio-group v-model="temp.status">
              <el-radio label="ENABLE">
                可用
              </el-radio>
              <el-radio label="DISABLE">
                不可用
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注 :" prop="remarks">
            <el-input v-model="temp.remarks" />
          </el-form-item>
          <el-form-item label="私钥 :" prop="privateKey">
            <el-input v-model="temp.privateKey" />
          </el-form-item>
          <el-form-item
            v-if="dialogStatus !== 'create'"
            label="最后登录 ："
            prop="lastLoginTime"
          >
            <span>{{ temp.lastLoginTime | formatTimes }}</span>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          v-if="dialogStatus === 'create'"
          :disabled="submitButtonDisabled"
          type="primary"
          @click="createData"
        >
          确认
        </el-button>
        <el-button v-else type="primary" @click="updateData">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="选择机构"
      :visible.sync="officeDialogFormVisible"
      width="30%"
      height="50%"
      top="12vh"
    >
      <p>组织机构</p>
      <hr />
      <el-tree
        ref="officeTree"
        :data="officeData"
        :props="defaultProps"
        @node-click="$refs['dataForm'].clearValidate('officeName')"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="officeDialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="getCurrentNode(), (officeDialogFormVisible = false)"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchUserList,
  updateUser,
  createUser,
  deleteLogicalUser,
  getUserInfoById,
  deleteUserInBatches,
  checkLoginName
} from '@/api/user'
import { fetchOfficeTree } from '@/api/office'
import { fetchRoleListAll } from '@/api/role'
// import { fetchMenuList } from '@/api/menu'
// import ScrollBar from '@/components/ScrollBar'
import waves from '@/directive/waves'
// import { getUserInfo } from '@/api/login'
// import { parseTime, arrayToTree2, arrayToTree3 } from '@/utils'
// import { isvalidPhone } from '@/utils/validate'
import store from '@/store'

export default {
  // components: { ScrollBar },
  directives: {
    waves
  },
  filters: {
    // statusFilter(status) {
    // 	const statusMap = {
    // 		0: 'success',
    // 		1: 'info',
    // 	}
    // 	return statusMap[status]
    // },
    formatTimes(updateDate) {
      const y = new Date(updateDate).getFullYear()
      const m = new Date(updateDate).getMonth() + 1
      const d = new Date(updateDate).getDate()
      const h = new Date(updateDate).getHours()
      const i = new Date(updateDate).getMinutes()
      const s = new Date(updateDate).getSeconds()

      var t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s
      // var t = Y + '-' + m + '-' + d;
      return t
    }
  },
  data() {
    const validateLoginName = (rule, value, callback) => {
      if (this.dialogStatus === 'create') {
        if (value === '') {
          callback(new Error('请输入账号'))
        } else {
          if (!/^[a-zA-Z\d]+$/.test(value)) {
            callback(new Error('账号只能由数字/字母组成'))
          }
          // console.log(value)
          checkLoginName(value).then(response => {
            console.log(response)
          })
          // if(){
          //
          // }
        }
      }
      callback()
    }
    const validateLoginPwd = (rule, value, callback) => {
      if (this.dialogStatus === 'create') {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
      }
      if (value !== '' && value !== null) {
        if (
          !/^([A-Za-z]+)(\d+[$@!%*?&<>=+-]+|[$@!%*?&<>=+-]+\d+)[A-Za-z\d$@!%*?&<>=+-]*$/.test(
            value
          )
        ) {
          callback(new Error('字母开头，含数字和特殊字符'))
        }
        if (value.length < 8) {
          callback(new Error('密码长度需大于8'))
        }
      }
      callback()
    }
    const validateConfirmPwd = (rule, value, callback) => {
      if (this.dialogStatus === 'create') {
        if (value === '') {
          callback(new Error('请确认密码'))
        }
      }
      if (value !== this.temp.loginPwd) {
        callback(new Error('密码不一致，请核对后重新输入'))
      }
      callback()
    }
    const validatePhone = (rule, value, callback) => {
      if (value) {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error(' 请输入正确的电话号码'))
        } else {
          callback()
        }
      } else {
        callback(new Error(' 请输入电话号码'))
      }
    }
    const validateRoles = (rule, value, callback) => {
      // console.log(typeof value)
      if (value.length === 0) {
        callback(new Error('请选择授权角色'))
      } else {
        callback()
      }
    }
    return {
      // delVisibles: [],
      tableKey: 0,
      fullHeight: document.documentElement.clientHeight,
      list: null,
      tempOfficeData: null,
      roleTableData: null,
      total: null,
      roleTotal: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        loginName: '',
        name: '',
        phone: '',
        uacOffice: {
          id: '',
          name: ''
        }
      },
      officeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      temp: {
        id: '',
        loginName: '',
        loginPwd: '',
        confirmPwd: '',
        userCode: '',
        name: '',
        phone: '',
        email: '',
        userSource: '',
        status: '',
        photo: '',
        officeId: '',
        officeName: '',
        uacRole: [],
        delFlag: 0,
        createDate: '',
        updateDate: '',
        lastLoginTime: '',
        remarks: '',
        privateKey: ''
      },
      // roles: [],
      dialogFormVisible: false,
      officeDialogFormVisible: false,
      dialogStatus: '',
      officeDialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      multipleSelection: [],
      roleMultipleSelection: [],
      dialogPvVisible: false,
      rules: {
        loginName: [
          {
            required: true,
            validator: validateLoginName,
            trigger: ['blur', 'change']
          }
        ],
        name: [
          { required: true, message: '请输入昵称', trigger: ['blur', 'change'] }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
            trigger: ['blur', 'change']
          }
        ],
        loginPwd: [
          {
            required: true,
            validator: validateLoginPwd,
            trigger: ['blur', 'change']
          }
        ],
        confirmPwd: [
          {
            required: true,
            validator: validateConfirmPwd,
            trigger: ['blur', 'change']
          }
        ],
        status: [
          { required: true, message: '请输入状态', trigger: ['blur', 'change'] }
        ],
        officeName: [
          { required: true, message: '请选择归属机构', trigger: ['blur'] }
        ],
        uacRole: [
          {
            required: true,
            validator: validateRoles,
            trigger: ['blur', 'change']
          }
        ]
      },
      downloadLoading: false,
      allRolesList: [],
      allMenuList: [],
      submitButtonDisabled: false
    }
  },
  computed: {
    getAllRolesList() {
      return this.allRolesList.map(role => {
        return Object.assign(
          { label: role.name + '(' + role.enname + ')', value: role.id },
          role
        )
      })
    },
    headers() {
      return {
        Authorization: 'Bearer ' + store.getters.token
      }
    }
    // action() {
    //   return process.env.BASE_API1 +'spark/hdfs/createWriteFileByFile';
    // },
  },
  watch: {
    fullHeight(val) {
      // if(!this.timer) {
      this.fullHeight = val
      //   this.timer = true
      //   let that = this
      //   setTimeout(function (){
      //     that.timer = false
      //   },400)
      // }
    }
  },
  created() {
    this.getList()
    this.getOfficeList()
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.clientHeight = document.body.clientHeight
        that.fullHeight = window.clientHeight
        // const height = (that.fullHeight - 100) + 'px'
        // document.getElementById('side-filter').style.height = height
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
      fetchUserList(this.listQuery)
        .then(response => {
          this.list = response.data.list
          console.log(this.list)
          for (const item of this.list) {
            if (item.uacOffice !== null) {
              item.officeName = item.uacOffice.name
            } else {
              item.officeName = ''
            }
          }
          this.total = response.data.totalSize
          this.listLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },

    getRoleList() {
      fetchRoleListAll()
        .then(response => {
          // console.log(response.data,"1")
          this.allRolesList = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getOfficeList() {
      fetchOfficeTree()
        .then(response => {
          console.log(response)
          this.officeData = JSON.parse(
            JSON.stringify(response.data)
              .replace(/child/g, 'children')
              .replace(/name/g, 'label')
          )
        })
        .catch(error => {
          console.log(error)
        })
    },

    // getMeneList() {
    //   fetchMenuList().then(response => {
    //     this.allMenuList = response.data.data
    //   })
    // },

    // 图片上传
    uploadError() {
      this.$message.warning(`文件选取失败，请重新选择!`)
    },
    uploadSuccess(res, file) {
      this.temp.photo = URL.createObjectURL(file.raw)
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleNodeClick(data) {
      this.listQuery.uacOffice = {
        id: data.id,
        name: data.label
      }
      this.getList()
    },
    getCurrentNode() {
      const data = this.$refs.officeTree.getCurrentNode()
      // console.log('getCurrentNode:')
      // console.log(data)
      if (this.officeDialogStatus === 'officeId') {
        this.listQuery.uacOffice = {
          id: data.id,
          name: data.label
        }
        // console.log('officeId:')
        // console.log(this.listQuery)
      } else if (this.officeDialogStatus === 'tempOfficeId') {
        this.temp.officeId = data.id
        this.temp.officeName = data.label
        // console.log('tempOfficeId:')
        // console.log(this.listQuery)
      }
      // console.log(uacOffice);
      // console.log(this.temp.uacOffice.require)
    },
    cancelPopover(row, index) {
      // this.delVisibles.splice(index, 1, false)
      this.$refs['btn' + index].$el.click()
      // console.log(this.$refs);
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.sysUser.loginFlag = status
      row.roles = row.roles.join(',')
      updateUser(row).then(response => {
        // this.$notify({
        //   title: '成功',
        //   message: response.data.msg,
        //   type: 'success',
        //   duration: 2000
        // })
      })
    },
    // handleSelectionChange(val) {
    // 	// const arr = val
    // 	this.temp.roles = []
    // 	this.roleMultipleSelection = val
    // 	// console.log(val)
    // 	for(var i=0;i<this.roleMultipleSelection.length;i++){
    // 		this.temp.roles.push(this.roleMultipleSelection[i].name)
    // 	}
    // 	// console.log(this.temp.roles)
    // },
    resetTemp() {
      this.temp = {
        id: '',
        loginName: '',
        loginPwd: '',
        confirmPwd: '',
        userCode: '',
        name: '',
        phone: '',
        email: '',
        userSource: '',
        status: '',
        photo: '',
        officeId: '',
        officeName: '',
        uacRole: [],
        delFlag: 0,
        createDate: '',
        updateDate: '',
        lastLoginTime: '',
        remarks: '',
        privateKey: ''
      }
    },
    resetListQuery() {
      this.listQuery = {
        size: 10,
        loginName: '',
        name: '',
        phone: '',
        uacOffice: {
          id: '',
          name: ''
        }
      }
      this.handleFilter()
    },
    handleCreate() {
      console.log('handleCreate')
      this.resetTemp()
      this.getRoleList()
      this.rules.confirmPwd[0].required = true
      this.rules.loginPwd[0].required = true
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.submitButtonDisabled = true
      // console.log('createData')
      this.$refs['dataForm'].validate(valid => {
        console.log(valid)
        checkLoginName(this.temp.loginName).then(response => {
          console.log(response)
        })
        // if(){
        //
        // }
        if (valid) {
          // this.temp.roles = this.roles
          console.log('this.temp:')
          console.log(this.temp)
          this.temp.roleList = []
          for (const role of this.temp.uacRole) {
            this.temp.roleList.push({
              id: role
            })
          }
          this.temp.officeList = [
            {
              id: this.temp.officeId
            }
          ]
          this.temp.userSource = 'INSERT'
          // this.temp.roles = this.temp.roles.join(',')
          createUser(this.temp)
            .then(response => {
              if (response.data.code === 500) {
                // 添加失败
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.list.unshift(this.temp)
                this.handleFilter()
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success',
                  duration: 2000
                })
              }
              this.submitButtonDisabled = false
            })
            .catch(error => {
              this.submitButtonDisabled = false
              console.log(error)
            })
          this.submitButtonDisabled = false
        } else {
          this.submitButtonDisabled = false
        }
      })
    },
    handleUpdate(row) {
      getUserInfoById(row.id)
        .then(response => {
          this.temp = response.data
          this.temp.officeName = this.temp.officeList[0].name
          this.temp.officeId = this.temp.officeList[0].id

          const tempRole = JSON.parse(JSON.stringify(this.temp.roleList))
          this.temp.uacRole = []
          for (const role of tempRole) {
            this.temp.uacRole.push(role.id)
          }
          this.dialogStatus = 'update'
          this.rules.confirmPwd[0].required = false
          this.rules.loginPwd[0].required = false
          this.dialogFormVisible = true
          this.getRoleList()
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateData(dataForm) {
      this.submitButtonDisabled = true
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.roleList = []
          for (const role of this.temp.uacRole) {
            this.temp.roleList.push({
              id: role
            })
          }
          this.temp.officeList = [
            {
              id: this.temp.officeId
            }
          ]
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          updateUser(tempData)
            .then(response => {
              console.log(response)
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.handleFilter()
              this.dialogFormVisible = false
              this.submitButtonDisabled = false
              this.$notify({
                title: '成功',
                message: response.msg,
                type: 'success',
                duration: 2000
              })
            })
            .catch(error => {
              this.submitButtonDisabled = false
              console.log(error)
            })
          this.submitButtonDisabled = false
        } else {
          this.submitButtonDisabled = false
        }
      })
    },
    handleDelete(row) {
      const id = Object.assign({}, row).id
      deleteLogicalUser(id)
        .then(response => {
          this.$notify({
            title: '成功',
            message: response.msg,
            type: 'success',
            duration: 2000
          })
          // console.log(response.data)
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          this.handleFilter()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // handleBatchDelete(val) {
    //   const arr = val
    //   this.multipleSelection = []
    //   for (const v of arr) {
    //     this.multipleSelection.push(v.id)
    //   }
    // },
    handleBatchDelete(sels) {
      this.multipleSelection = sels
    },
    deleteInBatches() {
      var ids = this.multipleSelection.map(item => item.id).join()
      deleteUserInBatches(ids)
        .then(response => {
          this.$notify({
            title: '成功',
            message: response.data.msg,
            type: 'success',
            duration: 2000
          })
          this.handleFilter()
        })
        .catch(error => {
          console.log(error)
        })
      // for (var v of this.multipleSelection) {
      //   deleteLogicalUser(v).then(response => {
      //     this.$notify({
      //       title: '操作成功',
      //       message: response.msg,
      //       type: 'success',
      //       duration: 2000
      //     })
      //     this.handleFilter()
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  padding: 20px;
}
.left-container {
  float: left;
  width: 200px;
  overflow-y: auto;
  overflow-x: auto;
  height: 600px;
  border-right: 1px solid;
  position: fixed;
  padding-right: 10px;
}
.right-container {
  margin-bottom: 5px;
  margin-left: 210px;
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
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 1px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>
