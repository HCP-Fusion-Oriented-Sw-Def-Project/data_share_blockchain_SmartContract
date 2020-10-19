	<template>
  <div class="setting">
    <el-collapse v-model="setting.activeCol" accordion>
      <el-collapse-item title="全局样式  Style" name="1">
        <el-form size="mini">
          <el-form-item label="字体">
            <el-select v-model="myOption.textStyle.fontFamily" @change="setmyOption">
              <el-option
                v-for="item in setting.fonts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item>
            <label style="display: block;color: #606266;font-size:14px;">位置</label>
            <div class="style_input">
              <div>
                <span>横向</span>
                <el-input-number
                  v-model="myOption.polar.center[0]"
                  controls-position="right"
                  @change="setmyOption"
                ></el-input-number>
              </div>
              <div>
                <span>纵向</span>
                <el-input-number
                  v-model="myOption.polar.center[1]"
                  controls-position="right"
                  @change="setmyOption"
                ></el-input-number>
              </div>
            </div>
          </el-form-item> -->
          <el-form-item label="半径">
            <el-input-number
              v-model="myOption.polar.radius"
              controls-position="right"
              :min="0"
              @change="setmyOption"
              style="width: 180px;"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="角度">
            <el-input-number
              v-model="myOption.angleAxis.startAngle"
              controls-position="right"
              @change="setmyOption"
              style="width: 180px;"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="工具栏" size="mini">
            <el-switch
              v-model="myOption.toolbox.show"
              style="margin-left: 120px;"
              @change="setmyOption"
            ></el-switch>
          </el-form-item>
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
            <el-collapse-item title="副标题样式" name="2">
              <el-form>
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

      <el-collapse-item title="径向轴 radiusAxis" name="3">
        <el-collapse accordion>
          <div style="width:20px;height:20px;"></div>
          <label style="color: #606266;font-size:14px;">显示</label>
          <el-switch v-model="myOption.radiusAxis.show" size="mini" style="margin-left:160px;"></el-switch>
          <el-collapse-item title="轴线" name="1">
            <el-form size="mini">

              <el-form-item label="宽度">
                <el-input-number
                  v-model="myOption.radiusAxis.axisLine.lineStyle.width"
                  controls-position="right"
                  @change="setmyOption"
                  style="margin-left:15px;"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="类型">
                <el-select
                  v-model="myOption.radiusAxis.axisLine.lineStyle.type" style="width:130px;margin-left:15px;"
                  @change="setmyOption"
                >
                  <el-option
                    v-for="item in setting.LineType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker
                  v-model="myOption.radiusAxis.axisLine.lineStyle.color"
                  @change="setmyOption" style="margin-left:15px;"
                ></el-color-picker>
              </el-form-item>
              <el-form-item label="刻度线">
                <el-switch v-model="myOption.radiusAxis.axisTick.show" ></el-switch>
              </el-form-item>
            </el-form>
          </el-collapse-item>

          <el-collapse-item title="标签" name="2">
            <el-form size="mini">
              <el-form-item label="显示">
                <el-switch v-model="myOption.radiusAxis.axisLabel.show" @change="setmyOption"></el-switch>
              </el-form-item>
              <el-form-item label="字号">
                <el-input-number
                  v-model="myOption.radiusAxis.axisLabel.fontSize"
                  @change="setmyOption"
                  controls-position="right"
                  :min="1"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="距离">
                <el-input-number
                  v-model="myOption.radiusAxis.axisLabel.margin"
                  @change="setmyOption"
                  controls-position="right"
                ></el-input-number>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <!--
											<el-collapse-item title="分割线" name='3'>
												<el-form size="mini">
													<el-form-item label="显示">
														<el-switch v-model="myOption.radiusAxis.splitLine.show" @change="setmyOption">
														</el-switch>
													</el-form-item>
													<el-form-item label="颜色">
														<el-color-picker v-model="myOption.radiusAxis.splitLine.lineStyle.color" @change=setmyOption></el-color-picker>
													</el-form-item>
												</el-form>
          </el-collapse-item>-->
        </el-collapse>
      </el-collapse-item>

      <el-collapse-item title="角度轴 angleAxis" name="4">
        <el-collapse accordion>
          <div style="width:20px;height:20px;"></div>
          <label style="color: #606266;font-size:14px;">显示</label>
          <el-switch v-model="myOption.angleAxis.show" size="mini" style="margin-left:160px;"></el-switch>
          <el-collapse-item title="轴线" name="1">
            <el-form size="mini">

              <el-form-item label="宽度">
                <el-input-number
                  v-model="myOption.angleAxis.axisLine.lineStyle.width"
                  controls-position="right"
                  @change="setmyOption" style="margin-left:15px;"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="类型">
                <el-select
                  v-model="myOption.angleAxis.axisLine.lineStyle.type"
                  @change="setmyOption"  style="margin-left:15px;width:130px;"
                >
                  <el-option
                    v-for="item in setting.LineType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="颜色">
                <el-color-picker
                  v-model="myOption.angleAxis.axisLine.lineStyle.color"
                  @change="setmyOption"  style="margin-left:15px;"
                ></el-color-picker>
              </el-form-item>
              <el-form-item label="刻度线">
                <el-switch v-model="myOption.angleAxis.axisTick.show"></el-switch>
              </el-form-item>
            </el-form>
          </el-collapse-item>

          <el-collapse-item title="标签" name="2">
            <el-form size="mini">
              <el-form-item label="显示">
                <el-switch v-model="myOption.angleAxis.axisLabel.show" @change="setmyOption"></el-switch>
              </el-form-item>
              <el-form-item label="字号">
                <el-input-number
                  v-model="myOption.angleAxis.axisLabel.fontSize"
                  @change="setmyOption"
                  controls-position="right"
                  :min="1"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="距离">
                <el-input-number
                  v-model="myOption.angleAxis.axisLabel.margin"
                  @change="setmyOption"
                  controls-position="right"
                ></el-input-number>
              </el-form-item>
            </el-form>
          </el-collapse-item>


          <el-collapse-item title="分割线" name="3">
            <el-form size="mini">
              <el-form-item label="显示">
                <el-switch v-model="myOption.angleAxis.splitLine.show" @change="setmyOption"></el-switch>
              </el-form-item>
              <el-form-item label="颜色">
                <el-color-picker
                  v-model="myOption.angleAxis.splitLine.lineStyle.color"
                  @change="setmyOption"
                ></el-color-picker>
              </el-form-item>
			  <el-form-item label="宽度">
                <el-input-number
                  v-model="myOption.angleAxis.splitLine.lineStyle.width" controls-position="right" :min="0"
                  @change="setmyOption"
                ></el-input-number>
              </el-form-item>
			  <el-form-item label="类型">
                <el-select v-model="myOption.angleAxis.splitLine.lineStyle.type" style="width:130px;" @change="setmyOption">
				<el-option
					v-for="item in setting.LineType"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
				</el-select>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
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
    import echarts from 'echarts'
 require('echarts/theme/macarons') // echarts theme
var i = 0;
export default {
	props: [ 'option' ],
	created() {
		this.myOption = this.option;
	},
  data() {
    return {
      myOption: {
      },

      setting: {
        activeTabTitleText: "1",
        activeCol: "1",
        activeTabLegend: "1",
        activeTooltip: "1",
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
          ]
        },
        tooltipForm: {
          triggers: [
            { value: "item", label: "数据项" },
            { value: "axis", label: "坐标轴" }
          ],
          triggerOns: [
            { value: "mousemove", label: "悬浮" },
            { value: "click", label: "点击" }
          ]
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

    changetype: function() {
      if (this.myOption.tooltip.axisPointer.type == "line") {
        this.setting.tooltipForm.isLine = true;
      } else {
        this.setting.tooltipForm.isLine = false;
      }
      this.setmyOption();
    }
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
