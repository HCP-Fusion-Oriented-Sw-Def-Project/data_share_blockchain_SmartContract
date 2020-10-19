<template>
    <div id="pRotationImageSetting">
        <div v-for="(item,index) in link" :key="index">

      <el-form ref="form" label-width="40px">
       
        <el-form-item label="链接">
        <el-input v-model="link[index]"></el-input>
         </el-form-item>
<el-form-item label="动作">
        <el-button @click="delImage(index)">删除</el-button>
         </el-form-item>
      </el-form>
        </div>
    <el-button @click="addImage">添加</el-button>
     


    </div>
</template>

<script>
export default {
        watch:{
        link:{
            handler(){
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.link = this.link;
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
            }
        },
        activeRect:{
            handler(){
                let that=this;
                that.link=that.imglink;
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
    },
    mounted(){
        var that=this;
        that.console();
    },
    data(){
        return{
            link:[],
            names:[]
        }
    },
    methods:{
    //   hhh(index){
    //     document.getElementById("inputfile").click()
    //   },
        makeclear(){

        },
        console(){
             this.link = this.imglink;
             for(var i=0;i<this.link.length;i++){
             }
        },
        addImage(){
            this.link.push("https://img.alicdn.com/tfs/TB1J3GkgeH2gK0jSZJnXXaT1FXa-600-360.png")
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.link = this.link;
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
        },
        delImage(index){
            this.link.splice(index,1);
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.link = this.link;
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
        },
    //     displayImage(index) {
    //     console.log(index)
    //     const file = this.$refs.fileInput.files[0]
    //     const fr = new FileReader()
    //     fr.onload = (e) => {
    //       this.link[index] = e.target.result
    //       let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
    //       columnList.link = this.link
    //       this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
    //     }
    //     fr.readAsDataURL(file)
    //   },
    }
}
</script>

<style>

</style>