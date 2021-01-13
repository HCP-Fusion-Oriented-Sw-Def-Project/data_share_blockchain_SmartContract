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

        <el-select
          v-model="listQuery.productType"
          placeholder="类别"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div style="clear: both;">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="handleAdd"
      >
        添加
      </el-button>
      <div style="float: right;">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          查询
        </el-button>
        <el-button
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
      :data="dynamiccodeList"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      :height="fullHeight - 300"
      style="margin-top: 20px;"
    >
      <el-table-column
        label="规则名称"
        prop="name"
        align="center"
      />
      <el-table-column
        label="产品名称"
        prop="productName"
        align="center"
      />
      <el-table-column
        label="产品类别"
        prop="productType"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if=" scope.row.productType==='0'">食品</span>
          <span v-if=" scope.row.productType==='1'">医疗</span>
          <span v-if=" scope.row.productType==='2'">日用品</span>
          <span v-if=" scope.row.productType==='3'">清洁用品</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品规格"
        prop="format"
        align="center"
      />
      <!-- <el-table-column
        label="生产日期"
        align="center"
      >
        <template v-slot="scope">
          <span>{{ scope.row.productDate| formatTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="有效期至"
        align="center"
      >
        <template v-slot="scope">
          <span>{{ scope.row.deadline| formatTimes }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        label="注意事项"
        prop="notes"
        align="center"
      /> -->
      <el-table-column
        label="动态码链接"
        prop="dynamicCode"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.generatecodeApi.substring(0,33)+"..." }}</span>
          <el-button
            id="copy_text"
            ref="copy"
            type="info"
            size="mini"
            :data-clipboard-text="scope.row.generatecodeApi"
            @click="copy"
          >
            复制链接
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleDetail(scope.row)"
          >
            查看详情
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
      :title="statusText[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="30%"
      @close="handleClose"
    >
      <div style="width: 450px; margin:0 auto;">
        <el-form
          :model="dynamicObj"
          label-position="right"
          label-width="150px"
        >
          <el-form-item label="规则名称:">
            <el-input
              v-model="dynamicObj.name"
              autocomplete="off"
              style="width: 200px;"
            />
          </el-form-item>
          <el-form-item label="产品类别:">
            <el-select
              v-model="dynamicObj.productType"
              placeholder="请选择:"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="产品规格:">
            <el-input
              v-model="dynamicObj.format"
              autocomplete="off"
              style="width: 200px;"
            />
          </el-form-item>
          <el-form-item
            v-if="dynamicObj.generatecodeApi !== undefined"
            label="动态码链接:"
          >
            <el-input
              v-model="dynamicObj.generatecodeApi"
              type="textarea"
              :rows="3"
            />
          </el-form-item>
          <!-- <el-form-item label="生产日期:">
            <el-date-picker
              v-model="dynamicObj.productDate"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="有效期至:">
            <el-date-picker
              v-model="dynamicObj.deadline"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item> -->
          <el-form-item label="产品名称">
            <el-input
              v-model="dynamicObj.productName"
              style="width: 200px;"
            />
          </el-form-item>
          <el-form-item label="主成分">
            <el-input
              v-model="dynamicObj.materialName"
              style="width: 200px;"
            />
          </el-form-item>
          <el-form-item label="注意事项:">
            <el-input
              v-model="dynamicObj.notes"
              style="width: 200px;"
              type="textarea"
            />
          </el-form-item>
        </el-form>
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false;createData()"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { dynamicRuleList, addDynamicRule, deleteDynamicRule } from '@/api/dynamic'
import Clipboard from 'clipboard'
export default {
  filters: {
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
      dynamiccodeList: [],
      tableKey: 0,
      fullHeight: document.documentElement.clientHeight,
      listLoading: false,
      listQuery: {
        page: 1,
        size: 10,
        name: '',
        productType: ''
      },
      total: 0,
      dialogFormVisible: false,
      dynamicObj: {},
      options: [
        {
          label: '食品',
          value: '0'
        }, {
          label: '医疗',
          value: '1'
        }, {
          label: '日用品',
          value: '2'
        }, {
          label: '清洁用品',
          value: '3'
        }
      ],
      statusText: {
        'create': '添加数据',
        'read': '查看详情'
      },
      dialogStatus: 'create'
    }
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    }
  },
  created() {
    this.getDynamicList()
  },
  methods: {
    getDynamicList() {
      dynamicRuleList(this.listQuery).then((res) => {
        console.log(res)
        this.dynamiccodeList = res.data.data.list
        this.total = res.data.data.totalSize
      })
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getDynamicList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getDynamicList()
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    createData() {
      if (this.dialogStatus === 'create') {
        addDynamicRule(this.dynamicObj).then((res) => {
          if (res.data.code === 20000) {
            this.getDynamicList()
            this.reset()
          } else {
            this.$notify({
              title: '信息填写错误',
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    },
    reset() {
      this.dynamicObj = {}
    },
    cancelPopover(row, index) {
      this.$refs['btn' + index].$el.click()
    },
    handleDelete(row) {
      deleteDynamicRule(row.id).then((res) => {
        this.getDynamicList()
      })
    },
    copy() {
      var _this = this
      var clipboard = new Clipboard('#copy_text')

      clipboard.on('success', e => {
        _this.$message({
          type: 'info',
          message: '已复制'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        _this.$Message({
          message: '该浏览器不支持自动复制',
          type: 'warning'
        })
        // 释放内存
        clipboard.destroy()
      })
    },
    handleDetail(row) {
      this.dialogFormVisible = true
      this.dynamicObj = row
      this.dialogStatus = 'read'
    },
    handleClose() {
      this.reset()
    },
    handleFilter() {
      this.getDynamicList()
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        size: 10,
        name: '',
        productType: ''
      }
      this.getDynamicList()
    }
  }
}
</script>

<style scoped>
</style>
