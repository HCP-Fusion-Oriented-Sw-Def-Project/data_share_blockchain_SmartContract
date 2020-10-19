<template>
    <div style="height:100%;width:100%">
      <img :src="columnList"  :style="styleObject"  />
      <!-- <div class="input__bg"></div> -->
    </div>
</template>

<script>

const animationDuration = 6000

export default {
  props: {
    width: {
      type: String,
      default: '800px'
    },
    height: {
      type: String,
      default: '800px'
    },
    columnList: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      styleObject: {
        height: this.height ,
        width: this.width ,
        fontSize:this.columnList.fontSize+'px',
        color:this.columnList.fontColor
      },
      chart: null,
      legend: [],

    }
  },
  mounted() {
    // this.console()
  },
  beforeDestroy() {
  },
  watch:{
  },
  methods: {
    console(){
      console.log("文本框")
      console.log(this.height)
    }
  }
}
</script>

<style>

  /*输入框*/

/*.container {
  position: absolute;
  width: 450px;
  height: 100px;
  transform: translate(-50%, -50%);
}
*/
.input {
  width: 420px;
}

.input__input {
  text-align:center;
  position: relative;
  font-size: 36px;
  width: 100%;
  height:100%;
  padding: 0.5em 0.6em;
  line-height: 1.4;
  -webkit-appearance: none;
  border-radius: 2px;
  border: none;
  background-repeat: no-repeat;
  background-image: linear-gradient(to right, #50c56c 0%, #4ec4ce 100%), linear-gradient(to right, #50c56c 0%, #4ec4ce 100%);
  border-left: 3px solid #50c56c;
  border-right: 3px solid #4ec4ce;
  background-position: 0 0, 0 100%;
  background-size: 100% 3px;
  background-color: transparent;
  color: #4ec4ce;
}
.input__input::-webkit-input-placeholder {
  color: #4ec4ce;
  font-family: 'Proxima Nova', 'futura', 'helvetica';
  transition: color 0.2s ease-out;
}
.input__input:focus {
  outline: none;
}
.input__input:focus::-webkit-input-placeholder {
  color: white;
}
.input__input:focus ~ .input__bg {
  opacity: 1;
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
