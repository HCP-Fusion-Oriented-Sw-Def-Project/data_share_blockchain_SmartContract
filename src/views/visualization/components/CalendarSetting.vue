<template>
  <div class="setting">
    <el-collapse v-model="setting.activeCol" accordion>
      <el-collapse-item title="全局样式  Style" name="1">
        <el-form  :inline="true" >
          <!-- 注意看！这里是添的label 和div  class="style_input"有2个css样式，记得复制-->
          <el-form-item size="mini">
            <label style="display: block;color: #606266;font-size:14px;">字体</label>
            <div class="style_input">
              <el-select v-model="myOption.textStyle.fontFamily"  @change="setmyOption">
                <el-option v-for="item in setting.fonts" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item size="mini">
            <label style="display: block;color: #606266;font-size:14px;">边距</label>
            <div class="style_input">
              <div><span>顶部</span>
                <el-input-number  v-model="getCalendarTop" controls-position="right" :min="0" ></el-input-number>
              </div>
              <div><span>左侧</span>
                <el-input-number v-model="getCalendarLeft" controls-position="right" :min="0" ></el-input-number>
              </div>
            </div>
          </el-form-item>
         <!--  <el-form-item size="mini">
            <label style="display: block;color: #606266;font-size:14px;">时间段</label>
            <div style="margin-left: 25px;">
              <div><span>起始日期</span>
                <el-date-picker v-model="myOption.calendar.range[0]" editable="true" type="data" style="width: 130px;margin-left: 5px;" @change="setmyOption" ></el-date-picker>
              </div>
              <div><span>结束日期</span>
                <el-date-picker v-model="myOption.calendar.range[1]" editable="true" type="data" style="width: 130px;margin-left: 5px;" @change="setmyOption" ></el-date-picker>
              </div>
            </div>
          </el-form-item> -->

          <el-form-item label="工具栏" size="mini">
            <el-switch v-model="myOption.toolbox.show"  style="margin-left: 120px;" @change="setmyOption"> </el-switch>
          </el-form-item>
          <!-- 最大加载量去掉了 -->
        </el-form>
      </el-collapse-item>


      <el-collapse-item title="图表样式  SymbolStyle" name="2">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form  size="mini">
            <el-form-item  label="自适应">
              <el-switch v-model="setting.cellAuto" @change="changeCellAuto" style="margin-left: 120px;" ></el-switch>
            </el-form-item>
            <el-form-item v-show="setting.isnotcellAuto" >
              <label style="display: block;color: #606266;font-size:14px;">格框大小</label>
              <div class="style_input" >
                <div><span>宽度</span>
                  <el-input-number v-model="getCellSizeWidth" controls-position="right" :min="0" ></el-input-number>
                </div>
                <div><span>高度</span>
                  <el-input-number v-model="getCellSizeHeight" controls-position="right" :min="1" ></el-input-number>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="放置方向" >
              <el-select v-model="getOrient"  style="width: 130px;margin-left: 25px;">
                <el-option v-for="item in setting.Direction" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>


      <el-collapse-item title="轴样式 AxisStyle  " name="3">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-collapse v-model="setting.activeAxisStyle" accordion>
            <el-collapse-item title="星期轴">
              <el-form size="mini">
                <el-form-item label="中英文" >
                  <el-radio style="margin-left: 15px;" v-model="getDayLabelNameMap" label="cn">中文</el-radio>
                  <el-radio style="margin-left: 45px;" v-model="getDayLabelNameMap" label="en">英文</el-radio>
                </el-form-item>
                <el-form-item label="起始日期">
                  <el-radio v-model="getDayLabelFirstDay" label="1">星期一</el-radio>
                  <el-radio v-model="getDayLabelFirstDay" label="0">星期日</el-radio>
                </el-form-item>
                <el-form-item label="距离" >
                  <el-input-number v-model="getDayLabelMargin" style="margin-left:25px;" :min="0" controls-position="right"></el-input-number>
                </el-form-item>
                <el-form-item label="字号" >
                  <el-input-number v-model="getDayLabelFontSize" style="margin-left:25px;"  controls-position="right" :min="0" :max="50"></el-input-number>
                </el-form-item>
                <el-form-item label="颜色" >
                  <el-color-picker v-model="getDayLabelColor" style="margin-left:25px;"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="月份轴">
              <el-form size="mini">
                <el-form-item label="位置" >
                  <el-radio v-model="getMonthLabelPosition" style="margin-left: 25px;" label="start">开头</el-radio>
                  <el-radio v-model="getMonthLabelPosition" style="margin-left: 35px;" label="end">结尾</el-radio>
                </el-form-item>
                <el-form-item label="中英文" >
                  <el-radio v-model="getMonthLabelNameGap" style="margin-left: 10px;" label="cn">中文</el-radio>
                  <el-radio v-model="getMonthLabelNameGap" style="margin-left: 35px;" label="en">英文</el-radio>
                </el-form-item>
                <el-form-item label="距离">
                  <el-input-number v-model="getMonthLabelMargin" style="margin-left: 25px;" :min="0" controls-position="right"></el-input-number>
                </el-form-item>
                <el-form-item label="字号" >
                  <el-input-number v-model="getMonthLabelFontSize" style="margin-left: 25px;" controls-position="right" :min="0" :max="50"></el-input-number>
                </el-form-item>
                <el-form-item label="颜色" >
                  <el-color-picker v-model="getMonthLabelColor" style="margin-left: 25px;"></el-color-picker>
                </el-form-item>

              </el-form>
            </el-collapse-item>

            <el-collapse-item title="年份轴">
              <el-form size="mini">
                <el-form-item label="显示" >
                  <el-switch v-model="getYearLabelShow" style="margin-left: 120px;" @change="setmyOption"></el-switch>
                </el-form-item>
                <el-form-item label="距离">
                  <el-input-number v-model="getYearLabelMargin" controls-position="right" style="margin-left: 25px;" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="字号" >
                  <el-input-number v-model="getYearLabelFontSize" controls-position="right" :min="0" :max="50" style="margin-left: 25px;"></el-input-number>
                </el-form-item>
                <el-form-item label="粗细">
                  <el-select v-model="getYearLabelFontWeight" style="margin-left: 25px;width: 130px;">
                    <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" >
                  <el-color-picker v-model="getYearLabelColor" style="margin-left: 25px;"></el-color-picker>
                </el-form-item>


              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>


      <el-collapse-item title="标题  Title" name="4" >
        <el-form>
          <el-form-item label="显示" size="mini">
            <el-switch v-model="myOption.title.show"  style="margin-left: 165px;" @change="setmyOption"> </el-switch>
          </el-form-item>

          <el-collapse v-model="setting.activeTabTitleText">
            <!-- 注意以下的顺序，我把颜色调到最后了 -->
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
            <!-- 主副标题在一个el-collaspe中就行 我增加了 name属性-->
            <el-collapse-item title="副标题样式" name="2">
              <el-form>
                <!-- 注意!!副标题的字号粗细设置是在  subtextStyle中，你的单词拼错了（大小写） -->
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


      <el-collapse-item title="图例  Legend" name="5">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form>
            <el-form-item label="显示" size="mini">
              <el-switch v-model="myOption.visualMap.show"  style="margin-left: 165px;" @change="setmyOption"> </el-switch>
            </el-form-item>
          </el-form>
          <el-collapse v-model="myOption.activeTabLegend" accordion>
            <el-collapse-item title="视觉颜色范围" name="1">
              <el-form size="mini">
                <el-form-item label="最小值" >
                  <el-input-number v-model="myOption.visualMap.min" style="margin-left: 25px;" controls-position="right" :min="0"  @change="setmyOption"></el-input-number>
                </el-form-item>
                <el-form-item label="最大值" >
                  <el-input-number  v-model="myOption.visualMap.max" style="margin-left: 25px;" controls-position="right" :min="0" @change="setmyOption" ></el-input-number>
                </el-form-item>
                <el-form-item label="分段">
                  <el-input-number v-model="myOption.visualMap.splitNumber"  style="margin-left: 40px;" controls-position="right" :min="1" @change="setmyOption"></el-input-number>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="文本" name="2">
              <el-form >
                <el-form-item label="字号" size="mini">
                  <el-input-number v-model="myOption.visualMap.textStyle.fontSize"  style="margin-left: 25px;" controls-position="right" :min="0" :max="50"  @change="setmyOption"></el-input-number>
                </el-form-item>
                <el-form-item label="粗细" size="mini">
                  <el-select v-model="myOption.visualMap.textStyle.fontWeight"  style="margin-left: 25px;width: 130px;" @change="setmyOption">
                    <el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色" size="mini">
                  <el-color-picker v-model="myOption.visualMap.textStyle.color"   style="margin-left: 25px;" @change="setmyOption"></el-color-picker>
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <el-collapse-item title="布局" name="3">
              <el-form  :inline="true">
                <el-form-item label="横向方位">
                  <el-input-number style="width: 150px;margin-left: 10px;" v-model="myOption.visualMap.left" controls-position="right" @change="setmyOption"  :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="纵向方位">
                  <el-input-number style="width: 150px;margin-left: 10px;" v-model="myOption.visualMap.top" controls-position="right" @change="setmyOption"  :min="0"></el-input-number>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>


      <el-collapse-item title="提示框  Tooltip" name="6">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form  >
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
          <el-collapse v-model="setting.activeTooltip" accordion>
            <el-collapse-item title="背景框样式" name="1">
              <el-form >
                <el-form-item size="mini">
                  <label style="display: block;color: #606266;font-size:14px;">内边距</label>
                  <div class="style_input">
                    <!-- 可直接修改padding，不用函数 ，，注意颜色位置-->
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
          </el-collapse>
        </div>
      </el-collapse-item>



      <el-collapse-item title="动画  Animation" name="7">
        <div style="margin-left: 10px;margin-right: 10px;">
          <el-form >
            <el-form-item label="初始动画时长" size="mini">
              <el-input-number v-model="myOption.animationDuration" controls-position="right" :min="0"  @change="setmyOption" ></el-input-number>
            </el-form-item>
            <el-form-item label="缓动效果" size="mini" >
              <el-select v-model="myOption.animationEasing" @change="setmyOption" style="margin-left: 30px;width:130px;">
                <el-option v-for="item in setting.drawSetting" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="更新动画时长" size="mini">
              <el-input-number v-model="myOption.animationDurationUpdate" controls-position="right" :min="0"  @change="setmyOption" ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script type="text/javascript">
	import echarts from 'echarts'
  import Vue from 'vue'
 require('echarts/theme/macarons') // echarts theme
//  function getVirtulData(year) {
//     year = year || '2018';
//     var date = +echarts.number.parseDate(year + '-01-01');
//     var end = +echarts.number.parseDate(year + '-12-31');
//     var dayTime = 3600 * 24 * 1000;
//     var data = [];
//     for (var time = date; time <= end; time += dayTime) {
//         data.push([
//             echarts.format.formatTime('yyyy-MM-dd', time),
//             Math.floor(Math.random() * 10000)
//         ]);
//     }
//     return data;
// };
 export default{
     props: ['option'],
	 created() {
		 this.myOption = this.option;
	 },
     data(){
		    return{
			myOption:{
			},
			setting:{
				activeTab:"1",
				activeCol:"1",
				activeAxisStyle:'1',
				activeTabLegend:"1",
				activeTooltip:"1",
				activeDataSource:"1",
				isnotcellAuto:true,
				cellAuto:false,
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
				drawSetting:[{
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
                        }],
				 Direction:[{value:'horizontal',label:'水平'},
					{value:'vertical',label:'垂直'}],

				titleForm:{
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
				tooltipForm:{
					triggers: [{value: 'item',label: '数据项'}],
					triggerOns: [{value: 'mousemove',label: '悬浮'},
						{value: 'click',label: '点击'}],
					isLine:false
				}
			}//setting
		}
	  },
     computed: {
         getCalendarTop: {
             get() {
                 return this.myOption.calendar[0].top;
             },
             set(val) {
                 let diff = val - this.myOption.calendar[0].top;
                 for (let calendar of this.myOption.calendar) {
                     calendar.top += diff;
                 }
                 this.setmyOption();
             }
         },
         getCalendarLeft: {
             get() {
                 return this.myOption.calendar[0].left;
             },
             set(val) {
                 let diff = val - this.myOption.calendar[0].left;
                 for (let calendar of this.myOption.calendar) {
                     calendar.left += diff;
                 }
                 this.setmyOption();
             }
         },
         getCellSizeWidth: {
             get() {
                 return this.myOption.calendar[0].cellSize[0];
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     Vue.set(calendar.cellSize, 0, nval);
                 }
                 this.setmyOption();
             }
         },
         getCellSizeHeight: {
             get() {
                 return this.myOption.calendar[0].cellSize[1];
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     Vue.set(calendar.cellSize, 1, nval);
                 }
                 this.setmyOption();
             }
         },
         getOrient: {
             get() {
                 return this.myOption.calendar[0].orient
             },
             set(nval) {
                 let left = this.myOption.calendar[0].left, top = this.myOption.calendar[0].top;
                 for (let calendar of this.myOption.calendar) {
                     calendar.orient = nval;
                     calendar.top = top;
                     calendar.left = left;

                     if (nval === 'horizontal') {
                         top+=180;

                     }else if (nval === 'vertical') {
                         left+=180;
                     }
                 }
                 this.changeCellAuto();
                 this.setmyOption();
             }
         },
         getDayLabelNameMap: {
             get() {
                 return this.myOption.calendar[0].dayLabel.nameMap;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.dayLabel.nameMap = nval;
                 }
                 this.setmyOption();
             }
         },
         getDayLabelFirstDay:{
             get() {
                 return this.myOption.calendar[0].dayLabel.firstDay;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.dayLabel.firstDay = nval;
                 }
                 this.setmyOption();
             }
         },
         getDayLabelMargin: {
             get() {
                 return this.myOption.calendar[0].dayLabel.margin;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.dayLabel.margin = nval;
                 }
                 this.setmyOption();
             }
         },
         getDayLabelFontSize: {
             get() {
                 return this.myOption.calendar[0].dayLabel.fontSize;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.dayLabel.fontSize = nval;
                 }
                 this.setmyOption();
             }
         },
         getDayLabelColor: {
             get() {
                 return this.myOption.calendar[0].dayLabel.color;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.dayLabel.color = nval;
                 }
                 this.setmyOption();
             }
         },
         getMonthLabelPosition: {
             get() {
                 return this.myOption.calendar[0].monthLabel.position;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.monthLabel.position = nval;
                 }
                 this.setmyOption();
             }
         },
         getMonthLabelNameGap: {
             get() {
                 return this.myOption.calendar[0].monthLabel.nameMap;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.monthLabel.nameMap = nval;
                 }
                 this.setmyOption();
             }
         },
         getMonthLabelMargin: {
             get() {
                 return this.myOption.calendar[0].monthLabel.margin;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.monthLabel.margin = nval;
                 }
                 this.setmyOption();
             }
         },
         getMonthLabelFontSize: {
             get() {
                 return this.myOption.calendar[0].monthLabel.fontSize;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.monthLabel.fontSize = nval;
                 }
                 this.setmyOption();
             }
         },
         getMonthLabelColor: {
             get() {
                 return this.myOption.calendar[0].monthLabel.color;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.monthLabel.color = nval;
                 }
                 this.setmyOption();
             }
         },
         getYearLabelShow: {
             get() {
                 return this.myOption.calendar[0].yearLabel.show;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.yearLabel.show = nval;
                 }
                 this.setmyOption();
             }
         },
         getYearLabelFontSize: {
             get() {
                 return this.myOption.calendar[0].yearLabel.fontSize;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.yearLabel.fontSize = nval;
                 }
                 this.setmyOption();
             }
         },
         getYearLabelFontWeight: {
             get() {
                 return this.myOption.calendar[0].yearLabel.fontWeight;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.yearLabel.fontWeight = nval;
                 }
                 this.setmyOption();
             }
         },
         getYearLabelColor: {
             get() {
                 return this.myOption.calendar[0].yearLabel.color;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.yearLabel.color = nval;
                 }
                 this.setmyOption();
             }
         },
         getYearLabelMargin: {
             get() {
                 return this.myOption.calendar[0].yearLabel.margin;
             },
             set(nval) {
                 for (let calendar of this.myOption.calendar) {
                     calendar.yearLabel.margin = nval;
                 }
                 this.setmyOption();
             }
         }
     },
	mounted(){
		 this.setmyOption();
	},
	methods:{
		setmyOption: function() {
			this.$emit("change", this.myOption);
		},
		changetype:function(){
          if(this.myOption.tooltip.axisPointer.type==='line')
          {
            this.settings.tooltipForm.isLine=true;
          }
          else{
            this.settings.tooltipForm.isLine=false;
          }
          this.setmyOption();
    },
    changeCellAuto:function(){
    	if(this.setting.cellAuto===false)//不自适应，要自己调
			{
			    for (let calendar of this.myOption.calendar){
              calendar.cellSize=[18,20];
          }

				this.setting.isnotcellAuto=true;
    	}else//自适应了
    	{
          for (let calendar of this.myOption.calendar){
              if (this.myOption.calendar.length === 1) {
                  calendar.cellSize=['auto','auto'];
              }else {
                  if (this.myOption.calendar[0].orient === 'horizontal') {
                      calendar.cellSize=['auto', 20];
                  }else if (this.myOption.calendar[0].orient === 'vertical') {
                      calendar.cellSize=[18, 'auto'];
                  }
              }


          }
    		this.setting.isnotcellAuto=false;
    	}
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
		},  //,
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
<style type="text/css" scoped>
	.style_input {
		width: 200px;
		text-align: right;
		margin-left: 20px;
	}

	.style_input span {
		margin-right: 5px;
	}

</style>
