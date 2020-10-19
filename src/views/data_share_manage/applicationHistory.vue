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
    >
      <el-table-column
        align="center"
        label
        width="65"
        type="index"
        :index="indexMethod"
      />
      <el-table-column width="110px" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属类别">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核状态">
        <template slot-scope="scope">
          <span>{{ scope.row.state }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
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

export default {
  name: 'ApplicationHistory',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      fullHeight: document.documentElement.clientHeight,
      list: [
        {
          name: 'name',
          category: 'category',
          type: 'type',
          state: '审核通过'
        },
        {
          name: 'name',
          category: 'category',
          type: 'type',
          state: '未审核'
        },
        {
          name: 'name',
          category: 'category',
          type: 'type',
          state: '未通过'
        }
      ],
      total: null,
      roleTotal: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        name: ''
      }
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
      // fetchUserList(this.listQuery).then(response => {
      //   this.list = response.data.data.list;
      //   console.log("this.list:");
      //   console.log(this.list);
      //   for(let item of this.list){
      //     if(item.uacOffice !==null){
      //       item.officeName = item.uacOffice.name;
      //     }else{
      //       item.officeName = '';
      //     }
      //   }
      //   this.total = response.data.data.totalSize;
      //   this.listLoading = false;
      // }).catch(error=>{
      //   console.log(error)
      // })
      this.listLoading = false
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
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
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
