<template>
  <div  style="">
      <div id="runningHorseLantern">
          <div id="runningHorseLanternBox" :style="stylesheet">
         {{text}}
      </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"runningHorseLantern",
    props:{
        columnList: {
            type: Object,
            default: null
        },
    },
    watch:{
    // 'columnList':'console'
        columnList:{
            handler(){
                this.console();
            },
            deep: true
        }
    },
    data(){
        return{
            text:"12asd3",
            time_move: null,
            move_dis:0,
            stylesheet:{
                marginLeft:"0px",
                fontSize:"100px",
                color:"#000000",
            },
            time_interval:"1",
            interval_do:'1',
        }
    },
    mounted(){
        this.console();
    },
    beforeDestroy() {
      clearInterval(this.time_move);
    },
    methods:{
        console(){
            if(this.time_move!=null){
                clearInterval(this.time_move);
            }
            this.stylesheet.fontSize = this.columnList.fontSize+'px';
             this.stylesheet.color = this.columnList.text_color;
            this.text = this.columnList.text;
            this.interval_do=this.columnList.interval_do;
            this.time_interval=this.columnList.time_interval;
            this.time_move=setInterval(this.move_left,parseInt(this.time_interval));
        },

        move_left(){
            var that=this
            if(that.interval_do=='0'){
                // this.stylesheet.marginLeft="0px";
                // this.move_dis=0;
                return;
            }
            var fs=parseFloat(that.stylesheet.fontSize);
            var wid=this.text.length*fs;
            var wid_fir=document.getElementById("runningHorseLantern").offsetWidth;
            if(this.move_dis>wid_fir){
                this.move_dis=-parseInt(wid);
            }
            this.move_dis+=2;
            this.stylesheet.marginLeft=this.move_dis.toString()+'px';
        },
    }
}
</script>

<style>
#runningHorseLantern{
    overflow: hidden;
    height:100%;
    width: 100%; 
    border: none;
}
#runningHorseLanternBox{
    height:100%;
    overflow: hidden;
    width: max-content;
    border: none;
}
</style>