<template>
  <div class="toolbar-wh-row" @mousedown.stop style="height:100%;width: 100%; border: none">
    <el-row>
      <span style="float: left; font-weight: bold; font-size: 15px; width:100%">背景块尺寸：</span>
      <el-row style="width:100%">
        <span>宽：</span>
        <el-input-number style="width:150px; margin-top: 10px" v-model="bgcWidth" size="mini" controls-position="right" :min="1" >
      </el-input-number>
        <span>px</span>
      </el-row>
      <el-row style="width:100%">
        <span>高：</span>
        <el-input-number style="width:150px; margin-top: 10px" v-model="bgcHeight" size="mini"
                         controls-position="right" :min="1" ></el-input-number>
        <span>px</span>
      </el-row>
      <el-row style="width:100%; margin-top: 20px;">
        自定义样式
        <el-switch
          v-model="switchValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleSwitchValue()"
        >
        </el-switch>
      </el-row>
      <el-row style="width:100%; margin-top: 10px;" v-if="switchValue === true">
        <el-menu>
          <el-submenu style="background-color: gainsboro" index="1">
            <template slot="title" >
              <i class="el-icon-full-screen"></i>
              <span>自定义背景框样式</span>
            </template>
            <div style="width: 100%;background-color: whitesmoke">
              <template>
                <div style="padding-top: 10px; padding-left: 10px; padding-bottom: 10px;"><span>边框图片</span></div>
                <div style="margin-left: 60px;">
                  <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    :on-change="handleAvatarSuccess"
                    :on-remove="handleRemove">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="imageUrl" alt="">
                    </div>
                  </el-upload>
                </div>
                <div style="width: 100%;background-color: whitesmoke">
                  <template>
                    <div style="padding-top: 10px; padding-left: 10px; "><span>边框粗细</span></div>
                    <div class="block" style="padding-left: 20px; ">
                      <el-slider
                        v-model="borderWidth"
                        show-input :max="100">
                      </el-slider>
                    </div>
                  </template>
                </div>
                <div style="width: 100%;background-color: whitesmoke">
                  <template>
                    <div style="padding-top: 10px; padding-left: 10px; "><span>内容器背景色</span></div>
                    <div class="block" style="padding-left: 20px; ">
                      <el-color-picker v-model="bgcColor" size="small" :predefine="predefineColors" ></el-color-picker>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </el-submenu>
        </el-menu>
      </el-row>
      <div v-else="switchValue === false">
        <el-row style="margin-top: 10px;">
          <span style="float: left; font-weight: bold; font-size: 15px;margin-top: 10px;">自定义背景块颜色：</span>
          <el-color-picker v-model="bgcColor" size="small" :predefine="predefineColors" ></el-color-picker>
        </el-row>
        <el-row style="width:100%; margin-top: 10px;" >
          <el-menu>
            <el-submenu style="background-color: gainsboro" index="1">
              <template slot="title" >
                <i class="el-icon-crop"></i>
                <span>圆角</span>
              </template>
              <div style="width: 100%;background-color: whitesmoke">
                <template>
                  <div style="padding-top: 10px; padding-left: 10px; "><span>左上角</span></div>
                  <div class="block" style="padding-left: 20px; ">
                    <el-slider
                      v-model="bgLeftUpRadius"
                      show-input :max="100">
                    </el-slider>
                  </div>
                </template>
              </div>
              <div style="width: 100%;background-color: whitesmoke">
                <template>
                  <div style="padding-top: 10px; padding-left: 10px;"><span>右上角</span></div>
                  <div class="block" style="padding-left: 20px; ">
                    <el-slider
                      v-model="bgRightUpRadius"
                      show-input :max="100">
                    </el-slider>
                  </div>
                </template>
              </div>
              <div style="width: 100%;background-color: whitesmoke">
                <template>
                  <div style="padding-top: 10px; padding-left: 10px;"><span>左下角</span></div>
                  <div class="block" style="padding-left: 20px; ">
                    <el-slider
                      v-model="bgLeftBottomRadius"
                      show-input :max="100">
                    </el-slider >
                  </div>
                </template>
              </div>
              <div style="width: 100%;background-color: whitesmoke">
                <template>
                  <div style="padding-top: 10px; padding-left: 10px;"><span>右下角</span></div>
                  <div class="block" style="padding-left: 20px; ">
                    <el-slider
                      v-model="bgRightBottomRadius"
                      show-input :max="100">
                    </el-slider>
                  </div>
                </template>
              </div>
            </el-submenu>
          </el-menu>
        </el-row>
      </div>

    </el-row>
  </div>
</template>
<script>

	export default {
		name: "DefineBackgroundSetting",
		data(){
			return{
				//画布颜色
				predefineColors: [
					'#1D2B3A',
					'#ff8c00',
					'#ffd700',
					'#90ee90',
					'#00ced1',
					'#1e90ff',
					'#c71585',
					'#c7158577'
				],
				//   自定义样式开关
				switchValue:false,
				//    边框图片

			}
		},
		created(){
			this.bgcColor = this.$store.state.rect.rects[this.activeRect].columnList.bgcColor
		},
		computed: {
			activeRect() {
				return this.$store.getters['rect/getActive'];
			},
			//获得当前变量的动态变化
			bgcColor:{
				get(){
					return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.bgcColor
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.bgcColor = v
				}
			},
			bgcWidth:{
				get(){
					console.log("拉动改变",this.$store.state.rect.rects[this.activeRect].width)
					return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].width
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].width = v
				}
			},
			bgcHeight:{
				get(){
					return this.$store.state.rect.rects[this.activeRect].height
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].height = v
				}
			},
			bgLeftUpRadius:{
				get(){
					// console.log(this.$store.state.rect.rects[this.activeRect].columnList.bgLeftUpRadius)
					return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.bgLeftUpRadius
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.bgLeftUpRadius = v
				}
			},
			bgRightUpRadius:{
				get(){
					return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.bgRightUpRadius
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.bgRightUpRadius = v
				}
			},
			bgLeftBottomRadius:{
				get(){
					return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.bgLeftBottomRadius
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.bgLeftBottomRadius = v
				}
			},
			bgRightBottomRadius:{
				get(){
					return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.bgRightBottomRadius
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.bgRightBottomRadius = v
				}
			},
			borderWidth:{
				get(){
					return this.$store.state.rect.rects[this.activeRect].columnList.borderWidth
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.borderWidth = v
				}
			},
			imageUrl:{
				get(){
					return this.$store.state.rect.rects[this.activeRect].columnList.imageUrl
				},
				set(v){
					this.$store.state.rect.rects[this.activeRect].columnList.imageUrl = v
				}
			},
		},
		watch:{
			switchValue:{
				handler(news,olds){
					if(news === true){
						this.$store.state.rect.rects[this.activeRect].columnList.bgcColor = ''
						this.$store.state.rect.rects[this.activeRect].columnList.bgLeftUpRadius = 0
						this.$store.state.rect.rects[this.activeRect].columnList.bgRightUpRadius = 0
						this.$store.state.rect.rects[this.activeRect].columnList.bgLeftBottomRadius = 0
						this.$store.state.rect.rects[this.activeRect].columnList.bgRightBottomRadius = 0
					}
					else{
						this.imageUrl = ''
						this.borderWidth = 0;
					}
				}
			}
		},

		methods:{
			handleSwitchValue(){
				this.$store.state.rect.rects[this.activeRect].columnList.bgcColor = ''
				this.$store.state.rect.rects[this.activeRect].columnList.bgLeftUpRadius = 0
				this.$store.state.rect.rects[this.activeRect].columnList.bgRightUpRadius = 0
				this.$store.state.rect.rects[this.activeRect].columnList.bgLeftBottomRadius = 0
				this.$store.state.rect.rects[this.activeRect].columnList.bgRightBottomRadius = 0
			},
			handleRemove(file) {
				this.imageUrl = ''
				this.borderWidth = 0;
				console.log("delete");
			},
			handleAvatarSuccess(file,fileList) {
				if(fileList.length>1){
					fileList.splice(0,1)
				}
				this.imageUrl = file.url
				this.borderWidth = 1;
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
  .toolbar-row-title{
    width: 100%;
    float: left;
    font-size: 15px;
    font-weight: bold;
    color: #1A173B;
  }
</style>
