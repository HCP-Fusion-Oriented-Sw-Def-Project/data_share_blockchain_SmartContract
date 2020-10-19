<template>
  <div>
    <ul>
      <li>
        <!-- 选择组件 -->
        <el-form-item label="垂直对齐方式">
          <el-select v-model="setting.labelForm.textStyle.verticalAlign" size="mini" @change="setOption">
            <el-option
              v-for="item in setting.labelForm.textStyle.verticalAlignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </li>

      <li>
        <el-form-item label="空值数据">
          <el-checkbox v-model="setting.styleForm.null" size="small" @change="setOption">
          </el-checkbox>
        </el-form-item>
      </li>

      <li>
        <!-- 数字输入组件 -->
        <el-form-item label="字号" size="mini">
          <el-input-number v-model="setting.labelForm.textStyle.fontSize" controls-position="right" :min="0" :max="50" size="mini" @change="setOption" @blur="setOption"></el-input-number>
        </el-form-item>
      </li>

      <li>
        <el-form-item label="标题名" >
          <el-input v-model="setting.titleForm.name" placeholder="请输入标题名" size="mini" @blur="setOption"></el-input>
        </el-form-item>
      </li>
      <li>
        <!-- 复选框  -->
        <el-form-item label="颜色" size="mini">
          <el-color-picker v-model="setting.labelForm.textStyle.color" size="mini" @change="setOption"></el-color-picker>
        </el-form-item>

      </li>
      <li>

        <el-form-item  label="外半径" size="mini">
          <div style="margin-top: 20px"></div>
          <el-slider v-model="setting.polarAxisForm.outerRadius" :min='0' :max='100' show-input :step="10" input-size="mini" @change="setOption" @input="setOption">
          </el-slider>
        </el-form-item>

      </li>
      <li>
        <!-- 颜色选择器 -->
        <el-color-picker v-model="temp" size="mini" @change="setOption"></el-color-picker>

      </li>
      <li>
        <!-- form -->
        <el-form ref="styleForm" :model="setting.styleForm" :inline="true" size="mini">
          <!-- form item -->
          <el-form-item label="边距"> </el-form-item>
        </el-form>
      </li>
      <li>
        <!-- collapse -->
        <el-collapse v-model="setting.activeCol" accordion>
          <!-- collapse-item -->
          <el-collapse-item title="全局样式  Style" name="1"> </el-collapse-item>
        </el-collapse>
      </li>
    </ul>










  </div>
</template>

<script>
    export default {
        name: "ChartSettingGenerator",
        props: [ 'option' ],
        data() {
            return {
                //右侧tab
                temp: undefined,
                setting: {
                    activeTab: "1",
                    activeTabX: "1",
                    activeTabY: "1",
                    activeCol: "1",
                    activeTabLegend: "1",
                    fonts: [{
                        value: 'Microsoft YaHei',
                        label: 'Microsoft YaHei'
                    }, {
                        value: 'sans-serif',
                        label: 'sans-serif'
                    }, {
                        value: 'serif',
                        label: 'serif'
                    }, {
                        value: 'monospace',
                        label: 'monospace'
                    }, {
                        value: 'Arial',
                        label: 'Arial'
                    }],
                    fontWeight: [{
                        value: 'normal',
                        label: 'normal'
                    }, {
                        value: 'lighter',
                        label: 'lighter'
                    }, {
                        value: 'bold',
                        label: 'bold'
                    }, {
                        value: 'bolder',
                        label: 'bolder'
                    }],
                    rotates: [{
                        value: 0,
                        label: '水平'
                    }, {
                        value: 45,
                        label: '斜角'
                    }, {
                        value: 90,
                        label: '垂直'
                    }],
                    styleForm: {
                        font: 'Microsoft YaHei',
                        margin_top: '0',
                        margin_bottom: '0',
                        margin_left: '0',
                        margin_right: '0',
                        null: false,
                        showLoading: '2000'
                    },
                    titleForm: {
                        name: "",
                        fontSize: "18",
                        color: "#000",
                        fontWeight: "normal"
                    },
                    xAxisForm: {
                        fontSize: "20",
                        color: "#000",
                        fontWeight: "normal",
                        boundaryGapCheck: false,
                        boundaryGap: 0,
                        max: null,
                        min: null,
                        offset: 0,
                        rotate: 0,
                        axisColor: "#333",
                        gridColor: "#ccc"
                    },
                    yAxisForm: {
                        fontSize: "20",
                        color: "#000",
                        fontWeight: "normal",
                        boundaryGapCheck: false,
                        boundaryGap: 0,
                        max: null,
                        min: null,
                        offset: 0,
                        rotate: 0,
                        axisColor: "#333",
                        gridColor: "#ccc"
                    },
                    legendForm: {
                        text: {
                            fontSize: "12",
                            color: "#000",
                            fontWeight: "normal"
                        },
                        layout: {
                            margin_lr: "8",
                            margin_tb: "0",
                            location: "底部居中"
                        },
                        locations: [{
                            value: 'top',
                            label: '顶部居中'
                        },
                            // {
                            //   value: '选项2',
                            //   label: '顶部局左'
                            // }, {
                            //   value: '选项3',
                            //   label: '顶部居右'
                            // },
                            {
                                value: 'bottom',
                                label: '底部居中'
                                // }, {
                                //   value: '选项5',
                                //   label: '底部居左'
                                // }, {
                                //   value: '选项6',
                                //   label: '底部居右'
                            }],
                    },
                    tooltipForm: {
                        triggers: [{
                            value: 'item',
                            label: '数据项'
                        }, {
                            value: 'axis',
                            label: '坐标轴'
                        }],
                        triggerOns: [{
                            value: 'mousemove',
                            label: '悬浮'
                        }, {
                            value: 'click',
                            label: '点击'
                        }],
                        trigger: 'axis',
                        triggerOn: 'mousemove',
                        hideDelay: 100,
                        background: {
                            color: 'rgba(50,50,50,0.7)',
                            // width:,
                            // height:,
                            padding: 5,
                            borderColor: '#333',
                            borderWidth: 0,
                        },
                        text: {
                            font: 'sans-serif',
                            fontSize: 14,
                            color: '#fff',
                            fontWeight: 'normal'
                        }
                    }
                },
                components: {
                    select: function (vmodel, options) {
                        return " <el-select v-model=\"" + vmodel +
                            "\" size=\"mini\" @change=\"setOption\">\n" +
                            "      <el-option\n" +
                            "        v-for=\"item in "+ options +
                            "\"       :key=\"item.value\"\n" +
                            "        :label=\"item.label\"\n" +
                            "        :value=\"item.value\">\n" +
                            "      </el-option>\n" +
                            "    </el-select>"
                    },
                    numberInput: function (vmodel) {
                        return "<el-input-number v-model=\"" + vmodel + "\" controls-position=\"right\" :max=\"50\" size=\"mini\" @change=\"setOption\" @blur=\"setOption\"></el-input-number>"
                    },
                    input: function (vmodel) {
                        return " <el-input v-model=\"" + vmodel + "\" placeholder=\"请输入标题名\" size=\"mini\" @blur=\"setOption\"></el-input>"
                    },
                    checkbox: function (vmodel) {
                        return "<el-checkbox v-model=\"" + vmodel + "\" size=\"small\" @change=\"setOption\"></el-checkbox>"
                    },
                    colorPicker: function (vmodel) {
                        return "<el-color-picker v-model=\"" + vmodel + "\" size=\"mini\" @change=\"setOption\"></el-color-picker>"
                    },
                    form: function (ref, model, child) {
                        let res = '';
                        for (let i=0; i<child.length; ++i) {
                            res+=this.formItem(child[i]);
                        }
                        return "<el-form ref=\"" + ref + "\" :model=\"" + model + "\" :inline=\"true\" size=\"mini\">" + res + "</el-form>"
                    },
                    formItem: function (child) {
                        return "<el-form-item label=\"" + child.label + "\">" + child.element + "</el-form-item>"
                    },
                    collapseItem: function (name, child) {
                        return "<el-collapse-item title=\"" + child.title + "\" name=\"" + name + "\">" + child.element + "</el-collapse-item>"
                    },
                    collapse: function (vmodel, child) {
                        let res = '';
                        for (let i=0; i<child.length; ++i) {
                            res+=this.collapseItem(i, child[i]);
                        }
                        return "<el-collapse v-model=\"" + vmodel + "\" accordion> </el-collapse>"
                    }
                }
            }
        },
        methods: {
            setOption: function () {
                this.$emit('change', this.option);
            }
        }
    }
</script>

<style scoped>

</style>
