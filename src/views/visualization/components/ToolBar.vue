<template>
  <div class="toolbar" @mousedown.stop>
      <el-row>
        <span>尺寸：</span>
        <el-input-number v-model="width" size="mini" controls-position="right" :min="minw"></el-input-number>
        <el-input-number v-model="height" size="mini" controls-position="right" :min="minh"></el-input-number>
      </el-row>
      <el-row>
        <span>位置：</span>
        <el-input-number v-model="left" size="mini" controls-position="right" :min="0"></el-input-number>
        <svgicon name="lock" :color="topIsLocked ? '#42b983 #35495e' : '#AAA'" width="13" height="13"
                 class="position-lock-icon" @click.native="toggleYLock" > </svgicon>
        <el-input-number v-model="top" size="mini" controls-position="right" :min="0"></el-input-number>
        <svgicon name="lock" :color="leftIsLocked ? '#42b983 #35495e' : '#AAA'" width="13" height="13"
                 class="position-lock-icon" @click.native="toggleXLock" > </svgicon>
      </el-row>
<!--      <el-row>-->
<!--        <span>旋转角度：</span>-->
<!--        <el-input-number v-model="angle" size="mini" controls-position="right" :min="0"></el-input-number>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <span>透明度：</span>-->
<!--        <el-slider v-model="opacity" show-input></el-slider>-->
<!--      </el-row>-->
    <el-row>
      <span>删除：</span>
        <i class="el-icon-delete" style="cursor: pointer;" @click="deleteRect"></i>
    </el-row>

    <el-row>
      <p>限制设置：</p>
      <label class="toolbar-check-inp"><input type="checkbox" @change="toggleResizable" :checked="resizable" /> 可缩放</label>
      <label class="toolbar-check-inp"><input type="checkbox" @change="toggleDraggable" :checked="draggable"/> 可拖拽</label>
      <label class="toolbar-check-inp"><input type="checkbox" @change="toggleParentLimitation" :checked="parentLim"/> 画布限制</label>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "ToolBar",
        data(){
            return {
                // width: 0,
                // height: 0,
                // top: 0,
                // left: 0,
                // angle: 0,
                // opacity: 0,
            }
        },
        watch:{
            // width:{
            //     handler(val){
            //         console.log("widthChange");
            //         this.width = val;
            //     },
            //     deep: true
            // }
        },
        computed: {
            activeRect() {
                return this.$store.getters['rect/getActive'];
            },
            width:{
                set(val){
                    this.$store.state.rect.rects[this.activeRect].width = val;
                },
                get(){
                    return this.$store.state.rect.rects[this.activeRect].width;
                }
            },
            height:{
                set(val){
                    this.$store.state.rect.rects[this.activeRect].height = val;
                },
                get(){
                    return this.$store.state.rect.rects[this.activeRect].height;
                }
            },
            minw() {
                return this.$store.state.rect.rects[this.activeRect].minw
            },

            minh() {
                return this.$store.state.rect.rects[this.activeRect].minh
            },

            left:{
                set(val){
                    this.$store.state.rect.rects[this.activeRect].left = val;
                },
                get(){
                    return this.$store.state.rect.rects[this.activeRect].left;
                }
            },
            top:{
                set(val){
                    this.$store.state.rect.rects[this.activeRect].top = val;
                },
                get(){
                    return this.$store.state.rect.rects[this.activeRect].top;
                }
            },

            aspectRatio() {
                return this.$store.state.rect.rects[this.activeRect].aspectRatio;
            },

            parentLim() {
                return this.$store.state.rect.rects[this.activeRect].parentLim;
            },

            draggable() {
                return this.$store.state.rect.rects[this.activeRect].draggable;
            },

            resizable() {
                return this.$store.state.rect.rects[this.activeRect].resizable;
            },

            topIsLocked() {
                if (this.activeRect === null) {
                    return false;
                }
                return (this.$store.state.rect.rects[this.activeRect].axis === 'x' ||
                    this.$store.state.rect.rects[this.activeRect].axis === 'none')
            },

            leftIsLocked() {
                if (this.activeRect === null) {
                    return false;
                }
                return (this.$store.state.rect.rects[this.activeRect].axis === 'y' ||
                    this.$store.state.rect.rects[this.activeRect].axis === 'none')
            },

            zIndex() {
                if (this.activeRect === null) {
                    return null;
                }

                return this.$store.state.rect.rects[this.activeRect].zIndex
            }
        },
        methods: {
            toggleYLock() {
                if(this.activeRect != null)
                  this.$store.dispatch('rect/changeYLock', {id: this.activeRect});
            },
            toggleXLock() {
                if(this.activeRect != null)
                  this.$store.dispatch('rect/changeXLock', {id: this.activeRect});
            },

            toggleAspect() {
                if (this.activeRect === null) {
                    return
                }
                if (!this.$store.state.rect.rects[this.activeRect].aspectRatio) {
                    this.$store.dispatch('rect/setAspect', {id: this.activeRect});
                } else {
                    this.$store.dispatch('rect/unsetAspect', {id: this.activeRect});
                }
            },

            toggleParentLimitation() {
                this.$store.dispatch('rect/toggleParentLimitation', {id: this.activeRect});
            },

            toggleResizable() {
                this.$store.dispatch('rect/toggleResizable', {id: this.activeRect});
            },

            toggleDraggable() {
                this.$store.dispatch('rect/toggleDraggable', {id: this.activeRect});
            },

            deleteRect(){
                if(this.activeRect != null)
                    this.$emit('deleteRect',this.activeRect);
            },

            changeMinWidth(ev) {
                let minw = parseInt(ev.target.value);
                if (typeof minw !== 'number' || isNaN(minw)) {
                    minw = 1;
                }

                if (minw <= 0) {
                    minw = 1;
                } else if (minw > this.$store.state.rect.rects[this.activeRect].width) {
                    minw = this.$store.state.rect.rects[this.activeRect].width;
                }

                ev.target.value = minw;

                this.$store.dispatch('rect/setMinWidth', {id: this.activeRect, width: minw});
            },

            changeMinHeight(ev) {
                let minh = parseInt(ev.target.value);

                if (typeof minh !== 'number' || isNaN(minh)) {
                    minh = 1;
                }

                if (minh <= 0) {
                    minh = 1;
                } else if (minh > this.$store.state.rect.rects[this.activeRect].height) {
                    minh = this.$store.state.rect.rects[this.activeRect].height;
                }

                ev.target.value = minh;

                this.$store.dispatch('rect/setMinHeight', {id: this.activeRect, height: minh});
            },

            changeTop(ev) {
                let top = parseInt(ev.target.value);

                if (typeof top !== 'number' || isNaN(top)) {
                    top = this.$store.state.rect.rects[this.activeRect].top;
                    ev.target.value = top;
                    return
                }

                this.$store.dispatch('rect/setTop', {id: this.activeRect, top: top});
            },

            changeLeft(ev) {
                let left = parseInt(ev.target.value);

                if (typeof left !== 'number' || isNaN(left)) {
                    left = this.$store.state.rect.rects[this.activeRect].left;
                    ev.target.value = left;
                }

                this.$store.dispatch('rect/setLeft', {id: this.activeRect, left: left});
            },

            changeWidth(ev){
                let width = parseInt(ev.target.value);

                if (typeof width !== 'number' || isNaN(width)) {
                    width = this.$store.state.rect.rects[this.activeRect].width;
                    ev.target.value = width;
                }

                this.$store.dispatch('rect/setWidth', {id: this.activeRect, width: width});
            },

            changeHeight(ev){
                let height = parseInt(ev.target.value);

                if (typeof height !== 'number' || isNaN(height)) {
                    height = this.$store.state.rect.rects[this.activeRect].height;
                    ev.target.value = height;
                }

                this.$store.dispatch('rect/setHeight', {id: this.activeRect, height: height});
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row{
    margin-bottom: 1em;
    font-weight: bold;
    font-size: 15px;
    &:last-child {
       margin-bottom: 0;
    }
    .el-input-number{
      width: 6em;
      margin-left: 0.5em;
    }
  }
  .toolbar-wh-row{
    width: 100%;
    margin-top: 5px;
    /*float: left;*/
    font-weight: bold;
    font-size: 15px
  }
  .toolbar-row-title{
    width: 100%;
    /*float: left;*/
    font-size: 15px;
    font-weight: bold;
    color: #1A173B;
  }
  .toolbar-position-inp, .toolbar-size-inp{
    width: 100%;
    /*float: left;*/
    font-size: 11px;
    color: #BBB;
    font-weight: bold;
    display: inline-block;
    position: relative;
  }

  .toolbar-size-inp input,.toolbar-position-inp input{
    width: 70px;
    display: inline-block;
    border: 1px solid #bfbfca;
    margin-top: 2px;
    height: 16px;
  }

  .toolbar-size-inp input[disabled],.toolbar-position-inp input[disabled]{
    border: 1px solid #dcdce7;
    color: #AAAAAA;
  }

  .position-lock-icon, .size-lock-icon{
    bottom: 3px;
    right: 17px;
    cursor: pointer;
  }
  .size-lock-icon{
    bottom: 2px;
    right: -3px;
  }

  .toolbar-check-inp{
    color: #445477;
    font-size: 10px;
    width: 100%;
    display: inline-block;
    margin: 2px 0;
    margin-left: 20px;
  }
  .toolbar-row-title+label{
    margin-top: 5px;
  }
  .toolbar-check-inp input{
    border: 1px solid #bfbfca;
  }
  .icon{
    margin: 10px 30px;
    cursor: pointer;
  }
</style>
