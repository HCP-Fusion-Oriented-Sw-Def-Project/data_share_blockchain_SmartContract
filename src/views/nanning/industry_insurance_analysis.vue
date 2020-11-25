<template>
  <div class="app-container container">
    <div
      class="filter-container"
      style="margin-bottom:20px;"
    >
      <el-select
        v-model="query.year"
        clearable
        class="filter-item"
        placeholder="年份"
        @change="handleFilter"
      >
        <el-option
          v-for="item in yearOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="query.category"
        clearable
        class="filter-item"
        placeholder="产业类型"
        @change="handleFilter"
      >
        <el-option
          v-for="item in industryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="query.indexType"
        clearable
        class="filter-item"
        placeholder="指标"
        @change="handleFilter"
      >
        <el-option
          v-for="item in warningOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <Echart
      style="width:100%;height:600px"
      :options="barOption"
    />
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { analysisByIndustry } from '@/api/nanning'
import { IndustryBar } from './EchartConfig'
import Echart from './BarChart'
import Vue from 'vue'
import { initWSocket } from '@/utils/wsCluster'
export default {
  name: 'IndustryInsuranceAnalysis',
  directives: {
    waves
  },
  components: {
    Echart
  },
  data() {
    return {
      // 查询变量
      query: {
        category: '工业',
        year: '2018',
        indexType: '营业额',
      },
      list: [],
      yearOptions: [
        {
          label: '2018',
          value: '2018'
        },
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
      ],
      barOption: IndustryBar
    }
  },
  computed: {
    tableHeight() {
      return (document.documentElement.clientHeight - 300)
    }
  },
  created() {
    this.$store.commit('setContractKey', '04c4c855862b53f323e077ccfcc744ecc2c0a04645ed16d99ede8fd5866b38c0670a97ad22c6260d1a4672aba2a5fe229a2d4eba34627c054aab102620afa288c1' + ',dc19f5a32466a89f6abcaf11e1477817b960c6dec120e1026960eb049cb5c5ac')
    this.$store.commit('setNodeAddr', '39.104.208.148:21030')
    initWSocket()
    setTimeout(() => {
      this.getData()
    }, 1000)
  },
  methods: {
    getData() {
      analysisByIndustry(this.query).then((response) => {
        const result = JSON.parse(response.result)
        Vue.set(this.barOption.xAxis, 'data', result.xAxis)
        Vue.set(this.barOption.series[0], 'data', result.data)
      })
    },
    handleFilter() {
      this.getData()
    }

  }
}
</script>

<style scoped>
</style>
