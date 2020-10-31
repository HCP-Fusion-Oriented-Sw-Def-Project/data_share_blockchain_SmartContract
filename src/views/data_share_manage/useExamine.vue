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
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          查找
        </el-button>
        <el-button
          v-waves
          class="filter-item"
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
      :data="verifyList"
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
      />
      <el-table-column
        align="center"
        width="120px"
        label="申请人"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.applicant }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180px"
        align="center"
        label="申请理由"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.instructions }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="数据名称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="所属类别"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="数据描述"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
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
            type="success"
            size="mini"
            style="margin-left:10px"
            @click="
              dialogVerifyList = true
              handlePass(scope.row, scope.$index)
            "
          >
            通过
          </el-button>
          <el-button
            type="danger"
            size="mini"
            style="margin-left:10px"
            @click="
              dialogVerifyList = true
              handleStop(scope.row, scope.$index)
            "
          >
            不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="pageSize.page"
        :page-sizes="[5, 10, 20, 30, 50]"
        :page-size="pageSize.size"
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
// import store from '@/store'
import '@/utils/wsCluster.js'
import { getAppliedList, getJudgeAccess } from '@/api/dataShare'
export default {
  name: 'UseExamine',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      fullHeight: document.documentElement.clientHeight,
      verifyList: [],
      total: 0,
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
      },
      applylist: []
    }
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    }
  },
  created() {
    // init()
    this.getList()
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.clientHeight = document.body.clientHeight
        that.fullHeight = window.clientHeight
        // const height = that.fullHeight - 100 + 'px'
        // document.getElementById("side-filter").style.height = height;
      })()
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      getAppliedList().then((res) => {
        console.log(res)
        for (const v of res.data.data) {
          if (v.dataShareApplication.auditStatus === '1') {
            this.verifyList.push({
              id: v.dataShareApplication.id,
              dataId: v.dataShareInfoBase.id,
              applicant: v.dataShareApplication.applicant.substring(0, 5),
              name: v.dataShareInfoBase.dataName,
              category: v.dataShareInfoBase.typeId,
              description: v.dataShareInfoBase.dataDescription,
              instructions: v.dataShareApplication.useDescription,
              pubkey: v.dataShareApplication.applicant
            })
          }
        }
        this.listLoading = false
      })
      // window.executeContract('testpermiss4', 'getStatusList', '', (res) => {
      //   console.log(
      //     typeof JSON.parse(res.result),
      //     JSON.parse(res.result),
      //     'applylist'
      //   )
      //   var data = JSON.parse(res.result)
      //   this.applylist = Object.keys(JSON.parse(res.result))
      //   console.log(data[this.applylist[1]])
      //   // that.verifyList.push(temp)
      // })
    },
    handleFilter() {
      this.getAppliedList()
    },
    resetListQuery() {
      this.listQuery = {
        name: '',
        type: '',
        applicant: ''
      }
    },
    handleSizeChange(val) { },
    handleCurrentChange(val) { },

    handlePass(row, index) {
      const tempData = {
        id: row.id,
        dataShareInfoBaseId: row.dataId,
        useDescription: row.instructions,
        auditStatus: '3'
      }
      getJudgeAccess(tempData).then((res) => {
        console.log(res)
        window.executeContract(row.name, 'accept', row.pubkey, (res) => {
          console.log(res)
          this.verifyList.splice(index, 1)
        })
      })
    },
    handleStop(row, index) {
      const tempData = {
        id: row.id,
        dataShareInfoBaseId: row.dataId,
        useDescription: row.instructions,
        auditStatus: '2'
      }
      getJudgeAccess(tempData).then((res) => {
        console.log(res)
        window.executeContract(row.name, 'cancel', row.pubkey, (res) => {
          console.log(res)
          this.verifyList.splice(index, 1)
          // this.getAppliedList()
        })
      })
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
  margin-top: 0px;
  margin-bottom: 21px;
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
