<template>
  <div class="toolbar-wh-row"  >
    <el-row style="margin-top:10px;">
      <span style="font-weight: bold;">显示文字&nbsp&nbsp</span>
      <el-switch
        v-model="switchValue"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </el-row>
    <el-row style="margin-top:20px;height:40px; ">
      <span style="line-height: 40px;">箭头标题</span>
      <div style="float:right;">
        <el-input v-model="arrowText" width="70%" placeholder="请输入箭头标题"></el-input>
      </div>
    </el-row>
    <el-row style="margin-top:20px;height:40px; ">
      <span style="line-height: 40px;">标题位置</span>
      <div style="float:right;  width:180px">
        <el-select v-model="value" placeholder="请选择" width="70%" @change="selectOption">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-row>
    <el-row style="margin-top:20px;height:40px; ">
      <span style="line-height: 40px;">标题字体大小</span>
      <div style="float:right; width:180px">
        <el-input-number
          v-model="textFontSize"
          show-input :max="30"
          @change="handleFontSize">
        </el-input-number>
      </div>
    </el-row>
    <el-row style="margin-top:20px; height: 40px;">
      <div style="width: 100px; float:left">
        <span style="line-height: 40px;">标题字体颜色</span>
      </div>
      <div style="width: 100px; float:left">
        <el-color-picker v-model="fontColor" size="small" :predefine="predefineColors" ></el-color-picker>
      </div>
    </el-row>
    <el-row style="margin-top:20px;height:40px; ">
      <span style="line-height: 40px; float:left">标题字体粗细</span>
      <div style="float:right; width:180px">
        <el-select v-model="value1" placeholder="请选择" >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-row>
  </div>
</template>

<script>
	export default {
		name: "DrawArrowSetting",
		data(){
			return{
		  textFontSize:12,
				switchValue:true,
				options: [{
					value: '选项1',
					label: '弧线上'
				}, {
					value: '选项2',
					label: '弧线中间'
				}, {
					value: '选项3',
					label: '弧线下'
				}],
				value: '选项1',
				options1: [{
					value: '选项1',
					label: '正常'
				}, {
					value: '选项2',
					label: '较粗'
				}],
				value1:'选项1',
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
		created(){
			// this.value = '选项一'
			// this.fontColor = this.$store.state.rect.rects[this.activeRect].columnList.textFontColor
		},
		computed:{
			activeRect() {
				return this.$store.getters['rect/getActive'];
			},
			arrowText:{
				get(){
					return this.$store.state.rect.rects[this.activeRect].columnList.textContentArrow
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.textContentArrow = v
				}
			},
			fontColor:{
				get(){
					return this.$store.state.rect.rects[this.activeRect].columnList.textFontColor
				},
				set(v){
			this.$store.state.rect.rects[this.activeRect].columnList.textFontColor = v
				}
			},
		},
		watch: {
			switchValue: {
				handler(news, olds) {
					if (news !== true) {
						this.$store.state.rect.rects[this.activeRect].columnList.textContentArrow = ''
					}
				}
			},
			value:{
				handler(news,olds){
					if(news === '选项1')
						this.$store.state.rect.rects[this.activeRect].columnList.textLocation = '10%'
					if(news === '选项2')
						this.$store.state.rect.rects[this.activeRect].columnList.textLocation = '30%'
					if(news === '选项3')
						this.$store.state.rect.rects[this.activeRect].columnList.textLocation = '70%'
				},
				deep:true
			},
		value1:{
			handler(news,olds){
				if(news === '选项1')
					this.$store.state.rect.rects[this.activeRect].columnList.textFontWeight = 'normal'
				if(news === '选项2')
					this.$store.state.rect.rects[this.activeRect].columnList.textFontWeight = 'bold'
			},
			deep:true
		}
		},
		methods:{
		handleFontSize(){
      this.$store.state.rect.rects[this.activeRect].columnList.textFontSize = this.textFontSize
	},
			selectOption(val){
				//       console.log(val)
				//       if(val === '选项一')
				// 	      this.$store.state.rect.rects[this.activeRect].columnList.textLocation = '10%'
				// 	    if(val === '选项二')
				// 	      this.$store.state.rect.rects[this.activeRect].columnList.textLocation = '40%'
				// 	    if(val === '选项三')
				// 	      this.$store.state.rect.rects[this.activeRect].columnList.textLocation = '80%'
			}
		}
	}
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
