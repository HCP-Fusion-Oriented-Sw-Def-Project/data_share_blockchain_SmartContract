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
												<el-input-number v-model="myOption.grid.top" controls-position="right" :min="0"  @change="setmyOption" ></el-input-number>
											</div>
											<div><span>底部</span>
												<el-input-number v-model="myOption.grid.bottom" controls-position="right"   :min="0" @change="setmyOption" ></el-input-number>
											</div>
											<div><span>左侧</span>
												<el-input-number v-model="myOption.grid.left" controls-position="right" :min="0" @change="setmyOption" ></el-input-number>
											</div>
											<div><span>右侧</span>
												<el-input-number v-model="myOption.grid.right" controls-position="right"  :min="0" @change="setmyOption" ></el-input-number>
											</div>
										</div>
									</el-form-item>
									<el-form-item label="工具栏" size="mini">
										<el-switch v-model="myOption.toolbox.show"  style="margin-left: 120px;" @change="setmyOption"> </el-switch>
									</el-form-item>
									<!-- 最大加载量去掉了 -->
								</el-form>
							</el-collapse-item>


							<el-collapse-item title="元素样式  SymbolStyle" name="2">
								<el-form  size="mini">
									<el-form-item label="间距" >
												<el-input-number v-model="setting.SymbolstyleForm.symbolMargin" style="margin-left: 20px;" controls-position="right"  @change="changesymbolMargin" ></el-input-number>
									</el-form-item>
									 <el-form-item label="大小" >
												<el-input-number v-model="setting.SymbolstyleForm.symbolSize" style="margin-left: 20px;" controls-position="right" :min="1" :max="50"  @change="changesymbolSize" ></el-input-number>
									</el-form-item>
									<el-form-item label="图片" >
										<el-upload
										  class="upload-demo"
										  :limit=1
										  action="https://jsonplaceholder.typicode.com/posts/"
										  :on-success="changesymbol"
										  :on-exceed="stopUpdate"
										  :file-list="setting.SymbolstyleForm.fileList2"
										  list-type="picture" >
										  <el-button size="small" type="primary" style="margin-left: 20px;">点击上传</el-button>
										  <div slot="tip" class="el-upload__tip">&nbsp;&nbsp;&nbsp;&nbsp;只能上传jpg/png文件，且不超过500kb</div>
										</el-upload>
									</el-form-item>
								</el-form>
							</el-collapse-item>


							<el-collapse-item title="标题  Title" name="3" >
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

							<el-collapse-item title="x轴  XAxis" name="4">
								<div style="margin-left: 10px;margin-right: 10px;">
									<el-collapse v-model="setting.activeTabX" accordion>
										<el-collapse-item title="文本" name="1">
											<el-form >
											<!-- 我调了颜色的位置 -->
												<el-form-item label="字号" size="mini">
													<el-input-number v-model="myOption.xAxis.axisLabel.textStyle.fontSize"  style="margin-left: 30px;width: 178px;" controls-position="right" :min="0" :max="50"  @change="setmyOption" ></el-input-number>
												</el-form-item>
												<el-form-item label="粗细" size="mini">
													<el-select v-model="myOption.xAxis.axisLabel.textStyle.fontWeight"  style="margin-left: 30px;width: 178px;" @change="setmyOption">
														<el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
												<el-form-item label="颜色" size="mini">
													<el-color-picker v-model="myOption.xAxis.axisLabel.textStyle.color" style="margin-left: 30px;"  @change="setmyOption"></el-color-picker>
												</el-form-item>
											</el-form>
										</el-collapse-item>

										<el-collapse-item title="轴标签" name="2">
											<el-form >
												<el-form-item label="角度" size="mini">
													<el-input-number v-model="myOption.xAxis.axisLabel.rotate" style="margin-left: 30px;width: 178px;"  controls-position="right" @change="setmyOption"  :min="-90" :max='90'></el-input-number>
												</el-form-item>
												<!-- 距离是距离轴的距离 -->
												<el-form-item label="距离" size="mini">
													<el-input-number v-model="myOption.xAxis.axisLabel.margin" style="margin-left: 30px;width: 178px;" controls-position="right" @change="setmyOption"  :min="0" :max='200'></el-input-number>
												</el-form-item>
											</el-form>
										</el-collapse-item>

										<el-collapse-item title="轴单位" name="3">
											<el-form >
												<el-form-item label="单位" size="mini">
													<el-input v-model="myOption.xAxis.name" placeholder="请输入单位" style="margin-left: 30px;width: 178px;" @change="setmyOption" ></el-input>
												</el-form-item>
											</el-form>
										</el-collapse-item>
										<el-collapse-item title="轴线" name="4">
											<el-form ref="xAxisForm" :model="myOption.xAxisForm">
												<el-form-item label="颜色" size="mini">
													<el-color-picker v-model="myOption.xAxis.axisLine.lineStyle.color" style="margin-left: 30px;"  @change="setmyOption"></el-color-picker>
												</el-form-item>
											</el-form>
										</el-collapse-item>
										<el-collapse-item title="网格线" name="5">
											<el-form >
											<!-- 别忘了设置show为true -->
											<el-form-item label="显示" size="mini">
							                  <el-switch v-model="myOption.xAxis.splitLine.show"  style="margin-left: 30px;" @change="setmyOption"> </el-switch>
							                </el-form-item>
												<el-form-item label="颜色" size="mini">
													<el-color-picker show-alpha v-model="myOption.xAxis.splitLine.lineStyle.color" style="margin-left: 30px;"  @change="setmyOption"></el-color-picker>
												</el-form-item>
											</el-form>
										</el-collapse-item>
									</el-collapse>
								</div>
							</el-collapse-item>


							<el-collapse-item title="y轴  YAxis" name="5">
								<div style="margin-left: 10px;margin-right: 10px;">
									<el-collapse v-model="setting.activeTabY" accordion>
										<el-collapse-item title="文本" name="1">
											<el-form size="mini">
												<el-form-item label="字号" >
													<el-input-number v-model="myOption.yAxis.axisLabel.textStyle.fontSize" style="margin-left: 30px;width: 178px;"  controls-position="right" :min="0" :max="50" @change="setmyOption"></el-input-number>
												</el-form-item>
												<el-form-item label="粗细" >
													<el-select v-model="myOption.yAxis.axisLabel.textStyle.fontWeight" style="margin-left: 30px;width: 178px;"  @change="setmyOption">
														<el-option v-for="item in setting.fontWeight" :key="item.value" :label="item.label" :value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
												<el-form-item label="颜色" >
													<el-color-picker v-model="myOption.yAxis.axisLabel.textStyle.color" style="margin-left: 30px;width: 178px;"   @change="setmyOption"></el-color-picker>
												</el-form-item>
											</el-form>
										</el-collapse-item>
										<el-collapse-item title="轴标签" name="2">
											<el-form size="mini">
												<el-form-item label="角度" >
													<el-input-number v-model="myOption.yAxis.axisLabel.rotate" style="margin-left: 30px;width: 178px;"  controls-position="right" @change="setmyOption"  :min="-90" :max='90'></el-input-number>
												</el-form-item>
												<!-- 距离是距离轴的距离 -->
												<el-form-item label="距离" >
													<el-input-number v-model="myOption.yAxis.axisLabel.margin" style="margin-left: 30px;width: 178px;" controls-position="right" @change="setmyOption"  :min="0" :max='200'></el-input-number>
												</el-form-item>

											 <!-- 最大值最小值项待定
												<el-form-item label="最大值" size="mini">
													<el-input-number v-model="myOption.yAxis.max" controls-position="right" @change="setmyOption" style="width: 150px;"></el-input-number>
												</el-form-item> -->

												<!-- 这里是设置y轴显示数据的格式，可以是整数，可以是小数
												<el-form-item label="格式" size="mini">
													<el-select v-model="setting.yAxisForm.format" style="margin-left: 15px;width:150px;" @change="chooseFormat" >
														<el-option v-for="item in setting.displayForm" :key="item.value" :label="item.label" :value="item.value">
														</el-option>
													</el-select>
												</el-form-item> -->
											</el-form>
										</el-collapse-item>
										<el-collapse-item title="轴单位" name="3">
											<el-form >
												<el-form-item label="单位" size="mini">
													<el-input v-model="myOption.yAxis.name" placeholder="请输入单位" @change="setmyOption" style="width: 178px;margin-left: 30px;"></el-input>
												</el-form-item>
											</el-form>
										</el-collapse-item>
										<el-collapse-item title="轴线" name="4">
											<el-form >
												<el-form-item label="颜色" size="mini">
													<el-color-picker v-model="myOption.yAxis.axisLine.lineStyle.color" style="margin-left: 30px;" @change="setmyOption"></el-color-picker>
												</el-form-item>
											</el-form>
										</el-collapse-item>
										<el-collapse-item title="网格线" name="5">
											<el-form >
												<el-form-item label="显示" size="mini">
                  <el-switch v-model="myOption.yAxis.splitLine.show"  style="margin-left: 30px;" @change="setmyOption"> </el-switch>
                </el-form-item>
												<el-form-item label="颜色" size="mini">
													<el-color-picker v-model="myOption.yAxis.splitLine.lineStyle.color"  style="margin-left: 30px;" show-alpha  @change="setmyOption"></el-color-picker>
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
										<el-collapse-item title="坐标轴指示器" name="3">
											<el-form >
												<el-form-item label="类型" size="mini">
													<el-select v-model="myOption.tooltip.axisPointer.type"  @change="changetype" style="width: 130px;margin-left: 40px;">
														<el-option v-for="item in setting.pointerType" :key="item.value" :label="item.label" :value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
												<!-- 颜色 -->
												<el-form-item v-show="setting.tooltipForm.isLine" label="指示线宽度" size="mini">
													<el-input-number v-model="myOption.tooltip.axisPointer.lineStyle.width" controls-position="right" :min="0" @change="setmyOption" ></el-input-number>
												</el-form-item>
												<el-form-item v-show="setting.tooltipForm.isLine" label="指示线类型" size="mini">
													<el-select v-model="myOption.tooltip.axisPointer.lineStyle.type" style="width: 130px;">
														<el-option v-for="item in setting.LineType" :key="item.value" :label="item.label" :value="item.value">
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
 require('echarts/theme/macarons') // echarts theme
 var spirit = 'image://data:image/png;base64,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';

var Sym_margin='5%';
var Sym_size=30;
var Sym_url=spirit;
 export default{
 	props:['option'],
	 created() {
		 this.myOption = this.option;
	 },
	data(){
		return{
			myOption:{
			},
			setting:{
				activeTab:"1",
				activeTabX:"1",
				activeTabY:"1",
				activeCol:"1",
				activeTabLegend:"1",
				activeTooltip:"1",
				activeDataSource:"1",
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
				LineType:[{value:'solid',label:'实线'},
							{value:'dashed',label:'虚线'},
							{value:'dotted',label:'点线'}],
				drawSetting:[ {
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
											positionmyOptions: [
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
								triggers: [{value: 'item',label: '数据项'},
									{value: 'axis',label: '坐标轴'}],
								triggerOns: [{value: 'mousemove',label: '悬浮'},
									{value: 'click',label: '点击'}],
								isLine:false
						},
				SymbolstyleForm:{
					symbolMargin:5,
					 symbolSize:30,
					 fileList2:[],//
					// dialogVisible:false,
					// imageUrl:'',
				}


			}
		}
	},
	mounted(){
			 this.$emit("change", this.myOption);
	},
	methods:{
		setmyOption: function() {
				this.$emit("change", this.myOption);
		},
		changetype:function(){
					if(this.myOption.tooltip.axisPointer.type=='line')
					{
						this.setting.tooltipForm.isLine=true;
					}
					else{
						this.setting.tooltipForm.isLine=false;
					}
					this.setmyOption();
		},
		changesymbolMargin:function(){
			 Sym_margin=this.setting.SymbolstyleForm.symbolMargin+'%';
			for( let i=0;i<this.myOption.series.length;i++)
				{ this.myOption.series[i].symbolMargin=Sym_margin}
			this.setmyOption();
		},
		changesymbolSize:function(){
			Sym_size=this.setting.SymbolstyleForm.symbolSize;
			for( let i=0;i<this.myOption.series.length;i++)
				{ this.myOption.series[i].symbolSize=Sym_size}
			this.setmyOption();
		},
		changesymbol:function(response, file, fileList){
		  Sym_url='image://'+fileList[0].url;
		  for( let i=0;i<this.myOption.series.length;i++)
			{
				this.myOption.series[i].symbol=Sym_url
			}
		  this.setmyOption()
		},
		stopUpdate:function(){
			this.$message.error('只能上传1张图片，请删除后重新上传！');
		},
		handlePictureCardPreview(file) {

			this.setting.SymbolstyleForm.dialogVisible = true;
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
