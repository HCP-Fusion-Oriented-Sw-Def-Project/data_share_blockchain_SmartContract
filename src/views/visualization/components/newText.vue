<template>
    <div  style="width:100%; height:100%">
        <marquee :behavior="behavior" :scrolldelay="this.columnList.rollSetting.Duration" direction="up" :style="styleObject">{{columnList.text}}</marquee>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "text",
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
        let align = {
            '左对齐': 'left',
            '右对齐': 'right',
            '居中对齐': 'center'
        };
        return {
            behavior: 'scroll',
            interval: null,
            tempMarginTop: 20,
            flag: false,
            styleObject: {
                'position': 'relative',
                'padding': '0.5em 0.6em',
                'display':'inline-block',
                'bottom': '1px',
                'background-color': 'transparent',
                'height': this.height,
                'width':  this.width,
                'fontSize': this.columnList.fontstyle.fontSize+'px',
                'color': this.columnList.fontstyle.fontColor,
                'border': 'none',
                'outline': 'none',
                'text-align': align[this.columnList.selectAlign],
                'font-weight': this.columnList.fontstyle.selectFontWeight,
                'line-height': this.columnList.rowHight * 0.02,
                'text-indent': this.columnList.tab + 'em',
                'overflow': 'hidden',
                'word-wrap': 'break-word',
                'woed-break': 'break-all',
            },
            align: align
        }
    },
    watch: {
        columnList: {
            handler(val) {
                this.styleObject['fontSize'] = this.columnList.fontstyle.fontSize+'px';
                this.styleObject['color'] = this.columnList.fontstyle.fontColor;
                this.styleObject['text-align'] = this.align[this.columnList.selectAlign];
                this.styleObject['font-weight'] = this.columnList.fontstyle.selectFontWeight;
                this.styleObject['line-height'] = this.columnList.rowHight * 0.02;
                this.styleObject['text-indent'] = this.columnList.tab + 'em';
            },
            deep: true
        }
    }
}
</script>
