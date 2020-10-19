<template>
  <div style="height:100%;width: 100%; border: none" id="pRotationImage">
      <!-- <div id="pRotationImageBox"> -->
        <el-carousel id="carousel-item-box" height="100%">
            <el-carousel-item v-for="item in items" :key="item" id="carousel-item" height="100%">
                <img :src="item" alt="" height="100%" width="100%">
            </el-carousel-item>
        </el-carousel>
      <!-- </div> -->
   
  </div>
</template>

<script>
export default {
    name:"pRotationImage",
    props:{
        columnList: {
            type: Object,
            default: null
        },
    },
    mounted(){
        this.creative();
    },
    watch:{
        columnList:{
          handler(){
              var that=this
                that.creative();
            },
            deep: true
        },
    },
    methods:{
        creative(){
            this.items = this.columnList.link;
        }
    },
    data(){
        return{
            items:[
            ]
        }
    }
}
</script>

<style>


#carousel-item{
    height: 100%;
}
#carousel-item-box{
     height: 100%;
}
</style>