<template>
  <div>
    <div v-for="(y, index) in yAxis">
      <el-row :gutter="80" style="margin-top: 10px">
        <el-col :span="4">
          <el-tag size="small">{{y.name}}{{custom[index]}}</el-tag>
        </el-col>
        <el-col :span="18">
          <el-cascader
            v-if="y.type === 'value'"
            :key="y.columnId"
            v-model="value[index]"
            :options="options"
            size="mini"
            :show-all-levels=false
            @change="(val)=>handleChange(val, index)"
            filterable>
            <template slot-scope="{ node, data }">
              <span v-if="data.label === '自定义百分比'"><a @click="inputCustom(index, node)">自定义百分比</a></span>
              <span v-else> {{ data.label }} </span>
            </template>
          </el-cascader>

          <el-cascader
            v-else
            :key="y.columnId"
            v-model="value[index]"
            :options="options2"
            size="mini"
            :show-all-levels=false
            @change="(val)=>handleChange(val, index)"
            filterable></el-cascader>
        </el-col>


      </el-row>

    </div>
  </div>
</template>

<script>
	export default {
		name: "DataSetting",
		props: {
			files: { //表示输入的文件列表
				type: Object,
				default: {}
			},
			tableData: { //表示输入
				type: Array,
				default: []
			},
      dataSettingList: {
			  type: Array,
        default: []
      }
		},
		data() {
			return {
        reName: [],
				reData: {
					xData: [],
					yData: [],
					zData: [],
					type: "tableChange"
				},
				value: [],
				beforeValue: [],
				custom: [],
				xAxis: [],
				yAxis: [],
				valueZ: [],
				options: [{
					value: "sum",
					label: "求和"
				}, {
					value: "average",
					label: "平均值"
				}, {
					value: "counting",
					label: "计数"
				}, {
					value: "deCounting",
					label: "去重计数"
				}, {
					value: "more",
					label: "更多",
					children: [{
						value: "max",
						label: "最大值"
					}, {
						value: "min",
						label: "最小值"
					}, {
						value: "median",
						label: "中位数"
					}, {
						value: "percentile",
						label: "百分位",
						children: [{
							value: "5",
							label: "百分比5"
						}, {
							value: "10",
							label: "百分比10"
						}, {
							value: "25",
							label: "百分比25"
						}, {
							value: "50",
							label: "百分比50"
						}, {
							value: "75",
							label: "百分比75"
						}, {
							value: "90",
							label: "百分比90"
						}, {
							value: "95",
							label: "百分比95"
						}, {
							value: "customPercentile",
							label: "自定义百分比"
						}]
					}]
				}],
				options2: [{
					value: "counting",
					label: "计数"
				}, {
					value: "deCounting",
					label: "去重计数"
				}]
			};
		},
		created() {
			this.init();
		},
		methods: {
			//创建初始数据
			init() {
				this.value = [];
				this.reName = [];
				this.beforeValue = [];
				this.custom = [];
				this.yAxis = [];
				this.valueZ = [];
				this.reData.type = "tableChange";
				for (let i = 0; i < this.tableData.length; i++) {
					let axis = [];
					let arr = this.tableData[i].cascaderValue;
					for (let j = 0; j < arr.length; j++) {
						let fileId = arr[j][0];
						let columnId = arr[j][1];
						if (this.files.hasOwnProperty(fileId)) {
							let dataList = this.files[fileId].dataList;
							if (dataList.hasOwnProperty(columnId)) {
								let data = {};
								data = dataList[columnId];
								data.columnId = columnId;
								axis.push(data);
							}
						}
					}
					if (i == 0) {
						this.xAxis = axis;
					} else if (i == 1) {
						this.yAxis = axis;
					} else { //针对散点图
						this.yAxis.push(axis[0]);
						this.valueZ.push(axis[0].columnId);
					}

				}

        for (let i = 0; i < this.yAxis.length; i++) {
          let flag = false
          // console.log('this.dataSettingList')
          // console.log(this.dataSettingList)
          this.dataSettingList.forEach(item => {
            if(item.columnId === this.yAxis[i].columnId){
              flag = true
              let reNameTemp = item.reName
              if (this.yAxis[i].type === "value") {
                if(item.custom === "" || item.custom === undefined){
                  this.$set(this.value, i, reNameTemp);
                  this.$set(this.beforeValue, i, reNameTemp);
                  this.$set(this.reName, i, reNameTemp);
                }else{
                  this.$set(this.value, i, 'customPercentile');
                  this.$set(this.beforeValue, i, 'customPercentile');
                  this.$set(this.reName, i, reNameTemp);
                  this.$set(this.custom, i, item.custom);
                }
              } else {
                this.$set(this.value, i, reNameTemp);
                this.$set(this.reName, i, reNameTemp);
              }
            }
          })
          if(!flag){
            console.log(flag)
            if (this.yAxis[i].type === "value") {
              this.$set(this.value, i, "sum");
              this.$set(this.beforeValue, i, "sum");
              this.$set(this.reName, i, "sum");
            } else {
              this.$set(this.value, i, "counting");
              this.$set(this.reName, i, "counting");
            }
          }
        }
			},
			// 当选择框1内容改变时调用
			handleChange(value, index) {
				this.$set(this.custom, index, "");
				if (value.length === 1) {
					this.$set(this.reName, index, value.toString());
					this.$set(this.beforeValue, index, value);
				} else if (value.length === 2) {
					this.$set(this.reName, index, value[1].toString());
					this.$set(this.beforeValue, index, value);
				} else if (value.length === 3) {
					if (value[2] !== "customPercentile") {
						this.$set(this.reName, index, value[2].toString());
						this.$set(this.beforeValue, index, value);
					}
				}
			},
			//输入自定义百分比
			inputCustom(index, node) {
				this.$prompt("请输入1-100的数:", "自定义百分比", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					inputPattern: new RegExp("^([1-9]|[1-9][0-9]|100)$"),
					inputErrorMessage: "请输入1-100的整数"
				}).then(({value}) => {
					this.$set(this.reName, index, value);
					this.$set(this.beforeValue, index, this.value[index]);
					this.$set(this.custom, index, "(" + value + "%)");
					this.$notify({
						title: "成功",
            type: 'success',
						message: "你输入的百分比是: " + value
					});
				}).catch(() => {
					this.$set(this.value, index, this.beforeValue[index]);
					this.$notify.error({
						title: "错误",
            type: 'error',
						message: "取消输入"
					});
				});
			},
			// 计算
			calculate() {

				let calculate = true;
				if (this.xAxis.length === 0 || this.yAxis.length === 0 && this.valueZ.length === 0) { //维度没有，不计算
					calculate = false;
				}
				this.reData.xData = [];
				this.reData.yData = [];
				this.reData.zData = [];

				// console.log("数据：");
				// console.log(this.xAxis);
				// console.log(this.yAxis);

				//合并维度变为一个数组
				let x = [];
				for (let i = 0; this.xAxis.length > 0 && i < this.xAxis[0].list.length; i++) {
					let xItem = [];
					for (let j = 0; j < this.xAxis.length; j++) {
						xItem.push(this.xAxis[j].list[i]);
					}
					x.push(xItem);
				}

				//对x数组去重
				let xArray = calculate ? [] : x;
				for (let i = 0; calculate && i < x.length; i++) {
					let l = 0;
					for (; l < xArray.length; l++) {
						if (JSON.stringify(x[i]) === JSON.stringify(xArray[l])) {
							break;
						}
					}
					if (l === xArray.length) {
						xArray.push(x[i]);
					}
				}

				//获得输出数据xData
				for (let i = 0; xArray.length > 0 && i < xArray[0].length; i++) {
					let xItem = {};
					xItem.list = [];
					xItem.name = this.xAxis[i].name;
					xItem.type = this.xAxis[i].type;
					for (let j = 0; j < xArray.length; j++) {
						xItem.list.push(xArray[j][i]);
					}
					this.reData.xData.push(xItem);
				}


        let dataSettingTempList = []
				for (let index = 0; index < this.yAxis.length; index++) {

					let tmpData = [];
					let y = this.yAxis[index];
					if ((this.yAxis[index].type === "value" && this.reName[index] !== "sum") || (this.yAxis[index].type !== "value" && this.reName[index] !== "counting")) {
						this.reData.type = "reNameChange";
					}
          // console.log('this.yAxis[index]')
          // console.log(this.yAxis[index])
					if (!calculate) {
						tmpData = y.list;
					} else {
						switch (this.reName[index]) {
						case "sum":
							for (let i = 0; i < x.length; i++) {
								if (xArray.indexOf(x[i]) !== -1) {
									let res = y.list[i];
									for (let j = i + 1; j < x.length; j++) {
										if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
											res += y.list[j];
										}
									}
									tmpData.push(res);
								}
							}
							break;
						case "average":
							for (let i = 0; i < x.length; i++) {
								if (xArray.indexOf(x[i]) !== -1) {
									let res = y.list[i];
									let num = 1;
									for (let j = i + 1; j < x.length; j++) {
										if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
											res += y.list[j];
											num++;
										}
									}
									tmpData.push(res / num);
								}
							}
							break;
						case "counting":
							for (let i = 0; i < x.length; i++) {
								if (xArray.indexOf(x[i]) !== -1) {
									let num = 1;
									for (let j = i + 1; j < x.length; j++) {
										if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
											num++;
										}
									}
									tmpData.push(num);
								}
							}
							break;
						case "deCounting":
							for (let i = 0; i < x.length; i++) {
								if (xArray.indexOf(x[i]) !== -1) {
									let num = 1;
									let yArray = [];
									yArray.push(y.list[i]);
									for (let j = i + 1; j < x.length; j++) {
										if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
											if (yArray.indexOf(y.list[j]) === -1) {
												yArray.push(y.list[j]);
												num++;
											}
										}
									}
									tmpData.push(num);
								}
							}
							break;
						case "max":
							for (let i = 0; i < x.length; i++) {
								if (xArray.indexOf(x[i]) !== -1) {
									let max = y.list[i];
									for (let j = i + 1; j < x.length; j++) {
										if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
											if (y.list[j] > max) {
												max = y.list[j];
											}
										}
									}
									tmpData.push(max);
								}
							}
							break;
						case "min":
							for (let i = 0; i < x.length; i++) {
								if (xArray.indexOf(x[i]) !== -1) {
									let min = y.list[i];
									for (let j = i + 1; j < x.length; j++) {
										if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
											if (y.list[j] < min) {
												min = y.list[j];
											}
										}
									}
									tmpData.push(min);
								}
							}
							break;
						case "median":
							for (let i = 0; i < x.length; i++) {
								if (xArray.indexOf(x[i]) !== -1) {
									let num = 1;
									let yArray = [];
									yArray.push(y.list[i]);
									for (let j = i + 1; j < x.length; j++) {
										if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
											if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
												yArray.push(y.list[j]);
												num++;
											}
										}
									}
									yArray.sort(function (a, b) {
										return a - b;
									});
									let res = 0;
									if (num % 2 === 0) {
										res = (yArray[num / 2] + yArray[num / 2 - 1]) / 2;
									} else {
										res = yArray[(num - 1) / 2];
									}
									tmpData.push(res);
								}
							}
							break;
						default:
							for (let i = 0; i < x.length; i++) {
								if (xArray.indexOf(x[i]) !== -1) {
									let num = 1;
									let yArray = [];
									yArray.push(y.list[i]);
									for (let j = i + 1; j < x.length; j++) {
										if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
											if (JSON.stringify(x[i]) === JSON.stringify(x[j])) {
												yArray.push(y.list[j]);
												num++;
											}
										}
									}
									yArray.sort(function (a, b) {
										return a - b;
									});

									let percentile = num * Number(this.reName[index]) / 100;
									let res = 0;
									if (percentile % 1 === 0) {
										res = (yArray[percentile] + yArray[percentile - 1]) / 2;
									} else {
										res = yArray[percentile - percentile % 1];
									}
									tmpData.push(res);
								}
							}
							// this.reName[index] = this.reName[index] + "%";
						}
					}

					if (this.valueZ.indexOf(this.yAxis[index].columnId) !== -1) {
						this.reData.zData.push({
							list: tmpData,
							name: this.yAxis[index].name,//+'('+this.reName[index]+')',
							type: "value"
						});
					} else {
						this.reData.yData.push({
							list: tmpData,
							name: this.yAxis[index].name,//+'('+this.reName[index]+')',
							type: "value"
						});
					}

          dataSettingTempList.push({
            columnId: this.yAxis[index].columnId,
            columnName: this.yAxis[index].name,
            columnType: this.yAxis[index].type,
            reName: this.reName[index],
            custom: this.custom[index]
          })
				}
				this.$emit("change", this.reData, dataSettingTempList);
			}
		},
		watch: {
			files: {
				handler(nVal) {
					this.init();
				},
				deep: true
			},
			tableData: {
				handler() {
          // console.log('tableData change')
					this.init();
				},
				deep: true
			},
			reName: {
				handler() {
          // console.log('reName change')
					this.calculate();
				},
				deep: true
			}
		}


	};
</script>

<style scoped>
  .infor {
    font-size: 14px;
    font-weight: normal;
    margin-right: 10px;
  }

  .info_div {
    width: 100%;
    margin: 20px auto 10px auto;
  }

  .info_div button {
    width: 30%;
  }

  .el-cascader {
    float: right;
    width: 70%;
  }
</style>
