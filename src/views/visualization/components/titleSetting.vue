<template>
    <div>
        <el-form label-position="left" :model="columnList">
            <el-form-item label="标题名">
                <el-input style="width:60%;" v-model="columnList.title" :placeholder="columnList.title" size="small"></el-input>
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
            <el-form-item label="对齐样式">
                <el-select v-model="columnList.selectAlign" size="small">
                    <el-option
                        v-for="(value, index) in align"
                        :key="index"
                        :value="value"
                        :label="value">
                    </el-option> 
                </el-select>
            </el-form-item>
            <el-form-item label="文字排列方式">
                <el-select v-model="columnList.selectSortedBy" size="small">
                    <el-option
                        v-for="(value, index) in sortedBy"
                        :key="index"
                        :value="value"
                        :label="value">
                    </el-option> 
                </el-select>
            </el-form-item>
            <el-form-item label="超链接配置">
                <el-collapse>
                    <el-collapse-item>
                        <el-form label-position="left" :model="columnList.hyperlinkSetting">
                            <el-form-item label="超链接"><el-input v-model="columnList.hyperlinkSetting.hyperlink" style="width:60%;" size="small"></el-input></el-form-item>
                            <el-form-item label="是否新开窗口"><el-switch v-model="columnList.hyperlinkSetting.openNewWindow" active-color="#4EC4CE"></el-switch></el-form-item>
                        </el-form>
                    </el-collapse-item>
                </el-collapse>
            </el-form-item>
        </el-form>       
    </div>
</template>

<script>
export default {
    name:'titleSetting',
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
            activeRect: activeRect,
            Typeface: ['微软雅黑', '黑体'],
            fontWeight:['normal', 'bold', 'bolder', 'lighter', '900', '800', '700', '600', '500', '400', '300', '200', '100'],
            align: ['左对齐', '右对齐', '居中对齐'],
            sortedBy: ['水平排列', '竖直排列'],
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
