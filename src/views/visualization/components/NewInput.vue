<template>
    <div style="height:100%;width: 100%; border: none">
      <input class="input_a" v-model="columnList.content" type="text" :style="styleObject">
      </input>
    </div>
</template>

<script>

const animationDuration = 6000

export default {
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
  },
  data() {
    return {
      styleObject: {
        bottom:'1px',
        height: '100%',
        width: '100%' ,
        fontSize:this.columnList.fontSize+'px',
        color:this.columnList.fontColor,
        border:'none',
        outline:'none'
      },
      chart: null,
      legend: [],
      fontSize:'',
    }
  },
  mounted() {
    var that=this
    that.console()
  },
  beforeDestroy() {
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
  methods: {
    console(){
      // console.log("test-----------info---文本框")
      // console.log(this.height);
      // console.log(this.width);
      this.styleObject.fontSize = this.columnList.fontSize+'px';
      this.styleObject.color = this.columnList.fontColor;
      // console.log(this.styleObject)
    }
  }
}
</script>

<style>

  /*输入框*/

/*.input {
  border:none;
  outline:none;
  width: 420px;
}*/

.input_a {
  border:none;
/*  border-top:none,
  border-bottom:none,*/
  outline:none;
  text-align:center;
  position: relative;
  width: 100%;
  height:100%;
  padding: 0.5em 0.6em;
  background-color: transparent;
  display:inline-block;
  /*color: #4ec4ce;*/
}

/*.input__bg {
  display: block;
  position: absolute;
  z-index: -1;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #50c56c 0%, #4ec4ce 100%), linear-gradient(to right, #50c56c 0%, #4ec4ce 100%);
  transition: all 0.3s ease-out;
}*/


</style>
