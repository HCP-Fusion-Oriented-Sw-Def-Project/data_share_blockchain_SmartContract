<template>
    <div @mousedown.stop>
        <el-form label-position="left" :model="columnList">
            <el-form-item label="段落内容">
                <el-input style="width:60%;" v-model="columnList.text" :placeholder="columnList.title" size="small"></el-input>
            </el-form-item>
            <el-form-item label="文本滚动">
                <el-collapse>
                    <el-collapse-item>
                        <el-form label-position="right">
                            <el-form-item label="滚动持续时间"><el-input-number v-model="columnList.rollSetting.Duration" :min="min" :max="max[0]" size="small"></el-input-number></el-form-item>
                        </el-form>
                    </el-collapse-item>
                </el-collapse>
            </el-form-item>
            <el-form-item label="文本样式">
                <el-collapse >
                    <el-collapse-item>
                        <el-form label-position="right" :model="columnList.fontstyle">
                            <el-form-item label="字体">
                                <el-select v-model="columnList.fontstyle.selectTypeface" size="small">
                                    <el-option 
                                        v-for="(value,index) of Typeface" 
                                        :key="index" :label="value" :value="value">
                                    </el-option> 
                                </el-select>
                            </el-form-item>
                            <el-form-item label="字号"><el-input-number v-model="columnList.fontstyle.fontSize" size="small"></el-input-number></el-form-item>
                            <el-form-item label="字体颜色"><el-color-picker v-model="columnList.fontstyle.fontColor" size="mini"></el-color-picker></el-form-item>
                            <el-form-item label="字体粗细">
                                <el-select v-model="columnList.fontstyle.selectFontWeight" size="small">
                                    <el-option 
                                        v-for="(value, index) in fontWeight"
                                        :key="index"
                                        :value="value"
                                        :label="value">
                                    </el-option> 
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-collapse-item>
                </el-collapse>
            </el-form-item>
            <el-form-item label="行高"><el-slider v-model="columnList.rowHight" style="marginLeft:65px;" :min="min" :max="max[0]" show-input ></el-slider></el-form-item>
            <el-form-item label="对齐方式">
                <el-select v-model="columnList.selectAlign" size="small">
                    <el-option
                        v-for="(value, index) in align"
                        :key="index"
                        :value="value"
                        :label="value">
                    </el-option> 
                </el-select>
            </el-form-item>
            <el-form-item label="首行缩进"><el-slider style="marginLeft:65px;" v-model="columnList.tab" size="small" :min="min" :max="max[1]" show-input></el-slider></el-form-item>
        </el-form>       
    </div>
</template>

<script>
export default {
    name:'textSetting',
    data() {
        const activeRect = this.$store.getters['rect/getActive'];
        let tempColumnList;
        if(activeRect !== null) {
            tempColumnList = this.$store.state.rect.rects[activeRect].columnList;
        }
        else {
            tempColumnList = '';
        }
        return {
            min:0,
            max: [200, 20],
            activeRect: activeRect,
            Typeface: ['微软雅黑', '黑体'],
            fontWeight:['normal', 'bold', 'bolder', 'lighter', '900', '800', '700', '600', '500', '400', '300', '200', '100'],
            align: ['左对齐', '右对齐', '居中对齐'],
            columnList: tempColumnList
        }
    },
    watch: {
        columnList: {
            handler(val) {
                this.$store.dispatch('rect/setColumnList', {id: this.activeRect, columnList: val});
            },
            deep: true
        }
    }
}
</script>
