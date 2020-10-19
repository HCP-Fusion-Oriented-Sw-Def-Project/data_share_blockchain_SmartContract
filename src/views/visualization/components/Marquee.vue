<template>
  <div>
  <!-- 外框，固定宽度 -->
  <div id="wrap" class="wrap" :style="style">
    <!-- 内部滚动框 -->
    <div id="box" :style="styleBox">
      <!-- 展示的文字 -->
      <div id="marquee" :style="styleObject">{{text}}</div>
      <!-- 文字副本，为了实现无缝滚动 -->

    </div>
    <!-- 为了获取text实际宽度 -->
    <div id="node" :style="styleNode">{{text}}</div>
  </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
export default {

  name: 'Marquee',
  // props: ['lists'], // 父组件传入数据， 数组形式 [ "连雨不知春去"，"一晴方觉夏深"]
  props: {
    width: {
      type: String,
      default: '420px'
    },
    height: {
      type: String,
      default: '100px'
    },
    columnList: {
      type: Object,
      default: null
    },
    extra:{
      type:Object,
      default:null
    },
    id:{
      type:Number,
      default:null
    }
  },
  data () {
    return {
      distance:0,
      text: '', // 数组文字转化后的字符串
      styleObject: {
        // height: '100%',
        // width: '100%' ,
        // width: '80000%',
        margin:' 0 16px 0 0',
        fontSize:this.columnList.fontSize+'px',
        color:this.columnList.fontColor,
        // position:'absolute',
        overflow: 'hidden',
        float: "left",
        display:'inline-block',
        'word-break':'keep-all',           /* 不换行 */
        'white-space':'nowrap'        /* 不换行 */
      },
      style: {
        height: '100%',
        width: '100%' ,
        fontSize:this.columnList.fontSize+'px',
        color:this.columnList.fontColor,
        // position:'absolute',
        overflow: 'hidden',
        float: "left",
        // display:'inline-block',
        'word-break':'keep-all',           /* 不换行 */
        'white-space':'nowrap',        /* 不换行 */
        display:'table-cell',
        'vertical-align':'middle'
      },
      styleBox: {
        height: this.columnList.fontSize+'px',
        width: '80000%' ,
        // fontSize:this.columnList.fontSize+'px',
        // color:this.columnList.fontColor,
        // position:'absolute',
        overflow: 'hidden',
        float: "left",
        display:'inline-block',
        'word-break':'keep-all',           /* 不换行 */
        'white-space':'nowrap'        /* 不换行 */
      },
      styleNode: {
        fontSize:this.columnList.fontSize+'px',
      },
    }
  },
  methods: {

    move () {

// 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
      let width = document.getElementById('node').getBoundingClientRect().width
      let box = document.getElementById('box')

       // 位移距离
       // 设置位移
      let that =this


      this.timer = setInterval(function () {
        // console.log(that.speed)
        if(that.switch==true)
        {
        that.distance = that.distance - that.speed;}
 // 如果位移超过文字宽度，则回到起点

        else that.distance = 0;
        if (-that.distance >= width) {
          that.distance = 16+width
          // this.showCopy=true
        }
        box.style.transform = 'translateX(' + that.distance + 'px)'
        // this.showCopy=false
        that.last += 20;
        if(that.last<0)
        {
          that.$store.state.rect.rects[that.activeRect].extra.switch=false;
        }
      }, 20)



    }
  },
  // computed:{
  //   last:
  //   {
  //     get:function()
  //     {
  //       this.last =this.$store.state.rect.rects[this.activeRect].extra.lasting;
  //     }
  //   }
  // }
  // ,
// 把父组件传入的arr转化成字符串
  mounted:function()
  {
    this.activeRect =this.id
    this.speed = this.$store.state.rect.rects[this.activeRect].extra.speed;
    this.lasting = this.$store.state.rect.rects[this.activeRect].extra.lasting;
    this.last = this.lasting
    this.switch =  this.$store.state.rect.rects[this.activeRect].extra.switch;
    this.forward = this.$store.state.rect.rects[this.activeRect].extra.forward;
    this.after = this.$store.state.rect.rects[this.activeRect].extra.after
    this.text += ' ' + this.columnList.content
    this.temp = this.lastingChange;
    this.temp = this.switchChange;
    this.temp = this.speedChange;
    this.temp = this.forwardChange;
    this.temp = this.after;
    this.temp = this.text;
  },

// 更新的时候运动
  updated: function () {
    this.move()
  },
  beforeDestroy(){

    clearInterval(this.timer);
  },
  computed:{
    lastingChange:{
        get:function()
        {
          return this.$store.state.rect.rects[this.id].extra.lasting
        },
      },
      switchChange:{
        get:function()
        {

          return this.$store.state.rect.rects[this.id].extra.switch
        },
      },
      speedChange:{
        get:function()
        {
          return this.$store.state.rect.rects[this.id].extra.speed
        },
      },
      forwardChange:{
        get:function()
        {
          return this.$store.state.rect.rects[this.id].extra.forward
        },
      },
      afterChange:{
        get:function()
        {
          return this.$store.state.rect.rects[this.id].extra.after
        },
      },
      textChange:{
        get:function()
        {
          return this.$store.state.rect.rects[this.id].columnList.content
        },
      },
  }

  ,
  watch:{
    lastingChange: {
      handler: function(New,Old)
      {

        this.last = New;
      },
      deep: true
    },
    switchChange: {
      handler: function(New,Old)
      {
        this.switch = New;
        if(this.switch===false)
        {
          clearInterval(this.timer);
          clearInterval(this.timer);
        }
        else{
          this.move()
        }
      },
      deep: true
    },
    speedChange: {
      handler: function(New,Old)
      {

        this.speed = New;
      },
      deep: true
    },
    forwardChange: {
      handler: function(New,Old)
      {

        this.forward = New;
      },
      deep: true
    },
    afterChange: {
      handler: function(New,Old)
      {

        this.after = New;
      },
      deep: true
    },
    textChange: {
      handler: function(New,Old)
      {
        this.$store.state.rect.rects[this.activeRect].extra.switch=false;

        this.text = New;
      },
      deep: true
    },
  }

}
</script>
<style scoped>
/* // 限制外框宽度，隐藏多余的部分 */
/* .wrap {
} */
/* // 移动框宽度设置 */
#box {
  width: 80000%;
}
/* // 文字一行显示 */
#box div {
  float: left;
}
/* // 设置前后间隔 */
#marquee {
  margin: 0 16px 0 0;
}
/* // 获取宽度的节点，隐藏掉 */
#node {
  position: absolute;
  z-index: -999;
  top: -999999px;
}
</style>
