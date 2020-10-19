<template>
    <div style="height:100%;width: 100%; " contenteditable="true">
        <input v-model="columnList.title" :style="styleObject" disabled="true" wrap="soft" />
    </div>
</template>

<script>
export default {
    name: "newTitle",
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
            row: 1,
            col: this.columnList.title.length,
            flag: false,
            styleObject: {
                'position': 'relative',
                'padding': '0.5em 0.6em',
                'display':'inline-block',
                'bottom': '1px',
                'background-color': 'transparent',
                'height': this.width,
                'width':  this.height,
                'fontSize': this.columnList.fontstyle.fontSize+'px',
                'color': this.columnList.fontstyle.fontColor,
                'border': 'none',
                'outline': 'none',
                'text-align': align[this.columnList.selectAlign],
                'font-weight': this.columnList.fontstyle.selectFontWeight,
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

                // if(this.columnList.selectSortedBy === '竖直排列' && this.flag === false) {
                //     this.flag = true;
                //     this.columnList.title = this.transContent(this.columnList.title);
                // }
                // else if(this.columnList.selectSortedBy === '水平排列' && this.flag === true)
                // {
                //     this.flag = false;
                //     this.columnList.title = this.tranNoVerticalContent(this.columnList.title);
                    
                // }
                console.log(this.columnList);
            },
            deep: true
        }
    },
    methods: {
    //     transContent(content) {
    //         let temp = '';
    //         let i =0;
    //         while(i < content.length) {
    //             if(i === 0 ) {
    //                 temp += content[i];
    //             }
    //             else {
    //                 temp += '\n' + content[i];
    //             }
    //         }

    //         return temp;
    //     },
    //     tranNoVerticalContent(content) {
    //         let temp = '';
    //         let array = content.split('\n');
    //         for(let i of array)
    //         {
    //             temp += i;
    //         }

    //         return temp;
    //     }
     }
}
</script>
