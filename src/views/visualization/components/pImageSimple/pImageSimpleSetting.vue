<template>
  <div class="pImageSimpleSetting" @mousedown.stop>
      <input type="file" @change="displayImage" ref="fileInput" style="opacity: 0;" id="inputfile">
    <el-input v-model="previewImageLink" placeholder="请输入内容" @input="input_methods" style="margin-bottom:10px;"></el-input>
    <button id="inputfileButton" @click="hhh" style="background:#FFFFFF;border:none;width:100%;height:180px;margin-bottom:10px;">
      <img :src="previewImageSrc" width="100%">
    </button>
    
    <!-- <el-select v-model="value_repeat" placeholder="请选择" @change="se_change" @mousedown.stop>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
      </el-option>
    </el-select> -->
    <el-row>
    <el-button @click="change_repeat1" style="width:100%;margin-bottom:10px;">拉伸</el-button>
    </el-row>
    <el-row>
    <el-button @click="change_repeat2" style="width:100%;margin-bottom:10px;">水平与垂直重复</el-button>
    </el-row>
        <el-row>
    <el-button @click="change_repeat3" style="width:100%;margin-bottom:10px;">水平重复</el-button>
    </el-row>
        <el-row>
    <el-button @click="change_repeat4" style="width:100%;margin-bottom:10px;">垂直重复</el-button>
    </el-row>
    <el-input v-model="rout" placeholder="请输入超链接"  @input="input_rout_methods" style="width:100%;margin-bottom:30px;"></el-input>
    <!-- 这里要将 link，repeat，rout都配置好 -->
    <!-- <pImageSimple :link="previewImageSrc" :repeat="value_repeat" :rout="rout"></pImageSimple> -->
  </div>
</template>

<script>
import pImageSimple from './pImageSimple.vue'
export default {
  name: 'pImageSimpleSetting',
  data() {
      return {
        value_repeat: '拉伸',
        options: [{
          value: '拉伸',
          label: '拉伸'
        }, {
          value: '水平与垂直重复',
          label: '水平与垂直重复'
        }, {
          value: '水平重复',
          label: '水平重复'
        }, {
          value: '垂直重复',
          label: '垂直重复'
        }],
        imageUrl: '',
        previewImageSrc:'https://img.alicdn.com/tfs/TB1J3GkgeH2gK0jSZJnXXaT1FXa-600-360.png',
        previewImageLink:'https://img.alicdn.com/tfs/TB1J3GkgeH2gK0jSZJnXXaT1FXa-600-360.png',
        rout:"",
        
      };
    },
    watch:{
        value_repeat:{
            handler(news,olds){
                var that=this;
                that.se_change();
            }
        }
    },
    mounted(){
        let that=this;
        that.rout=that.imgrout;
        that.previewImageSrc=that.imglink;
        if(that.previewImageSrc.length>1000){
            that.previewImageLink="本地图片";
        }
        else{
            that.previewImageLink=that.previewImageSrc;
        }
        that.value_repeat=that.imgrepeat;
        console.log(that.$store.state.rect.rects[this.activeRect].columnList)
    },
    watch:{
        
        activeRect:{
            handler(){
                let that=this;
                that.rout=that.imgrout;
                that.previewImageSrc=that.imglink;
                if(that.previewImageSrc.length>1000){
                    that.previewImageLink="本地图片";
                }
                else{
                    that.previewImageLink=that.previewImageSrc;
                }
                that.value_repeat=that.imgrepeat;
                console.log(that.$store.state.rect.rects[this.activeRect].columnList)
            }
        }
    },
    computed: {
            activeRect() {
                return this.$store.getters['rect/getActive'];
            },
            imglink() {
                return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.link
            },

            imgrepeat() {
                return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.repeat
            },

            imgrout() {
                return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.rout
            },
    },
    methods: {
        change_repeat1(){
            this.value_repeat="拉伸";
            this.se_change();
        },
        change_repeat2(){
            this.value_repeat="水平与垂直重复";
            this.se_change();
        },
        change_repeat3(){
            this.value_repeat="水平重复";
            this.se_change();
        },
        change_repeat4(){
            this.value_repeat="垂直重复";
            this.se_change();
        },
    input_rout_methods(){
          let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
          columnList.rout = this.rout;
          this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
    },
    se_change(){
          let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
          columnList.repeat = this.value_repeat;
          console.log(this.value_repeat)
          this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
      },
     input_methods(){
          this.previewImageSrc=this.previewImageLink;
          let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
          columnList.link = this.previewImageSrc;
          this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
      },
      
     
      hhh(){
        document.getElementById("inputfile").click()
      },
      displayImage() {
        const file = this.$refs.fileInput.files[0]
        const fr = new FileReader()
        fr.onload = (e) => {
          this.previewImageSrc = e.target.result
          this.previewImageLink=file.name
          let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
          columnList.link = this.previewImageSrc;
          this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
          console.log( this.activeRect, columnList,this.previewImageSrc)
        }
        fr.readAsDataURL(file)
        this.value_repeat="拉伸"

        
      }
    },
  
  components: {pImageSimple}, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
