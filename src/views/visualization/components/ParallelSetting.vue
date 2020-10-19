<template>
  <div>
    <el-collapse v-model="setting.activeCol" accordion>
      <el-collapse-item title="全局样式  Style" name="1">
        <el-form  size="mini">
<!--          <el-form-item label="背景颜色" size="mini">-->
<!--            <el-color-picker v-model="myOption.backgroundColor" size="mini" @change="setmyOption"></el-color-picker>-->
<!--          </el-form-item>-->
          <el-form-item label="字体">

              <el-select v-model="myOption.textStyle.fontFamily" size="mini" @change="setmyOption">
                <el-option
                  v-for="item in setting.fonts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

          </el-form-item>
          <el-form-item>
            <label style="display: block;color: #606266;font-size:14px;">边距</label>
            <div class="style_input">
                  <div><span>顶部</span>
                    <el-input-number v-model="myOption.parallel.top" controls-position="right" :min="0" size="mini" @change="setmyOption" ></el-input-number>
                  </div>
                  <div><span>底部</span>
                    <el-input-number v-model="myOption.parallel.bottom" controls-position="right"  size="mini" :min="0" @change="setmyOption" ></el-input-number>
                  </div>
                  <div><span>左侧</span>
                    <el-input-number v-model="myOption.parallel.left" controls-position="right"  size="mini" :min="0" @change="setmyOption" ></el-input-number>
                  </div>
                  <div><span>右侧</span>
                    <el-input-number v-model="myOption.parallel.right" controls-position="right"  size="mini" :min="0" @change="setmyOption" ></el-input-number>
                  </div>
                </div>
          </el-form-item>
          <el-form-item label="近似曲线" size="mini">
            <el-switch v-model="myOption.series[0].smooth"  style="margin-left: 115px;" @change="setmyOption"> </el-switch>
          </el-form-item>
         <!--  <el-form-item label="允许点击折叠显示坐标轴" size="mini">
            <el-switch v-model="myOption.parallel.axisExpandable"  style="margin-left:17px;" @change="setmyOption"> </el-switch>
          </el-form-item>
 -->


          <!-- <el-form-item label="展开时轴间距" size="mini">
           <el-input-number
          v-model="myOption.parallel.axisExpandWidth" style="width:178px;margin-left: 40px;" controls-position="right" :min="0"
          size="mini" @change="setmyOption"
          @blur="setmyOption"></el-input-number>
        </el-form-item>  -->
          <el-form-item label="展开方式">
          <el-select
          v-model="myOption.parallel.axisExpandTriggerOn" size="mini" style="width:178px;margin-left: 40px;"
          @change="setmyOption">
          <el-option v-for="item in
          setting.styleForm.axisExpandTriggerOnOptions" :key="item.value"
          :label="item.label" :value="item.value"> </el-option> </el-select>
          </el-form-item>
           <el-form-item label="布局方式"> <el-select style="width:178px;margin-left: 40px;"
          v-model="myOption.parallel.layout" size="mini"
          @change="setmyOption"> <el-option v-for="item in
          setting.styleForm.layoutOptions" :key="item.value"
          :label="item.label" :value="item.value"> </el-option> </el-select>
          </el-form-item>
          <el-form-item label="工具栏"  size="mini">
                <el-switch v-model="myOption.toolbox.show"  style="margin-left: 125px;" @change="setmyOption"> </el-switch>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="平行坐标轴 Parallel" name="2">
              <el-form size="mini">
                <el-form-item label="坐标轴类型">
                  <el-select v-model="myOption.parallel.parallelAxisDefault.type" size="mini" @change="setmyOption">
                    <el-option
                      v-for="item in setting.styleForm.typeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="默认名称" >
                  <el-input v-model="myOption.parallel.parallelAxisDefault.name" style="width: 178px;margin-left: 15px" placeholder="请输入标题名" size="mini" @blur="setmyOption"></el-input>
                </el-form-item>
                <el-form-item label="名称位置">
                  <el-select v-model="myOption.parallel.parallelAxisDefault.nameLocation" style="margin-left: 15px" size="mini" @change="setmyOption">
                    <el-option
                      v-for="item in setting.styleForm.nameLocationOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="距离轴线" size="mini">
                  <el-input-number v-model="myOption.parallel.parallelAxisDefault.nameGap" style="margin-left: 15px;width: 178px;" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>
                </el-form-item>
                <el-form-item label="旋转角度" size="mini">
                  <el-input-number v-model="myOption.parallel.parallelAxisDefault.nameRotate" style="margin-left: 15px;width: 178px;" controls-position="right" :min="0"  @change="setmyOption"></el-input-number>
                </el-form-item>
                <el-form-item label="坐标轴反向" size="mini">
                  <el-switch v-model="myOption.parallel.parallelAxisDefault.inverse"  style="margin-left: 130px;" @change="setmyOption"> </el-switch>
                </el-form-item>
              </el-form>

              <el-collapse  accordion>
                <el-collapse-item title="文本" name="1">
                  <el-form size="mini">
                    <el-form-item label="颜色" size="mini">
                      <el-color-picker v-model="myOption.parallel.parallelAxisDefault.nameTextStyle.color" style="margin-left: 165px;" size="mini" @change="setmyOption"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="粗细" size="mini">
                      <el-select v-model="myOption.parallel.parallelAxisDefault.nameTextStyle.fontWeight" style="margin-left: 30px;" size="mini" @change="setmyOption">
                        <el-option
                          v-for="item in setting.fontWeight"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="大小" size="mini">
                      <el-input-number v-model="myOption.parallel.parallelAxisDefault.nameTextStyle.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="刻度" name="2">
                  <el-form ref="styleForm" :model="setting.styleForm">
                    <el-form-item label="显示" size="mini">
                      <el-switch v-model="myOption.parallel.parallelAxisDefault.axisTick.show"  style="margin-left: 165px;" @change="setmyOption"> </el-switch>
                    </el-form-item>
                    <!-- <el-form-item label="刻度朝内" size="mini">
                      <el-switch v-model="myOption.parallel.parallelAxisDefault.axisTick.inside"  style="margin-left: 135px;" @change="setmyOption"> </el-switch>
                    </el-form-item> -->
                    <el-form-item label="颜色" size="mini">
                      <el-color-picker v-model="myOption.parallel.parallelAxisDefault.axisTick.lineStyle.color" style="margin-left: 165px;" size="mini" @change="setmyOption"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="长度" size="mini">
                      <el-input-number v-model="myOption.parallel.parallelAxisDefault.axisTick.length" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>
                    </el-form-item>
                    <el-form-item label="宽度" size="mini">
                      <el-input-number v-model="myOption.parallel.parallelAxisDefault.axisTick.lineStyle.width" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>
                    </el-form-item>
                    <el-form-item label="类型" size="mini">
                      <el-select v-model="myOption.parallel.parallelAxisDefault.axisTick.lineStyle.type" style="margin-left: 30px;" @change="setmyOption">
                        <el-option
                          v-for="item in setting.lineType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="标签" name="3">
                  <el-form ref="styleForm" :model="setting.styleForm">
                    <el-form-item label="颜色" size="mini">
                      <el-color-picker v-model="myOption.parallel.parallelAxisDefault.axisLabel.color" style="margin-left: 165px;" size="mini" @change="setmyOption"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="显示" size="mini">
                      <el-switch v-model="myOption.parallel.parallelAxisDefault.axisLabel.show"  style="margin-left: 165px;" @change="setmyOption"> </el-switch>
                    </el-form-item>
                    <!-- <el-form-item label="标签朝内" size="mini">
                      <el-switch v-model="myOption.parallel.parallelAxisDefault.axisLabel.inside"  style="margin-left: 135px;" @change="setmyOption"> </el-switch>
                    </el-form-item> -->

                    <el-form-item label="角度" size="mini">
                      <el-input-number v-model="myOption.parallel.parallelAxisDefault.axisLabel.rotate"  style="margin-left: 30px; width: 178px;" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>
                    </el-form-item>
                    <el-form-item label="距离轴线" size="mini">
                      <el-input-number v-model="myOption.parallel.parallelAxisDefault.axisLabel.margin" style="width: 178px;" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>
                    </el-form-item>
                    <el-form-item label="大小" size="mini">
                      <el-input-number v-model="myOption.parallel.parallelAxisDefault.axisLabel.fontSize" style="margin-left: 30px; width: 178px;" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>
                    </el-form-item>
                    <el-form-item label="粗细">
                      <el-select v-model="myOption.parallel.parallelAxisDefault.axisLabel.fontWeight" style="margin-left: 30px;" size="mini" @change="setmyOption">
                        <el-option
                          v-for="item in setting.fontWeight"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
              </el-collapse>

      </el-collapse-item>

      <el-collapse-item title="标题  Title" name="3" >
        <el-form>
          <el-form-item label="显示" size="mini">
            <el-switch v-model="myOption.title.show"  style="margin-left: 165px;" @change="setmyOption"> </el-switch>
          </el-form-item>
          <el-collapse v-model="setting.activeTabTitleText" accordion>
            <el-collapse-item title="主标题样式" name="1">
              <el-form>
                <el-form-item label="内容" size="mini">
                  <el-input v-model="myOption.title.text" style="margin-left: 30px;width: 178px;" placeholder="请输入主标题内容"  @change="setmyOption"></el-input>
                </el-form-item>
                <el-form-item label="链接" size="mini">
                  <el-input v-model="myOption.title.link" style="margin-left: 30px;width: 178px;" placeholder="请输入主标题链接" @change="setmyOption"></el-input>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.title.textStyle.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50"  @change="setmyOption"></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.title.textStyle.fontWeight" style="margin-left: 30px;width: 178px;" @change="setmyOption">
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.title.textStyle.color" style="margin-left: 30px;" @change="setmyOption"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="副标题样式" name="2">
              <el-form>
                <el-form-item label="内容" size="mini">
                  <el-input v-model="myOption.title.subtext" style="margin-left: 30px;width: 178px;" placeholder="请输入副标题内容"  @change="setmyOption"></el-input>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.title.subtextStyle.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50"  @change="setmyOption" ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.title.subtextStyle.fontWeight" style="margin-left: 30px;width: 178px;" @change="setmyOption">
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.title.subtextStyle.color" style="margin-left: 30px;" @change="setmyOption"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="布局" name="3">
                  <el-form  :inline="true" size="mini">
                    <el-form-item label="标题间距" size="mini">
                      <el-input-number v-model="myOption.title.itemGap" style="width: 150px;margin-left: 10px;" controls-position="right" :min="0" :max="50" @change="setmyOption"></el-input-number>
                    </el-form-item>
                    <el-form-item label="水平对齐" size="mini">
                      <el-select v-model="myOption.title.textAlign" style="width: 150px;margin-left: 10px;" @change="setmyOption">
                        <el-option
                        v-for="item in setting.titleForm.textAlign"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="横向方位">
                      <el-input-number style="width: 150px;margin-left: 10px;" v-model="myOption.title.left" controls-position="right" @change="setmyOption"  :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="纵向方位">
                      <el-input-number style="width: 150px;margin-left: 10px;" v-model="myOption.title.top" controls-position="right" @change="setmyOption"  :min="0"></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-collapse-item>


      <el-collapse-item title="连线样式 Line Style" name="4">
        <el-form ref="lineStyleForm" :model="setting.lineStyleForm">
          <el-form-item label="颜色" size="mini">
            <el-color-picker v-model="myOption.series[0].lineStyle.color"   style="margin-left: 10px;" @change="setmyOption"></el-color-picker>
          </el-form-item>
          <el-form-item label="宽度" size="mini">
            <el-input-number v-model="myOption.series[0].lineStyle.width" style="margin-left:10px; width: 178px;" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>
          </el-form-item>
          <el-form-item label="类型" size="mini">
            <el-select v-model="myOption.series[0].lineStyle.type" style="margin-left: 10px" size="mini" @change="setmyOption">
              <el-option
                v-for="item in setting.lineType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-collapse-item>

<!--      <el-collapse-item title="图例  Legend" name="4">-->
<!--        <div style="margin-left: 10px;margin-right: 10px;">-->
<!--          <el-form>-->
<!--            <el-form-item label="显示" size="mini">-->
<!--              <el-switch v-model="myOption.legend.show"  style="margin-left: 120px;" @change="setmyOption"> </el-switch>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <el-collapse v-model="setting.activeTabLegend" accordion>-->
<!--            <el-collapse-item title="文本" name="1">-->
<!--              <el-form>-->
<!--                <el-form-item label="字号" size="mini">-->
<!--                  <el-input-number v-model="myOption.legend.textStyle.fontSize"  style="margin-left: 25px;" controls-position="right" :min="0" :max="50"  @change="setmyOption"></el-input-number>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="粗细" size="mini">-->
<!--                  <el-select v-model="myOption.legend.textStyle.fontWeight"  style="margin-left: 25px;width: 130px;" @change="setmyOption">-->
<!--                    <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value">-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="颜色" size="mini">-->
<!--                  <el-color-picker v-model="myOption.legend.textStyle.color"   style="margin-left: 25px;" @change="setmyOption"></el-color-picker>-->
<!--                </el-form-item>-->
<!--              </el-form>-->
<!--            </el-collapse-item>-->

<!--            <el-collapse-item title="布局" name="2">-->
<!--              <el-form :inline="true" size="mini">-->
<!--                <el-form-item label="横向方位">-->
<!--                  <el-input-number style="width: 150px;margin-left: 10px;" v-model="myOption.legend.left" controls-position="right" @change="setmyOption"  :min="0"></el-input-number>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="纵向方位">-->
<!--                  <el-input-number style="width: 150px;margin-left: 10px;" v-model="myOption.legend.top" controls-position="right" @change="setmyOption"  :min="0"></el-input-number>-->
<!--                </el-form-item>-->
<!--                &lt;!&ndash;                <el-form-item label="间距" >&ndash;&gt;-->
<!--                &lt;!&ndash;                  <el-input-number v-model="myOption.legend.itemGap" controls-position="right" size="mini" @change="setmyOption" @blur="setmyOption" ></el-input-number>&ndash;&gt;-->
<!--                &lt;!&ndash;                  <span>左右间距</span>&ndash;&gt;-->
<!--                &lt;!&ndash;                  <el-input-number v-model="setting.legendForm.layout.margin_tb" controls-position="right" size="mini" @change="changeLegendMarginTopBottom" @blur="changeLegendMarginTopBottom" ></el-input-number>&ndash;&gt;-->
<!--                &lt;!&ndash;                  <span>上下间距</span>&ndash;&gt;-->
<!--                &lt;!&ndash;                </el-form-item>&ndash;&gt;-->
<!--                &lt;!&ndash;                <el-form-item label="位置">&ndash;&gt;-->
<!--                &lt;!&ndash;                  <el-select v-model="setting.legendForm.layout.location" size="mini" @change="changeLegendPosition">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <el-option&ndash;&gt;-->
<!--                &lt;!&ndash;                      v-for="item in setting.legendForm.layout.locationOptions"&ndash;&gt;-->
<!--                &lt;!&ndash;                      :key="item.value"&ndash;&gt;-->
<!--                &lt;!&ndash;                      :label="item.label"&ndash;&gt;-->
<!--                &lt;!&ndash;                      :value="item.value">&ndash;&gt;-->
<!--                &lt;!&ndash;                    </el-option>&ndash;&gt;-->
<!--                &lt;!&ndash;                  </el-select>&ndash;&gt;-->
<!--                &lt;!&ndash;                </el-form-item>&ndash;&gt;-->
<!--              </el-form>-->
<!--            </el-collapse-item>-->
<!--          </el-collapse>-->
<!--        </div>-->
<!--      </el-collapse-item>-->
<!--
      <el-collapse-item title="提示框  Tooltip" name="5">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form>
            <el-form-item label="触发类型" size="mini">
              <el-select v-model="myOption.tooltip.trigger"  @change="setmyOption">
                <el-option v-for="item in setting.tooltipForm.triggers" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="触发动作" size="mini">
              <el-select v-model="myOption.tooltip.triggerOn"  @change="setmyOption">
                <el-option v-for="item in setting.tooltipForm.triggerOns" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="消失延迟时间" size="mini">
              <el-input-number style="width: 150px;" v-model="myOption.tooltip.hideDelay" controls-position="right" :min="0"  @change="setmyOption" ></el-input-number>
            </el-form-item>
          </el-form>
          <el-collapse v-model="setting.activeTabTooltip" accordion>
            <el-collapse-item title="背景框样式" name="1">
              <el-form>

                <el-form-item size="mini">
                  <label style="display: block;color: #606266;font-size:14px;">内边距</label>
                  <div class="style_input">

                    <div><span>顶部</span>
                      <el-input-number v-model="myOption.tooltip.padding[0]" controls-position="right" :min="0"  @change="setmyOption" ></el-input-number>
                    </div>
                    <div><span>底部</span>
                      <el-input-number v-model="myOption.tooltip.padding[2]" controls-position="right"   :min="0" @change="setmyOption" ></el-input-number>
                    </div>
                    <div><span>左侧</span>
                      <el-input-number v-model="myOption.tooltip.padding[3]" controls-position="right" :min="0" @change="setmyOption" ></el-input-number>
                    </div>
                    <div><span>右侧</span>
                      <el-input-number v-model="myOption.tooltip.padding[1]" controls-position="right"  :min="0" @change="setmyOption" ></el-input-number>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item label="边框粗细" size="mini">
                  <el-input-number v-model="myOption.tooltip.borderWidth" style="margin-left: 20px;" controls-position="right"  @change="setmyOption"  :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="边框颜色" size="mini">
                  <el-color-picker show-alpha style="margin-left: 20px;" v-model="myOption.tooltip.borderColor" @change="setmyOption"></el-color-picker>
                </el-form-item>
                <el-form-item label="背景颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.backgroundColor" style="margin-left: 20px;" @change="setmyOption" show-alpha></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="文本样式" name="2">
              <el-form size="mini">
                <el-form-item label="字体" >
                  <el-select v-model="myOption.tooltip.textStyle.fontFamily"  @change="setmyOption"  style="margin-left: 25px;" >
                    <el-option v-for="item in setting.fonts" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.tooltip.textStyle.fontSize"  style="margin-left: 25px;width: 178px;" controls-position="right" :min="0" :max="50" @change="setmyOption" ></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.tooltip.textStyle.fontWeight" style="margin-left: 25px;"  @change="setmyOption">
                    <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.textStyle.color"   style="margin-left: 25px;" @change="setmyOption"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="坐标轴指示器" name="3">
              <el-form>
                <el-form-item label="类型" size="mini">
                  <el-select v-model="myOption.tooltip.axisPointer.type"  @change="changetype" style="width: 130px;margin-left: 40px;">
                    <el-option v-for="item in setting.pointerType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线宽度" size="mini">
                  <el-input-number v-model="myOption.tooltip.axisPointer.lineStyle.width" controls-position="right" :min="0"  @change="setmyOption" ></el-input-number>
                </el-form-item>
                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线类型" size="mini">
                  <el-select v-model="myOption.tooltip.axisPointer.lineStyle.type"  style="width: 130px;">
                    <el-option v-for="item in setting.lineType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.axisPointer.lineStyle.color"  @change="setmyOption"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item> -->
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
      <el-collapse-item title="动画  Animation" name="5">
        <el-form>
          <el-form-item label="初始动画时长" size="mini">
            <el-input-number v-model="myOption.animationDuration" controls-position="right" :min="0"  @change="setmyOption" ></el-input-number>
          </el-form-item>
          <el-form-item label="缓动效果" size="mini" >
            <el-select v-model="myOption.animationEasing" @change="setmyOption" style="margin-left: 30px;width:130px;">
              <el-option v-for="item in setting.animationEasing" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更新动画时长" size="mini">
            <el-input-number v-model="myOption.animationDurationUpdate" controls-position="right" :min="0"  @change="setmyOption" ></el-input-number>
          </el-form-item>
        </el-form>
        <!--            <div>从之前位置开始</div>-->
      </el-collapse-item>

      <!--            <el-collapse-item title="数据系列  Data series" name="6">-->
      <!--              <el-form ref="dataSeries" :model="setting.dataSeries.series" size="mini">-->
      <!--                <el-form-item label="系列名" size="mini">-->
      <!--                  <el-input v-model="setting.dataSeries.series.seriesName" size="mini" @change="setmyOption"></el-input>-->
      <!--                </el-form-item>-->
      <!--                <el-collapse>-->
      <!--                  <el-collapse-item title="折线">-->
      <!--                    <el-form ref="dataSeries" :model="setting.dataSeries.series.lineStyle" size="mini">-->
      <!--                      <el-form-item label="颜色" size="mini">-->
      <!--                        <el-color-picker v-model="setting.dataSeries.series.lineStyle.color" size="mini" @change="setmyOption"></el-color-picker>-->
      <!--                      </el-form-item>-->
      <!--                      <el-form-item label="样式" size="mini">-->
      <!--                        <el-select v-model="setting.dataSeries.series.initLineType" size="mini"  @change="setmyOption">-->
      <!--                          <el-option-->
      <!--                            v-for="item in setting.dataSeries.series.lineStyle.type"-->
      <!--                            :key="item.value"-->
      <!--                            :label="item.label"-->
      <!--                            :value="item.value">-->
      <!--                          </el-option>-->
      <!--                        </el-select>-->
      <!--                      </el-form-item>-->
      <!--                      <el-form-item label="粗细" size="mini">-->
      <!--                        <el-select v-model="setting.dataSeries.series.lineStyle.fontWeight" size="mini"  @change="setmyOption">-->
      <!--                          <el-option-->
      <!--                            v-for="item in setting.fontWeight"-->
      <!--                            :key="item.value"-->
      <!--                            :label="item.label"-->
      <!--                            :value="item.value">-->
      <!--                          </el-option>-->
      <!--                        </el-select>-->
      <!--                      </el-form-item>-->
      <!--                      <el-form-item  label="近似曲线" size="mini">-->
      <!--                        <el-checkbox v-model="setting.dataSeries.series.lineStyle.curve" @change="setmyOption" @blur="setmyOption"></el-checkbox>-->
      <!--                      </el-form-item>-->
      <!--                    </el-form>-->
      <!--                  </el-collapse-item>-->
      <!--                </el-collapse>-->
      <!--              </el-form>-->

      <!--              <el-collapse>-->
      <!--                <el-collapse-item title="圆点">-->
      <!--                  <el-form ref="dataSeries" :model="setting.dataSeries.dot" size="mini">-->
      <!--                    <el-form-item label="颜色" size="mini">-->
      <!--                      <el-color-picker v-model="setting.dataSeries.dot.color" size="mini" @change="setmyOption"></el-color-picker>-->
      <!--                    </el-form-item>-->
      <!--                    <el-form-item label="半径">-->
      <!--                      <el-input-number v-model="setting.dataSeries.dot.radius" controls-position="right" :min="1" size="mini" @change="setmyOption"></el-input-number>-->
      <!--                    </el-form-item>-->
      <!--                  </el-form>-->
      <!--                </el-collapse-item>-->
      <!--                <el-collapse-item title="区域">-->
      <!--                  <el-form ref="dataSeries" :model="setting.dataSeries.area" size="mini">-->
      <!--                    <el-form-item label="颜色" size="mini">-->
      <!--                      <el-color-picker v-model="setting.dataSeries.area.color" size="mini" @change="setmyOption"></el-color-picker>-->
      <!--                    </el-form-item>-->
      <!--                  </el-form>-->
      <!--                </el-collapse-item>-->
      <!--              </el-collapse>-->
      <!--            </el-collapse-item>-->
    </el-collapse>
  </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "ParallelSetting",
        props: ['option'],
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
                    activeTabY: "1",
                    activeCol: "1",
                    activeTabLegend: "1",
                    activeTabParallelAxisDefault: "1",
                    activeTabParallelAxisDefaultAxisTick: "1",
                    activeTabParallelAxisDefaultAxisLabel: "1",
                    lineType: [
                        {
                            label: '实线',
                            value: 'solid'
                        },{
                            label: '虚线',
                            value: 'dashed'
                        },{
                            label: '点线',
                            value: 'dotted'
                        }
                    ],
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
                        margin_top: '0',
                        margin_bottom: '0',
                        margin_left: '0',
                        margin_right: '0',
                        axisExpandable: false,
                        axisExpandWidth: 50,
                        layout: 'horizontal',
                        smoth: false,
                        axisExpandTriggerOn: 'click',
                        parallelAxisDefault: {
                            type: 'value',
                            name: '',
                            nameLocation: 'end',
                            nameGap: 15,
                            nameRotate: null,
                            inverse: false,
                            splitNumber: 5,
                            nameTextStyle: {
                                color: '#000',
                                fontWeight: 'normal',
                                fontSize: 12
                            },
                            align: null,
                            verticalAlign: null
                        },
                        alignOptions: [
                            {
                                label: '左部',
                                value: 'left'
                            },{
                                label: '中间',
                                value: 'center'
                            },{
                                label: '右部',
                                value: 'right'
                            },{
                                label: '自动',
                                value: null
                            }
                        ],
                        verticalAlignOptions: [
                            {
                                label: '头部',
                                value: 'top'
                            },{
                                label: '中间',
                                value: 'middle'
                            },{
                                label: '底部',
                                value: 'bottom'
                            },{
                                label: '自动',
                                value: null
                            }
                        ],
                        nameLocationOptions: [
                            {
                                label: '头部',
                                value: 'start'
                            },{
                                label: '中间',
                                value: 'middle'
                            },{
                                label: '尾部',
                                value: 'end'
                            }
                        ],
                        typeOptions: [
                            {
                                label: '数值轴',
                                value: 'value'
                            },{
                                label: '类目轴',
                                value: 'category'
                            },{
                                label: '时间轴',
                                value: 'time'
                            },{
                                label: '对数轴',
                                value: 'log'
                            }
                        ],
                        axisExpandTriggerOnOptions: [
                            {
                                label: '点击',
                                value: 'click'
                            },{
                                label: '悬浮',
                                value: 'mousemove'
                            }
                        ],
                        layoutOptions: [
                            {
                                label: '水平',
                                value: 'horizontal'
                            },{
                                label: '竖直',
                                value: 'vertical'
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
                    ],

                    legendForm: {
                        text: {
                            fontSize: "12",
                            color: "#000",
                            fontWeight: "normal"
                        },
                        layout: {
                            margin_lr: "8",
                            margin_tb: "0",
                            location: "topCenter",
                            locationOptions: [
                                {
                                    label: '顶部居左',
                                    value: 'topLeft'
                                },{
                                    label: '顶部居中',
                                    value: 'topCenter'
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
                            ],
                        },
                        type: [
                            {
                                label: '普通',
                                value: 'plain'
                            },{
                                label: '可滚动翻页',
                                value: 'scroll'
                            }
                        ],
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
                            padding: {
                                top: 5,
                                bottom: 5,
                                left: 5,
                                right: 5
                            },
                            borderColor: '#333',
                            borderWidth: 0,
                        },
                        text: {
                            font: 'sans-serif',
                            fontSize: 14,
                            color: '#fff',
                            fontWeight: 'normal'
                        }
                    },
                    lineStyleForm: {
                        color: '#000',
                        width: 2,
                        type: 'solid'
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
                            seriesName: '系列1',
                            lineStyle: {
                                curve: false,
                                initLineType: 'solid',
                                type: [
                                    {
                                        label: '实线',
                                        value: 'solid'
                                    },
                                    {
                                        label: '虚线',
                                        value: 'dashed'
                                    },
                                    {
                                        label: '点线',
                                        value: 'dotted'
                                    }
                                ],
                                color: '#555',
                                fontWeight: ''
                            }
                        },
                        dot: {
                            color: '#555',
                            radius: 8
                        },
                        area: {
                            color: '#555'
                        }

                    }
                }
            }
        },
        computed: {
            isCatatoryAxis: function () {
                return true;
            },
            isTimeAxis: function () {
                return true;
            },
            isTimeOrValueAxis: function () {
                return this.isTimeAxis || this.isValueAxis;
            },
            isValueAxis: function () {
                return true;
            }
        },
        mounted() {
            this.setmyOption();
        },
        methods: {
            setmyOption: function () {
                this.$emit('change', this.myOption);
            },
            changetype:function(){
                if(this.myOption.tooltip.axisPointer.type==='line')
                {
                    this.setting.tooltipForm.isLine=true;
                }
                else{
                    this.setting.tooltipForm.isLine=false;
                }
                this.setmyOption();
            },
            changeLegendMarginTopBottom: function() {
                if (this.setting.legendForm.layout.margin_tb !== 0) {
                    if (this.setting.legendForm.layout.location.indexOf('top') >= 0){ //图例在顶部
                        this.myOption.legend.top = this.setting.legendForm.layout.margin_tb;
                        this.myOption.legend.bottom = 'auto';
                    }else if (this.setting.legendForm.layout.location.indexOf('bottom') >= 0){ //图例在底部
                        this.myOption.legend.top = "auto";
                        this.myOption.legend.bottom = this.setting.legendForm.layout.margin_tb;
                    }
                    this.setmyOption();
                }
            },
            changeLegendPosition: function() {
                this.myOption.legend.top = 'auto';
                this.myOption.legend.bottom = 'auto';
                this.myOption.legend.left = 'auto';
                this.myOption.legend.right = 'auto';
                if (this.setting.legendForm.layout.location === 'topLeft'){
                    this.myOption.legend.top = 'top';
                    this.myOption.legend.left = 'left';
                }else if (this.setting.legendForm.layout.location === 'topCenter'){
                    this.myOption.legend.top = 'top';
                    this.myOption.legend.left = 'center';
                }else if (this.setting.legendForm.layout.location === 'topRight'){
                    this.myOption.legend.top = 'top';
                    this.myOption.legend.left = 'right';
                }else if (this.setting.legendForm.layout.location === 'bottomLeft'){
                    this.myOption.legend.top = 'bottom';
                    this.myOption.legend.left = 'left';
                }else if (this.setting.legendForm.layout.location === 'bottomCenter'){
                    this.myOption.legend.top = 'bottom';
                    this.myOption.legend.left = 'center';
                }else if (this.setting.legendForm.layout.location === 'bottomRight'){
                    this.myOption.legend.top = 'bottom';
                    this.myOption.legend.left = 'right';
                }
                this.changeLegendMarginTopBottom();
                this.setmyOption();
            },
            changeTooltipPaddingTop: function() {
                Vue.set(this.myOption.tooltip.padding, 0, this.setting.tooltipForm.background.padding.top);
                this.setmyOption();
            },
            changeTooltipPaddingBottom: function() {
                Vue.set(this.myOption.tooltip.padding, 2, this.setting.tooltipForm.background.padding.bottom);
                this.setmyOption();
            },
            changeTooltipPaddingLeft: function() {
                Vue.set(this.myOption.tooltip.padding, 3, this.setting.tooltipForm.background.padding.left);
                this.setmyOption();
            },
            changeTooltipPaddingRight: function() {
                Vue.set(this.myOption.tooltip.padding, 1, this.setting.tooltipForm.background.padding.right);
                this.setmyOption();
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
