<template>
	<div>
		<div class="toolbar-wh-row" @mousedown.stop>
			    <p class="toolbar-row-title">文字内容：

			      <textarea :rows="3" :cols="25" :value="inputContent" @change="changeContent" ></textarea>
			    </p>
			    <p class="toolbar-row-title">字体大小：
			      <input style="width: 50px" :value="inputFontSize" @change="changeFontSize" />px
			    </p>
		  </div>
		  <div class="toolbar-wh-row" @mousedown.stop>
		  	<p class="toolbar-row-title">是否轮播：
			      <el-switch
					  v-model="SwitchValue"
					  active-color="#13ce66"
					  inactive-color="#ff4949"
					  @change="">
				</el-switch>
			    </p>
		  </div>
		  <div class="block" @mousedown.stop>
		  	<p class="toolbar-row-title">定速播放：

				    <el-slider
				      v-model="speed"
				      :step="10"
				      show-stops
				      style="width:80%;margin-left: 15px;">
    				</el-slider>

			    </p>
		  </div>

    <!--
	  <div @mousedown.stop>
	  	<p class="toolbar-row-title">动画时间：
		      <input style="width: 50px" :value="lasting" @change="changeFontSize" />毫秒
		    </p>
	  </div>

	<div @mousedown.stop>
	  	<p class="toolbar-row-title">前期停留：
		      <input style="width: 50px" :value="forward" @change="changeFontSize" />毫秒
		    </p>
	 </div>


	<div @mousedown.stop>
	  	<p class="toolbar-row-title">后期停留：
		      <input style="width: 50px" :value="after" @change="changeFontSize" />毫秒
		    </p>
		</div>
-->
	</div>


</template>

<script >
export default{
	name:"marqueeSetting",
	data()
	{
		return{


		}

	},
	computed: {
            activeRect() {
                if(this.$store.getters['rect/getActive']!=null)
                return this.$store.getters['rect/getActive'];
                return this.activeRect;
            },

            inputContent:{
                get:function()
                {
                    return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.content
                },
                // set:function(newValue)
                // {
                //     if(this.activeRect=== null);
                //     else
                //     {
                //         this.$store.state.rect.rects[this.activeRect].columnList.content=newValue
                //     }
                // }

            },

            inputFontColor() {
                return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.fontColor
            },

            inputFontSize() {
                return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.fontSize
            },
            SwitchValue:
            {
                get:function()
                {
                    return this.activeRect=== null?'':this.$store.state.rect.rects[this.activeRect].extra.switch
                },
                set:function(newValue)
                {
                    if(this.activeRect=== null);
                    else
                    {
                        this.$store.state.rect.rects[this.activeRect].extra.switch=newValue
                        let temp = this.$store.state.rect.rects[this.activeRect].extra.lasting;

                        this.$store.state.rect.rects[this.activeRect].extra.lasting=0;
                        this.$store.state.rect.rects[this.activeRect].extra.lasting=temp;


                    }
                }

            },
            speed:
            {
                get: function () {
            	return this.activeRect=== null?'':this.$store.state.rect.rects[this.activeRect].extra.speed*10},

                set: function (newValue) {
                return this.activeRect=== null?'':this.$store.state.rect.rects[this.activeRect].extra.speed=(newValue/10)}
            }
            ,
            lasting()
            {
            	return this.activeRect=== null?'':this.$store.state.rect.rects[this.activeRect].extra.lasting
            },
            forward()
            {
            	return this.activeRect=== null?'':this.$store.state.rect.rects[this.activeRect].extra.forward
            },
            after()
            {
            	return this.activeRect=== null?'':this.$store.state.rect.rects[this.activeRect].extra.after
            },
        },
        methods:{
            changeContent(ev) {
                console.log("this.activeRect"+this.activeRect);
                let content = ev.target.value;
                let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
                columnList.content = content;
                this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
            },

            changeFontSize(ev) {
                let fontSize = parseInt(ev.target.value);
                if (typeof fontSize !== 'number' || isNaN(fontSize)) {
                    fontSize = this.$store.state.rect.rects[this.activeRect].columnList.fontSize;
                    ev.target.value = fontSize;
                }
                let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
                this.$set(columnList,'fontSize',fontSize);
                this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
                // console.log("fontSize:");
                // console.log(this.$store.state.rect.rects[this.activeRect].columnList.fontSize);
            },

            changeFontColor(ev) {
                let fontColor = parseInt(ev.target.value);
                let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
                this.$set(columnList,'fontColor',fontColor);
                this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
            }
        },
        watch:{
            inputContent:function(newValue)
            {
                this.$store.state.rect.rects[this.activeRect].columnList.content=newValue
            }
        }


    }



</script>
