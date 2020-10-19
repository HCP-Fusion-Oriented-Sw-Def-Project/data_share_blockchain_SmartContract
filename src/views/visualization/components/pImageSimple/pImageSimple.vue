<template>
    <div id="pImageSimple" style="height:100%;width: 100%; border: none">
        <div class="pImageSimple_box" :style="style_pImageSimple_box" @click="rout_do">
            <!-- <img :src="link" :style="style_pImageSimple_box"/> -->
        </div>
    </div>
</template>

<script>
const animationDuration = 6000

export default {
    //组件名称
    name: 'pImageSimple',

    // 传入的参数
    props:{
        columnList: {
            type: Object,
            default: null
        },
        //模块宽度
        link:{
            type: String,
            default: 'https://img.alicdn.com/tfs/TB1J3GkgeH2gK0jSZJnXXaT1FXa-600-360.png'
        },
        repeat:{
            type: String,
            default: '拉伸'
        },
        rout:{
            type: String,
            default: ''
        }
    },
    mounted(){
        
        var that=this;
        console.log(that.columnList)
        that.console();
        that.style_pImageSimple_box.background='url('+'\''+that.link+'\''+')';
        if(that.repeat=='拉伸'){
            that.style_pImageSimple_box.background='url('+'\''+that.link+'\''+')';
            that.style_pImageSimple_box.background+="0% 0%/100% 100%"
            that.style_pImageSimple_box.background+=" no-repeat"
        }
        else if(that.repeat=='水平与垂直重复'){
            that.style_pImageSimple_box.background='url('+'\''+that.link+'\''+')';
            that.style_pImageSimple_box.background+=""
            that.style_pImageSimple_box.background+=" repeat"
        }
        else if(that.repeat=='水平重复'){
            that.style_pImageSimple_box.background='url('+'\''+that.link+'\''+')';
            that.style_pImageSimple_box.background+=""
            that.style_pImageSimple_box.background+=" repeat-x"
        }
        else{
            that.style_pImageSimple_box.background='url('+'\''+that.link+'\''+')';
            that.style_pImageSimple_box.background+=""
            that.style_pImageSimple_box.background+=" repeat-y"
        }
    },
    methods:{
        rout_do(){
            if(this.rout.length==0){
                return;
            }
            if(this.rout.substr(0,4)=="http"){
            }
            else{
                this.rout="http://"+this.rout;
            }
            window.open(this.rout);
        },
        console(){
            this.link = this.columnList.link;
            this.repeat = this.columnList.repeat;
            this.rout = this.columnList.rout;
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
        repeat:{
            handler(news, olds){
                var that=this;
                if(news=='拉伸'){
                    that.style_pImageSimple_box.background='url('+'\''+that.link+'\''+')';
                    that.style_pImageSimple_box.background+="0% 0%/100% 100%"
                    that.style_pImageSimple_box.background+=" no-repeat"
                }
                else if(news=='水平与垂直重复'){
                    that.style_pImageSimple_box.background='url('+'\''+that.link+'\''+')';
                    that.style_pImageSimple_box.background+=""
                    that.style_pImageSimple_box.background+=" repeat"
                }
                else if(news=='水平重复'){
                    that.style_pImageSimple_box.background='url('+'\''+that.link+'\''+')';
                    that.style_pImageSimple_box.background+=""
                    that.style_pImageSimple_box.background+=" repeat-x"
                }
                else{
                    that.style_pImageSimple_box.background='url('+'\''+that.link+'\''+')';
                    that.style_pImageSimple_box.background+=""
                    that.style_pImageSimple_box.background+=" repeat-y"
                }
            }
        },
        link:{
            handler(news, olds){
                var that=this;
                that.style_pImageSimple_box.background='url('+'\''+news+'\''+')';
                that.style_pImageSimple_box.background+="0% 0%/100% 100%"
                that.style_pImageSimple_box.background+=" no-repeat"
            }
        }
    },
    // 设置的参数
    data(){
        return{
            style_pImageSimple_box:{
                backgroundSize:"",
                backgroundRepeat:"",
                height: '100%',
                width: '100%' ,
                border:'none',
                outline:'none',
                background:'url('+'\''+this.link+'\''+')'
            }
        }
    }
}
</script>

<style>
</style>