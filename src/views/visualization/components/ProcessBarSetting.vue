<template>
  <div class="toolbar-wh-row" >
    <el-row style="margin-top:10px;">
      <template>
        <span style="font-weight: bold;">进度条百分比&nbsp&nbsp</span>
        <div class="block" >
          <el-slider  v-model="percentage" show-input :max="100" style="width: 95%;float:right">
          </el-slider>
        </div>
      </template>
    </el-row>
    <el-row style="margin-top:10px;">
      <span>进度条宽度：</span>
      <div class="block" >
        <el-slider  v-model="bgcWidth" show-input :max="500" :min="100" style="width: 95%;float:right">
        </el-slider>
      </div>
    </el-row>
    <el-row style="margin-top:10px;">
      <span>标签字体大小：</span>
      <div class="block" >
        <el-slider  v-model="processBarFontSize" show-input :max="20" :min="8" style="width: 95%;float:right">
        </el-slider>
      </div>
    </el-row>
    <el-row style="margin-top:20px; height: 40px;">
      <div style="width: 100px; float:left">
        <span style="line-height: 40px;">进度条颜色</span>
      </div>
      <div style="width: 100px; float:left">
        <el-color-picker v-model="processBarColor" size="small" :predefine="predefineColors" ></el-color-picker>
      </div>
    </el-row>
    <el-row style="margin-top:20px; height: 40px;">
      <div style="width: 100px; float:left">
        <span style="line-height: 40px;">标签字体颜色</span>
      </div>
      <div style="width: 100px; float:left">
        <el-color-picker v-model="processBarFontColor" size="small" :predefine="predefineColors" ></el-color-picker>
      </div>
    </el-row>
  </div>
</template>

<script>
	export default {
		name: "ProcessBarSetting",
		data(){
			return{
				predefineColors: [
					'#1D2B3A',
					'#ff8c00',
					'#ffd700',
					'#90ee90',
					'#00ced1',
					'#1e90ff',
					'#c71585',
					'#c7158577'
				]
			}
		},
		computed:{
			activeRect() {
				return this.$store.getters['rect/getActive'];
			},
			percentage:{
				get(){
					console.log("百分比改变",this.$store.state.rect.rects[this.activeRect].columnList.percentage)
					return this.$store.state.rect.rects[this.activeRect].columnList.percentage
				},
				set(v){
					console.log("百分比改变",this.$store.state.rect.rects[this.activeRect].columnList.percentage)
					this.$store.state.rect.rects[this.activeRect].columnList.percentage = v
				}
			},
			bgcWidth:{
				get(){
					console.log("拉动改变",this.$store.state.rect.rects[this.activeRect].width)
					return  this.$store.state.rect.rects[this.activeRect].width
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].width = v
				}
			},
			processBarFontSize:{
				get(){
					return this.$store.state.rect.rects[this.activeRect].columnList.processBarFontSize
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.processBarFontSize = v
				}
			},
			processBarColor:{
				get(){
					return this.$store.state.rect.rects[this.activeRect].columnList.processBarColor
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.processBarColor = v
				}
			},
			processBarFontColor:{
				get(){
					return this.$store.state.rect.rects[this.activeRect].columnList.processBarFontColor
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.processBarFontColor = v
				}
			}
		}
	};
</script>

<style scoped>
  .toolbar-wh-row{
    width: 100%;
    margin-top: 5px;
    float: left;
    font-weight: bold;
    font-size: 15px
  }
</style>
