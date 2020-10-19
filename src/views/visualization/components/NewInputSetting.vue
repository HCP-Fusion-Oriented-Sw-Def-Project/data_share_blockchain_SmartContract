<template>
  <div class="toolbar-wh-row" @mousedown.stop>
    <p class="toolbar-row-title">文字内容：
      <!--        <el-input type="textarea" style="width:300px;" :rows="5" :value="inputContent" @change="changeContent"></el-input>-->
      <textarea :rows="3" :cols="25" :value="inputContent" @change="changeContent"></textarea>
    </p>
    <p class="toolbar-row-title">字体大小：
      <input style="width: 50px" :value="inputFontSize" @change="changeFontSize" />px
    </p>
  </div>
</template>

<script>
    export default {
        name: "NewInputSetting",
        computed: {
            activeRect() {
                return this.$store.getters['rect/getActive'];
            },

            inputContent() {
                return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.content
            },

            inputFontColor() {
                return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.fontColor
            },

            inputFontSize() {
                return this.activeRect === null ? '' : this.$store.state.rect.rects[this.activeRect].columnList.fontSize
            },
        },
        methods:{
            changeContent(ev) {
                let content = ev.target.value;
                let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
                columnList.content = content;
                this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
            },

            changeFontSize(ev) {
                let fontSize = parseInt(ev.target.value);
                if (typeof fontSize !== 'number' || isNaN(fontSize)) {
                    fontSize = this.$store.state.rect.rects[this.activeRect].columnList.fontSize;
                    ev.target.value = fontSize;
                }
                let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
                this.$set(columnList,'fontSize',fontSize);
                this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
                // console.log("fontSize:");
                // console.log(this.$store.state.rect.rects[this.activeRect].columnList.fontSize);
            },

            changeFontColor(ev) {
                let fontColor = parseInt(ev.target.value);
                let columnList = this.$store.state.rect.rects[this.activeRect].columnList;
                this.$set(columnList,'fontColor',fontColor);
                this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: columnList});
            }
        }

    }
</script>

<style scoped>
  .toolbar-wh-row{
    width: 100%;
    margin-top: 5px;
    float: left;
    font-weight: bold;
    font-size: 15px
  }
  .toolbar-row-title{
    
    width: 100%;
    float: left;
    font-size: 15px;
    font-weight: bold;
    color: #1A173B;
  }
</style>
