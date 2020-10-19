<template>
  <div @mousedown.stop id="runningHorseLanternSetting">
      
      <el-form ref="form" label-width="40px">
       
        <el-form-item label="内容">
        <el-input v-model="input" placeholder="请输入内容" @input="changetext"></el-input>
         </el-form-item>
         <el-form-item label="开关">
        <el-switch
            v-model="value"
            @change="changeinterval_do"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
        </el-form-item>
        <el-form-item label="速度">
        <el-slider v-model="speeds" :min="1" :max="10" @change="changetime_interval"></el-slider>
        </el-form-item>
        <el-form-item label="大小">
        <el-input-number v-model="fontsize" :min="1" :max="1000" label="文字大小" @change="changefontSize"></el-input-number>
        </el-form-item>
        <el-form-item label="颜色">
        <el-input v-model="color" placeholder="请输入颜色" @input="changetext_color"></el-input>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    computed:{
        activeRect() {
            return this.$store.getters['rect/getActive'];
        },
        lanternFontSize(){
            return this.activeRect===null? '':this.$store.state.rect.rects[this.activeRect].columnList.fontSize;
        },
        lanterninterval_do(){
            return this.activeRect===null? '':this.$store.state.rect.rects[this.activeRect].columnList.interval_do;
        },
        lanterntime_interval(){
            return this.activeRect===null? '':this.$store.state.rect.rects[this.activeRect].columnList.time_interval;
        },
        lanterntext(){
            return this.activeRect===null? '':this.$store.state.rect.rects[this.activeRect].columnList.text;
        },
        lanterntext_color(){
            return this.activeRect===null? '':this.$store.state.rect.rects[this.activeRect].columnList.text_color;
        }

    },
    mounted(){
        this.console();
    },
    watch:{
        activeRect:{
            handler(){
                this.console();
            }
        }
    },
    methods:{
        changetext(){
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.text = this.input;
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
        },
        changetime_interval(){
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.time_interval = (11-this.speeds).toString();
            console.log(columnList.time_interval)
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
        },
        changefontSize(){
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.fontSize = this.fontsize.toString();
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
        },
        changeinterval_do(){
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.interval_do = (this.value===true?'1':'0');
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
        },
        changetext_color(){
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.text_color = this.color;
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
        },
        console(){
            this.fontsize=parseInt(this.lanternFontSize);
            console.log(this.lanterninterval_do)
            if(this.lanterninterval_do==='0'){
                this.value=false;
            }
            else{
                this.value=true;
            }
            this.speeds=11-parseInt(this.lanterntime_interval);
            this.input=this.lanterntext;
            this.color=this.lanterntext_color;
        },
    },
    data() {
        return {
            fontsize:50,
            value: true,
            speeds:1,
            input:"",
            color:"#409EFF",
        }
    },

}
</script>

<style>

</style>