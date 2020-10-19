<template>
  <div>
      <img :src="link[ids]" width="100%" height="100%"/>
  </div>
</template>

<script>
export default {
    data(){
        return{
            link:["../../../../static/gif/biankuang.jpg","../../../../../static/gif/hongqi.gif","../../../../../static/gif/paopao.gif","../../../../../static/gif/pugong.gif","../../../../../static/gif/xingxing.gif"],
            ids:0,
        }
    },
    mounted(){
        var that=this;
        that.console();
    },
    methods:{
        console(){
            this.ids=this.columnList.ids;
        }
    },
     watch:{
        columnList:{
          handler(){
              var that=this
                that.console();
            },
            deep: true
        },
    },
    props:{
        columnList: {
            type: Object,
            default: null
        },
    },
}
</script>

<style>

</style>