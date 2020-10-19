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
      <el-input
        v-model="listQuery.type"
        class="filter-item"
        placeholder="类别"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.applicant"
        class="filter-item"
        placeholder="申请人"
        @keyup.enter.native="handleFilter"
      />
    </div>
    <!-- 中部，添加、批量删除等操作-->
    <div class="edit-container">
      <el-button size="small" type="info" icon="el-icon-refresh-right" @click="handleFilter">
        刷新
      </el-button>
      <div class="filter-button">
        <el-button
          v-waves
          size="small"
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          查找
        </el-button>
        <el-button
          v-waves
          size="small"
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
      :data="verifyList"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      :height="fullHeight - 300"
    >
      <el-table-column align="center" label width="65" type="index" />
      <el-table-column align="center" label="申请人员">
        <template slot-scope="scope">
          <span>{{ scope.row.applicant }}</span>
        </template>
      </el-table-column>
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
      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            style="margin-left:10px"
            @click="
              dialogVerifyList = true
              handleDetail(scope.row)
            "
          >
            查看
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

    <el-dialog v-dialogDrag title="审核详情" :visible.sync="dialogVerifyList" width="1300px" top="7vh">
      <edit-share />
      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="
            dialogVerifyList = false
            handleDefeat()
          "
        >
          不通过
        </el-button>
        <el-button
          type="primary"
          @click="
            dialogVerifyList = false
            handlePass()
          "
        >
          通过
        </el-button>
        <el-button
          type="info"
          @click="
            dialogVerifyList = false
            handleStop()
          "
        >
          暂时禁用
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import '@/utils/wsCluster.js'
import editShare from './edit-share'
export default {
  name: 'UseExamine',
  directives: {
    waves
  },
  components: {
    'edit-share': editShare
  },
  data() {
    return {
      dialogVerifyList: false,
      tableKey: 0,
      fullHeight: document.documentElement.clientHeight,
      verifyList: [
        {
          applicant: 'applicant',
          name: 'name',
          category: 'category',
          description: 'description'
        }
      ],
      total: null,
      roleTotal: null,
      listLoading: true,
      listQuery: {
        name: '',
        type: '',
        applicant: ''
      },
      pageSize: {
        size: 10,
        page: 1
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
    getList() { },
    handleFilter() { },
    resetListQuery() {
      this.listQuery = {
        name: '',
        type: '',
        applicant: ''
      }
    },
    handleSizeChange(val) { },
    handleCurrentChange(val) { },
    handleExamine() { },
    handleDetail() { },
    handleDefeat() { },
    handlePass() {
      const args = {
        isPrivate: true,
        tableName: 'algo_algo',
        dbUrl: 'jdbc:mysql://152.136.214.48:3306/spring',
        dbUserName: 'root',
        dbPWD: 'Root@123',
        accessPolicy: 'DAC'
      }
      var temp = {
        name: 'name',
        code: '*'
      }
      const fieldList = []
      console.log(JSON.stringify(temp))
      fieldList.push(temp)
      window.generateMySQLProject('MySQLTest1', args, fieldList)
      window.startContract()
    },
    handleStop() { }
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
.dialog {
  height: 600px;
  overflow-y: auto;
  .dialog-span {
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
  }
  .el-row {
    margin-bottom: 10px;
  }
  .dialog-button {
    text-align: center;
    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
