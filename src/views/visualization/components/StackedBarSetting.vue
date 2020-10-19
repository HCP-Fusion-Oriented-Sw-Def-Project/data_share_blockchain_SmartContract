	<template>
  <div class="setting">
    <el-collapse v-model="setting.activeCol" accordion>
      <el-collapse-item title="全局样式  Style" name="1">
        <el-form :inline="true">
          <!-- 注意看！这里是添的label 和div  class="style_input"有2个css样式，记得复制-->
          <el-form-item size="mini">
            <label style="display: block;color: #606266;font-size:14px;">字体</label>
            <div class="style_input">
              <el-select v-model="myOption.textStyle.fontFamily" @change="setmyOption">
                <el-option
                  v-for="item in setting.fonts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item size="mini">
            <label style="display: block;color: #606266;font-size:14px;">边距</label>
            <div class="style_input">
              <div>
                <span>顶部</span>
                <el-input-number
                  v-model="myOption.grid.top"
                  controls-position="right"
                  :min="0"
                  @change="setmyOption"
                ></el-input-number>
              </div>
              <div>
                <span>底部</span>
                <el-input-number
                  v-model="myOption.grid.bottom"
                  controls-position="right"
                  :min="0"
                  @change="setmyOption"
                ></el-input-number>
              </div>
              <div>
                <span>左侧</span>
                <el-input-number
                  v-model="myOption.grid.left"
                  controls-position="right"
                  :min="0"
                  @change="setmyOption"
                ></el-input-number>
              </div>
              <div>
                <span>右侧</span>
                <el-input-number
                  v-model="myOption.grid.right"
                  controls-position="right"
                  :min="0"
                  @change="setmyOption"
                ></el-input-number>
              </div>
            </div>
          </el-form-item>

          <!-- 这是柱状图独有的设置 -->
          <el-form-item size="mini">
            <label style="display: block;color: #606266;font-size:14px;">柱子样式</label>
            <div class="style_input">
              <div>
                <span>宽度</span>
                <el-input-number
                  v-model="myOption.series[0].barWidth"
                  controls-position="right"
                  :min="0"
                  :max="50"
                  size="mini"
                  @change="setmyOption"
                ></el-input-number>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="工具栏" size="mini">
            <el-switch
              v-model="myOption.toolbox.show"
              style="margin-left: 120px;"
              @change="setmyOption"
            ></el-switch>
          </el-form-item>
          <!-- 最大加载量去掉了 -->
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="标题  Title" name="2">
        <el-form>
          <el-form-item label="显示" size="mini">
            <el-switch
              v-model="myOption.title.show"
              style="margin-left: 165px;"
              @change="setmyOption"
            ></el-switch>
          </el-form-item>

          <el-collapse v-model="setting.activeTabTitleText">
            <!-- 注意以下的顺序，我把颜色调到最后了 -->
            <el-collapse-item title="主标题样式" name="1">
              <el-form>
                <el-form-item label="内容" size="mini">
                  <el-input
                    v-model="myOption.title.text"
                    style="margin-left: 30px;width: 178px;"
                    placeholder="请输入主标题内容"
                    @change="setmyOption"
                  ></el-input>
                </el-form-item>
                <el-form-item label="链接" size="mini">
                  <el-input
                    v-model="myOption.title.link"
                    style="margin-left: 30px;width: 178px;"
                    placeholder="请输入主标题链接"
                    @change="setmyOption"
                  ></el-input>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number
                    v-model="myOption.title.textStyle.fontSize"
                    style="margin-left: 30px;width: 178px;"
                    controls-position="right"
                    :min="0"
                    :max="50"
                    @change="setmyOption"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select
                    v-model="myOption.title.textStyle.fontWeight"
                    style="margin-left: 30px;width: 178px;"
                    @change="setmyOption"
                  >
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker
                    v-model="myOption.title.textStyle.color"
                    style="margin-left: 30px;"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <!-- 主副标题在一个el-collaspe中就行 我增加了 name属性-->
            <el-collapse-item title="副标题样式" name="2">
              <el-form>
                <!-- 注意!!副标题的字号粗细设置是在  subtextStyle中，你的单词拼错了（大小写） -->
                <el-form-item label="内容" size="mini">
                  <el-input
                    v-model="myOption.title.subtext"
                    style="margin-left: 30px;width: 178px;"
                    placeholder="请输入副标题内容"
                    @change="setmyOption"
                  ></el-input>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number
                    v-model="myOption.title.subtextStyle.fontSize"
                    style="margin-left: 30px;width: 178px;"
                    controls-position="right"
                    :min="0"
                    :max="50"
                    @change="setmyOption"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select
                    v-model="myOption.title.subtextStyle.fontWeight"
                    style="margin-left: 30px;width: 178px;"
                    @change="setmyOption"
                  >
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker
                    v-model="myOption.title.subtextStyle.color"
                    style="margin-left: 30px;"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="布局" name="3">
              <el-form :inline="true" size="mini">
                <el-form-item label="标题间距" size="mini">
                  <el-input-number
                    v-model="myOption.title.itemGap"
                    style="width: 150px;margin-left: 10px;"
                    controls-position="right"
                    :min="0"
                    :max="50"
                    @change="setmyOption"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="水平对齐" size="mini">
                  <el-select
                    v-model="myOption.title.textAlign"
                    style="width: 150px;margin-left: 10px;"
                    @change="setmyOption"
                  >
                    <el-option
                      v-for="item in setting.titleForm.textAlign"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="横向方位">
                  <el-input-number
                    style="width: 150px;margin-left: 10px;"
                    v-model="myOption.title.left"
                    controls-position="right"
                    @change="setmyOption"
                    :min="0"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="纵向方位">
                  <el-input-number
                    style="width: 150px;margin-left: 10px;"
                    v-model="myOption.title.top"
                    controls-position="right"
                    @change="setmyOption"
                    :min="0"
                  ></el-input-number>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="x轴  XAxis" name="3">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-collapse v-model="setting.activeTabX" accordion>
            <el-collapse-item title="文本" name="1">
              <el-form>
                <!-- 我调了颜色的位置 -->
                <el-form-item label="字号" size="mini">
                  <el-input-number
                    v-model="myOption.xAxis.axisLabel.textStyle.fontSize"
                    style="margin-left: 30px;width: 178px;"
                    controls-position="right"
                    :min="0"
                    :max="50"
                    @change="setmyOption"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select
                    v-model="myOption.xAxis.axisLabel.textStyle.fontWeight"
                    style="margin-left: 30px;width: 178px;"
                    @change="setmyOption"
                  >
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker
                    v-model="myOption.xAxis.axisLabel.textStyle.color"
                    style="margin-left: 30px;"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="轴标签" name="2">
              <el-form>
                <el-form-item label="角度" size="mini">
                  <el-input-number
                    v-model="myOption.xAxis.axisLabel.rotate"
                    style="margin-left: 30px;width: 178px;"
                    controls-position="right"
                    @change="setmyOption"
                    :min="-90"
                    :max="90"
                  ></el-input-number>
                </el-form-item>
                <!-- 距离是距离轴的距离 -->
                <el-form-item label="距离" size="mini">
                  <el-input-number
                    v-model="myOption.xAxis.axisLabel.margin"
                    style="margin-left: 30px;width: 178px;"
                    controls-position="right"
                    @change="setmyOption"
                    :min="0"
                    :max="200"
                  ></el-input-number>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="轴单位" name="3">
              <el-form>
                <el-form-item label="单位" size="mini">
                  <el-input
                    v-model="myOption.xAxis.name"
                    placeholder="请输入单位"
                    style="margin-left: 30px;width: 178px;"
                    @change="setmyOption"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="轴线" name="4">
              <el-form ref="xAxisForm" :model="myOption.xAxisForm">
                <el-form-item label="颜色" size="mini">
                  <el-color-picker
                    v-model="myOption.xAxis.axisLine.lineStyle.color"
                    style="margin-left: 30px;"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="网格线" name="5">
              <el-form>
                <!-- 别忘了设置show为true -->
                <el-form-item label="显示" size="mini">
                  <el-switch
                    v-model="myOption.xAxis.splitLine.show"
                    style="margin-left: 30px;"
                    @change="setmyOption"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker
                    show-alpha
                    v-model="myOption.xAxis.splitLine.lineStyle.color"
                    style="margin-left: 30px;"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>

      <el-collapse-item title="y轴  YAxis" name="4">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-collapse v-model="setting.activeTabY" accordion>
            <el-collapse-item title="文本" name="1">
              <el-form size="mini">
                <el-form-item label="字号">
                  <el-input-number
                    v-model="myOption.yAxis.axisLabel.textStyle.fontSize"
                    style="margin-left: 30px;width: 178px;"
                    controls-position="right"
                    :min="0"
                    :max="50"
                    @change="setmyOption"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细">
                  <el-select
                    v-model="myOption.yAxis.axisLabel.textStyle.fontWeight"
                    style="margin-left: 30px;width: 178px;"
                    @change="setmyOption"
                  >
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker
                    v-model="myOption.yAxis.axisLabel.textStyle.color"
                    style="margin-left: 30px;width: 178px;"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="轴标签" name="2">
              <el-form size="mini">
                <el-form-item label="角度">
                  <el-input-number
                    v-model="myOption.yAxis.axisLabel.rotate"
                    style="margin-left: 30px;width: 178px;"
                    controls-position="right"
                    @change="setmyOption"
                    :min="-90"
                    :max="90"
                  ></el-input-number>
                </el-form-item>
                <!-- 距离是距离轴的距离 -->
                <el-form-item label="距离">
                  <el-input-number
                    v-model="myOption.yAxis.axisLabel.margin"
                    style="margin-left: 30px;width: 178px;"
                    controls-position="right"
                    @change="setmyOption"
                    :min="0"
                    :max="200"
                  ></el-input-number>
                </el-form-item>

                <!-- 最大值最小值项待定
														<el-form-item label="最大值" size="mini">
															<el-input-number v-model="myOption.yAxis.max" controls-position="right" @change="setmyOption" style="width: 150px;"></el-input-number>
                </el-form-item>-->

                <!-- 这里是设置y轴显示数据的格式，可以是整数，可以是小数
														<el-form-item label="格式" size="mini">
															<el-select v-model="setting.yAxisForm.format" style="margin-left: 15px;width:150px;" @change="chooseFormat" >
																<el-option v-for="item in setting.displayForm" :key="item.value" :label="item.label" :value="item.value">
																</el-option>
															</el-select>
                </el-form-item>-->
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="轴单位" name="3">
              <el-form>
                <el-form-item label="单位" size="mini">
                  <el-input
                    v-model="myOption.yAxis.name"
                    placeholder="请输入单位"
                    @change="setmyOption"
                    style="width: 178px;margin-left: 30px;"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="轴线" name="4">
              <el-form>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker
                    v-model="myOption.yAxis.axisLine.lineStyle.color"
                    style="margin-left: 30px;"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="网格线" name="5">
              <el-form>
                <el-form-item label="显示" size="mini">
                  <el-switch
                    v-model="myOption.yAxis.splitLine.show"
                    style="margin-left: 30px;"
                    @change="setmyOption"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker
                    v-model="myOption.yAxis.splitLine.lineStyle.color"
                    style="margin-left: 30px;"
                    show-alpha
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>

      <el-collapse-item title="图例  Legend" name="5">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form>
            <el-form-item label="显示" size="mini">
              <el-switch
                v-model="myOption.legend.show"
                style="margin-left: 165px;"
                @change="setmyOption"
              ></el-switch>
            </el-form-item>
          </el-form>
          <el-collapse v-model="setting.activeTabLegend" accordion>
            <el-collapse-item title="文本" name="1">
              <el-form size="mini">
                <el-form-item label="字号">
                  <el-input-number
                    v-model="myOption.legend.textStyle.fontSize"
                    controls-position="right"
                    :min="0"
                    :max="50"
                    style="margin-left: 30px;width: 178px;"
                    @change="setmyOption"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细">
                  <el-select
                    v-model="myOption.legend.textStyle.fontWeight"
                    style="margin-left: 30px;width: 178px;"
                    @change="setmyOption"
                  >
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker
                    v-model="myOption.legend.textStyle.color"
                    style="margin-left: 30px;"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="布局" name="2">
              <el-form :inline="true" size="mini">
                <el-form-item label="内间距">
                  <el-input-number
                    style="width: 150px;margin-left: 25px;"
                    v-model="myOption.legend.itemGap"
                    controls-position="right"
                    size="mini"
                    @change="setmyOption"
                    :min="0"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="横向方位">
                  <el-input-number
                    style="width: 150px;margin-left: 10px;"
                    v-model="myOption.legend.left"
                    controls-position="right"
                    size="mini"
                    @change="setmyOption"
                    :min="0"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="纵向方位">
                  <el-input-number
                    style="width: 150px;margin-left: 10px;"
                    v-model="myOption.legend.top"
                    controls-position="right"
                    size="mini"
                    @change="setmyOption"
                    :min="0"
                  ></el-input-number>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>
      <el-collapse-item title="提示框  Tooltip" name="6">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form>
            <el-form-item label="触发类型" size="mini">
              <el-select v-model="myOption.tooltip.trigger" @change="setmyOption">
                <el-option
                  v-for="item in setting.tooltipForm.triggers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="触发动作" size="mini">
              <el-select v-model="myOption.tooltip.triggerOn" @change="setmyOption">
                <el-option
                  v-for="item in setting.tooltipForm.triggerOns"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="消失延迟时间" size="mini">
              <el-input-number
                style="width: 150px;"
                v-model="myOption.tooltip.hideDelay"
                controls-position="right"
                :min="0"
                @change="setmyOption"
              ></el-input-number>
            </el-form-item>
          </el-form>
          <el-collapse v-model="setting.activeTooltip" accordion>
            <el-collapse-item title="背景框样式" name="1">
              <el-form>
                <el-form-item size="mini">
                  <label style="display: block;color: #606266;font-size:14px;">内边距</label>
                  <div class="style_input">
                    <!-- 可直接修改padding，不用函数 ，，注意颜色位置-->
                    <div>
                      <span>顶部</span>
                      <el-input-number
                        v-model="myOption.tooltip.padding[0]"
                        controls-position="right"
                        :min="0"
                        @change="setmyOption"
                      ></el-input-number>
                    </div>
                    <div>
                      <span>底部</span>
                      <el-input-number
                        v-model="myOption.tooltip.padding[2]"
                        controls-position="right"
                        :min="0"
                        @change="setmyOption"
                      ></el-input-number>
                    </div>
                    <div>
                      <span>左侧</span>
                      <el-input-number
                        v-model="myOption.tooltip.padding[3]"
                        controls-position="right"
                        :min="0"
                        @change="setmyOption"
                      ></el-input-number>
                    </div>
                    <div>
                      <span>右侧</span>
                      <el-input-number
                        v-model="myOption.tooltip.padding[1]"
                        controls-position="right"
                        :min="0"
                        @change="setmyOption"
                      ></el-input-number>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="边框粗细" size="mini">
                  <el-input-number
                    v-model="myOption.tooltip.borderWidth"
                    style="margin-left: 20px;"
                    controls-position="right"
                    @change="setmyOption"
                    :min="0"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="边框颜色" size="mini">
                  <el-color-picker
                    show-alpha
                    style="margin-left: 20px;"
                    v-model="myOption.tooltip.borderColor"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
                <el-form-item label="背景颜色" size="mini">
                  <el-color-picker
                    v-model="myOption.tooltip.backgroundColor"
                    style="margin-left: 20px;"
                    @change="setmyOption"
                    show-alpha
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="文本样式" name="2">
              <el-form size="mini">
                <el-form-item label="字体">
                  <el-select
                    v-model="myOption.tooltip.textStyle.fontFamily"
                    @change="setmyOption"
                    style="margin-left: 25px;"
                  >
                    <el-option
                      v-for="item in setting.fonts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number
                    v-model="myOption.tooltip.textStyle.fontSize"
                    style="margin-left: 25px;width: 178px;"
                    controls-position="right"
                    :min="0"
                    :max="50"
                    @change="setmyOption"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select
                    v-model="myOption.tooltip.textStyle.fontWeight"
                    style="margin-left: 25px;"
                    @change="setmyOption"
                  >
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker
                    v-model="myOption.tooltip.textStyle.color"
                    style="margin-left: 25px;"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="坐标轴指示器" name="3">
              <el-form>
                <el-form-item label="类型" size="mini">
                  <el-select
                    v-model="myOption.tooltip.axisPointer.type"
                    @change="changetype"
                    style="width: 130px;margin-left: 40px;"
                  >
                    <el-option
                      v-for="item in setting.pointerType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 颜色 -->
                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线宽度" size="mini">
                  <el-input-number
                    v-model="myOption.tooltip.axisPointer.lineStyle.width"
                    controls-position="right"
                    :min="0"
                    @change="setmyOption"
                  ></el-input-number>
                </el-form-item>
                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线类型" size="mini">
                  <el-select
                    v-model="myOption.tooltip.axisPointer.lineStyle.type"
                    style="width: 130px;"
                  >
                    <el-option
                      v-for="item in setting.LineType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线颜色" size="mini">
                  <el-color-picker
                    v-model="myOption.tooltip.axisPointer.lineStyle.color"
                    @change="setmyOption"
                  ></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>

      <el-collapse-item title="动画  Animation" name="7">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form>
            <el-form-item label="初始动画时长" size="mini">
              <el-input-number
                v-model="myOption.animationDuration"
                controls-position="right"
                :min="0"
                @change="setmyOption"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="缓动效果" size="mini">
              <el-select
                v-model="myOption.animationEasing"
                @change="setmyOption"
                style="margin-left: 30px;width:130px;"
              >
                <el-option
                  v-for="item in setting.drawSetting"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="更新动画时长" size="mini">
              <el-input-number
                v-model="myOption.animationDurationUpdate"
                controls-position="right"
                :min="0"
                @change="setmyOption"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
		<script type="text/javascript">
var i = 0;
export default {
  props: ["option"],
	created() {
		this.myOption = this.option;
	},
  data() {
    return {
      myOption: {
      },

      setting: {
        activeTab: "1",
        activeTabX: "1",
        activeTabTitleText: "1",
        activeTabY: "1",
        activeCol: "1",
        activeTabLegend: "1",
        activeTooltip: "1",
        activeDataSource: "1",
        fonts: [
          { value: "Microsoft YaHei", label: "Microsoft YaHei" },
          { value: "sans-serif", label: "sans-serif" },
          { value: "serif", label: "serif" },
          { value: "monospace", label: "monospace" },
          { value: "Arial", label: "Arial" },
          { value: "楷体", label: "楷体" }
        ],
        fontWeight: [
          { value: "lighter", label: "lighter" },
          { value: "normal", label: "normal" },
          { value: "bold", label: "bold" },
          { value: "bolder", label: "bolder" }
        ],
        // displayForm:[{value:'0',label:'11(整数)'},
        //   {value:'1',label:'11.1(浮点数)'},
        //   {value:'2',label:'11.11(浮点数)'}],
        pointerType: [
          { value: "line", label: "直线指示器" },
          { value: "shadow", label: "阴影指示器" },
          { value: "cross", label: "十字星准指示器" },
          { value: "none", label: "无指示器" }
        ],
        LineType: [
          { value: "solid", label: "实线" },
          { value: "dashed", label: "虚线" },
          { value: "dotted", label: "点线" }
        ],
        drawSetting: [
          {
            label: "linear",
            value: "linear"
          },
          {
            label: "quadraticIn",
            value: "quadraticIn"
          },
          {
            label: "quadraticOut",
            value: "quadraticOut"
          },
          {
            label: "quadraticInOut",
            value: "quadraticInOut"
          },
          {
            label: "cubicIn",
            value: "cubicIn"
          },
          {
            label: "cubicOut",
            value: "cubicOut"
          },
          {
            label: "cubicInOut",
            value: "cubicInOut"
          },
          {
            label: "quarticIn",
            value: "quarticIn"
          },
          {
            label: "quarticOut",
            value: "quarticOut"
          },
          {
            label: "quarticInOut",
            value: "quarticInOut"
          },
          {
            label: "quinticIn",
            value: "quinticIn"
          },
          {
            label: "quinticOut",
            value: "quinticOut"
          },
          {
            label: "quinticInOut",
            value: "quinticInOut"
          },
          {
            label: "sinusoidalIn",
            value: "sinusoidalIn"
          },
          {
            label: "sinusoidalOut",
            value: "sinusoidalOut"
          },
          {
            label: "sinusoidalInOut",
            value: "sinusoidalInOut"
          },
          {
            label: "exponentialIn",
            value: "exponentialIn"
          },
          {
            label: "exponentialOut",
            value: "exponentialOut"
          },
          {
            label: "exponentialInOut",
            value: "exponentialInOut"
          },
          {
            label: "circularIn",
            value: "circularIn"
          },
          {
            label: "circularOut",
            value: "circularOut"
          },
          {
            label: "circularInOut",
            value: "circularInOut"
          },
          {
            label: "elasticIn",
            value: "elasticIn"
          },
          {
            label: "elasticOut",
            value: "elasticOut"
          },
          {
            label: "elasticInOut",
            value: "elasticInOut"
          },
          {
            label: "backIn",
            value: "backIn"
          },
          {
            label: "backOut",
            value: "backOut"
          },
          {
            label: "backInOut",
            value: "backInOut"
          },
          {
            label: "bounceIn",
            value: "bounceIn"
          },
          {
            label: "bounceOut",
            value: "bounceOut"
          },
          {
            label: "bounceInOut",
            value: "bounceInOut"
          }
        ],

        titleForm: {
          textAlign: [
            {
              label: "自动",
              value: "auto"
            },
            {
              label: "左部对齐",
              value: "left"
            },
            {
              label: "居中对齐",
              value: "center"
            },
            {
              label: "右部对齐",
              value: "right"
            }
          ],
          position: "topCenter",
          positionmyOptions: [
            {
              label: "顶部居左",
              value: "topLeft"
            },
            {
              label: "顶部居中",
              value: "topCenter"
            },
            {
              label: "顶部居右",
              value: "topRight"
            },
            {
              label: "底部居左",
              value: "bottomLeft"
            },
            {
              label: "底部居中",
              value: "bottomCenter"
            },
            {
              label: "底部居右",
              value: "bottomRight"
            }
          ]
        },
        yAxisForm: {
          format: "11(整数)"
        },
        tooltipForm: {
          triggers: [
            { value: "item", label: "数据项" },
            { value: "axis", label: "坐标轴" }
          ],
          triggerOns: [
            { value: "mousemove", label: "悬浮" },
            { value: "click", label: "点击" }
          ],
          isLine: false
        }
      }
    };
  },
  mounted() {
    this.setmyOption();
  },
  methods: {
    setmyOption: function() {
      this.$emit("change", this.myOption);
    },
    // getFormatFunc: function(i) {
    //   return function (value, index) {
    //           return value.toFixed(i);
    //    }
    // },
    changetype: function() {
      if (this.myOption.tooltip.axisPointer.type == "line") {
        this.setting.tooltipForm.isLine = true;
      } else {
        this.setting.tooltipForm.isLine = false;
      }
      this.setmyOption();
    },
    // chooseFormat:function(index,value){
    //    i=this.setting.yAxisForm.format;
    //    this.myOption.yAxis.axisLabel.formatter = this.getFormatFunc(i);
    //    this.setmyOption();
    // },
    setTitlePosition: function() {
      if (this.setting.titleForm.position === "topLeft") {
        this.myOption.title.top = "top";
        this.myOption.title.left = "left";
      } else if (this.setting.titleForm.position === "topCenter") {
        this.myOption.title.top = "top";
        this.myOption.title.left = "center";
      } else if (this.setting.titleForm.position === "topRight") {
        this.myOption.title.top = "top";
        this.myOption.title.left = "right";
      } else if (this.setting.titleForm.position === "bottomLeft") {
        this.myOption.title.top = "bottom";
        this.myOption.title.left = "left";
      } else if (this.setting.titleForm.position === "bottomCenter") {
        this.myOption.title.top = "bottom";
        this.myOption.title.left = "center";
      } else if (this.setting.titleForm.position === "bottomRight") {
        this.myOption.title.top = "bottom";
        this.myOption.title.left = "right";
      }
      this.setmyOption();
    } //,
    // changeTooltipPaddingTop: function() {
    //   Vue.set(this.myOption.tooltip.padding, 0, this.setting.tooltipForm.background.padding.top);
    //   this.setmyOption();
    // },
    // changeTooltipPaddingBottom: function() {
    //           Vue.set(this.myOption.tooltip.padding, 2, this.setting.tooltipForm.background.padding.bottom);
    //           this.setmyOption();
    // },
    // changeTooltipPaddingLeft: function() {
    //           Vue.set(this.myOption.tooltip.padding, 3, this.setting.tooltipForm.background.padding.left);
    //           this.setmyOption();
    // },
    // changeTooltipPaddingRight: function() {
    //           Vue.set(this.myOption.tooltip.padding, 1, this.setting.tooltipForm.background.padding.right);
    //           this.setmyOption();
    // }
  },
  watch: {
    option: {
      handler(nval, oval) {
        this.myOption = nval;
      },
      deep: true
    }
  }
};
</script>
		<style type="text/css" scoped>
.style_input {
  width: 200px;
  text-align: right;
  margin-left: 20px;
}

.style_input span {
  margin-right: 15px;
}
</style>
