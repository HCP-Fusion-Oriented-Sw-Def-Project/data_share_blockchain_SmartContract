<template>
  <div class=" app-container container">
    <div class="filter-container" style="margin-bottom:20px;">
      <el-select v-model="listQuery.year" clearable class="filter-item" placeholder="年份" @change="handleFilter">
        <el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.category" clearable class="filter-item" placeholder="产业类型" @change="handleFilter">
        <el-option v-for="item in industryOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.indexType" clearable class="filter-item" placeholder="预警指标" @change="handleFilter">
        <el-option v-for="item in warningOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div style="float:right">
        <el-button v-waves class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
          查找
        </el-button>
        <el-button v-waves class="filter-item" type="info" size="mini" icon="el-icon-refresh" @click="resetListQuery">
          重置
        </el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="getSubList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :height="tableHeight"
    >
      <el-table-column v-for="(column,index) in columns" :key="index+''" sortable :label="column" prop="industry" align="center">
        <template slot-scope="scope">
          <span> {{ scope.row[column] }} </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background :current-page="listQuery.pageNum" :page-sizes="[5,10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { fetchAlertCompList } from '@/api/nanning'
export default {
    name: 'IndustryWarning',
    directives: {
        waves
    },
    data() {
        return {
            // 查询变量
            listQuery: {
                category: '工业',
                year: '2019',
                indexType: '营业额',
                pageNum: 1,
                pageSize: 5
            },
            tableKey: '0',
            listLoading: false,
            // Tables数据
            list: [],
            total: 1,
            columns: ['行业', '营业额'],
            yearOptions: [
                {
                    label: '2019',
                    value: '2019'
                },
                {
                    label: '2020',
                    value: '2020'
                }
            ],
            industryOptions: [
                {
                    label: '工业',
                    value: '工业'
                },
                {
                    label: '服务业',
                    value: '服务业'
                }
            ],
            warningOptions: [
                {
                    label: '营业额',
                    value: '营业额'
                },
                {
                    label: '进出总额',
                    value: '进出总额'
                },
                {
                    label: '利润',
                    value: '利润'
                },
                {
                    label: '税收',
                    value: '税收'
                },
                {
                    label: '从业人员',
                    value: '从业人员'
                },
                {
                    label: '用水量',
                    value: '用水量'
                },
                {
                    label: '用电量',
                    value: '用电量'
                }
            ]
        }
    },
    computed: {
        tableHeight() {
            return (document.documentElement.clientHeight - 300)
        },
        getSubList() {
            if (this.list.length > 0) {
                const start = (this.listQuery.pageNum - 1) * this.listQuery.pageSize
                return this.list.slice(start, start + this.listQuery.pageSize)
            }
            return []
        }
    },
    created() {
      this.getList()
    },
    methods: {
        getList() {
            fetchAlertCompList(this.listQuery).then((response) => {
                const result = JSON.parse(response.result)
                if (result.length > 0) {
                    this.columns = Object.keys(result[0])
                    this.list = result
                    this.total = result.length
                }
            })
        },
        handleFilter() {
            this.listQuery.pageNum = 1
            this.getList()
        },
        resetListQuery() {
            this.listQuery = {
                category: '工业',
                year: '2019',
                indexType: '营业额',
                pageNum: 1,
                pageSize: 5
            }
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val
            this.getList()
        }

    }
}
</script>

<style scoped>
</style>
