<template>
  <div>
    <el-dropdown trigger="click">
      <el-button class="el-dropdown-link">
        选择装饰
      </el-button>
      <el-dropdown-menu slot="dropdown" style="">
        <el-dropdown-item v-for="(item,index) in link" :key="index"><img :src="link[index]" @click="sel(index)" width="60px"/></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
     watch:{
        ids:{
            handler(){
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.ids = this.ids;
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
            }
        },
        activeRect:{
            handler(){
                let that=this;
                that.ids=that.activeRect.ids;
            }
        }
    },
    data(){
        return{
             link:["../../../../static/gif/biankuang.jpg",
             "../../../../../static/gif/hongqi.gif",
             "../../../../../static/gif/paopao.gif",
             "../../../../../static/gif/pugong.gif",
             "../../../../../static/gif/xingxing.gif",
             ],
        }
    },
    computed: {
            activeRect() {
                return this.$store.getters['rect/getActive'];
            },
            imgids() {
                return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.ids
            },}
,    methods:{
        sel(index){
            let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
            columnList.ids = index;
            this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
        }
    },
    mounted(){

    },

}
</script>

<style>

</style>