<template>
  <div>
    <el-container style="margin-top: 20px">
      <div
        v-show="leftside"
        class="leftBar"
        style="padding-top: 10px;margin-left:20px;height: 850px;width:220px; box-shadow: 0 0 2px #AAA;"
      >
        <div style="margin-left: 20px">
          <div style="width: 100%;">
            <!-- <el-row style="width:100%;font-size: 15px;margin-top: 30px">
              <el-row style="border: 0.5px solid gray;width:180px;height:0" />
              <el-row>
                <span style="float: left;font-weight: bold">图表名称</span>
              </el-row>
              <el-row>
                <el-input v-model="title" placeholder="请输入图表名称" @keyup.enter.native="saveFile" />
              </el-row>
            </el-row> -->
            <!-- <el-row style="width:100%;font-size: 15px;">
              <el-row style="padding: 10px" />
              <el-row>
                <span style="float: left;font-weight: bold">图表类型</span>
              </el-row>
            </el-row> -->
            <el-row style="width:100%;padding-top: 10px;margin-left: 10px;font-size:8px">
              <el-tooltip :enterable="false" effect="light" placement="left">
                <div slot="content">
                  柱状图<br />维度：1个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="barDisabled"
                    class="iconfont icon-bar_chart"
                    plain
                    size="small"
                    @click="type='bar'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  柱状堆叠图<br />维度：1个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="stackedBarDisabled"
                    class="iconfont el-icon-xy-duijizhuzhuangtu"
                    plain
                    size="small"
                    @click="type='stackedBar'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  象形柱状图<br />维度：1个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="pictorialBarDisabled"
                    class="iconfont el-icon-xy-zujian-xiangxingzhuzhuangtu"
                    plain
                    size="small"
                    @click="type='pictorialBar'"
                  />
                </el-col>
              </el-tooltip>
            </el-row>

            <el-row style="width:100%;margin-left: 10px;font-size:8px">
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  折线图<br />维度：1个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="lineDisabled"
                    class="iconfont icon-line_chart"
                    plain
                    size="small"
                    @click="type='line'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left">
                <div slot="content">
                  面积图<br />维度：1个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="lineAreaDisabled"
                    class="iconfont el-icon-xy-lineArea"
                    plain
                    size="small"
                    @click="type='lineArea'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  折线柱状图<br />维度：1个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="lineBarDisabled"
                    class="iconfont el-icon-xy-nandingtu-copy"
                    plain
                    size="small"
                    @click="type='lineBar'"
                  />
                </el-col>
              </el-tooltip>
            </el-row>

            <el-row style="width:100%;margin-left: 10px;font-size:8px">
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  靶心图<br />维度：1个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="blankDisabled"
                    class="iconfont el-icon-xy-baxin"
                    plain
                    size="small"
                    @click="type='blank'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  饼图<br />维度：1个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="pieDisabled"
                    class="iconfont icon-seo-marketing-business-analytics-chart-pie"
                    plain
                    size="small"
                    @click="type='pie'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  南丁图<br />维度：1个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="nandingDisabled"
                    class="iconfont el-icon-xy-nandingtu"
                    plain
                    size="small"
                    @click="type='nanding'"
                  />
                </el-col>
              </el-tooltip>
            </el-row>

            <el-row style="width:100%;margin-left: 10px;font-size:8px">
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  雷达图<br />维度：1个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="radarDisabled"
                    class="iconfont icon-radarchart"
                    plain
                    size="small"
                    @click="type='radar'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  散点图<br />维度：1个；数值：2个<br />或维度：1个，数值X：1个；数值Y：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="scatterDisabled"
                    class="iconfont icon-chartscatter"
                    plain
                    size="small"
                    @click="type='scatter'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  气泡图<br />维度：1个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="bubbleDisabled"
                    class="iconfont el-icon-xy-fsux_tubiao_qipaotu"
                    plain
                    size="small"
                    @click="type='bubble'"
                  />
                </el-col>
              </el-tooltip>
            </el-row>

            <el-row style="width:100%;margin-left: 10px">
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  桑基图<br />维度：2-20个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="sankeyDisabled"
                    class="iconfont el-icon-xy-sangjitu"
                    plain
                    size="small"
                    @click="type='sankey'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  旭日图<br />维度：多个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="sunburstDisabled"
                    class="iconfont el-icon-xy-xuritu-copy"
                    plain
                    size="small"
                    @click="type='sunburst'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  矩形树图<br />维度：多个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="treemapDisabled"
                    class="iconfont el-icon-xy-juxingshutu"
                    plain
                    size="small"
                    @click="type='treemap'"
                  />
                </el-col>
              </el-tooltip>
            </el-row>

            <el-row style="width:100%;margin-left: 10px">
              <el-tooltip :enterable="false" effect="light" placement="left">
                <div slot="content">
                  热力图<br />维度：2个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="heatmapDisabled"
                    class="iconfont el-icon-xy-relitu-copy"
                    plain
                    size="small"
                    @click="type='heatmap'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left">
                <div slot="content">
                  平行坐标图<br />维度：多个<br />数值：0个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="parallelDisabled"
                    class="iconfont el-icon-xy-pinghangzuobiaotu"
                    plain
                    size="small"
                    @click="type='parallel'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left">
                <div slot="content">
                  箱线图<br />维度：0个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="boxplotDisabled"
                    class="iconfont el-icon-xy-xiangxiantu"
                    plain
                    size="small"
                    @click="type='boxplot'"
                  />
                </el-col>
              </el-tooltip>
            </el-row>

            <el-row style="width:100%;margin-left: 10px">
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  仪表图<br />维度：0个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="gaugeDisabled"
                    class="iconfont icon-oiltablechart"
                    plain
                    size="small"
                    @click="type='gauge'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left">
                <div slot="content">
                  漏斗图<br />维度：1个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="funnelDisabled"
                    class="iconfont icon-chartfunnelplot"
                    plain
                    size="small"
                    @click="type='funnel'"
                  />
                </el-col>
              </el-tooltip>

              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  水球图<br />维度：0个<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="liquidfillDisabled"
                    class="iconfont el-icon-xy-waterpolo"
                    plain
                    size="small"
                    @click="type='liquidfill'"
                  />
                </el-col>
              </el-tooltip>
            </el-row>

            <el-row style="width:100%;margin-left: 10px">
              <el-tooltip :enterable="false" effect="light" placement="left">
                <div slot="content">
                  甘特图<br />维度：4个（时间）<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="gantteDisabled"
                    class="iconfont el-icon-xy-gantetu"
                    plain
                    size="small"
                    @click="type='gantte'"
                  />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left-start">
                <div slot="content">
                  主题河流图<br />维度：2个（时间和类别）<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="themeRiverDisabled"
                    class="iconfont el-icon-xy-heliutu"
                    plain
                    size="small"
                    @click="type='themeRiver'"
                  />
                </el-col>
              </el-tooltip>

              <el-tooltip :enterable="false" effect="light" placement="left">
                <div slot="content">
                  日历图<br />维度：1个（时间）<br />数值：1个
                </div>
                <el-col :span="6">
                  <el-button
                    :disabled="calendarDisabled"
                    class="iconfont el-icon-xy-rilitubiao"
                    plain
                    size="small"
                    @click="type='calendar'"
                  />
                </el-col>
              </el-tooltip>
              <!-- <el-tooltip effect="light" :enterable="false" placement="left-start">
                <div slot="content">数量统计<br/>1个数值</div>
                <el-col :span="6" >
                  <el-button size="small" style="font-size: 15px" class="el-icon-news" @click="countchart" :disabled="countDisabled" plain>
                  </el-button>
                </el-col>
              </el-tooltip> -->
              <!-- <el-tooltip effect="light" :enterable="false" placement="left-start">
                  <div slot="content">地图<br/>2个维度，1个数值</div>
                  <el-col :span="6" >
                    <el-button size="small" class="iconfont el-icon-xy-ditu" @click="mapchart" :disabled="mapDisabled" plain>
                  </el-button>
                  </el-col>
                </el-tooltip> -->
            </el-row>

            <el-row style="width:100%;margin-left: 10px">
              <el-tooltip effect="light" :enterable="false" placement="left-start">
                <div slot="content">
                  中国地图<br />1或2个维度，1个数值
                </div>
                <el-col :span="6">
                  <el-button size="small" class="iconfont el-icon-xy-ditu" :disabled="chinaDisabled" plain @click="type='chinaMap'" />
                </el-col>
              </el-tooltip>
              <el-tooltip :enterable="false" effect="light" placement="left">
                <div slot="content">
                  表格<br />维度：多个<br />数值：多个
                </div>
                <el-col :span="6">
                  <el-button
                    id="table"
                    :disabled="tableDisabled"
                    class="iconfont el-icon-xy-biaoge"
                    plain
                    size="small"
                    @click="type='table'"
                  />
                </el-col>
              </el-tooltip>
            </el-row>
          </div>
          <!--
          <el-row style="width:100%;font-size: 15px;margin-top: 30px">
            <el-row style="border: 0.5px solid gray;width:180px;height:0"></el-row>
            <el-row style="width:100%;"><span style="float: left;font-weight: bold">定时器</span></el-row>
            <el-row>
              <input style="width: 35px;text-align: center;" v-model="hour"></input> 时
              <input style="width: 35px;text-align: center;" v-model="minute"></input> 分
              <input style="width: 35px;text-align: center;" v-model="second"></input> 秒
            </el-row>
            <el-row style="border: 0.5px solid gray;width:180px;height:0"></el-row>
          </el-row> -->
        </div>
      </div>

      <li
        v-show="leftsideLeft"
        class="el-icon-xy-return"
        style="margin-left:0px;margin-top:400px;font-size: 30px;cursor: pointer"
        @click="leftsideHide"
      ></li>
      <!-- <el-col style="margin-top:50px;height: 700px;width:0;border: 0.5px solid gray;"></el-col> -->
      <li
        v-show="leftsideRight"
        class="el-icon-xy-enter"
        style="margin-left:0px;margin-top:400px;font-size: 30px;cursor: pointer"
        @click="leftsideShow"
      ></li>

      <!-- 中间绘图区域的容器 -->
      <div :class="centerClass">
        <div v-show="echartView" style="width:100%;height: 820px;">
          <component
            :is="getCurrentTabComponentAndRightBarComponent.currentTabComponent"
            v-show="echartView"
            ref="myEchart"
            :dim="xAxis"
            :option="option"
            :toolbox="true"
            :value="yAxis"
            :value-y="zAxis"
            height="700px"
            :geo-properties="geoProperties"
            width="100%"
            @change="updateOption"
            @changeGeo="updateGeo"
          />
        </div>
      </div>
      <li
        v-show="rightsideLeft"
        class="el-icon-xy-return"
        style="margin-top:400px;font-size: 30px;cursor: pointer"
        @click="rightsideShow"
      ></li>
      <!-- <el-col style="margin-top:50px;height: 700px;width:0;border: 0.5px solid gray;"></el-col> -->
      <li
        v-show="rightsideRight"
        class="el-icon-xy-enter"
        style="margin-left:0px;margin-top:400px;font-size: 30px;cursor: pointer"
        @click="rightsideHide"
      ></li>

      <div v-show="rightside" class="rightBar" style="width: 350px;height: 850px;background-color: #FFF;box-shadow: 0 0 2px #AAA;">
        <div style="margin-left: 30px;margin-right: 30px">
          <el-tabs v-model="activeTab" height="100%" width="100%">
            <el-tab-pane name="1">
              <!-- 右侧配置项的容器 -->
              <span slot="label">&nbsp;&nbsp;<i class="el-icon-setting"></i>&nbsp;配  置&nbsp;&nbsp;</span>
              <component
                :is="getCurrentTabComponentAndRightBarComponent.currentRightBarComponent"
                ref="rightBar"
                :files="files"
                :option="option"
                :geo-properties="geoProperties"
                @change="updateOption"
                @changeFile="updateFiles"
                @changeGeo="updateGeo"
              />
            </el-tab-pane>
            <el-tab-pane name="2">
              <span slot="label">&nbsp;<i class="el-icon-document"></i>&nbsp;数  据&nbsp;&nbsp;</span>
              <!-- <UploadFile
                header-text="upload"
                @uploadFile="uploadSuccess"
                @ListenUploadFile="showData"
              /> -->
              <div>
                <el-table
                  :data="tableData"
                  max-height="250"
                  style="width: 100%"
                >
                  <el-table-column
                    label="字段"
                    prop="field"
                    width="50px"
                  />
                  <el-table-column
                    label="映射"
                  >
                    <template slot-scope="scope">
                      <!-- <el-input class="edit-input" size="mini" v-model="scope.row.map" placeholder="可自定义"></el-input> -->
                      <div class="block">
                        <el-cascader
                          v-model="scope.row.cascaderValue"
                          :options="getMapOptions"
                          :props="cascaderOption"
                          :show-all-levels="false"
                          clearable
                        />
                      </div>
                    </template>
                  </el-table-column>
                </el-table>

                <div v-show="!getDataSettingDisabled">
                  <span class="demonstration">字段计算</span><br />
                  <DataSetting :files="filesTemp" :table-data="tableData" :data-setting-list="dataSettingList" @change="dataSettingSuccess" />
                  <hr />
                </div>

                <div v-if="JSON.stringify(this.files).length>2">
                  <NewCol :files="files" :add-col-list="newColList" @change="newColFile" />
                  <hr />
                </div>
                <div v-if="JSON.stringify(this.files).length>2">
                  <el_filter :files="files" :add-filter-list="newFilterList" @change="updateFilesTemp" />
                  <hr />
                </div>
              </div>
            </el-tab-pane>
            <!--            <el-tab-pane name="3">-->
            <!--              <span slot="label">&nbsp;<i class="el-icon-info"></i>&nbsp;交  互&nbsp;&nbsp;</span>-->
            <!--              <div>我是tab3</div>-->
            <!--            </el-tab-pane>-->
          </el-tabs>
        </div>
      </div>
    </el-container>
    <el-dialog
      :visible.sync="dataRseponseResultsDialog"
      title="数据相应结果"
      width="60%"
    >
      <el-input
        v-model="textarea"
        :autosize="{ minRows: 0, maxRows: 20}"
        placeholder="请输入内容"
        type="textarea"
      />
    </el-dialog>
  </div>
</template>

<!-- <script src="jquery/dist/jquery.min.js"></script>
  <script src="http://api.map.baidu.com/api?v=2.0&ak=3mn83YpfI9VdPSZg1DfuK7lg0UqRljwt"></script> -->
<script>
	import UploadExcelComponent from '@/components/UploadExcel/index.vue'
	import UploadTxtComponent from '@/components/UploadTxt/index.vue'
	import linkMysql from '@/components/linkMysql/index.vue'

	import characterFilter from '@/components/characterFilter/index.vue'
	import dataFilter from '@/components/dataFilter/index.vue'

	import linechart from './components/LineChart.vue'
	import barchart from './components/BarChart.vue'
	import lineAreachart from './components/LineAreaChart.vue'
	import lineBarchart from './components/LineBarChart.vue'
	import scatterchart from './components/ScatterChart.vue'
	import radarchart from './components/RadarChart.vue'
	import funnelchart from './components/FunnelChart.vue'
	import piechart from './components/PieChart.vue'
	import wordCloudchart from './components/WordCloudChart.vue'
	import gaugechart from './components/GaugeChart.vue'
	import sankeychart from './components/SankeyChart.vue'
	import boxplotchart from './components/BoxplotChart.vue'
	import sunburstchart from './components/SunburstChart.vue'
	import treemapchart from './components/TreemapChart.vue'
	import heatmapchart from './components/HeatmapChart.vue'
	import mapchart from './components/MapChart.vue'
	import nandingchart from './components/NandingChart.vue'
	import tablechart from './components/TableChart.vue'
	import countchart from './components/CountChart.vue'
	import blankchart from './components/BlankChart.vue'
	import bubblechart from './components/BubbleChart.vue'
	import calendarchart from './components/CalendarChart.vue'
	import ganttechart from './components/GantteChart.vue'
	import liquidfillchart from './components/LiquidfillChart.vue'
	import parallelchart from './components/ParallelChart.vue'
	import pictorialBarchart from './components/PictorialBarChart.vue'
	import themeRiverchart from './components/ThemeRiverChart.vue'
	import stackedBarchart from './components/StackedBarChart.vue'
	import chinaMapChart from './components/ChinaMap.vue'
    import NewCol from './components/NewCol'// 为数据表增添一列数据

	import echarts from 'echarts'
	import china from 'echarts/map/js/china.js' //
	import beijing from 'echarts/map/js/province/beijing.js'
	import hubei from 'echarts/map/js/province/hubei.js'
	import wordcloud from 'echarts-wordcloud'
	// import gl from 'echarts-gl'
	import dataTool from 'echarts/extension/dataTool'
	// import bmap from 'echarts/extension/bmap'
	import { getUserInfo } from '@/api/login'
	import Kanban from '@/components/Kanban'
	import taskResult from '@/components/TaskResult'
	import UploadFile from '@/components/UploadFile'
	import { debounce } from '@/utils'
	import { createSingleVis, getSingleList, saveSingleFile, getSingleInfo, updateSingle, connectDatasource } from '@/api/visualization'
	import { downloadFile } from '@/api/file'
	// import { parseTime ,arrayToTree,treeToArray, updateTree, getTreeNode} from '@/utils'
	require('echarts/theme/macarons') // echarts theme
	require('echarts/extension/bmap/bmap')

	import draggable from 'vuedraggable'
	import lineSetting from './components/LineSetting'
	import barSetting from './components/BarSetting'
	import boxplotSetting from './components/BoxplotSetting'
	import funnelSetting from './components/FunnelSetting'
	import gaugeSetting from './components/GaugeSetting'
	import lineAreaSetting from './components/LineAreaSetting'
	import nandingSetting from './components/NandingSetting'
	import pieSetting from './components/PieSetting'
	import parallelSetting from './components/ParallelSetting'
	import radarSetting from './components/RadarSetting'
	import sankeySetting from './components/SankeySetting'
	import scatterSetting from './components/ScatterSetting'
	import sunburstSetting from './components/SunburstSetting'

	import lineBarSetting from './components/LineBarSetting.vue' // 折线柱图
	import stackedBarSetting from './components/StackedBarSetting.vue' // 柱状堆叠图
	import bubbleSetting from './components/BubbleSetting.vue' // 气泡图
	import themeRiverSetting from './components/ThemeRiverSetting.vue'// 主题河流图
	import pictorialBarSetting from './components/PictorialBarSetting.vue' // 象形柱图
	import treemapSetting from './components/TreemapSetting.vue' // 矩形柱图
	import heatmapSetting from './components/HeatmapSetting.vue' // 热力图
	import calendarSetting from './components/CalendarSetting.vue' // 日历图
	import gantteSetting from './components/GantteSetting.vue' // 甘特图
	import liquidFillSetting from './components/LiquidFillSetting' //
	import blankSetting from './components/BlankSetting' // 靶心图
	import tableSetting from './components/TableSetting' // 表格配置  主要是字段类型更改
	import dataSetting from './components/DataSetting' // 数据处理 对数据进行简单运算
  import chinaMapSetting from './components/ChinaMapSetting'
	import el_filter from './components/el_filter'

	import { createRandomId, getRandomColor, generateHeaders } from '@/utils'
	import Vue from 'vue'

	import { options } from './Options.js'

	const animationDuration = 6000

	let dom = ''
	export default {
		name: 'SuploadExcel',
		components: {
			echarts,
			Kanban,
			UploadExcelComponent,
			UploadTxtComponent,
			characterFilter,
			dataFilter,
			draggable,
			UploadFile,
			linkMysql,
			taskResult,
			linechart,
			barchart,
			lineAreachart,
			lineBarchart,
			scatterchart,
			radarchart,
			funnelchart,
			piechart,
			wordCloudchart,
			gaugechart,
			sankeychart,
			boxplotchart,
			sunburstchart,
			treemapchart,
			heatmapchart,
			tablechart,
			countchart,
			blankchart,
			bubblechart,
			calendarchart,
			ganttechart,
			liquidfillchart,
			parallelchart,
			pictorialBarchart,
			themeRiverchart,
			stackedBarchart,
      		chinaMapChart,
			DataSetting: dataSetting,
			NewCol,
			el_filter
		},
		data() {
			return {
				dataFromRouter: false,
				cascaderOption: {
					multiple: true,
					expandTrigger: 'hover'
				},

				activeTab: '2',
				// 图
				tableData: [{
					field: '维度',
					cascaderValue: [],
					state: '匹配成功',
				}, {
					field: '数值',
					cascaderValue: [],
					state: '匹配成功',
				},
					// {
					//   field: '数值y',
					//   map: '',
					//   state: '可选',
					// }
				],
        dataSettingList: [],
        newColList: [],
        newFilterList: [],
				dataSourceClassOptions: [{
					value: '静态数据',
					label: '静态数据'
				}, {
					value: '动态数据',
					label: '动态数据'
					// }, {
					//   value: '选项3',
					//   label: 'API'
					// }, {
					//   value: '选项4',
					//   label: '数据库'
					// }, {
					//   value: '选项5',
					//   label: 'TableStore'
				}],
				mapOptions: [],
				dataSourceOptions: [{
					value: '选项3',
					label: 'API'
				}, {
					value: '选项4',
					label: '数据库'
				}
				// }, {
				// 	value: "选项5",
				// 	label: "TableStore"
				// }
				],
				dataSourceClass: '',
				dataSource: '',
				dataRseponseResults: '',
				dataRseponseResultsDialog: false,
				files: {},
				filesTemp: {},
				// fileList:[],
				dataList: [],
				textarea1: '',
				textarea: '',
				// 数据
				option: {},
        geoProperties: {
          adcode: 100000,
          acroutes: [],
          childrenNum: 34,
          type: 0
        },

				// 布局
				centerClass: 'centerMain',
				// 画图
				currentTabComponent: null, // 当前容器
				currentRightBarComponent: tableSetting, // 当前配置视图
				valueView: true, // 散点图数值轴不可见
				scatterValueView: false, // 散点图数值轴可见

				// 算法结果可视化
				task: false,

				// 连接mysql
				mysqlLink: false,
				mysqlTable: [],
				// 筛选器
				characterFilterDialogVisible: false, // 文本型筛选器Dialog
				dataFilterDialogVisible: false, // 数值型筛选器Dialog
				filterCount: 0, // 筛选器个数
				filterlist: [], // 可拖拽筛选器数组
				filterColName: '',
				filterColumn: null,
				filters: [], // 保存的多个筛选器

				// 侧边栏
				leftside: true,
				rightside: true,
				leftsideLeft: true,
				leftsideRight: false,
				rightsideLeft: false,
				rightsideRight: true,
				sideHide: false,
				sideShow: false,

				// 表格和图表
				echartInit: false,
				echartView: true, // echart可见
				tableView: false, // 图表可见

				// 表格(行数据)
				// columnList:new Object,

				// 维度和数值
				dimension: [], // xAxis
				data: [], // yAxis

				// 判断是否添加到多图
				add: false,

				// 画图按钮判断,顺序对应一致
				lineDisabled: true,
				barDisabled: true,
				scatterDisabled: true,
				radarDisabled: true,
				funnelDisabled: true,
				pieDisabled: true,
				// wordCloudDisabled:true,
				nandingDisabled: true,
				tableDisabled: true,
				gaugeDisabled: true,
				sankeyDisabled: true,
				boxplotDisabled: true,
				sunburstDisabled: true,
				treemapDisabled: true,
				heatmapDisabled: true,
				countDisabled: true,
				// mapDisabled:true,
				lineAreaDisabled: true,
				lineBarDisabled: true,
				gantteDisabled: true,
				bubbleDisabled: true,
				blankDisabled: true,
				parallelDisabled: true,
				pictorialBarDisabled: true,
				themeRiverDisabled: true,
				calendarDisabled: true,
				liquidfillDisabled: true,
				stackedBarDisabled: true,
        chinaDisabled: true,

				// 判断是否进入数据处理
				dataSettingDisabled: true,

				// 上传文件列表
				filesCsv: [],
				filesTxt: [],
				numTxt: 0,
				numCsv: 0,
				txt: false,
				csv: false,

				visible2: false,

				// 拖拽设置
				optionsData: {
					group: { name: 'data', pull: 'clone', put: false }
				},
				// 维度
				optionsDim: {
					group: { name: 'dim', pull: true, put: ['data', 'Dim'] }
				},
				// 数值
				optionsValue: {
					group: { name: 'value', pull: true, put: ['data', 'value'] }
				},
				// 筛选器
				optionsFilter: {
					group: { name: 'filter', pull: true, put: ['data'] }
				},

				chart: null,
				xAxis: [], // 维度数组
				yAxis: [], // 数值(x)数组
				zAxis: [], // 数值y数组
				// xAxis:null, //维度(处理后)
				// yAxis:null, //数值x(处理后)
				// zAxis:[],//数值y(处理后)

				chartsName: [],
				type: 'table',
				title: null,
				dataset: '数据集未上传',

				// 定时器
				hour: null,
				minute: null,
				second: null,
				timer: null,

				check: true,
				dataname: '',
				datapath: '',
				username: '',
				filepath: '',
				filetype: '',
				// temp: {
				// 	userId: "1", //用户id
				// 	name: "",  //单图名称
				// 	dataname: "",  //上传数据集的名称
				// 	datapath: "",  //保存数据集的路径
				// 	type: "",   //单图类型
				// 	xAxis: "",  //维度
				// 	yAxis: "",  //数值(x)
				// 	zAxis: "", //数值y
				// 	timer: "",  //定时器
				// 	xAxisNum: 0,   //维度的个数
				// 	yAxisNum: 0,   //数值(x)的个数
				// 	zAxisNum: 0,  //数值(y)的个数
				// 	xAxisName: [], //维度的列名数组
				// 	yAxisName: [], //数值(x)的列名数组
				// 	zAxisName: [],//数值(y)的列名数组
				// 	databaseId: null,  //数据库id
				// 	tableName: "",     //数据表名
				// 	filesCsv: [],       //上传文件的数据表
				// 	fileType: null,
				// 	filters: [],  //筛选器
				// 	option: {}
				// },
        temp: {
          createBy: '',
          updateBy: '',
          createDate: '',
          updateDate: '',
          remarks: '',
          visualizationName: '',
          chartStyle: '',
          dataInfo: '',
          dataOperation: ''
        },
				dialogVisible: false,
				typeComponentMapping: {
					'lineArea': {
						currentTabComponent: lineAreachart,
						currentRightBarComponent: lineAreaSetting
					},
					'line': {
						currentTabComponent: linechart,
						currentRightBarComponent: lineSetting
					},
					'bar': {
						currentTabComponent: barchart,
						currentRightBarComponent: barSetting
					},
					'scatter': {
						currentTabComponent: scatterchart,
						currentRightBarComponent: scatterSetting
					},
					'radar': {
						currentTabComponent: radarchart,
						currentRightBarComponent: radarSetting
					},
					'funnel': {
						currentTabComponent: funnelchart,
						currentRightBarComponent: funnelSetting
					},
					'pie': {
						currentTabComponent: piechart,
						currentRightBarComponent: pieSetting
					},
					'nanding': {
						currentTabComponent: nandingchart,
						currentRightBarComponent: nandingSetting
					},
					'gauge': {
						currentTabComponent: gaugechart,
						currentRightBarComponent: gaugeSetting
					},
					'sankey': {
						currentTabComponent: sankeychart,
						currentRightBarComponent: sankeySetting
					},
					'boxplot': {
						currentTabComponent: boxplotchart,
						currentRightBarComponent: boxplotSetting
					},
					'sunburst': {
						currentTabComponent: sunburstchart,
						currentRightBarComponent: sunburstSetting
					},
					'treemap': {
						currentTabComponent: treemapchart,
						currentRightBarComponent: treemapSetting
					},
					'heatmap': {
						currentTabComponent: heatmapchart,
						currentRightBarComponent: heatmapSetting
					},
					'lineBar': {
						currentTabComponent: lineBarchart,
						currentRightBarComponent: lineBarSetting
					},
					'gantte': {
						currentTabComponent: ganttechart,
						currentRightBarComponent: gantteSetting
					},
					'bubble': {
						currentTabComponent: bubblechart,
						currentRightBarComponent: bubbleSetting
					},
					'blank': {
						currentTabComponent: blankchart,
						currentRightBarComponent: blankSetting
					},
					'parallel': {
						currentTabComponent: parallelchart,
						currentRightBarComponent: parallelSetting
					},
					'pictorialBar': {
						currentTabComponent: pictorialBarchart,
						currentRightBarComponent: pictorialBarSetting
					},
					'themeRiver': {
						currentTabComponent: themeRiverchart,
						currentRightBarComponent: themeRiverSetting
					},
					'calendar': {
						currentTabComponent: calendarchart,
						currentRightBarComponent: calendarSetting
					},
					'liquidfill': {
						currentTabComponent: liquidfillchart,
						currentRightBarComponent: liquidFillSetting
					},
					'stackedBar': {
						currentTabComponent: stackedBarchart,
						currentRightBarComponent: stackedBarSetting
					},
					'table': {
						currentTabComponent: tablechart,
						currentRightBarComponent: tableSetting
					},
          'chinaMap': {
            currentTabComponent: chinaMapChart,
            currentRightBarComponent: chinaMapSetting
          }
				}
			}
		},

		computed: {
			// 级联选择器使用的选项数据，从files变量获取
			getMapOptions() {
				const mapOptions = []
				for (const fileId in this.files) {
					let tmpDisabled = false
					for (const table of this.getTableData) {
						if (table.cascaderValue.length !== 0) {
							if (table.cascaderValue[0][0] === fileId) {
								tmpDisabled = false
							} else {
								tmpDisabled = true
							}
						}
					}
					const parent = {
						label: this.files[fileId].fileInfo.fileName,
						disabled: tmpDisabled,
						value: fileId,
						children: []
					}
					for (const dataId in this.files[fileId].dataList) {
						const temp = this.files[fileId].dataList[dataId]
						parent.children.push({
							label: temp.name,
							value: dataId,
						})
					}
					mapOptions.push(parent)
				}
				return mapOptions
			},
			getTableData() {
				if (this.tableData.length > 2 && this.type !== 'scatter') {
					const row = this.tableData.pop()
					this.tableData[1].field = '数值'
					this.tableData[1].cascaderValue = this.addOptionForCascaderSelection(this.tableData[1].cascaderValue, row.cascaderValue.pop())
				} else if (this.type === 'scatter') {
					// 数值划分
					if (this.tableData.length === 2) {
						if (this.yAxis.length === 2) {
							this.tableData[1].field = '数值x'
							const cascaderValue = []
							this.tableData.push({
								field: '数值y',
								cascaderValue: [this.tableData[1].cascaderValue[this.tableData[1].cascaderValue.length - 1]],
								state: '可选',
							})
							// 当更改tableData中级联选择器中值的时侯，级联选择器不能及时更新，我怀疑是elelment-ui的bug，但我没有证据
							// 一种解决办法,不修改this.tableData.cascaderValue拷贝到新数组
							for (let i = 0; i < this.tableData[1].cascaderValue.length - 1; ++i) {
								cascaderValue.push(this.tableData[1].cascaderValue[i])
							}
							this.tableData[1].cascaderValue = cascaderValue
						}
					}
				}
				return this.tableData
			},
			getTempXAxisName() {
				return this.temp.xAxisName
			},
			getTempYAxisName() {
				return this.temp.yAxisName
			},
			getTempZAxisName() {
				return this.temp.zAxisName
			},
			getTempFilename() {
				return this.temp.dataname
			},
			// 以下函数用于从其他页面跳转的数据，保存到后台的数据以逗号分隔，并没有id信息，不完美的解决方法之一
			getFileOptionByFileName() {
				const mapOption = this.getMapOptions.find((v) => {
					return v.label === this.getTempFilename
				})
				return {
					parentId: mapOption.value,
					children: mapOption.children
				}
			},
			getCurrentTabComponentAndRightBarComponent() {
				this.echartInit = !this.echartInit
				this.echartView = true
				this.tableView = false
				this.valueView = true
				return this.typeComponentMapping[this.type]
			},
			getDataSettingDisabled() {
				return this.tableData[0].cascaderValue.length === 0 || this.tableData[1].cascaderValue.length === 0 || (this.tableData.length === 3 && this.tableData[2].cascaderValue.length === 0)
			},
		},
		watch: {
			// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
			// '$route': 'getParams',
			'filterRadio': 'fileterChange',
			'type': function(nval, oval) {
				// 更换组件，option置空
          if (!this.dataFromRouter) {
			      this.option = this.copyObject(options[this.type])
          } else {
          	this.dataFromRouter = false
          }
			},

			getTempXAxisName(nval, oval) {
			  console.log('in')
				const { parentId, children } = this.getFileOptionByFileName
				nval.forEach((v, i) => {
					const child = children.find((child) => {
						return child.label === v
					})
					this.tableData[0].cascaderValue.push([parentId, child.value])
				})
			},
			getTempYAxisName(nval, oval) {
				const { parentId, children } = this.getFileOptionByFileName
				nval.forEach((v, i) => {
					const child = children.find((child) => {
						return child.label === v
					})
					this.tableData[1].cascaderValue.push([parentId, child.value])
				})
			},
			getTempZAxisName(nval, oval) {
				const { parentId, children } = this.getFileOptionByFileName
				nval.forEach((v, i) => {
					const child = children.find((child) => {
						return child.label === v
					})
			this.tableData[1].cascaderValue.push([parentId, child.value])
				})
			},
			// 'option': "consoleResult"
			'xAxis': 'drawIsDisabled',
			'yAxis': 'drawIsDisabled',
			'zAxis': 'drawIsDisabled',
			// 'list4':'handleFilter'
		},
		created() {
			this.getParams()
		},
		mounted() {
			//  this.initChart();

		},
		updated() {
			this.$nextTick(function() {
				if (this.sideHide) {
					this.redrawChart()
					this.sideHide = false
				}
				if (this.sideShow) {
					this.redrawChart()
					this.sideShow = false
				}
			})
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		methods: {
      		copyObject: function(obj) {
        var objClone = Array.isArray(obj) ? [] : {}
        if (obj && typeof obj === 'object') {
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (obj[key] && typeof obj[key] === 'object') {
                objClone[key] = this.copyObject(obj[key])
              } else {
                objClone[key] = obj[key]
              }
            }
          }
        }
        return objClone
      },

			getParams: function() {
				const getF = (value) => {
					'f' + value
				}
				const judgeType = (value) => {
					const tryNum = Number(value)
					const regex = /\d{4}-\d{1,2}-\d{1,2}/
					if (typeof value === 'number' || !isNaN(tryNum)) { // value
						return 'value'
					} else if (regex.exec(value) !== null) {
						return 'time'
					} else {
						return 'category'
					}
				}
                this.newFilterList = []
                this.dataSettingList = []
                this.tableData = [{
                    field: '维度',
                  cascaderValue: [],
                  state: '匹配成功',
                }, {
                  field: '数值',
                  cascaderValue: [],
                  state: '匹配成功',
                }]
                this.newColList = []
				this.option = []
				const that = this
				if (this.$route.params.type === 'contract') {
					connectDatasource(this.$route.params.contractName, 'get', { offset: 0, count: 150 }).then((res) => {
						const result = JSON.parse(res.result)
						var headers = Object.keys(result.data[0])
						const file = {
							meta: {
								fileName: this.$route.params.contractName,
								fields: headers
							},
							data: headers.map((header, indexH) => {
								const type = judgeType(result.data[0][header])

								return {
									name: header,
									type: type,
									data: result.data.map((row) => {
										return row[header]
									})
								}
							})
						}
						that.uploadSuccess('contract', file, null)
					})
				} else if (this.$route.params.type === 'taskResult') {
					console.log(this.$route.params)
					var resultData = this.$route.params.resultData
					// this.task=true
					// var title=this.$route.params.title
					// var arr=[]
					// for(var i=0;i<title.length;i++){
					//     var obj={name:title[i].label,list:[]}
					//     for(var j=0;j<resultData.length;j++){
					//         obj.list.push(resultData[j][title[i].value])
					//     }
					//     arr.push(obj)
					// }
					// this.filesCsv=arr;
					const filePath = this.$route.params.filePath
					const fileName = filePath.substr(filePath.lastIndexOf('/') + 1)
					// let title = Object.keys(resultData[0])
					// const fileColumn = this.$route.params.title.map((v) => {
					// 	return v.label
					// })
					// let srcColumns = Object.keys(resultData[0])
					// let columnNum = resultData[0].length
					// let columnMap = {}
					// for (let fIndex in resultData[0]) {
					// 		const f = resultData[0][fIndex]
					// 		if (f.indexOf('DenseVector') > -1) {
					// 			let fArrayStr = f.substr(f.indexOf('(')+1, f.indexOf(')')-f.indexOf('(')-1)
					// 			let fArray = JSON.parse(fArrayStr)
					// 			columnNum = columnNum - 1 + fArray.length
					// 			columnMap[fIndex] = fArray.length
					// 		}

					// }
					const fileColumn = Object.keys(resultData[0]) // generateHeaders(columnNum)
					// let data = []
					// for(let row of resultData) {
					// 	let i = 0;
					// 	let rowTemp = {}
					// 	for (let fIndex in row) {
					// 		if(columnMap.hasOwnProperty(fIndex)) {
					// 			let fArrayStr = f.substr(f.indexOf('(')+1, f.indexOf(')')-f.indexOf('(')-1)
					// 			let fArray = JSON.parse(fArrayStr)
					// 			let len = columnMap[fIndex]
					// 			rowTemp[fileColumn[i]] = fArray[]
					// 		}
					// 		const f = row[fIndex]
					// 		if (f.indexOf('DenseVector') > -1) {

					// 			columnNum = columnNum - 1 + fArray.length
					// 		}
					// 	}
					// }

					const visFileColumnList = fileColumn.map((v) => {
						const colData = resultData.map((row) => {
							return row[v]
						})
						const column = {
							colData: colData,
							colName: v,
							type: judgeType(colData[0])
						}
						return column
					})

					const file = {
						visFileColumnList: visFileColumnList,
						visFileInfo: {
							fileColumn: fileColumn,
							fileName: fileName,
							filePath: filePath,
							fileType: 'csv'
						}
					}
					this.uploadSuccess('csv', [file], null)
					this.activeTab = '2'

					// console.log(this.$route.params.title)
				} else if (this.$route.query.singleid !== null && this.$route.query.singleid !== undefined) {
					const singleid = this.$route.query.singleid
					getSingleInfo(singleid).then(response => {
                    this.temp = JSON.parse(JSON.stringify(response.data))
                    console.log(this.temp)
                    const dataInfo = JSON.parse(this.temp.dataInfo)
                    const fileId = createRandomId()
                    // Vue.set(this.files, fileId, data_info);
                    this.activeTab = '2'
                    this.title = this.temp.visualizationName
                    const chartStyle = JSON.parse(this.temp.chartStyle)
                    this.type = chartStyle.chartType
                    this.option = chartStyle.chartOptions
                    this.geoProperties = chartStyle.chartGeoProperties

                    const dataOperation = JSON.parse(this.temp.dataOperation)
                    console.log('dataOperation')
                    console.log(dataOperation)
                    const tableData = [{
                      field: '维度',
                      cascaderValue: [],
                      state: '匹配成功',
                    }, {
                      field: '数值',
                      cascaderValue: [],
                      state: '匹配成功',
                    }]
                    const dataSettingList = []
                    const newFilterList = []
                    const newColList = []
                    dataOperation.forEach(item => {
                      if (item.dimensions) {
                        tableData[0].cascaderValue.push([fileId, item.id])
                      }
                      if (item.datas) {
                        tableData[1].cascaderValue.push([fileId, item.id])
                      }
                      if (item.operation !== '') {
                        const dataSettingItem = JSON.parse(item.operation)
                        dataSettingList.push({
                          columnId: item.id,
                          columnName: item.name,
                          columnType: item.type,
                          reName: dataSettingItem.reName,
                          custom: dataSettingItem.custom
                        })
                      }
                      if (item.filter !== '') {
                        const filter = JSON.parse(item.filter)
                        newFilterList.push({
                          fileId: fileId,
                          fileName: dataInfo.dataName,
                          columnId: item.id,
                          columnName: item.name,
                          columnType: item.type,
                          filterIndex: filter.filterIndex,
                          filterItem: filter.filterItem,
                          filterAll: filter.filterAll
                        })
                      }
                      if (item.isCreate) {
                        const newCol = JSON.parse(item.newCol)
                        newColList.push({
                          fileId: fileId,
                          fileName: dataInfo.dataName,
                          columnId: item.id,
                          columnName: item.name,
                          columnType: item.type,
                          formula: newCol.formula
                        })
                        delete dataInfo.dataUrl[item.id]
                      }
                    })
                    this.newFilterList = JSON.parse(JSON.stringify(newFilterList))
                    this.dataSettingList = JSON.parse(JSON.stringify(dataSettingList))
                    this.tableData = JSON.parse(JSON.stringify(tableData))
                    this.newColList = JSON.parse(JSON.stringify(newColList))
                    console.log('this.newColList')
                    console.log(this.newColList)
                    console.log(dataInfo.dataUrl)
                    Vue.set(this.files, fileId, {
                      fileInfo: {
                        fileName: dataInfo.dataName,
                        fileType: dataInfo.dataType
                      },
                      dataList: dataInfo.dataUrl
                    })
            // this.newFilterList = JSON.parse(JSON.stringify(newFilterList))

            // let chart_style = JSON.parse(this.temp.chartStyle)
            // console.log(chart_style)
            // this.geoProperties = chart_style.chartGeoProperties
            // this.option = chart_style.chartOptions
            // this.type = chart_style.chartType
            //
            // let data_operation = JSON.parse(this.temp.dataOperation)
            // this.tableData = data_operation.tableData
            // this.newColList = data_operation.newColList
            // this.newFilterList = data_operation.newFilterList
            // this.dataSettingList = data.dataSettingList

						// let visFileColumnList = [];
						// let visFileInfo = data.data.visFileInfoVOList[0].visFileInfo;
						// let visChartInfo = data.data.visChartInfo;
						// // this.temp.xAxisName = JSON.parse(data.data.visChartDatasource.xAxisName);
						// // this.temp.yAxisName = JSON.parse(data.data.visChartDatasource.yAxisName);
						// // this.temp.zAxisName = JSON.parse(data.data.visChartDatasource.zAxisName);
						// // this.temp.dataname = visFileInfo.fileName;
						// this.activeTab = "2";
						// this.type = visChartInfo.chartType;
						// this.dataFromRouter = true;
						// this.title = visChartInfo.chartName;
						// if (visChartInfo.hasOwnProperty('option'))
						// 	this.option = JSON.parse(visChartInfo.option);
            //
            //
						// data.data.visFileInfoVOList[0].visFileColumnList.forEach((v) => {
						// 	let tmpV = {
						// 		colData: v.colData.split(","),
						// 		colName: v.colName
						// 	};
						// 	let regex = /\d{4}-\d{1,2}-\d{1,2}/;
						// 	let regex1 = /\d+\.?\d+|\d+/;
						// 	let datatype = "time";
						// 	if (regex.exec(v.colData[0]) === null) {
						// 		datatype = "value";
						// 		if (regex1.exec(v.colData[0]) === null) {
						// 			datatype = "category";
						// 		}
						// 	}
						// 	tmpV.type = datatype;
						// 	visFileColumnList.push(tmpV);
						// });
						// visFileInfo.fileColumn = visFileInfo.fileColumn.split(",");
						// data.data.visFileInfoVOList[0].visFileColumnList = visFileColumnList;
						// if (data.code == "10000") {
						// 	let type = "csv";
						// 	if (data.data.visFileInfoVOList.length != 0) {
						// 		if (data.data.visFileInfoVOList[0].visFileInfo.fileType == "txt")
						// 			type = "txt";
						// 		else if (data.data.visFileInfoVOList[0].visFileInfo.fileType == "csv")
						// 			type = "csv";
						// 	}
						// 	this.uploadSuccess(type, data.data.visFileInfoVOList, null);
						// }
					})
				}
			},

			// 数据更新
			// 添加新的一列
			newColFile: function(data, newColList) {
				this.files = data
				this.newColList = newColList
			},
			updateFilesTemp: function(filesTemp, newFilterList) {
        // console.log('updateFilesTemp')
				this.filesTemp = filesTemp
				this.newFilterList = newFilterList
			},
			setOption: function() {
				this.$refs.myEchart.initChart()
			},
			updateOption: function(noption) {
				this.option = noption
			},
			updateFiles: function(fileList1) {
				this.files = fileList1// fileList处理的结果，最终是要根据选项更新到xyzAxis中去。
			},
      updateGeo: function(geo) {
			  // console.log("single in change");
        // console.log(geo);
			  this.geoProperties = geo
      },
			dataSettingSuccess(data, reName) {
				this.xAxis = data.xData
				this.yAxis = data.yData
				this.zAxis = data.zData
        this.dataSettingList = reName
			},

			// 辅助函数
			uploadSuccess(type, file, databaseInfo) {
				if (type == 'csv') {
					this.filesCsv.push(file[0])

					// this.temp.fileType = "csv";
					this.csv = true
					// this.temp.dataname = file[0].visFileInfo.fileName;

					const fileId = createRandomId()
					const dataList = {}
					for (const column of file[0].visFileColumnList) {
						const columnId = createRandomId()

						if (column.type == 'value') {
							column.colData = column.colData.map(Number)
						}

						dataList[columnId] = {
							name: column.colName,
							list: column.colData,
							type: column.type
						}
					}

					Vue.set(this.files, fileId, {
            fileInfo: JSON.parse(JSON.stringify(file[0].visFileInfo)),
						dataList: dataList
					})
					console.log('this.files')
					console.log(this.files)
				} else if (type == 'txt') {
					this.filesCsv.push(file[0])
					// this.temp.fileType = "txt";
					this.txt = true
					// this.temp.dataname = file[0].visFileInfo.fileName;
					const fileId = createRandomId()

					const dataList = {}
					for (const column of file[0].visFileColumnList) {
						const columnId = createRandomId()
						// 数据转换

						if (column.type == 'value') {
							column.colData = column.colData.map(Number)
						}

						dataList[columnId] = {
							name: column.colName,
							list: column.colData,
							type: column.type,
						}
					}

					Vue.set(this.files, fileId, {
            fileInfo: JSON.parse(JSON.stringify(file[0].visFileInfo)),
						dataList: dataList
					})
				} else if (type == 'sql') {
					this.mysqlTable = file
					this.mysqlLink = true
					// this.temp.fileType = "mysql";
					// this.temp.datapath = "mysql";
					// this.temp.databaseId = databaseInfo.databaseId;
					// this.temp.tableName = databaseInfo.tableName;
					// this.temp.dataname = databaseInfo.tableName;
					const fileId = createRandomId()
					const dataList = {}
					for (const column of file) {
						const columnId = createRandomId()
						// 数据转换

						if (column.type == 'value') {
							column.colData = column.colData.map(Number)
						}

						dataList[columnId] = {
							name: column.colName,
							list: column.colData,
							type: column.type,
						}
					}
					Vue.set(this.files, fileId, {
						fileName: databaseInfo.tableName,
						// fileName: this.filesCsv[0].visFileInfo.fileName,
						dataList: dataList
					})
				} else if (type === 'contract') {
					this.filesCsv.push(file)
					// this.temp.fileType = "txt";
					this.txt = true
					// this.temp.dataname = file[0].visFileInfo.fileName;
					const fileId = createRandomId()

					const dataList = {}
					for (const column of file.data) {
						const columnId = createRandomId()
						// 数据转换

						if (column.type === 'value') {
							column.data = column.data.map(Number)
						}

						dataList[columnId] = {
							name: column.name,
							list: column.data,
							type: column.type,
						}
					}

					Vue.set(this.files, fileId, {
            			fileInfo: {
							fileName: file.meta.fileName,
							fileType: 'contract'
						},
						dataList: dataList
					})
				} else {
					alert('上传失败')
				}
				// console.log('this.files');
				// console.log(this.files);
			},

			// 删除维度
			handleDeleteDim(index) {
				this.xAxis.splice(index, 1)
			},
			// 删除数值
			handleDeleteValue(index) {
				this.yAxis.splice(index, 1)
			},
			handleDeleteValueY(index) {
				this.zAxis.splice(index, 1)
			},
			// 删除筛选器
			handleDeleteFilter(index) {
				if (this.filterlist[index].type == '数值') { this.dataFilterDialogVisible = false } else { this.characterFilterDialogVisible = false }
				this.filterlist.splice(index, 1)
			},

			// 侧边栏收起展开
			leftsideHide() {
				if (this.rightside) { this.centerClass = 'centerMainLeft' } else { this.centerClass = 'centerMainBoth' }
				if (this.xAxis.length != 0 || this.yAxis.length != 0) {
					this.leftside = false
					this.leftsideLeft = false
					this.leftsideRight = true
					this.sideHide = true
				} else {
					this.leftside = false
					this.leftsideLeft = false
					this.leftsideRight = true
				}
				this.$refs.myEchart.resize()
			},
			leftsideShow() {
				if (this.rightside) { this.centerClass = 'centerMain' } else { this.centerClass = 'centerMainRight' }
				if (this.xAxis.length != 0 || this.yAxis.length != 0) {
					this.leftside = true
					this.leftsideLeft = true
					this.leftsideRight = false
					this.sideShow = true
				} else {
					this.leftside = true
					this.leftsideLeft = true
					this.leftsideRight = false
				}
				this.$refs.myEchart.resize()
			},
			rightsideHide() {
				if (this.leftside) { this.centerClass = 'centerMainRight' } else { this.centerClass = 'centerMainBoth' }
				if (this.xAxis.length != 0 || this.yAxis.length != 0) {
					this.rightside = false
					this.rightsideLeft = true
					this.rightsideRight = false
					this.sideHide = true
				} else {
					this.rightside = false
					this.rightsideLeft = true
					this.rightsideRight = false
				}
				this.$refs.myEchart.resize()
			},
			rightsideShow() {
				if (this.leftside) { this.centerClass = 'centerMain' } else { this.centerClass = 'centerMainLeft' }
				if (this.xAxis.length != 0 || this.yAxis.length != 0) {
					this.rightside = true
					this.rightsideLeft = false
					this.rightsideRight = true
					this.sideShow = true
				} else {
					this.rightside = true
					this.rightsideLeft = false
					this.rightsideRight = true
				}
				this.$refs.myEchart.resize()
			},
			// 收起展开时，echarts重绘
			redrawChart() {
				this.$refs.myEchart.initChart('preInit')
			},

			// 判断能否画图
			drawIsDisabled: function() {
				if (this.xAxis.length == 0 && this.yAxis.length == 0) { // 初始化
					this.echartView = true
					this.tableView = false
				}

				let changeTypeToTable = false

				if ((this.xAxis.length == 1) && this.yAxis.length >= 1) { // 折线图
					this.lineDisabled = false
				} else {
					this.lineDisabled = true
					changeTypeToTable |= this.type === 'line'
				}

				if ((this.xAxis.length == 1) && this.yAxis.length >= 1) { // 柱状图
					this.barDisabled = false
				} else {
					this.barDisabled = true
					changeTypeToTable |= this.type === 'bar'
				}

				if ((this.xAxis.length == 1 && this.yAxis.length == 2 && this.zAxis.length == 0) || (this.xAxis.length == 1 && this.yAxis.length == 1 && this.zAxis.length == 1)) {
					this.scatterDisabled = false // 散点图
				} else {
					this.scatterDisabled = true
					changeTypeToTable |= this.type === 'scatter'
				}

				if (this.xAxis.length == 1 && this.yAxis.length >= 1) { // 雷达图
					this.radarDisabled = false
				} else {
					this.radarDisabled = true
					changeTypeToTable |= this.type === 'radar'
				}

				if (this.xAxis.length == 1 && this.yAxis.length == 1 && this.zAxis.length == 0) {
					this.funnelDisabled = false // 漏斗图
				} else {
					this.funnelDisabled = true
					changeTypeToTable |= this.type === 'funnel'
				}

				if (this.xAxis.length == 1 && this.yAxis.length == 1 && this.zAxis.length == 0) {
					this.pieDisabled = false // 饼图
				} else {
					this.pieDisabled = true
					changeTypeToTable |= this.type === 'pie'
				}

				if (this.xAxis.length == 1 && this.yAxis.length == 1 && this.zAxis.length == 0) {
					this.nandingDisabled = false // 南丁图
				} else {
					this.nandingDisabled = true
					changeTypeToTable |= this.type === 'nanding'
				}
				if (this.xAxis.length == 0 && this.yAxis.length == 1 && this.zAxis.length == 0) {
					this.gaugeDisabled = false // 仪表图
				} else {
					this.gaugeDisabled = true
					changeTypeToTable |= this.type === 'gauge'
				}

				if ((this.xAxis.length >= 2 && this.xAxis.length <= 20) && this.yAxis.length == 1 && this.zAxis.length == 0) { // 桑基图
					this.sankeyDisabled = false
				} else {
					this.sankeyDisabled = true
					changeTypeToTable |= this.type === 'sankey'
				}

				// if((this.xAxis.length==1||this.xAxis.length==2) && this.yAxis.length==1 && this.zAxis.length==0){
				if (this.xAxis.length == 0 && this.yAxis.length >= 1) {
					this.boxplotDisabled = false // 箱线图
				} else {
					this.boxplotDisabled = true
					changeTypeToTable |= this.type === 'boxplot'
				}

				if (this.xAxis.length > 1 && this.yAxis.length == 1 && this.zAxis.length == 0) {
					this.sunburstDisabled = false // 旭日图
				} else {
					this.sunburstDisabled = true
					changeTypeToTable |= this.type === 'sunburst'
				}

				if (this.xAxis.length > 1 && this.yAxis.length == 1 && this.zAxis.length == 0) {
					this.treemapDisabled = false // 矩形树图
				} else {
					this.treemapDisabled = true
					changeTypeToTable |= this.type === 'treemap'
				}

				if (this.xAxis.length == 2 && this.yAxis.length == 1 && this.zAxis.length == 0) {
					this.heatmapDisabled = false // 热力图
				} else {
					this.heatmapDisabled = true
					changeTypeToTable |= this.type === 'heatmap'
				}

				if (this.xAxis.length == 1 && this.yAxis.length >= 1) { // 折线面积图
					this.lineAreaDisabled = false
				} else {
					this.lineAreaDisabled = true
					changeTypeToTable |= this.type === 'lineArea'
				}

				if (this.xAxis.length == 1 && this.yAxis.length >= 1) { // 折线柱状图
					this.lineBarDisabled = false
				} else {
					this.lineBarDisabled = true
					changeTypeToTable |= this.type === 'lineBar'
				}

				if (this.xAxis.length === 4 && this.yAxis.length === 1 && this.zAxis.length === 0) // 甘特图
				{
					let disabled = false
					for (const x of this.xAxis) {
						if (x.type !== 'time') {
							disabled = true
						}
					}
					if (!disabled) {
						this.gantteDisabled = false
					} else {
						this.gantteDisabled = true
						changeTypeToTable |= this.type === 'gantte'
					}
				} else {
					this.gantteDisabled = true
				}
				if (this.xAxis.length == 1 && this.yAxis.length >= 1) {
					this.bubbleDisabled = false // 气泡图
				} else {
					this.bubbleDisabled = true
					changeTypeToTable |= this.type === 'bubble'
				}

				if (this.xAxis.length == 1 && this.yAxis.length >= 1) { // 靶心图
					this.blankDisabled = false
				} else {
					this.blankDisabled = true
					changeTypeToTable |= this.type === 'blank'
				}

				if (this.xAxis.length >= 1 && this.yAxis.length == 0 && this.zAxis.length == 0) { // 平行坐标图
					this.parallelDisabled = false
				} else {
					this.parallelDisabled = true
					changeTypeToTable |= this.type === 'parallel'
				}

				if (this.xAxis.length == 1 && this.yAxis.length == 1 && this.zAxis.length == 0) { // 象形柱图
					this.pictorialBarDisabled = false
				} else {
					this.pictorialBarDisabled = true
					changeTypeToTable |= this.type === 'pictorialBar'
				}

				if (this.xAxis.length === 2 && this.yAxis.length === 1 && this.zAxis.length === 0 && this.xAxis[0].type == 'time') { // 主题河流图
					this.themeRiverDisabled = false
				} else {
					this.themeRiverDisabled = true
					changeTypeToTable |= this.type === 'themeRiver'
				}

				if (this.xAxis.length == 1 && this.yAxis.length == 1 && this.zAxis.length == 0 && this.xAxis[0].type == 'time') { // 日历图
					this.calendarDisabled = false
				} else {
					this.calendarDisabled = true
					changeTypeToTable |= this.type === 'calendar'
				}

				if (this.xAxis.length == 0 && this.yAxis.length == 1 && this.zAxis.length == 0) { // 水球图
					this.liquidfillDisabled = false
				} else {
					this.liquidfillDisabled = true
					changeTypeToTable |= this.type === 'liquidfill'
				}

				if (this.xAxis.length == 1 && this.yAxis.length >= 1) { // 柱状堆叠图
					this.stackedBarDisabled = false
				} else {
					this.stackedBarDisabled = true
					changeTypeToTable |= this.type === 'stackedBar'
				}

        if ((this.xAxis.length === 1 || this.xAxis.length === 2) && this.yAxis.length === 1) { // 中国地图
          this.chinaDisabled = false
          if (this.xAxis.length === 1) {
            this.geoProperties.type = 0
          } else {
            this.geoProperties.type = 3
          }
        } else {
          this.chinaDisabled = true
          changeTypeToTable |= this.type === 'chinaMap'
        }

				if (this.xAxis.length >= 0 && this.yAxis.length >= 0) { // 表格，跟其他不一样
					this.tableDisabled = false
				} else {
					this.tableDisabled = true
				}

				if (changeTypeToTable) {
					this.type = 'table'
				}
			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done()
					})
					.catch(_ => {
					})
			},
			open() {
				this.timer = this.hour * 60 * 60 * 1000 + this.minute * 60 * 1000 + this.second * 1000
				if (this.timer != 0) {
					this.$alert('您设置的定时刷新时间是 ' + this.timer + ' 毫秒', '定时器信息', {
						confirmButtonText: '确定',
						callback: action => {
							this.$message({
								type: 'info',
								message: `action: ${action}`
							})
						}
					})
				} else {
					this.$alert('您输入的时间有误，请重新输入', '定时器信息', {
						confirmButtonText: '确定',
						callback: action => {
							this.$message({
								type: 'info',
								message: `action: ${action}`
							})
						}
					})
				}
			},
      resetTemp() {
        this.temp = {
          createBy: '',
          updateBy: '',
          createDate: '',
          updateDate: '',
          remarks: '',
          visualizationName: '',
          chartStyle: '',
          dataInfo: '',
          dataOperation: ''
        }
      },
			// 保存单图
			saveFile() {
				if (this.title != null) {
          // 获取用户ID
          getUserInfo().then(response => {
            if (this.$route.query.singleid === null || this.$route.query.singleid === undefined) {
              this.temp.createBy = response.data.data.id
            }
            this.temp.updateBy = response.data.data.id
          })
          if (this.$route.query.singleid === null || this.$route.query.singleid === undefined) {
            this.temp.createDate = JSON.stringify(new Date().getTime())
          }
          this.temp.updateDate = JSON.stringify(new Date().getTime())
          this.temp.visualizationName = this.title
          const chart_style = {
            chartType: this.type,
            chartOptions: this.option,
            chartGeoProperties: this.geoProperties
          }
          this.temp.chartStyle = JSON.stringify(chart_style)

          // console.log(this.files)
          // console.log(this.filesCsv)
          let fileId = ''
          if (this.tableData[0].cascaderValue.length > 0) {
            fileId = this.tableData[0].cascaderValue[0][0]
          } else if (this.tableData[1].cascaderValue.length > 0) {
            fileId = this.tableData[1].cascaderValue[0][0]
          }
          if (fileId !== '') {
            const data_info = {
              dataType: this.files[fileId].fileInfo.fileType,
              dataUrl: this.files[fileId].dataList,
              dataName: this.files[fileId].fileInfo.fileName
            }
            this.temp.dataInfo = JSON.stringify(data_info)
            // console.log('files')
            // console.log(this.files)
            // console.log('data_info')
            // console.log(data_info)
            console.log('this.newColList')
            console.log(this.newColList)
            console.log('this.newFilterList')
            console.log(this.newFilterList)
            console.log('this.dataSettingList')
            console.log(this.dataSettingList)
            console.log('this.tableData')
            console.log(this.tableData)

            // downloadFile(this.files[fileId].fileInfo.filePath).then(response => {
            //     const data = response.data;
            //     console.log(response)
            // });

            // let data_operation = {
            //   dataTable: this.tableData,
            //   newColList: this.newColList,
            //   newFilterList: this.newFilterList,
            //   dataSettingList: this.dataSettingList
            // }

            const data_operation = []
            for (const colId in this.files[fileId].dataList) {
              const operationItem = {}
              operationItem.id = colId
              operationItem.name = this.files[fileId].dataList[colId].name
              operationItem.type = this.files[fileId].dataList[colId].type
              operationItem.dimensions = false
              operationItem.datas = false
              operationItem.isCreate = false
              operationItem.filter = ''
              operationItem.operation = ''
              operationItem.newCol = ''
              this.tableData[0].cascaderValue.forEach(item => {
                if (item[1] === colId) {
                  operationItem.dimensions = true
                }
              })
              this.tableData[1].cascaderValue.forEach(item => {
                if (item[1] === colId) {
                  operationItem.datas = true
                }
              })
              this.newFilterList.forEach(item => {
                if (item.fileId === fileId && item.columnId === colId) {
                  console.log(colId, 'filter')
                  operationItem.filter = JSON.stringify({
                    filterAll: item.filterAll,
                    filterIndex: item.filterIndex,
                    filterItem: item.filterItem
                  })
                }
              })
              this.dataSettingList.forEach(item => {
                if (item.columnId === colId) {
                  console.log(colId, 'dataSetting')
                  operationItem.operation = JSON.stringify({
                    custom: item.custom,
                    reName: item.reName
                  })
                }
              })
              // console.log(operationItem)
              data_operation.push(operationItem)
            }
            this.newColList.forEach(colItem => {
              if (colItem.fileId === fileId) {
                const operationItem = {}
                operationItem.id = colItem.columnId
                operationItem.name = colItem.columnName
                operationItem.type = colItem.columnType
                operationItem.dimensions = false
                operationItem.datas = false
                operationItem.isCreate = true
                operationItem.filter = ''
                operationItem.operation = ''
                this.tableData[0].cascaderValue.forEach(item => {
                  if (item[1] === colItem.columnId) {
                    operationItem.dimensions = true
                  }
                })
                this.tableData[1].cascaderValue.forEach(item => {
                  if (item[1] === colItem.columnId) {
                    operationItem.datas = true
                  }
                })
                operationItem.newCol = JSON.stringify({
                  formula: colItem.formula
                })
                this.newFilterList.forEach(item => {
                  if (item.fileId === fileId && item.columnId === colItem.columnId) {
                    console.log(colItem.columnId, 'filter')
                    operationItem.filter = JSON.stringify({
                      filterAll: item.filterAll,
                      filterIndex: item.filterIndex,
                      filterItem: item.filterItem
                    })
                  }
                })
                this.dataSettingList.forEach(item => {
                  if (item.columnId === colItem.columnId) {
                    console.log(colItem.columnId, 'dataSetting')
                    operationItem.operation = JSON.stringify({
                      custom: item.custom,
                      reName: item.reName
                    })
                  }
                })
                // console.log(operationItem)
                data_operation.push(operationItem)
              }
            })
            // console.log('data_operation')
            // console.log(data_operation)
            this.temp.dataOperation = JSON.stringify(data_operation)
            console.log('this.temp')
            console.log(this.temp)
            if (this.$route.query.singleid === null || this.$route.query.singleid === undefined) {
              createSingleVis(this.temp).then(response => {
                console.log(response)
                this.$router.push({ path: '/visualization/my_vis' })
              })
            } else {
              this.temp.id = this.$route.query.singleid
              updateSingle(this.temp).then(response => {
                console.log(response)
                this.$router.push({
                  path: '/visualization/my_vis',
                  query: { singleid: null }
                })
              })
            }
          } else {
            this.$notify({
              title: '错误',
              message: '请选择文件',
              type: 'error'
            })
            this.resetTemp()
          }
          // this.setTimer();
			// 		var xAxisName = [];
			// 		var yAxisName = [];
			// 		var zAxisName = [];
			// 		for (var i = 0; i < this.xAxis.length; i++) {
			// 			xAxisName.push(this.xAxis[i].name);
			// 		}
			// 		for (let i = 0; i < this.yAxis.length; i++) {
			// 			yAxisName.push(this.yAxis[i].name);
			// 		}
			// 		if (this.zAxis != null) {
			// 			for (var i = 0; i < this.zAxis.length; i++) {
			// 				zAxisName.push(this.zAxis[i].name);
			// 			}
			// 		}
			// 		this.temp.name = this.title;
			// 		this.temp.filesCsv = this.filesCsv; //txt数据集和csv数据的合集
			// 		// this.temp.filesTxt=this.filesTxt  //文件路径数组
			// 		// this.temp.dataname=this.dataset
			// 		// this.temp.datapath=this.filepath
			// 		this.temp.type = this.type;
			// 		this.temp.xAxis = JSON.stringify(this.xAxis);
			// 		this.temp.yAxis = JSON.stringify(this.yAxis);
			// 		this.temp.zAxis = JSON.stringify(this.zAxis);
			// 		this.temp.timer = this.timer;
			// 		this.temp.xAxisNum = this.xAxis.length;
			// 		this.temp.yAxisNum = this.yAxis.length;
			// 		this.temp.zAxisNum = this.zAxis.length;
			// 		this.temp.filters = this.filters;  //筛选器
			// 		this.temp.xAxisName = JSON.stringify(xAxisName);
			// 		this.temp.yAxisName = JSON.stringify(yAxisName);
			// 		this.temp.zAxisName = JSON.stringify(zAxisName);
			// 		//copy option and reset series
			// let optionTemp = JSON.parse(JSON.stringify(this.option));
			// // console.log(optionTemp["series"]);
      //
			// optionTemp["series"].forEach((v) => {
			// 	v.data = [];
			// });
      //
      //       this.temp.option = JSON.stringify(optionTemp);
      //       console.log('save')
      //       console.log('this.temp')
      //       console.log(this.temp)
      //
			// 		createSingleVis(this.temp).then(response => {
			// 			const data = response.data;
			// 			if (data.code == "10000") {
			// 				// console.log("保存")
			// 				// console.log(this.temp)
			// 				this.$router.push({path: "/visualization/my_vis"});
			// 			}
			// 		});
				} else {
          this.$notify({
            title: '错误',
            message: '请输入图表名称',
            type: 'error'
          })
					// this.title="请输入单图名称"
				}
			},

			// 设置定时器
			setTimer: function() {
				var timer = 1000
				this.timer = this.hour * 60 * 60 * 1000 + this.minute * 60 * 1000 + this.second * 1000
			},

			addOptionForCascaderSelection: function(cascaderValue, option) {
				const copy = cascaderValue.map((v) => v)
				copy.push(option)
				return copy
			},

			drag: function(event) {
				dom = event.currentTarget
			},
			drop: function(event) {
				event.preventDefault()
				event.target.appendChild(dom)
			},
			allowDrop: function(event) {
				event.preventDefault()
			},

			// 查看数据响应结果
			readDataResponseResults() {
				this.dataRseponseResultsDialog = true
				// console.log(this.dataRseponseResults)
				// console.log(this.dataSourceClass)
				// 数据转换为对象
				// for(let i=0;i<this.dataRseponseResults.length;i++){
				//   console.log(this.dataRseponseResults[i])
				//   // textarea+=this.dataRseponseResults[i];
				// }
				if (this.dataRseponseResults === '') {
					this.textarea = '请上传或选择数据'
				} else {
					var indent = '    '
					let textarea = JSON.stringify(this.dataRseponseResults)
					textarea = textarea.replace(/\[/i, '[\n' + indent)
					textarea = textarea.replace(/\{/g, '{\n' + indent + indent)
					textarea = textarea.replace(/\"\,/g, '",\n' + indent + indent)
					textarea = textarea.replace(/\}\,/g, '},\n' + indent)
					textarea = textarea.replace(/\]/i, '\n]')
					textarea = textarea.replace(/\}/g, '\n' + indent + '}')
					this.textarea = textarea
					// console.log(this.textarea)
				}
			},
			showData(data) {
				// this.dataRseponseResults=data[0];
				// for(let mapOption of data[1]){
				//     this.mapOptions.push({
				//         label:mapOption,
				//         value:mapOption,
				//     })
				//     //数据转换
				//     let datalist=[];
				//     for(let i in data[0]){
				//         datalist.push(data[0][i][mapOption]);
				//     }
				//     this.dataList.push({
				//         name:mapOption,
				//         list:datalist,
				//     });
				// }
			}

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  /*<style lang="scss">*/
  /*@import '../../_variables.scss';*/
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #FFF;
    color: #333;
    text-align: center;
    line-height: 20px;
  }

  .el-main {
    background-color: rgb(238, 241, 246);
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-row {
    margin-bottom: 20px;
    float: left;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .board {
    width: 310px;
    margin-left: 0px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
  }

  .kanban {
    &.todo {
      .board-column-header {
        background: #4A9FF9;
      }
    }

    &.working {
      .board-column-header {
        background: #f9944a;
      }
    }

    &.done {
      .board-column-header {
        background: #2ac06d;
      }

    }
  }

  .spHeight td {
    height: 35px;
  }

  .leftBar {
    /*position: absolute;*/
    top: 120px;
    left: 220px;
    /*box-shadow: 0 0 2px #AAA;*/
  }

  .centerMain {
    margin-top: 30px;
    width: calc(100% - 680px);
    background-color: #F2F6FC;
    border-radius: 20px 20px 20px 20px;
    overflow: hidden;
  }

  .centerMainLeft {
    margin-top: 30px;
    width: calc(100% - 440px);
    background-color: #F2F6FC;
    border-radius: 20px 20px 20px 20px;
    overflow: auto
  }

  .centerMainRight {
    margin-top: 30px;
    width: calc(100% - 310px);
    background-color: #F2F6FC;
    border-radius: 20px 20px 20px 20px;
    overflow: auto
  }

  .centerMainBoth {
    margin-top: 30px;
    width: 100%;
    background-color: #F2F6FC;
    border-radius: 20px 20px 20px 20px;
    overflow: auto
  }

  .rightSide {
    position: absolute;
    top: 70px;
    right: 250px;
    /*box-shadow: 0 0 2px #AAA;*/
  }

  .rightBar {
    position: absolute;
    overflow-y: scroll;
    /*face-color：#AAA;*/
    top: 100px;
    right: 30px;
    /*box-shadow: 0 0 2px #AAA;*/
  }

  .el-table th, .el-table tr, .el-table td {
    border: 0;
    background-color: #fff
    /*background-color: #0D437D;*/
  }

  .centerSelect {
    width: 200px;
    margin-left: auto;
    margin-right: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .uploadFile {
    float: right;
    margin-top: 12px; //10px
    margin-bottom: 10px;
  }

  .centerButton {
    width: 180px;
    height: 35px;
    margin-left: auto;
    margin-right: auto;
  }

  .infor {
    font-size: 14px;
    font-weight: normal;
    margin-right: 10px;
  }

  .info_div {
    width: 100%;
    margin: 20px auto 10px auto;
    text-align: center;
  }

  .info_div button {
    width: 30%;
  }
</style>
