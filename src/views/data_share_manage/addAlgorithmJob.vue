<template>
  <div class="app-container">
    <el-steps
      :active="active"
      finish-status="success"
      align-center
      style="margin-top: 12px;margin-bottom: 20px"
      simple
    >
      <el-step title="算法作业描述" icon="el-icon-edit" />
      <el-step title="算法选择" icon="el-icon-edit" />
      <el-step title="数据源选择" icon="el-icon-edit" />
      <el-step title="参数配置及运行" icon="el-icon-edit" />
      <!-- <el-step title="运行" icon="el-icon-edit" /> -->
    </el-steps>
    <div>
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="algorProcess"
        label-position="right"
        label-width="150px"
        style=" margin-left:50px;margin-right:50px; float:left;width:400px; "
      >
        <el-form-item v-if="active==0" label="算法作业名称:" prop="name">
          <el-input v-model="algorProcess.name" />
        </el-form-item>
        <el-form-item v-if="active==0" label="算法作业描述:">
          <el-input v-model="algorProcess.description" type="textarea" :rows="2" maxlength="250" />
        </el-form-item>
        <el-form-item v-if="active==1" label="选择算法:" prop="algorithm" aria-placeholder="点击选择...">
          <el-input
            v-model="algorProcess.algorithm"
            :disabled="algorDialog"
            @focus="algorDialog=true, flag=1,getAlgorList()"
          />
        </el-form-item>
        <el-form-item v-if="active==2" label="选择数据源:" prop="datasource">
          <el-input
            v-model="algorProcess.datasource"
            :disabled="dataSourceDialog"
            @focus="dataSourceDialog = true,flag=2,getDataSourceList()"
          />
        </el-form-item>
      </el-form>
      <el-table
        v-if="active === 3"
        v-loading="listLoading"
        :data="algorProcess.algoTaskParamList"
        element-loading-text="给我一点时间"
        border
        fit
        highlight-current-row
        style="width: 500px; margin: 0 auto;"
        :height="fullHeight-500"
      >
        <el-table-column align="center" width="65" type="index" label="序号" />
        <el-table-column align="center" width="110px" label="参数名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="参数值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.content" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer" style="float:right;">
      <!-- <div style="width: 100%"> -->
      <el-button v-if="active!=0" style="margin-top: 12px;" @click="prev">
        上一步
      </el-button>
      <el-button
        v-if="active!=3"
        style="margin-top: 12px;"
        :disabled="disabledClick"
        @click="next"
      >
        下一步
      </el-button>
      <el-button v-if="active==3" style="margin-top: 12px;" @click="handleSave">
        保存
      </el-button>
      <el-button v-if="active==3" style="margin-top: 12px;" @click="handleRun">
        运行
      </el-button>
      <!-- </div> -->
    </div>
    <el-dialog title="请选择算法" :visible.sync="algorDialog" width="600px">
      <el-table
        :data="
          algorithmList.slice(
            (listQuery.pages - 1) * listQuery.rows,
            listQuery.pages * listQuery.rows
          )
        "
        :height="350"
        border
      >
        <el-table-column align="center" label="算法名" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="算法拥有者" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.owner }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="算法路径">
          <template slot-scope="scope">
            <span>{{ scope.row.path }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="100px"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="algorDialog = false;handleChoose(scope.row)"
            >
              选择
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
          :pager-count="5"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-dialog>
    <el-dialog title="请选择数据源" :visible.sync="dataSourceDialog" width="600px">
      <el-table
        :data="
          dataSourceList.slice(
            (listQuery.pages - 1) * listQuery.rows,
            listQuery.pages * listQuery.rows
          )
        "
        border
        :height="300"
        style="border-bottom:"
      >
        <el-table-column align="center" label="数据源名" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="数据源拥有者" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.owner }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="数据路径">
          <template slot-scope="scope">
            <span>{{ scope.row.path }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="100px"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="dataSourceDialog = false;handleChooseData(scope.row)"
            >
              选择
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
          :pager-count="5"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/utils/wsCluster.js'
import { addAlgoTask, modifyAlgoTask } from '@/api/algoTask'
import { getParameter } from '@/api/algoParameter'
export default {
  data() {
    var validateName = (rule, value, callback) => {
      console.log(value)
      if (value === '' || value === undefined) {
        this.disabledClick = true
        callback(new Error('请输入算法作业名称'))
      } else {
        this.canClick()
        callback()
      }
    }
    var validateAlgo = (rule, value, callback) => {
      console.log(value, this.flag)
      if ((value === '' || value === undefined) && this.flag === 1) {
        this.disabledClick = true
        callback(new Error('请选择算法'))
      } else if (value === '' || value === undefined) {
        this.disabledClick = true
        callback()
      } else {
        this.canClick()
        callback()
      }
    }
    var validateDataSource = (rule, value, callback) => {
      console.log(value, this.flag, this.algorProcess.datasource)
      if ((value === '' || value === undefined) && this.flag === 2) {
        this.disabledClick = true
        callback(new Error('请选择数据源'))
      } else if (value === '' || value === undefined) {
        this.disabledClick = true
        callback()
      } else {
        this.canClick()
        callback()
      }
    }
    return {
      listQuery: {
        name: '',
        pages: 1,
        rows: 5,
      },
      active: 0,
      // 算法流程总对象
      algorProcess: {
        name: '',
        description: '',
        algorithm: '',
        algorithmpath: '',
        datasource: '',
        datasourcepath: '',
        // 参数数组
        algoTaskParamList: [{
          name: '特征列数',
          content: '0,1,2,3,4,5,6,7,8',
        },
        {
          name: 'k值',
          content: '2',
        }, {
          name: '运行结果路径',
          content: '/blockchain/result/',
        }],
        // 选择保存还是立即执行
        status: ''
      },
      // 控制跳转对象
      disabledClick: true,
      rules: {
        name: [{ required: true, validator: validateName, trigger: ['blur', 'change'] }],
        algorithm: [{ required: true, validator: validateAlgo, trigger: ['blur', 'change'] }],
        datasource: [{ required: true, validator: validateDataSource, trigger: ['blur', 'change'] }]
      },
      // 选择算法界面dialog
      algorDialog: false,
      // 算法路径列表
      pathList: ['/blockchain/algo'],
      // 算法列表
      algorithmList: [],
      // 算法列表总个数
      total: 0,
      fullHeight: document.documentElement.clientHeight,
      // 数据源dialog
      dataSourceDialog: false,
      // 数据源列表
      dataSourceList: [],
      // 控制是否出发选择算法的验证
      flag: 0,
      listLoading: false,
    }
  },
  watch: {
    fullHeight(val) {
      this.fullHeight = val
    }
  },
  created() {
    this.getData()
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
    canClick() {
      if (this.active === 0 && this.algorProcess.name !== '') {
        this.disabledClick = false
      }
      if (this.active === 1 && this.algorProcess.algorithm !== undefined) {
        this.disabledClick = false
      }
      if (this.active === 2 && this.algorProcess.datasource !== undefined) {
        this.disabledClick = false
      }
    },
    // 获得算法作业数据
    getData() {
      if (this.$route.params.id != null) {
        this.algorProcess = this.$route.params.row
        this.canClick()
      }
    },
    // 获得算法列表
    getAlgorList() {
      this.listQuery.rows = 5
      this.listQuery.pages = 1
      this.algorithmList = []
      for (const i of this.pathList) {
        var _this = this
        window.executeContract('algoModule', 'getFileList', i, (res) => {
          var temp = JSON.parse(JSON.parse(res.result))
          for (const v of temp) {
            var arr = v.path.split('/')
            var len = arr.length
            var index = arr[len - 1].indexOf('.py')
            _this.algorithmList.push({
              owner: v.owner,
              name: index === -1 ? arr[len - 1] : arr[len - 1].substring(0, index),
              path: v.path
            })
          }
          console.log(_this.algorithmList)
          _this.total = _this.algorithmList.length
        })
      }
    },
    // 获得数据源列表
    getDataSourceList() {
      this.dataSourceList = []
      this.listQuery.rows = 5
      this.listQuery.pages = 1
      var _this = this
      window.executeContract('AccessControlCollector', 'getDataList', this.$store.state.user.pubKey.split(',')[0], (res) => {
        console.log(res)
        var temp = JSON.parse(res.result)
        for (const v of temp) {
          for (const i of _this.$store.state.dataShare.contractProcessList) {
            if (String(v) === i.id) {
              _this.dataSourceList.push({
                name: i.name,
                owner: i.id,
                path: '/blockchain/dataset'
              })
            }
          }
        }
        _this.total = _this.dataSourceList.length
      })
    },
    // 获得参数列表
    getParametersList() {
      this.algorProcess.algoTaskParamList = []
      getParameter(this.algorProcess.algorithm).then((res) => {
        console.log(res)
        var temp = res.data.data
        var time = new Date()
        for (var i = 0; i <= temp.length - 1; i++) {
          if (temp[i].name === 'resultPath') {
            this.algorProcess.algoTaskParamList.push({
              name: temp[i].name,
              content: '/blockchain/result/' + this.algorProcess.algorithm + '/algor/' + String(time.getTime()),
              remarks: temp[i].remarks
            })
          } else if (temp[i].name === 'modelPath') {
            this.algorProcess.algoTaskParamList.push({
              name: temp[i].name,
              content: '/blockchain/result/' + this.algorProcess.algorithm + '/model/' + String(time.getTime()),
              remarks: temp[i].remarks
            })
          } else {
            this.algorProcess.algoTaskParamList.push({
              name: temp[i].name,
              content: '',
              remarks: temp[i].remarks
            })
          }
        }
      })
    },
    // 选择算法
    handleChoose(row) {
      if (row.name !== this.algorProcess.algorithm) {
        this.algorProcess.algorithm = row.name
        this.algorProcess.algorithmpath = row.path
        this.algorProcess.algoTaskParamList = []
      }
    },
    // 选择数据源
    handleChooseData(row) {
      // this.disabledClick = false
      const args = {
        offset: 0,
        count: 150
      }
      this.algorProcess.datasourcepath = '/blockchain/dataset/' + row.name + '.csv'
      window.executeContract(row.name, 'get', JSON.stringify(args), (res) => {
        console.log(res)
        const args1 = {
          dataInfo: res.result,
          path: this.algorProcess.datasourcepath
        }
        console.log(args1)
        window.executeContract('algoModule', 'handleContractData', JSON.stringify(args1), (res) => {
          console.log(res)
          // _this.algorProcess.datasourcepath = JSON.parse(res.result).filePath
        })
      })
      this.algorProcess.datasource = row.name
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
      // this.getShareList();
    },
    handleCurrentChange(val) {
      this.listQuery.pages = val
      // this.getShareList();
    },
    prev() {
      this.active--
      if (this.active === 0 && this.algorProcess.name !== '') {
        this.disabledClick = false
      }
      if (this.active === 2 && this.algorProcess.datasource !== '') {
        this.disabledClick = false
      }
    },
    // 保存算法作业
    handleSave() {
      this.algorProcess.status = 1
      if (this.$route.params.id === null) {
        addAlgoTask(this.algorProcess).then((res) => {
          console.log(res)
          setTimeout(() => {
            this.$confirm('算法作业保存成功,即将跳转页面!', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.$router.push({ path: '/data_share_manage/myAlgorithmJob' })
              }
            })
          }, 50)
        })
      } else {
        modifyAlgoTask(this.algorProcess).then((res) => {
          console.log(res)
          setTimeout(() => {
            this.$confirm('算法作业保存成功,即将跳转页面!', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.$router.push({ path: '/data_share_manage/myAlgorithmJob' })
              }
            })
          }, 50)
        })
      }
    },
    // 运行算法作业
    handleRun() {
      this.algorProcess.status = 2
      var args1 = []
      args1.push(this.algorProcess.datasourcepath)
      for (const v of this.algorProcess.algoTaskParamList) {
        args1.push(v.content)
      }
      var data = {
        file: this.algorProcess.algorithmpath,
        args: args1
      }
      var arg = { url: 'http://152.136.214.48:8998/batches/', data: JSON.stringify(data) }
      console.log(JSON.stringify(arg))
      window.executeContract('algoModule', 'executeByLivy', JSON.stringify(arg), (res) => {
        console.log(res)
        setTimeout(() => {
          this.$confirm('算法执行成功,即将跳转页面!', '提示', {
            confirmButtonText: '确定',
            type: 'success',
            callback: action => {
              this.$router.push({ path: '/data_share_manage/myAlgorithmJob' })
            }
          })
        }, 50)
      })
      if (this.$route.params.id === null) {
        addAlgoTask(this.algorProcess).then((res) => {
          console.log(res)
        })
      } else {
        modifyAlgoTask(this.algorProcess).then((res) => {
          console.log(res)
        })
      }
    },
    next() {
      this.active++
      this.disabledClick = true
      if (this.active === 3 && this.algorProcess.algoTaskParamList.length === 0) {
        this.getParametersList()
        this.disabledClick = false
      }
      // if (this.active === 1 && this.algorProcess.algorithm !== '') {
      //   this.disabledClick = false
      // } else if (this.active === 1) {
      //   this.disabledClick = true
      // } else if (this.active === 2 && this.algorProcess.datasource !== '') {
      //   this.disabledClick = false
      //   console.log(this.algorProcess.datasource)
      // } else if (this.active === 2) {
      //   this.disabledClick = true
      //   console.log('test')
      // }
    },
  }
}
</script>

<style>
.el-table--fit {
  border-bottom: 1px solid #dfe6ec;
}
</style>
