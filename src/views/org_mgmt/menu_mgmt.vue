<template>
  <div class="app-container calendar-list-container">
    <div style=" margin-bottom:5px;">
      <div style="margin-bottom: 10px;margin-top: 0px">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleCreate">
          添加
        </el-button>
        <el-button size="small" type="info" @click="deleteInBatches">
          <svg-icon icon-class="delete" />批量删除
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="getMenuTreeFromList"
        element-loading-text="给我一点时间"
        fit
        highlight-current-row
        :height="fullHeight-200"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="handleBatchDelete"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column min-width="65px" align="left" label="名称" width="200">
          <template slot-scope="scope">
            <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="110px" align="center" label="链接">
          <template slot-scope="scope">
            <span>{{ scope.row.url }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="可见" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isShow == '1'" :type="scope.row.isShow | statusFilter">
              显示
            </el-tag>
            <el-tag v-if="scope.row.isShow == '0'" :type="scope.row.isShow | statusFilter">
              隐藏
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="权限标识" align="center" width="150">
          <template slot-scope="scope">
            <el-tag type="success">
              {{ scope.row.permission }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="350" class-name="small-padding">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="handleUpdate(scope.row)"
            >
              编辑
            </el-button>
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
                  @click="cancelPopover(scope.row, scope.$index),handleDelete(scope.row)"
                >
                  确定
                </el-button>
              </div>
              <el-button
                :ref="'btn'+scope.$index"
                slot="reference"
                size="mini"
                type="danger"
                style="margin-left:10px"
              >
                删除
              </el-button>
            </el-popover>
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="addSubMenu(scope.row)"
            >
              添加下级菜单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-if="dialogClose"
      v-dialogDrag
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      top="8vh"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="120px"
        :inline="true"
        style="height:320px;"
      >
        <!-- <el-row :gutter="20"> -->
        <el-col :span="12">
          <el-form-item label="上级菜单:" prop="parentIdName">
            <el-input v-model="temp.parentIdName" class="filter-item" @focus="menuChoice=true" />
          </el-form-item>
          <el-form-item label="名称：" prop="name">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="图标：" prop="icon" style="overflow:true;">
            <!-- <el-col :span="8"> -->
            <!-- <el-img></el-img> -->
            <!-- </el-col> -->
            <!-- <el-col :span="8"> -->
            <el-button type="primary" size="mini" @click="getIcon">
              选择
            </el-button>
            <!-- </el-col> -->
            <!-- <el-col :span="8"> -->
            <el-button size="mini" @click="clearIcon">
              取消
            </el-button>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item label="可见：" prop="isShow">
            <el-switch v-model="temp.isShow" active-value="1" inactive-value="0" />
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input v-model="temp.remarks" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单编码" prop="code">
            <el-input v-model.number="temp.code" />
          </el-form-item>
          <el-form-item label="排序：" prop="sort">
            <el-input v-model.number="temp.sort" />
          </el-form-item>
          <el-form-item label="权限标识：" prop="permission">
            <el-input v-model="temp.permission" />
          </el-form-item>
          <el-form-item label="链接：" prop="url">
            <el-input v-model="temp.url" />
          </el-form-item>
          <el-form-item label="目标：" prop="target">
            <el-input v-model="temp.target" />
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" :disabled="submitSuccess" @click="createMenu()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag title="选择菜单" :visible.sync="menuChoice" width="400px" top="7vh">
      <p>菜单</p>
      <hr />
      <el-tree ref="tree" :data="list2" :props="defaultProps" class="treeCom" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuChoice = false">
          取消
        </el-button>
        <el-button type="primary" @click="getNode(),menuChoice = false">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import 'vue-dialog-drag'
import {
  fetchMenuList,
  addMenu,
  deleteMenu,
  deleteMenus,
  editMenu
} from '@/api/menu'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    // const validateActions = (rule, value, callback) => {
    //   if (true) {
    //     callback(new Error('请选择授权功能'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      list: [],
      tableKey: 0,
      fullHeight: document.documentElement.clientHeight,
      textMap: {
        create: '添加',
        update: '编辑'
      },
      dialogStatus: 'create',
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: ['blur', 'change'] }
        ],
        url: [
          { required: true, message: '请输入链接', trigger: ['blur', 'change'] }
        ],
        permission: [
          {
            required: true,
            message: '请输入权限标识',
            trigger: ['blur', 'change']
          }
        ],
        parentIdName: [
          { required: true, message: '请输入上级机构', trigger: 'change' }
        ]
      },
      temp: {},
      // 编辑或查看菜单
      editDialogFormVisible: false,
      menuDialogFormVisible: false,
      getMenuTree: '',
      listLoading: true,
      // 当前新增菜单的id
      currentId: '',
      // 批量删除数组id
      sels: [],
      // 是否有上级菜单
      menuVis: false,
      // 弹出上级菜单对话框
      menuChoice: false,
      defaultProps: {
        children: 'children',
        label: function(a) {
          return a.name
        }
      },
      getMenuTreeFromList: [],
      // 防止重复提交
      submitSuccess: false,
      dialogClose: false
    }
  },
  computed: {
    list2() {
      if (this.list.length === 0) return this.list
      else {
        var _list = this.list
        _list.forEach((element) => {
          const parentId = element.parentId
          if (parentId !== 1) {
            _list.forEach((ele) => {
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
        _list = _list.filter((ele) => ele.parentId === '0') // 这一步是过滤，按树展开，将多余的数组剔除；
        return _list
      }
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
    },
    list2: {
      deep: true,
      handler: function(newVal) {
        this.getMenuTreeFromList = newVal[0].children
      }
    }
  },
  created() {
    this.getList()
  },
  mouted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.clientHeight = document.body.clientHeight
        that.fullHeight = window.clientHeight
      })()
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchMenuList().then((response) => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.dialogClose = true
      this.submitSuccess = false
      this.resetTemp()
      this.temp.parentIdName = this.list2[0].name
    },
    deleteInBatches() {
      // js同步和异步
      var ids = this.sels.map((item) => item.id).join()
      console.log(ids)
      deleteMenus(ids)
        .then((response) => {
          console.log(response.data, 'res')
          this.$message({
            showClose: true,
            message: '批量删除成功',
            type: 'success'
          })
          this.getList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleBatchDelete(sels) {
      this.sels = sels
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogClose = true
      this.dialogFormVisible = true
      this.submitSuccess = false
      for (const v of this.list) {
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        if (v.id === this.temp.parentId) {
          this.temp.parentIdName = v.name
          break
        }
      }
    },
    cancelPopover(row, index) {
      this.$refs['btn' + index].$el.click()
    },
    // 弹出添加下级菜单视图
    addSubMenu(row) {
      this.resetTemp()
      this.temp.parentIdName = row.name
      this.menuVis = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createMenu() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.submitSuccess = true
          for (const v of this.list) {
            if (v.name === this.temp.parentIdName) {
              this.temp.parentId = v.id
              break
            }
          }
          var temp1 = {
            code: this.temp.code,
            icon: this.temp.icon,
            isShow: this.temp.isShow,
            name: this.temp.name,
            parentId: this.temp.parentId,
            sort: this.temp.sort,
            type: this.temp.type,
            url: this.temp.url,
            permission: this.temp.permission
          }
          if (this.dialogStatus === 'create') {
            console.log(temp1, 'temp1')
            addMenu(temp1)
              .then((response) => {
                this.$message({
                  showClose: true,
                  message: '新增菜单成功',
                  type: 'success'
                })
                this.dialogFormVisible = false
                this.getList()
                console.log(this.list, 'add')
              })
              .catch((error) => {
                this.submitSuccess = false
                console.log(error)
              })
          } else {
            temp1.id = this.temp.id
            console.log(temp1)
            editMenu(temp1)
              .then((res) => {
                this.$message({
                  showClose: true,
                  message: '编辑菜单成功',
                  type: 'success'
                })
                this.dialogFormVisible = false
                this.getList()
              })
              .catch((error) => {
                this.submitSuccess = false
                console.log(error)
              })
          }
          this.dialogClose = false
        }
      })
    },
    // 删除节点
    handleDelete(row) {
      console.log(row.id)
      deleteMenu(row.id)
        .then((response) => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 得到选择的菜单节点
    getNode() {
      const data = this.$refs.tree.getCurrentNode()
      this.temp.parentIdName = data.name
    },
    resetTemp() {
      this.temp = {
        id: '',
        href: '',
        icon: '',
        isShow: '0',
        leaf: 0,
        level: 0,
        name: '',
        parentId: '0',
        parentIdName: '',
        parentIds: '',
        permission: '',
        remarks: '',
        sort: 0,
        target: '',
        url: '',
        type: 0,
        createBy: '',
        createDate: '',
        updateBy: '',
        updateDate: '',
        code: ''
      }
    },
    getIcon() {},
    clearIcon() {},
    sortNum(sort) {
      return function(a, b) {
        if (a[sort] < b[sort]) {
          return -1
        } else if (a[sort] === b[sort]) {
          return 0
        } else {
          return 1
        }
      }
    }
  }
}
</script>
<style >
.treeCom {
  /* width: 100%; */
  overflow-y: scroll;
  height: 250px;
  /* width: 400px; */
  border: 1px solid #dcdfe6;
  margin-top: 5px;
}
</style>
