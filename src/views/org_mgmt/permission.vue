<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        class="filter-item"
        placeholder="角色名称"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.enname"
        class="filter-item"
        placeholder="角色编码"
        style="width: 200px;"
        @keyup.enter.native="handleFilter"
      />
    </div>
    <div style="margin-bottom: 10px;margin-top: 0px">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-button size="small" type="info" @click="deleteInBatches">
        <svg-icon icon-class="delete" />批量删除
      </el-button>
      <div style="float:right">
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="handleFilter"
        >
          查找
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          type="info"
          icon="el-icon-refresh"
          size="small"
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
      style="width: 100%"
      :height="fullHeight - 300"
      @selection-change="handleBatchDelete"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        align="center"
        label=""
        width="65"
        type="index"
        :index="indexMethod"
      />
      <el-table-column label="角色名称" width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{
            scope.row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色编码" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.enname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="250px" align="center" label="更新日期">
        <template slot-scope="scope">
          <span>{{ scope.row.updateDate | formatTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="150">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.useAble == 1"
            :type="scope.row.useAble | statusFilter"
          >
            正常
          </el-tag>
          <el-tag
            v-if="scope.row.useAble == 0"
            :type="scope.row.useAble | statusFilter"
          >
            停用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="550px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            style="margin-left:10px"
            @click="handleUpdate(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="scope.row.useAble != 1"
            size="small"
            type="success"
            style="margin-left:10px"
            @click="handleModify(scope.row, 1)"
          >
            正常
          </el-button>
          <el-button
            v-if="scope.row.useAble != 0"
            size="small"
            type="info"
            style="margin-left:10px"
            @click="handleModify(scope.row, 0)"
          >
            停用
          </el-button>
          <el-popover placement="top" width="160" trigger="click">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="small"
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
          <el-button
            size="small"
            type="warning"
            style="margin-left:10px"
            @click="
              dialogRoleFormVisible = true
              authorize(scope.row)
            "
          >
            分配用户
          </el-button>
          <el-button
            size="small"
            type="warning"
            style="margin-left:10px"
            @click="
              officeDialogFormVisible = true
              authorize(scope.row)
            "
          >
            分配机构
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

    <el-dialog
      v-if="dialogFormVisible"
      v-dialogDrag
      :title="textMap[dialogStatus]"
      width="60%"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="120px"
        style="margin-left:50px;margin-right:50px;height:550px; "
      >
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="角色名称：" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="角色编码：" prop="enname">
              <el-input v-model="temp.enname" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="角色类别：" prop="roleType">
              <el-select
                v-model="temp.roleType"
                class="filter-item"
                placeholder="类型"
              >
                <el-option
                  v-for="item in roleTypeOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="排序号：" prop="number">
              <el-input v-model="temp.number" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="是否系统数据：" prop="isSys">
              <el-switch
                v-model="temp.isSys"
                active-text="是"
                inactive-text="否"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-col :span="12">
              <el-form-item label="是否可用：" prop="useAble">
                <el-switch
                  v-model="temp.useAble"
                  active-text="是"
                  inactive-text="否"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="数据范围：" prop="dataScope">
              <el-select
                v-model="temp.dataScope"
                clearable
                class="filter-item"
                placeholder="类型"
              >
                <el-option
                  v-for="item in dataScopeOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注：" prop="remarks">
              <el-input v-model="temp.remarks" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="权限设置：" prop="uacActions">
          <el-tree
            ref="tree"
            :data="actionTableData"
            show-checkbox
            default-expand-all
            accordion
            node-key="id"
            highlight-current
            :props="defaultProps"
            class="treeCom"
            style="width:400px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          v-if="dialogStatus == 'create'"
          :disabled="submitSuccess"
          type="primary"
          @click="createData"
        >
          确认
        </el-button>
        <el-button
          v-else
          :disabled="submitSuccess"
          type="primary"
          @click="updateData"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="选择部门"
      :visible.sync="officeDialogFormVisible"
      width="400px"
      top="7vh"
    >
      <p>组织机构</p>
      <hr />
      <el-tree
        ref="tree1"
        :data="list1"
        show-checkbox
        default-expand-all
        accordion
        node-key="id"
        highlight-current
        :props="defaultProps"
        class="treeCom"
        style="width:360px"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="officeDialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="getCurrentNodeOffice(), (officeDialogFormVisible = false)"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="角色授权用户"
      :visible.sync="dialogRoleFormVisible"
      width="1300px"
      top="8vh"
    >
      <div class="filter-container">
        <el-input
          v-model="userRoleListQuery.loginName"
          style="width: 150px;"
          class="filter-item"
          placeholder="账号"
          @keyup.enter.native="handleFilterUR"
        />
        <el-input
          v-model="userRoleListQuery.name"
          style="width: 150px;"
          class="filter-item"
          placeholder="姓名"
          @keyup.enter.native="handleFilterUR"
        />
        <el-input
          v-model="userRoleListQuery.phone"
          style="width: 100px;"
          class="filter-item"
          placeholder="电话"
          @keyup.enter.native="handleFilterUR"
        />
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilterUR"
        >
          查找
        </el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-plus"
          @click="addUserToRole"
        >
          添加
        </el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="danger"
          icon="el-icon-delete"
          @click="cancleUserRoleInBatches"
        >
          批量取消授权
        </el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="info"
          icon="el-icon-refresh"
          @click="resetUserRoleInBatches"
        >
          重置
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="userList"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%"
        :index="indexMethod1"
        @selection-change="handleUserSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column min-width="65px" label="用户账号">
          <template slot-scope="scope">
            <span class="link-type">{{ scope.row.loginName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="110px" align="center" label="用户姓名">
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
        <el-table-column width="180px" align="center" label="更新日期">
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
              size="small"
              type="danger"
              @click="cancleUserRole(scope.row)"
            >
              取消授权
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          :current-page="userRoleListQuery.page"
          :page-sizes="[5, 10, 20, 30, 50]"
          :page-size="userRoleListQuery.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userRoleTotal"
          :index="indexMethod1"
          @size-change="handleSizeChangeUR"
          @current-change="handleCurrentChangeUR"
        />
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="添加用户到角色"
      :visible.sync="dialogUserFormVisible"
      width="1200px"
      top="7vh"
    >
      <div class="filter-container">
        <el-input
          v-model="userListQuery.loginName"
          style="width: 150px;"
          class="filter-item"
          placeholder="账号"
          @keyup.enter.native="handleFilterU"
        />
        <el-input
          v-model="userListQuery.name"
          style="width: 150px;"
          class="filter-item"
          placeholder="姓名"
          @keyup.enter.native="handleFilterU"
        />
        <el-input
          v-model="userListQuery.phone"
          style="width: 100px;"
          class="filter-item"
          placeholder="电话"
          @keyup.enter.native="handleFilterU"
        />
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilterU"
        >
          查找
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          type="info"
          icon="el-icon-refresh"
          @click="resetUserQuery"
        >
          重置
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="allUserList"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @selection-change="handleUserSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column min-width="65px" label="用户账号">
          <template slot-scope="scope">
            <span class="link-type">{{ scope.row.loginName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="110px" align="center" label="用户姓名">
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
        <el-table-column width="150px" align="center" label="更新日期">
          <template slot-scope="scope">
            <span>{{ scope.row.updateDate | formatTimes }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          :current-page="userListQuery.page"
          :page-sizes="[5, 10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="userListQuery.size"
          :total="userTotal"
          :index="indexMethod2"
          @size-change="handleSizeChangeU"
          @current-change="handleCurrentChangeU"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          :disabled="submitSuccess"
          @click="handleAuthorizeUsers"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import {
  fetchRoleList,
  handleUpdateRole,
  createRole,
  deleteLogicalRole,
  addRoleUser,
  addRoleOffice,
  deleteRoleUser,
  deleteRoleInBatches,
  fetchRoleListByName
} from '@/api/role'
import { fetchMenuList } from '@/api/menu'
import { fetchUserList, updateUser, getUseByRoleId } from '@/api/user'
import { fetchOfficeTree, fetchOfficeById } from '@/api/office'

export default {
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info'
      }
      return statusMap[status]
    },
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
    var validateActions = (rule, value, callback) => {
      if (this.$refs.tree.getCheckedKeys().length === 0) {
        callback(new Error('请选择授权功能'))
      } else {
        callback()
      }
    }
    var validateDepart = (rule, value, callback) => {
      if (!this.temp.uacDepartment) {
        callback(new Error('请选择部门'))
      } else {
        callback()
      }
    }
    return {
      delVisibles: [],
      tableKey: 0,
      list: null,
      actionTableData: null,
      userList: [],
      tempUserList: [],
      allUserList: [],
      total: 0,
      userTotal: 0,
      userRoleTotal: 10,
      roleName: '',
      fullHeight: document.documentElement.clientHeight,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        name: '',
        enname: ''
      },
      userListQuery: {
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
      userRoleListQuery: {
        loginName: '',
        name: '',
        phone: '',
        page: 1,
        size: 10
      },
      treedata: [
        {
          id: 1,
          label: '系统管理',
          children: [
            {
              id: 2,
              label: '组织管理',
              children: [
                {
                  id: 5,
                  label: '编辑'
                },
                {
                  id: 6,
                  label: '查看'
                }
              ]
            },
            {
              id: 3,
              label: '算法管理',
              children: [
                {
                  id: 7,
                  label: '编辑'
                },
                {
                  id: 8,
                  label: '查看'
                }
              ]
            },
            {
              id: 4,
              label: '数据处理',
              children: [
                {
                  id: 9,
                  label: '编辑'
                },
                {
                  id: 10,
                  label: '查看'
                }
              ]
            }
          ]
        }
      ],
      statusOptions: ['停用', '正常'],
      temp: {
        id: '',
        name: '',
        enname: '',
        roleType: '',
        uacActions: [],
        isSys: 0,
        useAble: 1,
        office: ''
      },
      dialogFormVisible: false,
      dialogRoleFormVisible: false,
      dialogUserFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogPvVisible: false,
      multipleSelection: [],
      dataScopeOptions: [
        {
          label: '所有数据',
          key: '1'
        },
        {
          label: '所在公司及以下数据',
          key: '2'
        },
        {
          label: '所在公司数据',
          key: '3'
        },
        {
          label: '所在部门及以下数据',
          key: '4'
        },
        {
          label: '所在部门数据',
          key: '5'
        },
        {
          label: '仅本人数据',
          key: '6'
        },
        {
          label: '按明细设置',
          key: '7'
        }
      ],
      roleTypeOptions: [
        {
          label: '任务分配',
          key: '1'
        },
        {
          label: '管理角色',
          key: '2'
        },
        {
          label: '普通角色',
          key: '3'
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: ['blur', 'change']
          }
        ],
        enname: [
          {
            required: true,
            message: '请输入角色编码',
            trigger: ['blur', 'change']
          }
        ],
        roleType: [
          {
            required: true,
            message: '请输入角色类别',
            trigger: ['change', 'blur']
          }
        ],
        uacDepartment: [
          { required: true, validator: validateDepart, trigger: 'change' }
        ],
        uacActions: [
          { required: true, validator: validateActions, trigger: 'change' }
        ]
      },
      downloadLoading: false,
      // 当前分配用户的id
      roleId: '',
      defaultProps: {
        label: function(a) {
          return a.name
        }
      },
      // 机构树形数据
      list1: [],
      officeDialogFormVisible: false,
      // 避免重复提交
      submitSuccess: false
    }
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
    fetchMenuList().then(response => {
      // this.actionTableData = response.data
      var _list = response.data
      _list.forEach(element => {
        const parentId = element.parentId
        if (parentId !== '0') {
          _list.forEach(ele => {
            if (ele.id === parentId) {
              // 当内层循环的ID== 外层循环的parendId时，需要往该内层id里建个children并push对应的数组；
              if (!ele.children) {
                ele.children = []
              }
              ele.children.push(element)
              // 按照排序的树形结构输出
              ele.children.sort(function(a, b) {
                return a.sort - b.sort
              })
            }
          })
        }
      })
      // 选择菜单与主页面菜单不同
      _list = _list.filter(ele => ele.parentId === '0') // 这一步是过滤，按树展开，将多余的数组剔除；
      this.actionTableData = _list
    })
    fetchOfficeTree().then(response => {
      // element树形表格数据必须含有children字段,不能含有haschildren字段
      var _list1 = JSON.parse(
        JSON.stringify(response.data).replace(/child/g, 'children')
      )
      this.list1 = JSON.parse(
        JSON.stringify(_list1).replace(/hasChildren/g, 'hasChild')
      )
      // this.list = response.data[0]
    })
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
    indexMethod(index) {
      if (this.listQuery.page === 1) {
        return index + 1
      } else {
        console.log('this.listQuery.page:' + this.listQuery.page)
        console.log('this.listQuery.size:' + this.listQuery.size)
        return index + (this.listQuery.page - 1) * this.listQuery.size + 1
      }
    },
    indexMethod1(index) {
      if (this.userRoleListQuery.page === 1) {
        return index + 1
      } else {
        return (
          index +
          (this.userRoleListQuery.page - 1) * this.userRoleListQuery.size +
          1
        )
      }
    },
    indexMethod2(index) {
      if (this.userListQuery.page === 1) {
        return index + 1
      } else {
        return (
          index + (this.userListQuery.page - 1) * this.userListQuery.size + 1
        )
      }
    },
    getList() {
      this.listLoading = true
      console.log(this.listQuery)
      fetchRoleList(this.listQuery).then(response => {
        this.list = response.data.list
        console.log(this.list)
        this.total = response.data.totalSize
        this.listLoading = false
      })
    },
    getUserList() {
      fetchUserList(this.userListQuery).then(response => {
        console.log(response.data)
        this.allUserList = response.data.list
        // 获取 userList 所有元素的id
        const Ids = this.userList.map(item => item.id)
        // 过滤掉allUserList含有相同的id项
        this.allUserList = this.allUserList.filter(
          item => !Ids.includes(item.id)
        )
        this.userTotal = response.data.totalSize
      })
    },
    getUserRoleList() {
      this.userList = []
      this.listLoading = true
      var tempdata = {
        roleId: this.roleId,
        page: this.userRoleListQuery.page,
        size: this.userRoleListQuery.size,
        name: this.userRoleListQuery.name,
        loginName: this.userRoleListQuery.loginName,
        phone: this.userRoleListQuery.phone
      }
      getUseByRoleId(tempdata).then(res => {
        this.userList = res.data.list
        console.log(res.data)
        this.userRoleTotal = res.data.totalSize
        this.listLoading = false
      })
    },
    handleFilter() {
      console.log(this.listQuery)
      if (this.listQuery.name === '' && this.listQuery.enname === '') {
        this.$message({
          message: '请输入角色名称或代码!',
          type: 'warning'
        })
      } else {
        this.listQuery.page = 1
        fetchRoleListByName(this.listQuery).then(response => {
          this.list = response.data.list
          console.log(this.list)
          this.total = response.data.totalSize
        })
      }
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleFilterU() {
      this.userListQuery.page = 1
      if (
        this.userListQuery.loginName === '' &&
        this.userListQuery.name === '' &&
        this.userListQuery.phone === ''
      ) {
        this.$message({
          message: '请输入查找的相关信息!',
          type: 'warning'
        })
      } else {
        this.getUserList()
      }
    },
    handleSizeChangeU(val) {
      console.log(val)
      this.userListQuery.size = val
      this.getUserList()
    },
    handleCurrentChangeU(val) {
      this.userListQuery.page = val
      this.getUserList()
    },
    // 角色对应的用户中查找
    handleFilterUR() {
      if (
        this.userRoleListQuery.name === '' &&
        this.userRoleListQuery.loginName === '' &&
        this.userRoleListQuery.phone === ''
      ) {
        this.$message({
          message: '请输入信息!',
          type: 'warning'
        })
      } else {
        this.getUserRoleList()
      }
    },
    // 重置角色用户列表
    resetUserRoleInBatches() {
      this.userRoleListQuery = {
        loginName: '',
        name: '',
        phone: '',
        page: 1,
        size: 10
      }
      this.getUserRoleList()
    },
    handleSizeChangeUR(val) {
      console.log(val)
      this.userRoleListQuery.size = val
      this.getUserRoleList()
    },
    handleCurrentChangeUR(val) {
      console.log(val)
      this.userRoleListQuery.page = val
      this.getUserRoleList()
    },
    handleModify(row, status) {
      row.useAble = status
      const newTempData = {
        dataScope: row.dataScope,
        enname: row.enname,
        id: row.id,
        isSys: parseInt(row.isSys),
        name: row.name,
        roleType: row.roleType,
        useAble: parseInt(row.useAble)
      }
      handleUpdateRole(newTempData).then(() => {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    authorize(row) {
      this.roleId = row.id
      if (this.dialogRoleFormVisible) {
        this.getUserRoleList()
      } else {
        fetchOfficeById(this.roleId)
          .then(res => {
            var tempdata = []
            if (res.data.list) {
              console.log(res.data.list)
              for (const v of res.data.list) {
                tempdata.push(v.id)
              }
              this.$nextTick(() => {
                this.$refs.tree1.setCheckedKeys(tempdata)
              })
            } else {
              this.$nextTick(() => {
                this.$refs.tree1.setCheckedKeys([])
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    addUserToRole() {
      this.dialogUserFormVisible = true
      this.submitSuccess = false
      this.getUserList()
    },
    handleAuthorizeUsers() {
      var tempData = {
        roleId: this.roleId,
        userId: this.multipleSelection.join(',')
      }
      addRoleUser(tempData)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
          this.getUserRoleList()
        })
        .catch(error => {
          console.log(error)
        })
      this.submitSuccess = true
      this.dialogUserFormVisible = false
    },
    cancleUserRole(row) {
      // const index = row.uacRoles.indexOf(this.roleName)
      // row.uacRoles.splice(index, 1)
      // console.log(row.uacRoles)
      // row.roles = row.uacRoles
      // this.userList.splice(index, 1)
      // updateUser(row).then(() => {
      //   this.$notify({
      //     title: '成功',
      //     message: '更新成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      //   this.handleFilterUR()
      // })
      var role_user_delete = {
        userId: row.id,
        roleId: this.roleId
      }
      deleteRoleUser(role_user_delete)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '取消成功',
            type: 'success',
            duration: 2000
          })
          this.getUserRoleList()
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancleUserRoleInBatches() {
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var index = this.multipleSelection[i].uacRoles.indexOf(this.roleName)
        this.multipleSelection[i].uacRoles.splice(index, 1)
        // this.multipleSelection[i].roles.join(',')
        this.multipleSelection[i].roles = this.multipleSelection[i].uacRoles
        updateUser(this.multipleSelection[i]).then(() => {})
      }
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
      this.handleFilterUR()
    },
    // handleSelectionChange (val) {
    //   const arr = val
    //   this.uacMultipleSelection = []
    //   for (const v of arr) {
    //     this.uacMultipleSelection.push(v.id)
    //   }
    //   console.log(this.uacMultipleSelection)
    // },
    handleUserSelectionChange(val) {
      const arr = val
      this.multipleSelection = []
      for (const v of arr) {
        this.multipleSelection.push(v.id)
      }
      console.log(this.multipleSelection)
    },
    resetTemp() {
      this.temp = {
        id: '',
        name: '',
        enname: '',
        roleType: '',
        isSys: 0,
        useAble: 0,
        uacDepartment: '',
        uacActions: []
      }
    },
    cancelPopover(row, index) {
      // this.delVisibles.splice(index, 1, false)
      this.$refs['btn' + index].$el.click()
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        size: 10,
        role: '',
        roleId: '',
        name: '',
        enname: ''
      }
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.submitSuccess = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
      })
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // this.temp.id = (parseInt(Math.random() * 100) + 1024).toString() // mock a id
          this.temp.uacActions = this.$refs.tree.getCheckedKeys()
          console.log(this.temp)
          var role = {
            dataScope: this.temp.dataScope,
            enname: this.temp.enname,
            // id: this.temp.id,
            isSys: parseInt(this.temp.isSys),
            name: this.temp.name,
            roleType: this.temp.roleType,
            useAble: parseInt(this.temp.useAble),
            uacActions: this.temp.uacActions
          }
          createRole(role)
            .then(() => {
              // console.log(this.temp)
              // this.list.unshift(this.temp)
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
              this.getList()
            })
            .catch(error => {
              console.log(error)
            })
          this.submitSuccess = true
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.submitSuccess = false
      this.$nextTick(() => {
        if (this.temp.uacActions) {
          this.$refs.tree.setCheckedKeys(this.temp.uacActions)
        } else {
          this.$refs.tree.setCheckedKeys([])
        }
      })
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.uacActions = this.$refs.tree.getCheckedKeys()
          // const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          console.log(this.temp, 'update')
          const newTempData = {
            dataScope: this.temp.dataScope,
            enname: this.temp.enname,
            id: this.temp.id,
            isSys: parseInt(this.temp.isSys),
            name: this.temp.name,
            roleType: this.temp.roleType,
            useAble: parseInt(this.temp.useAble),
            uacActions: this.temp.uacActions
          }
          handleUpdateRole(newTempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
          this.submitSuccess = true
        }
      })
    },
    handleDelete(row) {
      deleteLogicalRole(row.id).then(response => {
        this.$notify({
          title: '操作成功',
          message: response.msg,
          type: 'success',
          duration: 2000
        })
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1)
            break
          }
        }
      })
    },
    handleBatchDelete(val) {
      const arr = val
      this.multipleSelection = []
      for (const v of arr) {
        this.multipleSelection.push(v.id)
      }
    },
    deleteInBatches() {
      deleteRoleInBatches(this.multipleSelection.join(',')).then(response => {
        this.$notify({
          title: '操作成功',
          message: response.msg,
          type: 'success',
          duration: 2000
        })
        for (const m of this.multipleSelection) {
          for (const v of this.list) {
            if (v.id === m) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1)
              break
            }
          }
        }
      })
    },
    resetUserListQuery() {
      this.userListQuery = {
        page: 1,
        size: 10,
        loginName: '',
        name: '',
        phone: '',
        uacOffice: {
          id: '',
          name: ''
        }
      }
    },
    // 重置添加用户到角色查询条件
    resetUserQuery() {
      this.resetUserListQuery()
      this.getUserList()
    },
    getCurrentNodeOffice() {
      var roleOffice = {
        officeIds: this.$refs.tree1.getCheckedKeys().join(','),
        roleId: this.roleId
      }
      addRoleOffice(roleOffice)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '分配成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
    // cancel () {
    //   this.$nextTick(() => {
    //     if (this.$refs.tree.getCheckedKeys().length != 0)
    //       this.$refs.tree.setCheckedKeys([])
    //     this.$refs['dataForm'].clearValidate()
    //   });
    // },
    // handleDownload() {
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const data = this.formatJson(filterVal, this.list)
    //     excel.export_json_to_excel(tHeader, data, 'table-list')
    //     this.downloadLoading = false
    //   })
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => {
    //     if (j === 'timestamp') {
    //       return parseTime(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // }
  }
}
</script>
<style>
.treeCom {
  /* width: 100%; */
  overflow-y: scroll;
  height: 250px;
  /* width: 400px; */
  border: 1px solid #dcdfe6;
  margin-top: 5px;
}
</style>
