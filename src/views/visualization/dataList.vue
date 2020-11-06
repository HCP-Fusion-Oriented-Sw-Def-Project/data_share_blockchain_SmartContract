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
      <div style="float:left;margin-left:230px;">
        <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">
          查找
        </el-button>
        <el-button v-waves type="info" icon="el-icon-refresh" @click="resetListQuery">
          重置
        </el-button>
      </div>
    </div>
    <div style="margin-top:10px;margin-bottom:10px;clear:both;">
      <span style="font-size:15px; font-weight:bold;">数据清单:</span>
    </div>

    <div class="table">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="dataList"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 100%"
        :height="fullHeight-300"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="center" label width="65" type="index" />
        <el-table-column align="center" label="名称" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.contractName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合约ID" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.contractID }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属类别" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="访问权限" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.accessRight == '1'">无条件访问</span>
            <span v-if="scope.row.accessRight == '2'">申请后访问</span>
            <span v-if="scope.row.accessRight == '3'">可申请访问但禁止查看详情</span>
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          label="操作"
          width="305px"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="useData(scope.row)"
            >
              使用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-dialogDrag title="数据详情" :visible.sync="dialogDataList" width="1300px" top="7vh">
      <div v-if="dialogDataList">
        <edit-share ref="shareData" :data="data" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDataList = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogDataList=false;apply()">
          申请使用
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import editShare from '@/views/data_share_manage/edit-share'
import '@/utils/wsCluster.js'
import { getDataShareInfoBase } from '@/api/dataShare'
import { loginBaas, getList } from '@/api/dataList'

export default {
  name: 'DataList',
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
      listLoading: false,
      listQuery: {
        name: '',
        type: ''
      },
      dataList: [],
      fullHeight: document.documentElement.clientHeight,
      data: {}
    }
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    }
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
    this.getDataList()
  },
  methods: {
    getDataList() {
      var _this = this

      this.dataList = []
      _this.listLoading = true
      new Promise((resolve, reject) => {
        loginBaas().then((res) => {
          console.log(res)
          if (res.status === 200) {
            var token = res.headers.get('authorization')
            resolve(token)
          } else {
            reject()
          }
        })
      }).then(function(token) {
        return new Promise((resolve, reject) => {
          getList(token).then((res1) => {
            if (res1.code === 20000) {
              resolve(res1)
            } else {
              reject()
            }
          })
        })
      }).then(function(result) {
        return new Promise((resolve, reject) => {
          var data = result.data.data
          var tempData = []
          // data为内部变量都是对象,用in访问
          for (const v in data) {
            
            for (const i of data[v].contracts) {
              tempData.push(i)
            }
          }
          _this.$store.commit('setContractKey', '')
          _this.$store.commit('setNodeAddr', '')
          window.executeContract('AccessControlCollector', 'getDataList', _this.$store.state.user.pubKey.split(',')[0], (res) => {
            var temp = JSON.parse(res.result)
            for (const v of temp) {
              for (const i of tempData) {
                if (String(v) === i.contractID) {
                  _this.dataList.push(i)
                }
              }
            }
            // _this.total = _this.dataSourceList.length
            _this.listLoading = false
          })
        })
      })
        .catch((error) => {
          console.log(error)
        })

      // window.executeContract('AccessControlCollector', 'getDataList', this.$store.state.user.pubKey.split(',')[0], (res) => {
      //   var temp = JSON.parse(res.result)
      //   let tempData = []
      //   for (const v of temp) {
      //     for (const i of this.$store.state.dataShare.contractProcessList) {
      //       if (v === parseInt(i.id)) {
      //         tempData.push(i.name)
      //       }
      //     }
      //   }

      //   getDataShareInfoBase(tempData.join(',')).then((res) => {
      //     _this.dataList = res.data.data
      //     _this.listLoading = false
      //   })
      // })
    },
    handleApply(row) {
      // setTimeout(() => {
      this.data = {
        basicInfo: {
          name: 'iris'
        },
        shareControl: {},
        tableData: [],
        isEdited: true
      }
      // }, 10);
    },
    handleFilter() {},
    resetListQuery() {},
    apply() {
      // var time = new Date()
      // const args = {
      //   userName: 'user',
      //   data: time.getTime()
      // }
      // window.executeContract('iris', 'apply', JSON.stringify(args), function (
      //   ret
      // ) {
      //   console.log(ret)
      // })
    },
    useData(row) {
      this.$router.push({
        name: "single_vis_new",
        params: {
          type: "contract",
          contractName: row.contractName
        }
      });
    }
  }
}
</script>
<style scoped>
.table {
  width: 826px;
  /* min-width: 850px; */
}
</style>
