<template>
<!--<div class="background"  style="height:100%; width:100%; background-color: #ff8c00">-->
<!--    <span>lalal</span>-->
<!--</div>-->
  <div class="background"
       :style="{'background-color':bgcColor,'border-top-left-radius':tl,'border-top-right-radius':tr,
       'border-bottom-left-radius':bl,'border-bottom-right-radius':br,'border-image':imageUrl,'border-image-width':borderWidth,'border-style':borderLine}">
    <span>sss</span>
  </div>
</template>

<script>
    export default {
        name: "DefineBackground",
        data(){
        	return{
        		borderLine:''
          }
        },
        props: {
            id:{
                type:Number,
                default:null
            }
        },
        computed:{
            bgcColor(){
				        return this.$store.state.rect.rects[this.id].columnList.bgcColor
            },

            tl(){
              // console.log(this.$store.state.rect.rects[this.id].columnList.bgLeftUpRadius)
              return this.$store.state.rect.rects[this.id].columnList.bgLeftUpRadius +'px'
            },
            tr(){
                return this.$store.state.rect.rects[this.id].columnList.bgRightUpRadius +'px'
              },
            bl(){
                return this.$store.state.rect.rects[this.id].columnList.bgLeftBottomRadius +'px'
            },
            br(){
                return this.$store.state.rect.rects[this.id].columnList.bgRightBottomRadius +'px'
              },
			      borderWidth(){
            	return this.$store.state.rect.rects[this.id].columnList.borderWidth +'px'
            },
            imageUrl(){
              if(this.$store.state.rect.rects[this.id].columnList.imageUrl == '')
              	this.borderLine = ''
              else
              	this.borderLine = 'solid'
				      console.log(this.$store.state.rect.rects[this.id].columnList.imageUrl,"define" )
            	return 'url('+ this.$store.state.rect.rects[this.id].columnList.imageUrl +') 3 3 round'
            },

        },
        mounted() {
        },
        watch:{
        },
        methods:{
            // console(){
            //     console.log(this.$store.state.rect.rects[this.id],this.id)
            //     this.bgcColor = this.$store.state.rect.rects[this.id].columnList.bgcColor
            // }
        }
    }
</script>

<style scoped>
.background{
  height: 100%;
  width: 100%;
  /*border-style: solid;*/
  /*border-image: url(1.jpg) 3 3 round;*/
  /*border-image-width: 10px;*/

}
</style>
