<template>
  <div class="app-container container">
    <div class="filter-container" style="margin-bottom:20px;">
      <el-select v-model="query.year" clearable class="filter-item" placeholder="年份" @change="handleFilter">
        <el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="query.category" clearable class="filter-item" placeholder="产业类型" @change="handleFilter">
        <el-option v-for="item in industryOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="query.indexType" clearable class="filter-item" placeholder="指标" @change="handleFilter">
        <el-option v-for="item in warningOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <Echart style="width:100%;height:600px" :options="barOption" />
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
        this.$store.commit('setContractKey', '04421c01a016eddc6c670a653de8f6a1bc0cded6ca954ab8dabb05a147544a40c83cddb8fd9856e6a40691898a675e9ac6f1bdfda3b4187e3a90a0b28f4590fb39' + ',52ade32d48a3ca77f0ea30d1509a2d3e7978cfafee6de70f85ee074be5517c21')
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
