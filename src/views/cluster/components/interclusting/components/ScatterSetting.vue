<template>
  <div>
    <el-collapse v-model="setting.activeCol" accordion>
      <el-collapse-item title="全局样式  Style" name="1">
        <el-form ref="styleForm" :model="setting.styleForm" :inline="true" size="mini">
          <el-form-item>
            <label style="display: block;color: #606266;font-size:14px;">字体</label>
            <div class="style_input">
              <el-select v-model="myOption.textStyle.fontFamily" size="mini" @change="setmyOption">
                <el-option
                  v-for="item in setting.fonts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <label style="display: block;color: #606266;font-size:14px;">边距</label>
            <!-- <div id="distance_bianju" > -->
            <div class="style_input">
              <div>
                <span>顶部</span>
                <el-input-number v-model="myOption.grid.top" controls-position="right" :min="0" size="mini" @change="setmyOption" />
              </div>
              <div>
                <span>底部</span>
                <el-input-number v-model="myOption.grid.bottom" controls-position="right" size="mini" :min="0" @change="setmyOption" />
              </div>
              <div>
                <span>左侧</span>
                <el-input-number v-model="myOption.grid.left" controls-position="right" size="mini" :min="0" @change="setmyOption" />
              </div>
              <div>
                <span>右侧</span>
                <el-input-number v-model="myOption.grid.right" controls-position="right" size="mini" :min="0" @change="setmyOption" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="工具栏" size="mini">
            <el-switch v-model="myOption.toolbox.show" style="margin-left: 120px;" @change="setmyOption" />
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="标题  Title" name="2">
        <el-form>
          <el-form-item label="显示" size="mini">
            <el-switch v-model="myOption.title.show" style="margin-left: 165px;" @change="setmyOption" />
          </el-form-item>

          <el-collapse v-model="setting.activeTabTitleText" accordion>
            <el-collapse-item title="主标题样式" name="1">
              <el-form>
                <el-form-item label="内容" size="mini">
                  <el-input v-model="myOption.title.text" style="margin-left: 30px;width: 178px;" placeholder="请输入主标题内容" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="链接" size="mini">
                  <el-input v-model="myOption.title.link" style="margin-left: 30px;width: 178px;" placeholder="请输入主标题链接" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.title.textStyle.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.title.textStyle.fontWeight" style="margin-left: 30px;width: 178px;" @change="setmyOption">
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.title.textStyle.color" style="margin-left: 30px;" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="副标题样式" name="2">
              <el-form>
                <el-form-item label="内容" size="mini">
                  <el-input v-model="myOption.title.subtext" style="margin-left: 30px;width: 178px;" placeholder="请输入副标题内容" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.title.subtextStyle.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.title.subtextStyle.fontWeight" style="margin-left: 30px;width: 178px;" @change="setmyOption">
                    <el-option
                      v-for="item in setting.fontWeight"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.title.subtextStyle.color" style="margin-left: 30px;" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="布局" name="3">
              <el-form :inline="true" size="mini">
                <el-form-item label="标题间距" size="mini">
                  <el-input-number v-model="myOption.title.itemGap" style="width: 150px;margin-left: 10px;" controls-position="right" :min="0" :max="50" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="水平对齐" size="mini">
                  <el-select v-model="myOption.title.textAlign" style="width: 150px;margin-left: 10px;" @change="setmyOption">
                    <el-option
                      v-for="item in setting.titleForm.textAlign"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="横向方位">
                  <el-input-number v-model="myOption.title.left" style="width: 150px;margin-left: 10px;" controls-position="right" :min="0" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="纵向方位">
                  <el-input-number v-model="myOption.title.top" style="width: 150px;margin-left: 10px;" controls-position="right" :min="0" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="x轴  XAxis" name="3">
        <div style="margin-left: 10px;margin-right: 10px;">
          <!--          <el-form>-->
          <!--            <el-form-item label="是否反向">-->
          <!--              <el-checkbox v-model="myOption.xAxis[0].inverse" size="small" @change="setmyOption">-->
          <!--              </el-checkbox>-->
          <!--            </el-form-item>-->
          <!--            <el-form-item label="留白">-->
          <!--              <el-checkbox v-model="myOption.xAxis[0].boundaryGap" size="small" @change="setmyOption">-->
          <!--              </el-checkbox>-->
          <!--            </el-form-item>-->
          <!--          </el-form>-->
          <el-collapse v-model="setting.activeTabX" accordion>
            <el-collapse-item title="文本" name="1">
              <el-form>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.xAxis[0].axisLabel.textStyle.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.xAxis[0].axisLabel.textStyle.fontWeight" style="margin-left: 30px;width: 178px;" @change="setmyOption">
                    <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.xAxis[0].axisLabel.textStyle.color" style="margin-left: 30px;" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="轴标签" name="2">
              <el-form>
                <el-form-item label="角度" size="mini">
                  <el-input-number v-model="myOption.xAxis[0].axisLabel.rotate" style="margin-left: 30px;width: 178px;" controls-position="right" :min="-90" :max="90" @change="setmyOption" />
                </el-form-item>
                <!--                <el-form-item label="标签朝内">-->
                <!--                  <el-checkbox v-model="myOption.xAxis[0].axisLabel.inside" size="small" @change="setmyOption">-->
                <!--                  </el-checkbox>-->
                <!--                </el-form-item>-->
                <el-form-item label="距离" size="mini">
                  <el-input-number v-model="myOption.xAxis[0].axisLabel.margin" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="200" @change="setmyOption" />
                </el-form-item>
                <!--                    <el-form-item label="最大值" size="mini">-->
                <!--                      <el-input v-model="setting.xAxisForm.max" placeholder="请输入最大值" @blur="setmyOption"></el-input>-->
                <!--                    </el-form-item>-->
                <!--                    <el-form-item label="最小值" size="mini">-->
                <!--                      <el-input v-model="setting.xAxisForm.min" placeholder="请输入最小值" @blur="setmyOption"></el-input>-->
                <!--                    </el-form-item>-->
                <!--                    <el-form-item label="位移" size="mini">-->
                <!--                      <el-input-number v-model="setting.xAxisForm.offset" controls-position="right" @change="setmyOption" @blur="setmyOption" :min="0"></el-input-number>-->
                <!--                    </el-form-item>-->
                <!--<el-form-item label="数量" size="mini">
                  <el-color-picker v-model="setting.xAxisForm.color" size="mini" @change="setmyOption"></el-color-picker>
                </el-form-item> -->
                <!--                <el-form-item label="位移" size="mini">-->
                <!--                  <el-input-number v-model="myOption.xAxis[0].offset" controls-position="right" @change="setmyOption" @blur="setmyOption" :min="0"></el-input-number>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="角度" size="mini">-->
                <!--                  <el-select v-model="myOption.xAxis[0].axisLabel.rotate" size="mini" @change="setmyOption">-->
                <!--                    <el-option-->
                <!--                      v-for="item in setting.rotates"-->
                <!--                      :key="item.value"-->
                <!--                      :label="item.label"-->
                <!--                      :value="item.value">-->
                <!--                    </el-option>-->
                <!--                  </el-select>-->
                <!--                </el-form-item>-->
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="轴单位" name="3">
              <el-form>
                <el-form-item label="单位" size="mini">
                  <el-input v-model="myOption.xAxis[0].name" placeholder="请输入单位" style="margin-left: 30px;width: 178px;" @change="setmyOption" />
                </el-form-item>
                <!--                <el-form-item label="位置">-->
                <!--                  <el-select v-model="myOption.xAxis[0].nameLocation" size="mini" @change="setmyOption">-->
                <!--                    <el-option-->
                <!--                      v-for="item in setting.nameLocation"-->
                <!--                      :key="item.value"-->
                <!--                      :label="item.label"-->
                <!--                      :value="item.value">-->
                <!--                    </el-option>-->
                <!--                  </el-select>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="与轴线距离" size="mini">-->
                <!--                  <el-input-number v-model="myOption.xAxis[0].nameGap" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="角度" size="mini">-->
                <!--                  <el-input-number v-model="myOption.xAxis[0].nameRotate" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>-->
                <!--                </el-form-item>-->
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="轴线" name="4">
              <el-form ref="xAxisForm" :model="myOption.xAxisForm">
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.xAxis[0].axisLine.lineStyle.color" style="margin-left: 30px;" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="网格线" name="5">
              <el-form>
                <el-form-item label="显示" size="mini">
                  <el-switch v-model="myOption.xAxis[0].splitLine.show" style="margin-left: 30px;" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.xAxis[0].splitLine.lineStyle.color" show-alpha style="margin-left: 30px;" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>

      <el-collapse-item title="y轴  YAxis" name="4">
        <div style="margin-left: 10px;margin-right: 10px;">
          <!--          <el-form>-->
          <!--            <el-form-item label="是否反向">-->
          <!--              <el-checkbox v-model="myOption.yAxis[0].inverse" size="small" @change="setmyOption">-->
          <!--              </el-checkbox>-->
          <!--            </el-form-item>-->
          <!--            <el-form-item label="最小值">-->
          <!--              <el-select v-model="myOption.yAxis[0].min" size="mini" @change="setmyOption">-->
          <!--                <el-option-->
          <!--                  v-for="item in setting.yAxisForm.min"-->
          <!--                  :key="item.value"-->
          <!--                  :label="item.label"-->
          <!--                  :value="item.value">-->
          <!--                </el-option>-->
          <!--              </el-select>-->
          <!--            </el-form-item>-->
          <!--            <el-form-item label="最大值">-->
          <!--              <el-select v-model="myOption.yAxis[0].max" size="mini" @change="setmyOption">-->
          <!--                <el-option-->
          <!--                  v-for="item in setting.yAxisForm.max"-->
          <!--                  :key="item.value"-->
          <!--                  :label="item.label"-->
          <!--                  :value="item.value">-->
          <!--                </el-option>-->
          <!--              </el-select>-->
          <!--            </el-form-item>-->
          <!--          </el-form>-->
          <el-collapse v-model="setting.activeTabY" accordion>
            <el-collapse-item title="文本" name="1">
              <el-form size="mini">
                <el-form-item label="字号">
                  <el-input-number v-model="myOption.yAxis[0].axisLabel.textStyle.fontSize" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="粗细">
                  <el-select v-model="myOption.yAxis[0].axisLabel.textStyle.fontWeight" style="margin-left: 30px;width: 178px;" @change="setmyOption">
                    <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker v-model="myOption.yAxis[0].axisLabel.textStyle.color" style="margin-left: 30px;width: 178px;" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="轴标签" name="2">
              <el-form size="mini">
                <!--                    <el-form-item label="留白" size="mini">-->
                <!--                      <el-checkbox v-model="setting.yAxisForm.boundaryGapCheck" @change="setmyOption" @blur="setmyOption"></el-checkbox>-->
                <!--                    </el-form-item>-->
                <!--                    <el-form-item label="留白距离" size="mini">-->
                <!--                      <div style="margin-top: 20px"></div>-->
                <!--                      <el-slider v-model="boundaryGap" :min='0' :max='100' show-input :step="10" input-size="mini" @change="setmyOption" @input="setmyOption">-->
                <!--                      </el-slider>-->
                <!--                    </el-form-item>-->
                <!--                    <el-form-item label="位移" size="mini">-->
                <!--                      <el-input-number v-model="setting.yAxisForm.offset" controls-position="right" @change="setmyOption" @blur="setmyOption" :min="0"></el-input-number>-->
                <!--                    </el-form-item>-->
                <!--<el-form-item label="数量" size="mini">
                  <el-color-picker v-model="setting.xAxisForm.color" size="mini" @change="setmyOption"></el-color-picker>
                </el-form-item> -->
                <el-form-item label="角度">
                  <el-input-number v-model="myOption.yAxis[0].axisLabel.rotate" style="margin-left: 30px;width: 178px;" controls-position="right" :min="-90" :max="90" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="距离">
                  <el-input-number v-model="myOption.yAxis[0].axisLabel.margin" style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="200" @change="setmyOption" />
                </el-form-item>
                <!--                <el-form-item label="标签朝内">-->
                <!--                  <el-checkbox v-model="myOption.yAxis[0].axisLabel.inside" size="small" @change="setmyOption">-->
                <!--                  </el-checkbox>-->
                <!--                </el-form-item>-->
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="轴单位" name="3">
              <el-form>
                <el-form-item label="单位" size="mini">
                  <el-input v-model="myOption.yAxis[0].name" placeholder="请输入单位" style="width: 178px;margin-left: 30px;" @change="setmyOption" />
                </el-form-item>
                <!--                <el-form-item label="位置">-->
                <!--                  <el-select v-model="myOption.yAxis[0].nameLocation" size="mini" @change="setmyOption">-->
                <!--                    <el-option-->
                <!--                      v-for="item in setting.nameLocation"-->
                <!--                      :key="item.value"-->
                <!--                      :label="item.label"-->
                <!--                      :value="item.value">-->
                <!--                    </el-option>-->
                <!--                  </el-select>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="与轴线距离" size="mini">-->
                <!--                  <el-input-number v-model="myOption.yAxis[0].nameGap" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="角度" size="mini">-->
                <!--                  <el-input-number v-model="myOption.yAxis[0].nameRotate" controls-position="right" :min="0" :max="50" size="mini" @change="setmyOption" @blur="setmyOption"></el-input-number>-->
                <!--                </el-form-item>-->
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="轴线" name="4">
              <el-form>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.yAxis[0].axisLine.lineStyle.color" style="margin-left: 30px;" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="网格线" name="5">
              <el-form ref="yAxisForm" :model="setting.yAxisForm">
                <el-form-item label="显示" size="mini">
                  <el-switch v-model="myOption.yAxis[0].splitLine.show" style="margin-left: 30px;" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.yAxis[0].splitLine.lineStyle.color" style="margin-left: 30px;" show-alpha @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>

      <el-collapse-item title="点的样式 Dot Style" name="5">
        <el-form size="mini">
          <el-form-item label="圆点大小">
            <el-input-number v-model="setting.series.symbolSize" style="margin-left: 10px;width: 150px;" controls-position="right" :min="0" :max="200" />
          </el-form-item>
          <el-form-item label="边框宽度" size="mini">
            <el-input-number v-model="setting.series.borderWidth" style="margin-left: 10px;width: 150px;" controls-position="right" :min="0" :max="10" />
          </el-form-item>
          <el-form-item label="边框类型">
            <el-select v-model="setting.series.borderType" style="margin-left: 10px;width: 150px;">
              <el-option v-for="item in setting.axisPointerForm.lineStyle.type" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="边框颜色">
            <el-color-picker v-model="setting.series.borderColor" style="margin-left: 10px;" />
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="图例  Legend" name="6">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form>
            <el-form-item label="显示" size="mini">
              <el-switch v-model="myOption.legend.show" style="margin-left: 120px;" @change="setmyOption" />
            </el-form-item>
          </el-form>
          <el-collapse v-model="setting.activeTabLegend" accordion>
            <el-collapse-item title="文本" name="1">
              <el-form>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.legend.textStyle.fontSize" style="margin-left: 25px;" controls-position="right" :min="0" :max="50" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.legend.textStyle.fontWeight" style="margin-left: 25px;width: 130px;" @change="setmyOption">
                    <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.legend.textStyle.color" style="margin-left: 25px;" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="布局" name="2">
              <el-form :inline="true" size="mini">
                <el-form-item label="横向方位">
                  <el-input-number v-model="myOption.legend.left" style="width: 150px;margin-left: 10px;" controls-position="right" :min="0" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="纵向方位">
                  <el-input-number v-model="myOption.legend.top" style="width: 150px;margin-left: 10px;" controls-position="right" :min="0" @change="setmyOption" />
                </el-form-item>
                <!--                <el-form-item label="间距" >-->
                <!--                  <el-input-number v-model="myOption.legend.itemGap" controls-position="right" size="mini" @change="setmyOption" @blur="setmyOption" ></el-input-number>-->
                <!--                  <span>左右间距</span>-->
                <!--                  <el-input-number v-model="setting.legendForm.layout.margin_tb" controls-position="right" size="mini" @change="changeLegendMarginTopBottom" @blur="changeLegendMarginTopBottom" ></el-input-number>-->
                <!--                  <span>上下间距</span>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="位置">-->
                <!--                  <el-select v-model="setting.legendForm.layout.location" size="mini" @change="changeLegendPosition">-->
                <!--                    <el-option-->
                <!--                      v-for="item in setting.legendForm.layout.locationOptions"-->
                <!--                      :key="item.value"-->
                <!--                      :label="item.label"-->
                <!--                      :value="item.value">-->
                <!--                    </el-option>-->
                <!--                  </el-select>-->
                <!--                </el-form-item>-->
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>

      <el-collapse-item title="提示框  Tooltip" name="7">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form>
            <el-form-item label="触发类型" size="mini">
              <el-select v-model="myOption.tooltip.trigger" @change="setmyOption">
                <el-option v-for="item in setting.tooltipForm.triggers" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="触发动作" size="mini">
              <el-select v-model="myOption.tooltip.triggerOn" @change="setmyOption">
                <el-option v-for="item in setting.tooltipForm.triggerOns" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="消失延迟时间" size="mini">
              <el-input-number v-model="myOption.tooltip.hideDelay" style="width: 150px;" controls-position="right" :min="0" @change="setmyOption" />
            </el-form-item>
          </el-form>
          <el-collapse v-model="setting.activeTabTooltip" accordion>
            <el-collapse-item title="背景框样式" name="1">
              <el-form>
                <!-- <el-form-item label="背景框尺寸" >
                  <el-input-number v-model="setting.tooltipForm.background.width" controls-position="right" size="mini" @change="setmyOption" @blur="setmyOption" :min="0"></el-input-number>
                  <span>宽度</span>
                  <el-input-number v-model="setting.tooltipForm.background.height" controls-position="right" size="mini" @change="setmyOption" @blur="setmyOption" :min="0"></el-input-number>
                  <span>高度</span>
                </el-form-item> -->
                <el-form-item size="mini">
                  <label style="display: block;color: #606266;font-size:14px;">内边距</label>
                  <div class="style_input">
                    <!-- 可直接修改padding，不用函数 ，，注意颜色位置-->
                    <div>
                      <span>顶部</span>
                      <el-input-number v-model="myOption.tooltip.padding[0]" controls-position="right" :min="0" @change="setmyOption" />
                    </div>
                    <div>
                      <span>底部</span>
                      <el-input-number v-model="myOption.tooltip.padding[2]" controls-position="right" :min="0" @change="setmyOption" />
                    </div>
                    <div>
                      <span>左侧</span>
                      <el-input-number v-model="myOption.tooltip.padding[3]" controls-position="right" :min="0" @change="setmyOption" />
                    </div>
                    <div>
                      <span>右侧</span>
                      <el-input-number v-model="myOption.tooltip.padding[1]" controls-position="right" :min="0" @change="setmyOption" />
                    </div>
                  </div>
                </el-form-item>
                <!-- <el-form-item label="水平偏移量" >
                  <el-input-number v-model="setting.tooltipForm.background.padding" controls-position="right" size="mini" @change="setmyOption" @blur="setmyOption" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="垂直偏移量" >
                  <el-input-number v-model="setting.tooltipForm.background.padding" controls-position="right" size="mini" @change="setmyOption" @blur="setmyOption" :min="0"></el-input-number>
                </el-form-item> -->
                <el-form-item label="边框粗细" size="mini">
                  <el-input-number v-model="myOption.tooltip.borderWidth" style="margin-left: 20px;" controls-position="right" :min="0" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="边框颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.borderColor" show-alpha style="margin-left: 20px;" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="背景颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.backgroundColor" style="margin-left: 20px;" show-alpha @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="文本样式" name="2">
              <el-form size="mini">
                <el-form-item label="字体">
                  <el-select v-model="myOption.tooltip.textStyle.fontFamily" style="margin-left: 25px;" @change="setmyOption">
                    <el-option v-for="item in setting.fonts" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.tooltip.textStyle.fontSize" style="margin-left: 25px;width: 178px;" controls-position="right" :min="0" :max="50" @change="setmyOption" />
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.tooltip.textStyle.fontWeight" style="margin-left: 25px;" @change="setmyOption">
                    <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.textStyle.color" style="margin-left: 25px;" @change="setmyOption" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="坐标轴指示器" name="3">
              <el-form>
                <el-form-item label="类型" size="mini">
                  <el-select v-model="myOption.tooltip.axisPointer.type" style="width: 130px;margin-left: 40px;" @change="changetype">
                    <el-option v-for="item in setting.pointerType" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>

                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线宽度" size="mini">
                  <el-input-number v-model="myOption.tooltip.axisPointer.lineStyle.width" controls-position="right" :min="0" @change="setmyOption" />
                </el-form-item>
                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线类型" size="mini">
                  <el-select v-model="myOption.tooltip.axisPointer.lineStyle.type" style="width: 130px;">
                    <el-option v-for="item in setting.axisPointerForm.lineStyle.type" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item v-show="setting.tooltipForm.isLine" label="指示线颜色" size="mini">
                  <el-color-picker v-model="myOption.tooltip.axisPointer.lineStyle.color" @change="setmyOption" />
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
      <el-collapse-item title="动画  Animation" name="8">
        <el-form>
          <el-form-item label="初始动画时长" size="mini">
            <el-input-number v-model="myOption.animationDuration" controls-position="right" :min="0" @change="setmyOption" />
          </el-form-item>
          <el-form-item label="缓动效果" size="mini">
            <el-select v-model="myOption.animationEasing" style="margin-left: 30px;width:130px;" @change="setmyOption">
              <el-option v-for="item in setting.animationEasing" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="更新动画时长" size="mini">
            <el-input-number v-model="myOption.animationDurationUpdate" controls-position="right" :min="0" @change="setmyOption" />
          </el-form-item>
        </el-form>
        <!--            <div>从之前位置开始</div>-->
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
    export default {
        name: 'ScatterSetting',
        props: ['option'],
        data() {
            return {
                valueAxis: true,
                catatoryAxis: false,
                timeAxis: false,

                myOption: {
                },
                setting: {
                    activeTab: '1',
                    activeTabX: '1',
                    activeTabY: '1',
                    activeCol: '1',
                    activeTabLegend: '1',
                    max: [
                        {
                            label: '自动',
                            value: null
                        }, {
                            label: '数据最大值',
                            value: 'dataMax'
                        }
                    ],
                    min: [
                        {
                            label: '自动',
                            value: null
                        }, {
                            label: '数据最小值',
                            value: 'dataMin'
                        }
                    ],
                    fonts: [{ value: 'Microsoft YaHei', label: 'Microsoft YaHei' },
                        { value: 'sans-serif', label: 'sans-serif' },
                        { value: 'serif', label: 'serif' },
                        { value: 'monospace', label: 'monospace' },
                        { value: 'Arial', label: 'Arial' },
                        { value: '楷体', label: '楷体' }],
                    fontWeight: [{ value: 'lighter', label: 'lighter' },
                        { value: 'normal', label: 'normal' },
                        { value: 'bold', label: 'bold' },
                        { value: 'bolder', label: 'bolder' }],
                    pointerType: [{ value: 'line', label: '直线指示器' },
                        { value: 'shadow', label: '阴影指示器' },
                        { value: 'cross', label: '十字星准指示器' },
                        { value: 'none', label: '无指示器' }],
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
                        name: '',
                        fontSize: '18',
                        color: '#000',
                        fontWeight: 'normal',
                        textAlign: [
                            {
                                label: '自动',
                                value: 'auto'
                            }, {
                                label: '左部对齐',
                                value: 'left'
                            }, {
                                label: '居中对齐',
                                value: 'center'
                            }, {
                                label: '右部对齐',
                                value: 'right'
                            }
                        ],
                        textVerticalAlign: [
                            {
                                label: '自动',
                                value: 'auto'
                            }, {
                                label: '顶部对齐',
                                value: 'top'
                            }, {
                                label: '居中对齐',
                                value: 'center'
                            }, {
                                label: '右部对齐',
                                value: 'right'
                            }
                        ],
                        position: 'topCenter',

                    },
                    xAxisForm: {
                        fontSize: '20',
                        color: '#000',
                        fontWeight: 'normal',
                        boundaryGapCheck: false,
                        boundaryGap: 0,
                        max: null,
                        min: null,
                        offset: 0,
                        rotate: 0,
                        axisColor: '#333',
                        gridColor: '#ccc'
                    },
                    yAxisForm: {
                        fontSize: '20',
                        color: '#000',
                        fontWeight: 'normal',
                        boundaryGapCheck: false,
                        boundaryGap: 0,
                        max: [
                            {
                                label: '自动',
                                value: null
                            }, {
                                label: '数据最大值',
                                value: 'dataMax'
                            }
                        ],
                        min: [
                            {
                                label: '自动',
                                value: null
                            }, {
                                label: '数据最小值',
                                value: 'dataMin'
                            }
                        ],
                        offset: 0,
                        rotate: 0,
                        axisColor: '#333',
                        gridColor: '#ccc'
                    },
                    series: {
                        symbolSize: 20,
                         borderColor: '#000',
                            borderWidth: 0,
                            borderType: 'solid'
                    },
                    legendForm: {
                        text: {
                            fontSize: '12',
                            color: '#000',
                            fontWeight: 'normal'
                        },
                        layout: {
                            margin_lr: '8',
                            margin_tb: '0',
                            location: 'topLeft',
                            locationOptions: [
                                {
                                    label: '顶部居左',
                                    value: 'topLeft'
                                }, {
                                    label: '顶部居中',
                                    value: 'topCenter'
                                }, {
                                    label: '顶部居右',
                                    value: 'topRight'
                                }, {
                                    label: '底部居左',
                                    value: 'bottomLeft'
                                }, {
                                    label: '底部居中',
                                    value: 'bottomCenter'
                                }, {
                                    label: '底部居右',
                                    value: 'bottomRight'
                                }
                            ],
                        },
                        type: [
                            {
                                label: '普通',
                                value: 'plain'
                            }, {
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
                        trigger: 'item',
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
                    animationEasing: [
                        {
                            label: 'linear',
                            value: 'linear'
                        }, {
                            label: 'quadraticIn',
                            value: 'quadraticIn'
                        }, {
                            label: 'quadraticOut',
                            value: 'quadraticOut'
                        }, {
                            label: 'quadraticInOut',
                            value: 'quadraticInOut'
                        }, {
                            label: 'cubicIn',
                            value: 'cubicIn'
                        }, {
                            label: 'cubicOut',
                            value: 'cubicOut'
                        }, {
                            label: 'cubicInOut',
                            value: 'cubicInOut'
                        }, {
                            label: 'quarticIn',
                            value: 'quarticIn'
                        }, {
                            label: 'quarticOut',
                            value: 'quarticOut'
                        }, {
                            label: 'quarticInOut',
                            value: 'quarticInOut'
                        }, {
                            label: 'quinticIn',
                            value: 'quinticIn'
                        }, {
                            label: 'quinticOut',
                            value: 'quinticOut'
                        }, {
                            label: 'quinticInOut',
                            value: 'quinticInOut'
                        },
                        {
                            label: 'sinusoidalIn',
                            value: 'sinusoidalIn'
                        }, {
                            label: 'sinusoidalOut',
                            value: 'sinusoidalOut'
                        }, {
                            label: 'sinusoidalInOut',
                            value: 'sinusoidalInOut'
                        },
                        {
                            label: 'exponentialIn',
                            value: 'exponentialIn'
                        }, {
                            label: 'exponentialOut',
                            value: 'exponentialOut'
                        }, {
                            label: 'exponentialInOut',
                            value: 'exponentialInOut'
                        },
                        {
                            label: 'circularIn',
                            value: 'circularIn'
                        }, {
                            label: 'circularOut',
                            value: 'circularOut'
                        }, {
                            label: 'circularInOut',
                            value: 'circularInOut'
                        },
                        {
                            label: 'elasticIn',
                            value: 'elasticIn'
                        }, {
                            label: 'elasticOut',
                            value: 'elasticOut'
                        }, {
                            label: 'elasticInOut',
                            value: 'elasticInOut'
                        },
                        {
                            label: 'backIn',
                            value: 'backIn'
                        }, {
                            label: 'backOut',
                            value: 'backOut'
                        }, {
                            label: 'backInOut',
                            value: 'backInOut'
                        },
                        {
                            label: 'bounceIn',
                            value: 'bounceIn'
                        }, {
                            label: 'bounceOut',
                            value: 'bounceOut'
                        }, {
                            label: 'bounceInOut',
                            value: 'bounceInOut'
                        }
                    ],
                    axisPointerForm: {

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
                                    label: '虚线',
                                    value: 'dashed'
                                }
                            ]
                        }
                    },
                    dataSeries: {
                        series: {
                            seriesName: '系列1',
                            itemStyle: {
                                borderColor: '#000',
                                color: '#ccc'
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
            isCatatoryAxis: function() {
                return this.catatoryAxis
            },
            isTimeAxis: function() {
                return this.timeAxis
            },
            isTimeOrValueAxis: function() {
                return this.isTimeAxis || this.isValueAxis
            },
            isValueAxis: function() {
                return this.valueAxis
            },
            getSymbolsize() {
              return this.setting.series.symbolSize
            },
            getBordercolor() {
              return this.setting.series.borderColor
            },
            getBorderwidth() {
              return this.setting.series.borderWidth
            },
            getBordertype() {
              return this.setting.series.borderType
            }
            // getSymbolSize: {

            //     get(){alert(this.setting.series[0].symbolSize);
            //         return this.setting.series[0].symbolSize;
            //     },
            //     set(nval){
            //         console.log(nval);
            //         for(let i=0;i<this.myOption.series.length;i++ )
            //         {
            //           this.myOption.series[i].symbolSize = nval;
            //         }
            //         this.setmyOption();
            //     }
            // }
        },
        watch: {
            option: {
                handler(nval, oval) {
                    this.myOption = nval
                },
                deep: true
            },
            getSymbolsize(nval, oval) {
              for (let i = 0; i < this.myOption.series.length; i++) {
                this.myOption.series[i].symbolSize = nval
              }
              this.setmyOption()
            },
            getBordertype(nval, oval) {
              for (let i = 0; i < this.myOption.series.length; i++) {
                this.myOption.series[i].itemStyle.borderType = nval
              }
              this.setmyOption()
            },
            getBordercolor(nval, oval) {
              for (let i = 0; i < this.myOption.series.length; i++) {
                this.myOption.series[i].itemStyle.borderColor = nval
              }
              this.setmyOption()
            },
            getBorderwidth(nval, oval) {
              for (let i = 0; i < this.myOption.series.length; i++) {
                this.myOption.series[i].itemStyle.borderWidth = nval
              }
              this.setmyOption()
            }

    },
		created() {
			this.myOption = this.option
		},
        mounted() {
            this.setmyOption()
        },
        methods: {
            // chooseDataKind: function() {
            //       if (this.setting.xAxisForm.initType === 'value'){
            //           this.valueAxis = true;
            //           this.catatoryAxis =false;
            //           this.timeAxis = false;
            //       }else if (this.setting.xAxisForm.initType === 'catatory'){
            //           this.valueAxis = false;
            //           this.catatoryAxis =true;
            //           this.timeAxis = false;
            //       } else if (this.setting.xAxisForm.initType === 'time') {
            //           this.valueAxis = false;
            //           this.catatoryAxis =false;
            //           this.timeAxis = true;
            //       }
            // },
            changetype: function() {
                if (this.myOption.tooltip.axisPointer.type == 'line') {
                    this.setting.tooltipForm.isLine = true
                } else {
                    this.setting.tooltipForm.isLine = false
                }
                this.setmyOption()
            },

            // changeBordercolor:function(){
            //   for(let i=0;i<this.myOption.series.length;i++ )
            //   {
            //     this.myOption.series[i].itemStyle.borderColor = this.setting.series[0].itemStyle.borderColor;
            //   }
            //   this.setmyOption();
            // },
            // changeBorderwidth:function(){
            //   for(let i=0;i<this.myOption.series.length;i++ )
            //   {
            //     this.myOption.series[i].itemStyle.borderWidth = this.setting.series[0].itemStyle.borderWidth;
            //   }
            //   this.setmyOption();
            // },
            // changeBorderType:function(){
            //   for(let i=0;i<this.myOption.series.length;i++ )
            //   {
            //     this.myOption.series[i].itemStyle.borderType = this.setting.series[0].itemStyle.borderType;
            //   }
            //   this.setmyOption();
            // },
            setmyOption: function() {
                this.$emit('change', this.myOption)
            },
            // changeLegendMarginTopBottom: function() {
            //     if (this.setting.legendForm.layout.margin_tb !== 0) {
            //         if (this.setting.legendForm.layout.location.indexOf('top') >= 0){ //图例在顶部
            //             this.myOption.legend.top = this.setting.legendForm.layout.margin_tb;
            //             this.myOption.legend.bottom = 'auto';
            //         }else if (this.setting.legendForm.layout.location.indexOf('bottom') >= 0){ //图例在底部
            //             this.myOption.legend.top = "auto";
            //             this.myOption.legend.bottom = this.setting.legendForm.layout.margin_tb;
            //         }
            //         this.setmyOption();
            //     }
            // },
            // changeLegendPosition: function() {
            //     this.myOption.legend.top = 'auto';
            //     this.myOption.legend.bottom = 'auto';
            //     this.myOption.legend.left = 'auto';
            //     this.myOption.legend.right = 'auto';
            //     if (this.setting.legendForm.layout.location === 'topLeft'){
            //         this.myOption.legend.top = 'top';
            //         this.myOption.legend.left = 'left';
            //     }else if (this.setting.legendForm.layout.location === 'topCenter'){
            //         this.myOption.legend.top = 'top';
            //         this.myOption.legend.left = 'center';
            //     }else if (this.setting.legendForm.layout.location === 'topRight'){
            //         this.myOption.legend.top = 'top';
            //         this.myOption.legend.left = 'right';
            //     }else if (this.setting.legendForm.layout.location === 'bottomLeft'){
            //         this.myOption.legend.top = 'bottom';
            //         this.myOption.legend.left = 'left';
            //     }else if (this.setting.legendForm.layout.location === 'bottomCenter'){
            //         this.myOption.legend.top = 'bottom';
            //         this.myOption.legend.left = 'center';
            //     }else if (this.setting.legendForm.layout.location === 'bottomRight'){
            //         this.myOption.legend.top = 'bottom';
            //         this.myOption.legend.left = 'right';
            //     }
            //     this.changeLegendMarginTopBottom();
            //     this.setmyOption();
            // }
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
