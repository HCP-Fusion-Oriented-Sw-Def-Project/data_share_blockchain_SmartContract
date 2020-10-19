<template>
  <div>
    <el-collapse v-model="setting.activeCol" accordion>
      <el-collapse-item title="全局样式  Style" name="1">
        <el-form ref="styleForm" :model="setting.styleForm" :inline="true" size="mini">

          <el-form-item>
            <label style="display: block;">字体</label>
            <div class="style_input">
              <el-select v-model="myOption.textStyle.fontFamily" size="mini" @change="setOption">
                <el-option
                  v-for="item in setting.fonts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <label style="display: block;">方向</label>
            <div class="style_input">
              <el-select v-model="myOption.series[0].direction"  @change="setOption">
                <el-option v-for="item in setting.styleForm.direction" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>


          </el-form-item>
          <el-form-item>
            <label style="display: block;">形状</label>
            <div class="style_input">
              <el-select v-model="myOption.series[0].shape"  @change="setOption">
                <el-option v-for="item in setting.styleForm.shape" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item>
            <label style="display: block;">中心横坐标</label>
            <div class="style_input">
              <el-slider v-model="setting.styleForm.centerX" :min='0' :max='100' show-input :step="1" input-size="mini" @change="changeCenterX" @input="changeCenterX">
              </el-slider>
            </div>

          </el-form-item>
          <el-form-item>
            <label style="display: block;">中心纵坐标</label>
            <div class="style_input">
              <el-slider v-model="setting.styleForm.centerY" :min='0' :max='100' show-input :step="1" input-size="mini" @change="changeCenterY" @input="changeCenterY">
              </el-slider>
            </div>
          </el-form-item>
          <el-form-item>
            <label style="display: block;">半径</label>
            <div class="style_input">
              <el-slider v-model="setting.styleForm.radius" :min='0' :max='100' show-input :step="1" input-size="mini" @change="changeRadius" @input="changeRadius">
              </el-slider>
            </div>
          </el-form-item>
          <el-form-item>
            <label style="display: block;">振幅</label>
            <div class="style_input">
              <el-slider v-model="getAmplitude" :min='0' :max='100' show-input :step="1" input-size="mini" >
              </el-slider>
            </div>

          </el-form-item>
          <el-form-item>
            <label style="display: block;">波长</label>
            <div class="style_input">
              <el-slider v-model="getWaveLength" :min='0' :max='100' show-input :step="1" input-size="mini" >
              </el-slider>
            </div>
          </el-form-item>

        </el-form>
      </el-collapse-item>
      <el-collapse-item title="标题  Title" name="2">
        <el-form>
          <el-form-item label="显示" size="mini">
            <el-switch v-model="myOption.title.show"  style="margin-left: 165px;" @change="setOption"> </el-switch>
          </el-form-item>
          <!--          <el-form-item label="主标题">-->
          <!--            <el-input v-model="myOption.title.text" placeholder="请输入主标题" size="mini" @blur="setOption"></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="主标题文本超链接">-->
          <!--            <el-input v-model="myOption.title.link" placeholder="请输入主标题文本超链接" size="mini" @blur="setOption"></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="副标题">-->
          <!--            <el-input v-model="myOption.title.subtext" placeholder="请输入副标题" size="mini" @blur="setOption"></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="副标题文本超链接">-->
          <!--            <el-input v-model="myOption.title.sublink" placeholder="请输入副标题文本超链接" size="mini" @blur="setOption"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="标题间距" size="mini">
            <el-input-number v-model="myOption.title.itemGap" style="width: 178px;" controls-position="right" :min="0"  @change="setOption"></el-input-number>
          </el-form-item>
          <el-form-item label="水平对齐" size="mini">
            <el-select v-model="myOption.title.textAlign"  @change="setOption">
              <el-option
                v-for="item in setting.titleForm.textAlign"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!--          <el-form-item label="垂直对齐方式">-->
          <!--            <el-select v-model="myOption.title.textVerticalAlign" size="mini" @change="setOption">-->
          <!--              <el-option-->
          <!--                v-for="item in setting.titleForm.textVerticalAlign"-->
          <!--                :key="item.value"-->
          <!--                :label="item.label"-->
          <!--                :value="item.value">-->
          <!--              </el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <el-form-item label="标题位置" size="mini">
            <el-select v-model="setting.titleForm.position" size="mini" @change="setTitlePosition">
              <el-option
                v-for="item in setting.titleForm.positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-collapse v-model="setting.activeTabTitleText">
            <el-collapse-item title="主标题样式" name="1">
              <el-form>
                <el-form-item label="内容" size="mini">
                  <el-input v-model="myOption.title.text" style="margin-left: 30px;width: 178px;" placeholder="请输入主标题内容"  @change="setOption"></el-input>
                </el-form-item>
                <el-form-item label="链接" size="mini">
                  <el-input v-model="myOption.title.link" style="margin-left: 30px;width: 178px;" placeholder="请输入主标题链接" @change="setOption"></el-input>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.title.textStyle.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50"  @change="setOption"></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.title.textStyle.fontWeight" style="margin-left: 30px;width: 178px;" @change="setOption">
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.title.textStyle.color" style="margin-left: 30px;" @change="setOption"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="副标题样式" name="2">
              <el-form>
                <el-form-item label="内容" size="mini">
                  <el-input v-model="myOption.title.subtext" style="margin-left: 30px;width: 178px;" placeholder="请输入副标题内容"  @change="setOption"></el-input>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.title.subtextStyle.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50"  @change="setOption" ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.title.subtextStyle.fontWeight" style="margin-left: 30px;width: 178px;" @change="setOption">
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.title.subtextStyle.color" style="margin-left: 30px;" @change="setOption"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="轮廓  Outline" name="3">
        <el-form>
          <el-form-item label="显示" size="mini">
            <el-switch v-model="myOption.series[0].outline.show"  style="margin-left: 165px;" @change="setOption"> </el-switch>
          </el-form-item>
          <el-form-item label="颜色" size="mini">
            <el-color-picker v-model="myOption.series[0].outline.itemStyle.borderColor"   style="margin-left: 165px;" @change="setOption"></el-color-picker>
          </el-form-item>
          <el-form-item label="边距" size="mini">
            <el-input-number v-model="myOption.series[0].outline.borderDistance" style="margin-left: 30px; width: 178px;" controls-position="right" :min="0"  @change="setOption"></el-input-number>
          </el-form-item>
          <el-form-item label="边框宽度" size="mini">
            <el-input-number v-model="myOption.series[0].outline.itemStyle.borderWidth" style="width: 178px;" controls-position="right" :min="0"  @change="setOption"></el-input-number>
          </el-form-item>
        </el-form>
        <!--            <div>从之前位置开始</div>-->
      </el-collapse-item>
      <el-collapse-item title="标签  Label" name="4">
        <el-form>
          <el-form-item label="显示" size="mini">
            <el-switch v-model="myOption.series[0].label.show"  style="margin-left: 165px;" @change="setOption"> </el-switch>
          </el-form-item>

          <el-form-item label="颜色" size="mini">
            <el-color-picker v-model="myOption.series[0].label.color"   style="margin-left: 165px;" @change="setOption"></el-color-picker>
          </el-form-item>

          <el-form-item label="大小" size="mini">
            <el-input-number v-model="myOption.series[0].label.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0"  @change="setOption"></el-input-number>
          </el-form-item>
          <el-form-item label="粗细" size="mini">
            <el-select v-model="myOption.series[0].label.fontWeight"  style="margin-left: 30px;" @change="setOption">
              <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!--            <div>从之前位置开始</div>-->
      </el-collapse-item>
      <el-collapse-item title="提示框  Tooltip" name="5">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form>
            <el-form-item label="触发类型" size="mini">
              <el-select v-model="myOption.tooltip.trigger"  @change="setOption">
                <el-option v-for="item in setting.tooltipForm.triggers" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="触发动作" size="mini">
              <el-select v-model="myOption.tooltip.triggerOn"  @change="setOption">
                <el-option v-for="item in setting.tooltipForm.triggerOns" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="消失延迟时间" size="mini">
              <el-input-number style="width: 150px;" v-model="myOption.tooltip.hideDelay" controls-position="right" :min="0"  @change="setOption" ></el-input-number>
            </el-form-item>
          </el-form>
          <el-collapse v-model="setting.activeTabTooltip" accordion>
            <el-collapse-item title="背景框样式" name="1">
              <el-form>
                <!-- <el-form-item label="背景框尺寸" >
                  <el-input-number v-model="setting.tooltipForm.background.width" controls-position="right" size="mini" @change="setOption" @blur="setOption" :min="0"></el-input-number>
                  <span>宽度</span>
                  <el-input-number v-model="setting.tooltipForm.background.height" controls-position="right" size="mini" @change="setOption" @blur="setOption" :min="0"></el-input-number>
                  <span>高度</span>
                </el-form-item> -->
                <el-form-item size="mini">
                  <label style="display: block;color: #606266;font-size:14px;">内边距</label>
                  <div class="style_input">
                    <!-- 可直接修改padding，不用函数 ，，注意颜色位置-->
                    <div><span>顶部</span>
                      <el-input-number v-model="myOption.tooltip.padding[0]" controls-position="right" :min="0"  @change="setOption" ></el-input-number>
                    </div>
                    <div><span>底部</span>
                      <el-input-number v-model="myOption.tooltip.padding[2]" controls-position="right"   :min="0" @change="setOption" ></el-input-number>
                    </div>
                    <div><span>左侧</span>
                      <el-input-number v-model="myOption.tooltip.padding[3]" controls-position="right" :min="0" @change="setOption" ></el-input-number>
                    </div>
                    <div><span>右侧</span>
                      <el-input-number v-model="myOption.tooltip.padding[1]" controls-position="right"  :min="0" @change="setOption" ></el-input-number>
                    </div>
                  </div>
                </el-form-item>
                <!-- <el-form-item label="水平偏移量" >
                  <el-input-number v-model="setting.tooltipForm.background.padding" controls-position="right" size="mini" @change="setOption" @blur="setOption" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="垂直偏移量" >
                  <el-input-number v-model="setting.tooltipForm.background.padding" controls-position="right" size="mini" @change="setOption" @blur="setOption" :min="0"></el-input-number>
                </el-form-item> -->
                <el-form-item label="边框粗细" size="mini">
                  <el-input-number v-model="myOption.tooltip.borderWidth" style="margin-left: 20px;" controls-position="right"  @change="setOption"  :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="边框颜色" size="mini">
                  <el-color-picker show-alpha style="margin-left: 20px;" v-model="myOption.tooltip.borderColor" @change="setOption"></el-color-picker>
                </el-form-item>
                <el-form-item label="背景颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.backgroundColor" style="margin-left: 20px;" @change="setOption" show-alpha></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="文本样式" name="2">
              <el-form size="mini">
                <el-form-item label="字体" >
                  <el-select v-model="myOption.tooltip.textStyle.fontFamily"  @change="setOption"  style="margin-left: 25px;" >
                    <el-option v-for="item in setting.fonts" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.tooltip.textStyle.fontSize"  style="margin-left: 25px;width: 178px;" controls-position="right" :min="0" :max="50" @change="setOption" ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.tooltip.textStyle.fontWeight" style="margin-left: 25px;"  @change="setOption">
                    <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.textStyle.color"   style="margin-left: 25px;" @change="setOption"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="坐标轴指示器" name="3">
              <el-form>
                <el-form-item label="类型" size="mini">
                  <el-select v-model="myOption.tooltip.axisPointer.type" style="width: 130px;margin-left: 40px;">
                    <el-option v-for="item in setting.pointerType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线宽度" size="mini">
                  <el-input-number v-model="myOption.tooltip.axisPointer.lineStyle.width" controls-position="right" :min="0"  @change="setOption" ></el-input-number>
                </el-form-item>
                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线类型" size="mini">
                  <el-select v-model="myOption.tooltip.axisPointer.lineStyle.type"  style="width: 130px;">
                    <el-option v-for="item in setting.lineType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.axisPointer.lineStyle.color"  @change="setOption"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>
      <!--          <el-collapse-item title="数据系列  Data series" name="7">-->
      <!--            <div>系列名</div>-->
      <!--            <div>折线</div>-->
      <!--            <div>圆点</div>-->
      <!--            <div>区域</div>-->
      <!--            <div>标签</div>-->
      <!--          </el-collapse-item>-->
      <!--          <el-collapse-item title="数据配置  Data allocation" name="8">-->
      <!--            <div>数据增量</div>-->
      <!--            <div>最大容量</div>-->
      <!--          </el-collapse-item>-->
      <el-collapse-item title="动画  Animation" name="6">
        <el-form>
          <el-form-item label="初始动画时长" size="mini">
            <el-input-number v-model="myOption.animationDuration" controls-position="right" :min="0"  @change="setOption" ></el-input-number>
          </el-form-item>
          <el-form-item label="缓动效果" size="mini" >
            <el-select v-model="myOption.animationEasing" @change="setOption" style="margin-left: 30px;width:130px;">
              <el-option v-for="item in setting.animationEasing" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更新动画时长" size="mini">
            <el-input-number v-model="myOption.animationDurationUpdate" controls-position="right" :min="0"  @change="setOption" ></el-input-number>
          </el-form-item>
        </el-form>
        <!--            <div>从之前位置开始</div>-->
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "LiquidFillSetting",
        props: [ 'option' ],
		created() {
			this.myOption = this.option;
		},
        computed: {
            getAmplitude: {
                get() {
                    return this.setting.styleForm.amplitude;
                },
                set(nval) {
                    this.myOption.series[0].amplitude = nval + '%';
                    this.setOption();
                    this.setting.styleForm.amplitude = nval;
                }
            },
            getWaveLength: {
                get() {
                    return this.setting.styleForm.waveLength;
                },
                set(nval) {
                    this.myOption.series[0].waveLength = nval + '%';
                    this.setOption();
                    this.setting.styleForm.waveLength = nval;
                }
            }
        },
        data() {
            return {
                myOption: {
                },
                setting: {
                    activeTab: "1",
                    activeTabX: "1",
                    activeTabY: "1",
                    activeCol: "1",
                    activeTabLegend: "1",
                    fonts: [{value: 'Microsoft YaHei',label: 'Microsoft YaHei' },
                        {value: 'sans-serif',label: 'sans-serif'},
                        { value: 'serif',label: 'serif'},
                        {value: 'monospace',label: 'monospace'},
                        {value: 'Arial',label: 'Arial'},
                        {value:'楷体',label:'楷体'}],
                    fontWeight: [{value: 'lighter',label: 'lighter'},
                        {value: 'normal',label: 'normal'},
                        {value: 'bold',label: 'bold'},
                        {value: 'bolder',label: 'bolder'} ],
                    pointerType:[{value:'line',label:'直线指示器'},
                        {value:'shadow',label:'阴影指示器'},
                        {value:'cross',label:'十字星准指示器'},
                        {value:'none',label:'无指示器'}],
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
                        radius: 50,
                        centerX: 50,
                        centerY: 50,
                        amplitude: 8,
                        waveLength: 80,
                        direction: [
                            {
                                label: '向左',
                                value: 'left'
                            },{
                                label: '向右',
                                value: 'right'
                            }
                        ],
                        shape: [
                            {
                                label: '圆形',
                                value: 'circle'
                            },{
                                label: '矩形',
                                value: 'rect'
                            },{
                                label: '圆角矩形',
                                value: 'roundRect'
                            },{
                                label: '三角形',
                                value: 'triangle'
                            },{
                                label: '菱形',
                                value: 'diamond'
                            },{
                                label: '锥形',
                                value: 'pin'
                            },{
                                label: '箭头',
                                value: 'arrow'
                            },{
                                label: '容器',
                                value: 'container'
                            }
                        ]
                    },
                    titleForm: {
                        name: "",
                        fontSize: "18",
                        color: "#000",
                        fontWeight: "normal",
                        textAlign: [
                            {
                                label: '自动',
                                value: 'auto'
                            },{
                                label: '左部对齐',
                                value: 'left'
                            },{
                                label: '居中对齐',
                                value: 'center'
                            },{
                                label: '右部对齐',
                                value: 'right'
                            }
                        ],
                        textVerticalAlign: [
                            {
                                label: '自动',
                                value: 'auto'
                            },{
                                label: '顶部对齐',
                                value: 'top'
                            },{
                                label: '居中对齐',
                                value: 'center'
                            },{
                                label: '右部对齐',
                                value: 'right'
                            }
                        ],
                        position: 'topCenter',
                        positionOptions: [
                            {
                                label: '顶部居左',
                                value: 'topLeft'
                            },{
                                label: '顶部居中',
                                value: 'topCenter',
                            },{
                                label: '顶部居右',
                                value: 'topRight'
                            },{
                                label: '底部居左',
                                value: 'bottomLeft'
                            },{
                                label: '底部居中',
                                value: 'bottomCenter'
                            },{
                                label: '底部居右',
                                value: 'bottomRight'
                            }
                        ]
                    },
                    labelForm: {
                        labelToCenter: 0.74,
                        wheelbaseToCenter: 0.74
                    },
                    catatoryForm: {
                        fontSize: '20',
                        color: '#000',
                        fontWeight: 'normal',
                        number: {
                            fontSize: '20',
                            color: '#000',
                            fontWeight: 'normal',
                            precision: 2,
                            realNumber: false
                        }
                    },
                    polarAxisForm: {
                        outerRadius: 0.75,
                        innerRadius: 0.55,
                        gridLine: {
                            color: '#000'
                        }
                    },
                    legendForm: {
                        textStyle: {
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
                        textStyle: {
                            font: 'sans-serif',
                            fontSize: 14,
                            color: '#fff',
                            fontWeight: 'normal'
                        }
                    },

                    axisPointerForm: {
                        initAxisPointerType: 'line',
                        axisPointerType: [{
                            label: '直线指示器',
                            value: 'line'
                        }],
                        initLineType: 'solid',
                        lineStyle: {
                            color: '#555',
                            width: 1,
                            type: [
                                {
                                    label: '实线',
                                    value: 'solid'
                                },
                                {
                                    label: '点线',
                                    value: 'dotted'
                                },
                                {
                                    label: '虚线' ,
                                    value: 'dashed'
                                }
                            ]
                        }
                    },
                    dataSeries: {
                        series: {
                            itemStyle: {
                                color: '#ccc'
                            }
                        }

                    },
                    animationEasing: [
                        {
                            label: 'linear',
                            value: 'linear'
                        },{
                            label: 'quadraticIn',
                            value: 'quadraticIn'
                        },{
                            label: 'quadraticOut',
                            value: 'quadraticOut'
                        },{
                            label: 'quadraticInOut',
                            value: 'quadraticInOut'
                        },{
                            label: 'cubicIn',
                            value: 'cubicIn'
                        },{
                            label: 'cubicOut',
                            value: 'cubicOut'
                        },{
                            label: 'cubicInOut',
                            value: 'cubicInOut'
                        },{
                            label: 'quarticIn',
                            value: 'quarticIn'
                        },{
                            label: 'quarticOut',
                            value: 'quarticOut'
                        },{
                            label: 'quarticInOut',
                            value: 'quarticInOut'
                        },{
                            label: 'quinticIn',
                            value: 'quinticIn'
                        },{
                            label: 'quinticOut',
                            value: 'quinticOut'
                        },{
                            label: 'quinticInOut',
                            value: 'quinticInOut'
                        },
                        {
                            label: 'sinusoidalIn',
                            value: 'sinusoidalIn'
                        },{
                            label: 'sinusoidalOut',
                            value: 'sinusoidalOut'
                        },{
                            label: 'sinusoidalInOut',
                            value: 'sinusoidalInOut'
                        },
                        {
                            label: 'exponentialIn',
                            value: 'exponentialIn'
                        },{
                            label: 'exponentialOut',
                            value: 'exponentialOut'
                        },{
                            label: 'exponentialInOut',
                            value: 'exponentialInOut'
                        },
                        {
                            label: 'circularIn',
                            value: 'circularIn'
                        },{
                            label: 'circularOut',
                            value: 'circularOut'
                        },{
                            label: 'circularInOut',
                            value: 'circularInOut'
                        },
                        {
                            label: 'elasticIn',
                            value: 'elasticIn'
                        },{
                            label: 'elasticOut',
                            value: 'elasticOut'
                        },{
                            label: 'elasticInOut',
                            value: 'elasticInOut'
                        },
                        {
                            label: 'backIn',
                            value: 'backIn'
                        },{
                            label: 'backOut',
                            value: 'backOut'
                        },{
                            label: 'backInOut',
                            value: 'backInOut'
                        },
                        {
                            label: 'bounceIn',
                            value: 'bounceIn'
                        },{
                            label: 'bounceOut',
                            value: 'bounceOut'
                        },{
                            label: 'bounceInOut',
                            value: 'bounceInOut'
                        }
                    ]
                }
            }
        },
        methods: {
            setOption: function () {
                this.$emit('change', this.myOption);
            },
            changeRadius: function () {
                this.myOption.series[0].radius = this.setting.styleForm.radius+'%';
                this.setOption();
            },
            changeCenterX: function () {
                Vue.set(this.myOption.series[0].center, 0, this.setting.styleForm.centerX + '%');
                this.setOption();
            },
            changeCenterY: function () {
                Vue.set(this.myOption.series[0].center, 1, this.setting.styleForm.centerY + '%');
                this.setOption();
            },
            changeTooltipPaddingTop: function() {
                Vue.set(this.myOption.tooltip.padding, 0, this.setting.tooltipForm.background.padding.top);
                this.setOption();
            },
            changeTooltipPaddingBottom: function() {
                Vue.set(this.myOption.tooltip.padding, 2, this.setting.tooltipForm.background.padding.bottom);
                this.setOption();
            },
            changeTooltipPaddingLeft: function() {
                Vue.set(this.myOption.tooltip.padding, 3, this.setting.tooltipForm.background.padding.left);
                this.setOption();
            },
            changeTooltipPaddingRight: function() {
                Vue.set(this.myOption.tooltip.padding, 1, this.setting.tooltipForm.background.padding.right);
                this.setOption();
            },
            setTitlePosition: function() {
                if (this.setting.titleForm.position === 'topLeft'){
                    this.myOption.title.top = 'top';
                    this.myOption.title.left = 'left';
                }else if (this.setting.titleForm.position === 'topCenter'){
                    this.myOption.title.top = 'top';
                    this.myOption.title.left = 'center';
                }else if (this.setting.titleForm.position === 'topRight'){
                    this.myOption.title.top = 'top';
                    this.myOption.title.left = 'right';
                }else if (this.setting.titleForm.position === 'bottomLeft'){
                    this.myOption.title.top = 'bottom';
                    this.myOption.title.left = 'left';
                }else if (this.setting.titleForm.position === 'bottomCenter'){
                    this.myOption.title.top = 'bottom';
                    this.myOption.title.left = 'center';
                }else if (this.setting.titleForm.position === 'bottomRight'){
                    this.myOption.title.top = 'bottom';
                    this.myOption.title.left = 'right';
                }
                this.setOption();
            }
        },
        watch: {
            myOption: {
                handler(nval, oval) {
                    this.myOption = nval;
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
  .style_input {
    width: 200px;
    text-align: right;
    margin-left: 20px;
  }

  .style_input span {
    margin-right: 5px;
  }
</style>
