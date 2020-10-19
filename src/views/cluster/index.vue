<template>
  <div class="dashboard">
    <Table id="table" ref="table" :data="getCsvData" :col-headers="getCsvHeaders" />
    <Excel id="excel" :data="getCsv.data" :col-headers="getCsv.colHeaders" />
    <div class="columns chart">
      <div class="column">
        <ScatterControlPanel :headers="getCsvHeaders" />
        <!-- <div style="height: 30px;width:100%;border: 1px solid black">
                    </div> -->
        <Echarts :id="echart_id1" ref="scatter" :options="getOptions" />
      </div>
      <div class="column">
        <HotmapControlPanel />
        <Echarts :id="echart_id2" ref="heatmap" :options="getHeatmapOptions" />
      </div>
      <div class="column">
        <StatsControlPanel :mode="stats_view_mode" @displayStatsView="displayStatsView" />
        <transition name="fade">
          <component :is="child" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
    import Echarts from './components/Echarts'
    import Menu from './components/Menu'
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import Table from './components/Table'
    import echarts from 'echarts'
    import ScatterControlPanel from './components/ScatterControlPanel'
    import HotmapControlPanel from './components/HotmapControlPanel'
    import UITest from './components/UITest'
    import StatsControlPanel from './components/StatsControlPanel'
    import StatsAnova from './components/StatsAnova'
    import StatsCorrcoef from './components/StatsCorrcoef'

    export default {
        name: 'ClusterVis',
        data() {
            return {
                echart_id1: 'echart_id1',
                echart_id2: 'echart_id2',
                echart_id3: 'echart_id3',
                heatmap_click_blocks: [],
                scatter_graphic_points: [],
                stats_view_mode: {
                    anova: 0,
                    corrcoef: 1
                },
                current_stats_view: 1,
                child: 'StatsCorrcoef',
                dataContract: {}
            }
        },
        computed: {
            ...mapGetters({
                getCsv: 'table/getCsv',
                getTest: 'table/getTest',
                getCsvData: 'table/getCsvData',
                getCsvHeaders: 'table/getCsvHeaders',
                getOptions: 'scatter/getOptions',
                getScatterGraphicPoints: 'scatter/getScatterGraphicPoints',
                getScatterDataStartPosInSeries: 'scatter/getScatterDataStartPosInSeries',
                getHeatmapOptions: 'heatmap/getHeatmapOptions',
                getHeatmapClickBlocks: 'heatmap/getHeatmapClickBlocks'
            })
        },
        mounted() {
            this.$refs.scatter.myChart.on('dblclick', this.onScatterPointDblclick)
            this.$refs.heatmap.myChart.on('click', this.onHeatmapBlockClick)
            // this.$refs.scatter.myChart.on('legendselectchanged', (params)=>{console.log(params)});
            this.heatmap_click_blocks = this.getHeatmapClickBlocks
            this.scatter_graphic_points = this.getScatterGraphicPoints
            this.connectDatasource({
              contractID: this.dataContract.name,
              method: 'get',
              args: { offset: 0, count: 150 }
            })
        },
        created() {
          this.dataContract = { name: this.$route.query.contractName }
        },
      methods: {
            ...mapMutations('table', {
                updateCsv: 'updateCsv'
            }),
            ...mapMutations('scatter', {
                updateEchartsOptions: 'updateEchartsOptions',
                updateScatterData: 'updateScatterData',
                addScatterLinePointByData: 'addScatterLinePointByData'
            }),
            ...mapActions('table', {
              connectDatasource: 'connectDatasource'
            }),
            onScatterPointDragging: function(context) {
                return function(dataIndex, dx, dy) {
                    const series = context.getOptions.series
                    series[0].data[dataIndex] = context.$refs.scatter.myChart.convertFromPixel('grid', this.position)
                    const s = series[0].data
                    context.updateEchartsOptions(
                        {
                            series: [{ id: 'a', data: s, type: 'line' }],
                            graphic: echarts.util.map(s, function(item, dataIndex) {
                                return {
                                    position: context.$refs.scatter.myChart.convertToPixel('grid', item)
                                }
                            })
                        }
                    )
                }
            },
            onHeatmapBlockClick: function(params) {
                // 添加最新点击的块
                this.heatmap_click_blocks.push(params.dataIndex)
                // 移除最前边的点
                if (this.heatmap_click_blocks.length >= 3) {
                    const dataIndex = this.heatmap_click_blocks.shift()
                    if (dataIndex !== undefined) {
                        this.$refs.heatmap.myChart.dispatchAction({
                            type: 'downplay',

                            // 使用 dataIndex 来定位节点。
                            dataIndex: dataIndex
                        })
                    }
                }

                // 点亮最新块
                this.$refs.heatmap.myChart.dispatchAction({
                    type: 'highlight',
                    // 使用 dataIndex 来定位节点。
                    dataIndex: params.dataIndex
                })
            },
            onScatterPointClick: function(context) {
                return function(dataIndex, dx, dy) {
                    console.log('click:' + dataIndex)
                }
            },
            onScatterPointDblclick: function(params) {
                // let dataIndex = 0;
                // for (let i = this.getScatterDataStartPosInSeries; i < params.seriesIndex; ++i) {
                //     dataIndex += this.getOptions.dataset[i].source.length;
                // }
                //
                // dataIndex += params.dataIndex;
                console.log('测试----双击')
                console.log(params.data.id)
                this.$refs.table.onStartEditing(params.data.id)
                // 点亮最新块
                // this.updateEchartsOptions({
                //     graphic: {
                //         type: 'circle',
                //         position: this.$refs.scatter.myChart.convertToPixel('grid', this.getOptions.series[params.seriesIndex].data[params.dataIndex]),
                //         shape: {
                //             cx: 0,
                //             cy: 0,
                //             r: 10
                //         },
                //         invisible: false,
                //         z: 100
                //     }
                // });
            },
            displayStatsView(mode) {
                switch (mode) {
                    case this.stats_view_mode.anova:
                        this.child = 'StatsAnova'
                        break
                    case this.stats_view_mode.corrcoef:
                        this.child = 'StatsCorrcoef'
                        break
                }
            }
        },
        // watch: {
        //     getScatterGraphicPoints: function () {
        //         this.updateEchartsOptions({
        //             graphic: echarts.util.map(this.scatter_graphic_points, function (item, dataIndex) {
        //                 return{
        //                     type: 'circle',
        //                     position: this.$refs.scatter.myChart.convertToPixel('grid', item),
        //                     shape: {
        //                         cx: 0,
        //                         cy: 0,
        //                         r: 10
        //                     },
        //                     invisible: false,
        //                     z: 100
        //                 };
        //             }.bind(this))
        //         });
        //     }
        // },
        components: {
            StatsCorrcoef,
            StatsAnova,
            StatsControlPanel, Menu,
            Echarts,
            Table,
            ScatterControlPanel, HotmapControlPanel, UITest
        }
    }
</script>
<style src="bulma/css/bulma.min.css">

</style>
<style src="bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css">
</style>

<style scoped>

    .dashboard {
        height: 800px;
    }

    .chart {
        height: 40%;
        margin-top: 5%;
        margin-left: 10px;
        margin-right: 10px;
        border:1px dashed #C8C8C8;
    }

    #table {
      height: 40%;
        margin-left: 10px;
        margin-right: 10px;
    }

    .max-clusters-input {
      width: 50px;
    }

</style>
